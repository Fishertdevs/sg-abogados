import { Pool } from "pg";

// Reuse a single pool across warm serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var __sgcPgPoolV2: Pool | undefined;
}

const rawConnectionString =
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.DATABASE_URL;

if (!rawConnectionString) {
  throw new Error(
    "Missing Postgres connection string (POSTGRES_URL / DATABASE_URL).",
  );
}

// Supabase connection strings include `sslmode=require`, which newer versions
// of `pg` treat as `verify-full`. That rejects Supabase's self-signed pooler
// certificate (SELF_SIGNED_CERT_IN_CHAIN). We strip the libpq SSL params from
// the URL and instead configure SSL explicitly via the `ssl` option below so
// the connection works in both dev and production.
function sanitizeConnectionString(input: string): string {
  try {
    const url = new URL(input);
    url.searchParams.delete("sslmode");
    url.searchParams.delete("ssl");
    url.searchParams.delete("sslrootcert");
    return url.toString();
  } catch {
    return input;
  }
}

const connectionString = sanitizeConnectionString(rawConnectionString);

export const pool =
  global.__sgcPgPoolV2 ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

if (process.env.NODE_ENV !== "production") {
  global.__sgcPgPoolV2 = pool;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await pool.query(text, params as never[]);
  return result.rows as T[];
}
