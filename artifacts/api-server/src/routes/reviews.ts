import { Router } from "express";
import { Pool } from "pg";

const connectionString =
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.DATABASE_URL;

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    if (!connectionString) {
      throw new Error(
        "Missing Postgres connection string (POSTGRES_URL / DATABASE_URL).",
      );
    }
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 3,
    });
  }
  return pool;
}

async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query(text, params as never[]);
  return result.rows as T[];
}

const router = Router();

router.get("/reviews", async (req, res) => {
  try {
    const rows = await query<{
      id: string;
      name: string;
      role: string | null;
      quote: string;
      stars: number;
      created_at: string;
    }>(
      `select id, name, role, quote, stars, created_at
         from reviews
        where status = 'approved'
        order by created_at desc
        limit 50`,
    );
    res.status(200).json({
      reviews: rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        quote: r.quote,
        stars: Number(r.stars),
        createdAt: r.created_at,
      })),
    });
  } catch (err) {
    console.error("[reviews] GET error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const body = req.body ?? {};
    const name = String(body.name ?? "").trim();
    const role = body.role ? String(body.role).trim() : null;
    const quote = String(body.quote ?? "").trim();
    const stars = Number(body.stars);

    if (name.length < 2 || name.length > 80) {
      res.status(400).json({ error: "Nombre inválido." });
      return;
    }
    if (quote.length < 5 || quote.length > 1000) {
      res.status(400).json({ error: "La reseña es demasiado corta o larga." });
      return;
    }
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      res.status(400).json({ error: "Calificación inválida." });
      return;
    }

    await query(
      `insert into reviews (name, role, quote, stars, status, action_token)
       values ($1, $2, $3, $4, 'pending', '')`,
      [name, role, quote, stars],
    );

    res.status(201).json({
      ok: true,
      message: "¡Gracias por tu reseña! Será revisada antes de publicarse.",
    });
  } catch (err) {
    console.error("[reviews] POST error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
});

router.get("/admin/reviews", (req, res, next) => {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res
      .status(500)
      .json({
        error: "El panel no está configurado. Falta la variable ADMIN_PASSWORD.",
      });
    return;
  }
  const provided =
    (req.headers["x-admin-password"] as string | undefined) ?? "";
  if (!provided || provided !== expected) {
    res.status(401).json({ error: "Contraseña incorrecta." });
    return;
  }
  next();
});

router.get("/admin/reviews", async (_req, res) => {
  try {
    const rows = await query<{
      id: string;
      name: string;
      role: string | null;
      quote: string;
      stars: number;
      status: string;
      created_at: string;
    }>(
      `select id, name, role, quote, stars, status, created_at
         from reviews
        where status in ('pending', 'approved')
        order by
          case when status = 'pending' then 0 else 1 end,
          created_at desc
        limit 200`,
    );
    res.status(200).json({
      reviews: rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        quote: r.quote,
        stars: Number(r.stars),
        status: r.status,
        createdAt: r.created_at,
      })),
    });
  } catch (err) {
    console.error("[admin/reviews] GET error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
});

router.post("/admin/reviews", (req, res, next) => {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res
      .status(500)
      .json({
        error: "El panel no está configurado. Falta la variable ADMIN_PASSWORD.",
      });
    return;
  }
  const provided =
    (req.headers["x-admin-password"] as string | undefined) ?? "";
  if (!provided || provided !== expected) {
    res.status(401).json({ error: "Contraseña incorrecta." });
    return;
  }
  next();
});

router.post("/admin/reviews", async (req, res) => {
  try {
    const body = req.body ?? {};
    const id = String(body.id ?? "");
    const action = String(body.action ?? "");

    if (!id) {
      res.status(400).json({ error: "Falta el identificador de la reseña." });
      return;
    }

    if (action === "approve") {
      await query(
        `update reviews set status = 'approved', decided_at = now() where id = $1`,
        [id],
      );
      res.status(200).json({ ok: true });
      return;
    }

    if (action === "delete") {
      await query(`delete from reviews where id = $1`, [id]);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(400).json({ error: "Acción no válida." });
  } catch (err) {
    console.error("[admin/reviews] POST error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
});

router.get("/social-links", async (_req, res) => {
  try {
    const rows = await query<{
      platform: string;
      label: string;
      url: string;
    }>(
      `select platform, label, url
         from social_links
        where enabled = true
        order by sort_order asc`,
    );
    res.status(200).json({ socials: rows });
  } catch (err) {
    console.error("[social-links] GET error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
});

export default router;
