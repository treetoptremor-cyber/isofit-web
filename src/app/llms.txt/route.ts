import { ALL_DOCS, HOME_DOC } from "@/content";
import { mirrorPath } from "@/lib/markdown";
import { LEGAL_LINKS, SITE, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// https://llmstxt.org: an H1, a blockquote summary, then link lists. Links point
// at the markdown mirrors so an assistant gets clean text, not page chrome.
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${HOME_DOC.lede}`,
    "",
    `Status: not yet released. iOS launch planned ${SITE.launchDateLong}. Facts on this site were last reviewed ${SITE.factsReviewedLong}.`,
    `Contact: ${SITE.supportEmail}. Full text of every page in one file: ${SITE.url}/llms-full.txt`,
    "",
    "## Pages",
    "",
    ...ALL_DOCS.map((doc) => `- [${doc.name}](${absoluteUrl(mirrorPath(doc.path))}): ${doc.metaDescription}`),
    "",
    "## Optional",
    "",
    ...LEGAL_LINKS.map((link) => `- [${link.label}](${absoluteUrl(link.href)})`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
