import type { DocTable, PageDoc } from "@/content/types";
import { SITE, absoluteUrl } from "@/lib/site";

function cell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function tableToMarkdown(table: DocTable) {
  const lines = [
    `| ${table.head.map(cell).join(" | ")} |`,
    `| ${table.head.map(() => "---").join(" | ")} |`,
    ...table.rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
  ];
  return (table.caption ? `${table.caption}\n\n` : "") + lines.join("\n");
}

export function mirrorPath(path: string) {
  return path === "/" ? "/index.md" : `${path}.md`;
}

export function docToMarkdown(doc: PageDoc, { headingOffset = 0 }: { headingOffset?: number } = {}) {
  const h = (level: number) => "#".repeat(level + headingOffset);
  const out: string[] = [];

  out.push(`${h(1)} ${doc.h1}`);
  out.push(`Source: ${absoluteUrl(doc.path)}\nFacts last reviewed: ${SITE.factsReviewed}`);
  out.push(doc.lede);

  for (const section of doc.sections) {
    out.push(`${h(section.level ?? 2)} ${section.heading}`);
    if (section.body) out.push(...section.body);
    if (section.bullets) out.push(section.bullets.map((bullet) => `- ${bullet}`).join("\n"));
    if (section.image) out.push(`![${section.image.alt}](${absoluteUrl(section.image.src)})`);
    if (section.links) out.push(section.links.map((link) => `- [${link.label}](${link.href})`).join("\n"));
    for (const item of section.items ?? []) {
      out.push(`${h(3)} ${item.heading}`, item.body);
    }
    if (section.specs) out.push(section.specs.map((spec) => `- **${spec.term}:** ${spec.value}`).join("\n"));
    if (section.table) out.push(tableToMarkdown(section.table));
    for (const column of section.columns ?? []) {
      out.push(`${h(3)} ${column.heading}`);
      out.push(column.items.map((item) => `- ${item}`).join("\n"));
    }
    if (section.quote) out.push(`> "${section.quote.text}"\n> (${section.quote.source})`);
  }

  if (doc.faqs?.length) {
    out.push(`${h(2)} Frequently asked questions`);
    for (const faq of doc.faqs) {
      out.push(`${h(3)} ${faq.question}`);
      out.push(...faq.answer);
    }
  }

  return out.join("\n\n") + "\n";
}
