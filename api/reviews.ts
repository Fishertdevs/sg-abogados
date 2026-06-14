import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_lib/db";
import { applyCors } from "./_lib/http";

interface ReviewRow {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  stars: number;
  created_at: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (applyCors(req, res)) return;

  try {
    if (req.method === "GET") {
      const rows = await query<ReviewRow>(
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
      return;
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

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
      return;
    }

    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(405).json({ error: "Método no permitido." });
  } catch (err) {
    console.error("[vercel] /api/reviews error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
}
