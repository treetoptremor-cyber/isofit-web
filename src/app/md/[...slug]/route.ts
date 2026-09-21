import { ALL_DOCS } from "@/content";
import { docToMarkdown } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/site";

// Markdown mirrors. next.config rewrites /features/atlas.md to /md/features/atlas
// and /index.md to /md/index.
export const dynamicParams = false;

function slugFor(path: string) {
  return path === "/" ? ["index"] : path.slice(1).split("/");
}

export function generateStaticParams() {
  return ALL_DOCS.map((doc) => ({ slug: slugFor(doc.path) }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = ALL_DOCS.find((candidate) => slugFor(candidate.path).join("/") === slug.join("/"));
  if (!doc) return new Response("Not found", { status: 404 });

  return new Response(docToMarkdown(doc), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // The HTML page is the one to index; the mirror is for reading.
      Link: `<${absoluteUrl(doc.path)}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
