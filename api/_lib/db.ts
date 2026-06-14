import { Pool } from "pg";

// Reuse a single pool across warm serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var __sgcPgPool: Pool | undefined;
}

function createPool(): Pool {
  const connectionString =
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing Postgres connection string (POSTGRES_URL / DATABASE_URL).",
    );
  }

  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });
}

function getPool(): Pool {
  if (!global.__sgcPgPool) {
    global.__sgcPgPool = createPool();
  }
  return global.__sgcPgPool;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query(text, params as never[]);
  return result.rows as T[];
}
