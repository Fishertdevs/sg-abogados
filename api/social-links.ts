import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_lib/db";
import { applyCors } from "./_lib/http";

interface SocialRow {
  platform: string;
  label: string;
  url: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (applyCors(req, res)) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(405).json({ error: "Método no permitido." });
    return;
  }

  try {
    const rows = await query<SocialRow>(
      `select platform, label, url
         from social_links
        where enabled = true
        order by sort_order asc`,
    );
    res.status(200).json({ socials: rows });
  } catch (err) {
    console.error("[v0] /api/social-links error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
}
