import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "../_lib/db";
import { htmlPage } from "../_lib/http";

interface ReviewRow {
  id: string;
  name: string;
  status: string;
  action_token: string;
}

/**
 * Moderation endpoint reached from the WhatsApp links.
 * GET /api/reviews/moderate?id=...&token=...&action=approve|reject
 * Renders a friendly HTML confirmation page for the admin.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const send = (status: number, title: string, message: string, accent?: string) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(status).send(htmlPage(title, message, accent));
  };

  try {
    const id = String(req.query.id ?? "");
    const token = String(req.query.token ?? "");
    const action = String(req.query.action ?? "");

    if (!id || !token || (action !== "approve" && action !== "reject")) {
      send(400, "Enlace inválido", "El enlace de moderación no es válido.", "#9b2c2c");
      return;
    }

    const rows = await query<ReviewRow>(
      `select id, name, status, action_token from reviews where id = $1`,
      [id],
    );
    const review = rows[0];

    if (!review || review.action_token !== token) {
      send(404, "Reseña no encontrada", "No se encontró la reseña o el enlace ya no es válido.", "#9b2c2c");
      return;
    }

    // Idempotent: if already decided, just report current state.
    if (review.status !== "pending") {
      const label = review.status === "approved" ? "aprobada" : "eliminada";
      send(
        200,
        "Ya fue procesada",
        `La reseña de ${review.name} ya había sido ${label} anteriormente.`,
      );
      return;
    }

    if (action === "approve") {
      await query(
        `update reviews set status = 'approved', decided_at = now() where id = $1`,
        [id],
      );
      send(
        200,
        "Reseña aprobada",
        `La reseña de ${review.name} ya está publicada en el sitio. ¡Gracias!`,
      );
      return;
    }

    await query(
      `update reviews set status = 'rejected', decided_at = now() where id = $1`,
      [id],
    );
    send(
      200,
      "Reseña eliminada",
      `La reseña de ${review.name} fue descartada y no se mostrará en el sitio.`,
      "#9b2c2c",
    );
  } catch (err) {
    console.error("[v0] /api/reviews/moderate error:", err);
    send(500, "Error", "Ocurrió un error al procesar la solicitud.", "#9b2c2c");
  }
}
