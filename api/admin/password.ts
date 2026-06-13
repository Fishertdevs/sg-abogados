import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../_lib/http";
import { isPanelConfigured, setPassword, verifyPassword } from "../_lib/auth";

/**
 * Changes the admin panel password.
 *   POST /api/admin/password { currentPassword, newPassword }
 * The new password is hashed and stored in admin_settings, taking
 * precedence over the ADMIN_PASSWORD env var from then on.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ error: "Método no permitido." });
    return;
  }

  if (!(await isPanelConfigured())) {
    res.status(500).json({
      error: "El panel no está configurado. Falta la variable ADMIN_PASSWORD.",
    });
    return;
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const currentPassword = String(body.currentPassword ?? "");
    const newPassword = String(body.newPassword ?? "");

    if (!(await verifyPassword(currentPassword))) {
      res.status(401).json({ error: "La contraseña actual es incorrecta." });
      return;
    }

    if (newPassword.trim().length < 6) {
      res.status(400).json({
        error: "La nueva contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    await setPassword(newPassword.trim());
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[v0] /api/admin/password error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
}
