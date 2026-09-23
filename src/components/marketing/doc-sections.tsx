import type { ReactNode } from "react";

import { ColumnCards, ItemList, Portrait, QuoteBlock, Section, SpecList } from "@/components/marketing/primitives";
import type { DocSection, DocTable } from "@/content/types";

// One table in the DOM. From md up it is a normal table; below that the CSS in
// globals.css stacks each row into a card, labelling cells from data-label.
// The explicit roles keep table semantics once the elements are display:block.
export function DataTable({ table }: { table: DocTable }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-rule bg-paper-raised">
      <table role="table" className="table-stack w-full border-collapse text-left text-[0.9375rem] leading-relaxed md:min-w-[36rem]">
        {table.caption ? <caption className="caption px-5 pb-1 pt-4 text-left">{table.caption}</caption> : null}
        <thead role="rowgroup">
          <tr role="row">
            {table.head.map((cell) => (
              <th key={cell} role="columnheader" scope="col" className={`border-b border-rule px-5 py-3 align-bottom font-display text-sm font-semibold ${cell === "Isofit" || cell === "Pro" ? "text-blue" : "text-ink"}`}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {table.rows.map((row) => (
            <tr key={row[0]} role="row" className="border-b border-rule last:border-b-0">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} role="rowheader" scope="row" className="align-top font-medium text-ink md:w-[24%] md:px-5 md:py-3.5">{cell}</th>
                ) : (
                  <td key={index} role="cell" data-label={table.head[index]} className="align-top text-ink-2 md:px-5 md:py-3.5">{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Default rendering for a PageDoc section. Pages can pass `media` to sit
// imagery beside the copy, alternating sides down the page.
export default function DocSections({
  sections,
  media = {},
  wide = {},
}: {
  sections: DocSection[];
  media?: Record<string, ReactNode>;
  // Full-width figures shown under a section's copy, keyed by section id.
  wide?: Record<string, ReactNode>;
}) {
  let mediaCount = 0;
  return (
    <>
      {sections.map((section) => {
        const figure = media[section.id] ?? (section.image ? <Portrait {...section.image} className="mx-auto w-72 lg:w-full" /> : undefined);
        const flip = figure ? mediaCount++ % 2 === 1 : false;
        const copy = (
          <div className="prose-iso max-w-[66ch]">
            {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            ) : null}
          </div>
        );
        return (
          <Section key={section.id} id={section.id} label={section.label} title={section.heading} level={section.level}>
            {figure ? (
              <div className={`grid grid-cols-[minmax(0,1fr)] gap-10 lg:items-start ${flip ? "lg:grid-cols-[24rem_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_24rem]"}`}>
                <div className={flip ? "lg:order-2" : ""}>
                  {copy}
                  {section.specs ? <div className="mt-8"><SpecList specs={section.specs} /></div> : null}
                </div>
                <div className={flip ? "lg:order-1" : ""}>{figure}</div>
              </div>
            ) : (
              <>
                {section.body || section.bullets ? copy : null}
                {section.specs ? <div className={section.body || section.bullets ? "mt-8" : ""}><SpecList specs={section.specs} columns={2} /></div> : null}
              </>
            )}
            {section.links ? (
              <ul className="mt-4 flex flex-wrap gap-x-6">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-blue underline decoration-blue/40 underline-offset-4 hover:text-blue-dark hover:decoration-current">
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {section.items ? <div className={section.body || section.bullets || section.specs ? "mt-8" : ""}><ItemList items={section.items} /></div> : null}
            {section.columns ? <div className="mt-8"><ColumnCards columns={section.columns} /></div> : null}
            {section.table ? <div className="mt-8"><DataTable table={section.table} /></div> : null}
            {wide[section.id] ? <div className="mt-10">{wide[section.id]}</div> : null}
            {section.quote ? <div className="mt-10"><QuoteBlock {...section.quote} /></div> : null}
          </Section>
        );
      })}
    </>
  );
}
