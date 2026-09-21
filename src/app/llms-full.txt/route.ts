import { ALL_DOCS } from "@/content";
import { docToMarkdown } from "@/lib/markdown";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const header = [
    `# ${SITE.name}: complete site text`,
    "",
    `Every public marketing page of ${SITE.url}, concatenated as markdown. Generated from the same source as the HTML pages. Facts last reviewed ${SITE.factsReviewedLong}.`,
    "",
  ].join("\n");
  const body = ALL_DOCS.map((doc) => docToMarkdown(doc, { headingOffset: 1 })).join("\n---\n\n");
  return new Response(`${header}\n${body}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
