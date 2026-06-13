import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomBytes } from "node:crypto";

/** Applies permissive CORS headers; returns true if the request was a preflight. */
export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

export function generateToken(): string {
  return randomBytes(24).toString("hex");
}

/** Returns the public origin (protocol + host) of the incoming request. */
export function requestOrigin(req: VercelRequest): string {
  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined) ?? "https";
  const host =
    (req.headers["x-forwarded-host"] as string | undefined) ??
    (req.headers.host as string | undefined) ??
    "";
  return `${proto}://${host}`;
}

/** Renders a simple branded HTML page (used for approve/reject confirmations). */
export function htmlPage(title: string, message: string, accent = "#1a2e22"): string {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f4f2ec;color:#1f2620;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
  .card{background:#fff;border:1px solid #e3dfd4;border-radius:16px;max-width:420px;width:100%;padding:40px 32px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.06)}
  .badge{width:56px;height:56px;border-radius:50%;background:${accent};color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:26px}
  h1{font-size:20px;margin:0 0 10px}
  p{font-size:15px;line-height:1.5;color:#55605a;margin:0}
</style>
</head>
<body>
  <div class="card">
    <div class="badge">SGC</div>
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
