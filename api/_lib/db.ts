import { Pool } from "pg";

// Reuse a single pool across warm serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var __sgcPgPool: Pool | undefined;
}

const connectionString =
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Missing Postgres connection string (POSTGRES_URL / DATABASE_URL).",
  );
}

export const pool =
  global.__sgcPgPool ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

if (process.env.NODE_ENV !== "production") {
  global.__sgcPgPool = pool;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await pool.query(text, params as never[]);
  return result.rows as T[];
}
