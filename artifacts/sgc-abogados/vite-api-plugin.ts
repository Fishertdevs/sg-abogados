import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, ViteDevServer } from "vite";

/**
 * Dev-only Vite plugin that runs the serverless functions in `/api` while
 * developing with the Vite dev server.
 *
 * In production these files are deployed as Vercel Serverless Functions, but
 * the Vite dev server (used in the preview) does NOT execute them, which made
 * the review submission appear "broken" during local/preview testing. This
 * plugin bridges that gap by loading each handler with Vite's SSR module
 * loader and adapting the Node req/res objects to the Vercel handler shape.
 */

/** Absolute path to the monorepo root that contains the `/api` folder. */
function findApiRoot(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, "api"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return startDir;
}

/** Loads KEY=VALUE pairs from env files into process.env (without overriding). */
function loadEnvFiles(rootDir: string) {
  const candidates = [
    ".env.development.local",
    ".env.local",
    ".env.development",
    ".env",
  ];
  for (const file of candidates) {
    const full = path.join(rootDir, file);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, "utf8");
    for (const rawLine of content.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

/** Maps an incoming `/api/...` pathname to a handler file on disk. */
function resolveHandlerFile(apiRoot: string, pathname: string): string | null {
  // Strip query string and the leading `/api/`.
  const clean = pathname.split("?")[0].replace(/^\/+/, "");
  if (!clean.startsWith("api/")) return null;
  const rel = clean.slice("api/".length).replace(/\/+$/, "");
  if (!rel) return null;

  const base = path.join(apiRoot, "api", rel);
  const candidates = [
    `${base}.ts`,
    `${base}.js`,
    path.join(base, "index.ts"),
    path.join(base, "index.js"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

/** Reads the full request body as a UTF-8 string. */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** Adds the Vercel-style helpers (`status`, `json`, `send`) to a Node response. */
function augmentResponse(res: ServerResponse) {
  const anyRes = res as ServerResponse & {
    status: (code: number) => typeof anyRes;
    json: (body: unknown) => void;
    send: (body: unknown) => void;
  };
  anyRes.status = (code: number) => {
    res.statusCode = code;
    return anyRes;
  };
  anyRes.json = (body: unknown) => {
    if (!res.headersSent) res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
  };
  anyRes.send = (body: unknown) => {
    if (typeof body === "object") {
      anyRes.json(body);
    } else {
      res.end(String(body));
    }
  };
  return anyRes;
}

export function apiDevServer(): Plugin {
  return {
    name: "sgc-api-dev-server",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      const apiRoot = findApiRoot(server.config.root);
      loadEnvFiles(apiRoot);

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/")) return next();

        const handlerFile = resolveHandlerFile(apiRoot, req.url);
        if (!handlerFile) return next();

        try {
          const mod = await server.ssrLoadModule(handlerFile);
          const handler = (mod.default ?? mod.handler) as
            | ((req: unknown, res: unknown) => unknown)
            | undefined;
          if (typeof handler !== "function") {
            res.statusCode = 500;
            res.end(
              JSON.stringify({ error: `No handler exported by ${handlerFile}` }),
            );
            return;
          }

          // Parse query + body into the shape Vercel handlers expect.
          const url = new URL(req.url, "http://localhost");
          const query: Record<string, string> = {};
          url.searchParams.forEach((v, k) => (query[k] = v));

          let body: unknown = undefined;
          if (req.method && !["GET", "HEAD"].includes(req.method)) {
            const raw = await readBody(req);
            body = raw;
            const contentType = (req.headers["content-type"] ?? "") as string;
            if (raw && contentType.includes("application/json")) {
              try {
                body = JSON.parse(raw);
              } catch {
                body = raw;
              }
            }
          }

          const vReq = req as IncomingMessage & {
            query: Record<string, string>;
            body: unknown;
          };
          vReq.query = query;
          vReq.body = body;

          const vRes = augmentResponse(res);
          await handler(vReq, vRes);
        } catch (err) {
          console.error("[v0] API dev handler error:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
          }
          res.end(JSON.stringify({ error: "Error del servidor (dev)." }));
        }
      });
    },
  };
}
