import fs from "node:fs/promises";
import path from "node:path";

const LOGGER_ROOT = path.join(process.cwd(), "logger_v0.12");

const MIME_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function resolveMimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

function resolveCacheControl(filePath: string) {
  return path.extname(filePath).toLowerCase() === ".html"
    ? "public, max-age=0, must-revalidate"
    : "public, max-age=31536000, immutable";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ asset: string[] }> },
) {
  const { asset } = await context.params;
  const targetPath = path.resolve(LOGGER_ROOT, ...asset);
  const rootWithSeparator = `${LOGGER_ROOT}${path.sep}`;
  const isInsideRoot = targetPath === LOGGER_ROOT || targetPath.startsWith(rootWithSeparator);

  if (!isInsideRoot) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const stat = await fs.stat(targetPath);
    if (!stat.isFile()) {
      return new Response("Not Found", { status: 404 });
    }

    const body = await fs.readFile(targetPath);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": resolveMimeType(targetPath),
        "Cache-Control": resolveCacheControl(targetPath),
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
