import Link from "next/link";

import DocPage from "@/components/marketing/doc-page";
import { Section } from "@/components/marketing/primitives";
import { COMPARE_DOC } from "@/content/compare";
import { COMPETITORS } from "@/content/competitors";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(COMPARE_DOC);

export default function ComparePage() {
  return (
    <DocPage doc={COMPARE_DOC} trail={[{ href: "/compare", label: "Compare" }]}>
      <Section id="head-to-head" label="Head to head" title="Detailed comparisons">
        <ul className="grid gap-4 sm:grid-cols-2">
          {COMPETITORS.map((competitor) => (
            <li key={competitor.slug}>
              <Link href={`/compare/isofit-vs-${competitor.slug}`} className="group flex h-full flex-col rounded-[1.75rem] border border-rule bg-paper-raised p-6 transition-colors hover:border-blue/50 hover:bg-white">
                <span className="font-display text-xl font-bold tracking-[-0.02em] group-hover:text-blue">Isofit vs {competitor.name}</span>
                <span className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{competitor.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </DocPage>
  );
}
