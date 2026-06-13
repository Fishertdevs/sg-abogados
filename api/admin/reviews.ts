import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "../_lib/db";
import { applyCors } from "../_lib/http";
import { isPanelConfigured, verifyPassword } from "../_lib/auth";

interface ReviewRow {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  stars: number;
  status: string;
  created_at: string;
}

/**
 * Admin reviews API, protected by a shared password.
 *   GET  /api/admin/reviews            -> list all reviews (pending first)
 *   POST /api/admin/reviews { id, action: "approve" | "delete" }
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (applyCors(req, res)) return;

  if (!(await isPanelConfigured())) {
    res.status(500).json({
      error:
        "El panel no está configurado. Falta la variable ADMIN_PASSWORD.",
    });
    return;
  }

  const provided =
    (req.headers["x-admin-password"] as string | undefined) ?? "";
  if (!(await verifyPassword(provided))) {
    res.status(401).json({ error: "Contraseña incorrecta." });
    return;
  }

  try {
    if (req.method === "GET") {
      const rows = await query<ReviewRow>(
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
      return;
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
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
      return;
    }

    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(405).json({ error: "Método no permitido." });
  } catch (err) {
    console.error("[v0] /api/admin/reviews error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
}
