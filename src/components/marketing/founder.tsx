import { Portrait, QuoteBlock, Section, Statement } from "@/components/marketing/primitives";
import type { DocSection } from "@/content/types";
import { SITE } from "@/lib/site";

// The founder on /about. Desktop: portrait, name and links in a narrow column
// that stays in view, the pulled line and the letter beside it. Phones: name
// and a small portrait first, so the reader meets the person before the letter.
export default function FounderProfile({ section }: { section: DocSection }) {
  return (
    <Section id={section.id} label={section.label} title={section.heading}>
      <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-12">
        <div className="flex items-center gap-5 md:sticky md:top-24 md:block md:self-start">
          {section.image ? <Portrait {...section.image} className="w-24 shrink-0 rounded-2xl sm:w-28 md:w-full md:rounded-[1.75rem]" /> : null}
          <div className="md:mt-5">
            <p className="font-display text-xl font-bold tracking-[-0.01em]">{SITE.founder.name}</p>
            {section.byline ? <p className="mt-1 text-[0.9375rem] text-ink-3">{section.byline}</p> : null}
            {section.links ? (
              <ul className="mt-2 flex flex-wrap gap-x-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer me" className="inline-flex min-h-9 items-center gap-1 text-[0.9375rem] font-medium text-blue underline decoration-blue/40 underline-offset-4 hover:text-blue-dark">
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div>
          {section.quote ? <QuoteBlock {...section.quote} /> : null}
          {section.statement ? <div className="mt-8"><Statement {...section.statement} /></div> : null}
        </div>
      </div>
    </Section>
  );
}
