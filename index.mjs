import { createReadStream, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ASSETS_DIR = fileURLToPath(new URL("./assets/", import.meta.url));
// prefix routes match `path` itself or `path + "/..."` — no trailing slash here
const ROUTE_PREFIX = "/skin-nebula";
const CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

export const name = "dsh-skin-nebula";
// hard dependency: cordis defers activation until the webserver service exists
// (in a non-web composition the plugin simply stays pending)
export const inject = ["webServer"];

export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: "prefix",
        path: ROUTE_PREFIX,
        handler: (req, res) => serveAsset(req, res),
      }),
    "dsh-skin-nebula: asset route",
  );
}

function serveAsset(req, res) {
  const pathname = new URL(req.url, "http://localhost").pathname;
  const file = pathname.slice(ROUTE_PREFIX.length + 1);
  const ext = file.slice(file.lastIndexOf("."));
  const type = CONTENT_TYPES[ext];
  // single flat directory of shipped images; anything else is not ours
  if (type === undefined || !/^[a-z0-9-]+\.[a-z]+$/.test(file)) {
    res.writeHead(404).end();
    return;
  }
  const path = join(ASSETS_DIR, file);
  let stat;
  try {
    stat = statSync(path);
  } catch {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, {
    "content-type": type,
    "content-length": stat.size,
    "cache-control": "public, max-age=86400",
  });
  createReadStream(path).pipe(res);
}
