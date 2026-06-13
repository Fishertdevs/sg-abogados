import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { query } from "./db";

const PASSWORD_KEY = "password_hash";

/** Hashes a password with scrypt, returning "salt:hash" in hex. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

/** Safely compares a plaintext password against a stored "salt:hash" value. */
function verifyHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  const hashBuf = Buffer.from(hash, "hex");
  if (hashBuf.length !== derived.length) return false;
  return timingSafeEqual(hashBuf, derived);
}

/** Reads the stored password hash from admin_settings, if any. */
async function getStoredHash(): Promise<string | null> {
  try {
    const rows = await query<{ value: string }>(
      `select value from admin_settings where key = $1 limit 1`,
      [PASSWORD_KEY],
    );
    return rows[0]?.value ?? null;
  } catch {
    return null;
  }
}

/**
 * Verifies a password. If a hash has been set in the DB, that takes
 * precedence; otherwise we fall back to the ADMIN_PASSWORD env var so the
 * panel keeps working before the password is ever changed.
 */
export async function verifyPassword(password: string): Promise<boolean> {
  if (!password) return false;

  const stored = await getStoredHash();
  if (stored) {
    return verifyHash(password, stored);
  }

  const envPassword = process.env.ADMIN_PASSWORD;
  return Boolean(envPassword) && password === envPassword;
}

/** Persists a new password hash, replacing any previous one. */
export async function setPassword(newPassword: string): Promise<void> {
  const hash = hashPassword(newPassword);
  await query(
    `insert into admin_settings (key, value, updated_at)
     values ($1, $2, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [PASSWORD_KEY, hash],
  );
}

/** True when the panel can authenticate (env set OR a hash stored). */
export async function isPanelConfigured(): Promise<boolean> {
  if (process.env.ADMIN_PASSWORD) return true;
  return (await getStoredHash()) !== null;
}
