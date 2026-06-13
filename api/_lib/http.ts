import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Applies permissive CORS headers; returns true if the request was a preflight. */
export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
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
