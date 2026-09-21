import Image from "next/image";
import Link from "next/link";

import DocPage from "@/components/marketing/doc-page";
import { Section } from "@/components/marketing/primitives";
import { DOCS_BY_PATH } from "@/content";
import { FEATURES_DOC } from "@/content/features";
import { docMetadata } from "@/lib/metadata";
import { FEATURE_LINKS } from "@/lib/site";

export const metadata = docMetadata(FEATURES_DOC);

export default function FeaturesPage() {
  return (
    <DocPage
      doc={FEATURES_DOC}
      trail={[{ href: "/features", label: "Features" }]}
      aside={
        <div className="mx-auto w-56 overflow-hidden rounded-[1.75rem] border border-rule bg-paper-raised shadow-[0_18px_40px_rgba(42,36,32,0.06)] lg:w-full">
          <Image
            src="/atlas/coach-hello.png"
            alt="Illustration of Isofit's coach in a white polo with the blue ISO cube mark, one hand open in welcome."
            width={1254}
            height={1254}
            sizes="(max-width: 1023px) 224px, 352px"
            priority
            className="h-auto w-full"
          />
        </div>
      }
    >
      <Section id="feature-pages" label="In depth" title="Read about each feature">
        <ul className="grid gap-4 sm:grid-cols-2">
          {FEATURE_LINKS.map((feature, index) => {
            const doc = DOCS_BY_PATH[feature.href];
            return (
              <li key={feature.href}>
                <Link href={feature.href} className="group flex h-full flex-col rounded-[1.75rem] border border-rule bg-paper-raised p-6 transition-colors hover:border-blue/50 hover:bg-white">
                  <span className="label">0{index + 1} · {feature.short} tab</span>
                  <span className="mt-2 font-display text-xl font-bold tracking-[-0.02em] group-hover:text-blue">{feature.label}</span>
                  <span className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{doc.metaDescription}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </DocPage>
  );
}
