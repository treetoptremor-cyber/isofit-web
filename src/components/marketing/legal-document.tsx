import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { PageShell } from "@/components/marketing/primitives";

// One renderer for the Terms, Privacy Policy and Consumer Health Data Privacy
// Policy. Presentation only: the markdown files are the legal text and are
// rendered as written.

// Anchor ids other pages link to (e.g. /privacy#4-atlas-ai-and-your-data).
function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

// The document header: the H1 and the "**Version:** …" lines under it. Those
// lines sit in one markdown paragraph; each is given its own line here.
function splitHeader(markdown: string) {
  const lines = markdown.split("\n");
  const titleAt = lines.findIndex((line) => line.startsWith("# "));
  let end = titleAt + 1;
  while (end < lines.length && lines[end].trim() === "") end++;
  const metaStart = end;
  while (end < lines.length && lines[end].trim() !== "") end++;
  const meta = lines.slice(metaStart, end).filter((line) => line.startsWith("**"));
  const isMeta = meta.length === end - metaStart;
  const header = lines.slice(0, isMeta ? end : titleAt + 1).join("\n");
  const body = lines.slice(isMeta ? end : titleAt + 1).join("\n");
  return { header, meta: isMeta ? meta : [], body };
}

function sections(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim())
    .map((title) => ({ title, id: slug(title) }));
}

const text = (children: unknown) => String(Array.isArray(children) ? children.join("") : children);

// react-markdown hands each component its syntax-tree `node`; keep it off the DOM.
function dom<T extends { node?: unknown }>(props: T): Omit<T, "node"> {
  const rest = { ...props };
  delete rest.node;
  return rest;
}

const COMPONENTS: Components = {
  h1: (props) => <h1 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl" {...dom(props)} />,
  h2: ({ children, ...props }) => (
    <h2 id={slug(text(children))} className="mb-4 mt-12 scroll-mt-24 border-b border-rule pb-2 font-display text-2xl font-bold tracking-[-0.015em] text-ink" {...dom(props)}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={slug(text(children))} className="mb-3 mt-8 scroll-mt-24 font-display text-lg font-semibold text-ink" {...dom(props)}>
      {children}
    </h3>
  ),
  p: (props) => <p className="my-4 text-base leading-7 text-ink-2" {...dom(props)} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 text-base text-ink-2" {...dom(props)} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 text-base text-ink-2" {...dom(props)} />,
  li: (props) => <li className="leading-7" {...dom(props)} />,
  blockquote: (props) => (
    <blockquote className="my-6 rounded-r-xl border-l-4 border-forest bg-forest-soft/60 px-5 py-3 text-base italic text-ink-2" {...dom(props)} />
  ),
  hr: (props) => <hr className="my-10 border-rule" {...dom(props)} />,
  a: (props) => <a className="font-medium text-blue underline decoration-blue/40 underline-offset-2 hover:text-blue-dark" {...dom(props)} />,
  strong: (props) => <strong className="font-semibold text-ink" {...dom(props)} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-rule">
      <table className="min-w-full border-collapse text-left text-sm text-ink-2" {...dom(props)} />
    </div>
  ),
  thead: (props) => <thead className="bg-paper" {...dom(props)} />,
  th: (props) => <th className="border-b border-rule px-4 py-3 align-bottom font-semibold text-ink" {...dom(props)} />,
  td: (props) => <td className="border-b border-rule/60 px-4 py-3 align-top leading-6" {...dom(props)} />,
  code: (props) => <code className="rounded bg-paper-sunk px-1.5 py-0.5 font-mono text-[13px] text-ink" {...dom(props)} />,
  em: (props) => <em className="text-ink-3" {...dom(props)} />,
};

export default function LegalDocument({ markdown }: { markdown: string }) {
  const { header, meta, body } = splitHeader(markdown);
  const contents = sections(body);
  return (
    <PageShell sticky={false}>
      <div className="px-4 py-8 sm:px-5 md:px-8 md:py-12">
        <article className="mx-auto w-full max-w-3xl rounded-3xl border border-rule bg-white p-5 shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-8 md:p-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
            {header.split("\n").filter((line) => !line.startsWith("**")).join("\n")}
          </ReactMarkdown>
          {meta.length ? (
            <dl className="mt-5 grid gap-x-6 gap-y-1.5 border-y border-rule py-4 text-[0.9375rem] sm:grid-cols-[max-content_minmax(0,1fr)]">
              {meta.map((line) => {
                const match = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
                if (!match) return null;
                return (
                  <div key={match[1]} className="contents">
                    <dt className="label pt-0.5">{match[1]}</dt>
                    <dd className="text-ink-2">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...COMPONENTS, p: (props) => <span {...dom(props)} /> }}>
                        {match[2]}
                      </ReactMarkdown>
                    </dd>
                  </div>
                );
              })}
            </dl>
          ) : null}
          {contents.length > 2 ? (
            <nav aria-label="Contents" className="mt-6 rounded-2xl bg-paper px-5 py-4">
              <p className="label">Contents</p>
              <ol className="mt-2 grid gap-x-6 gap-y-1 text-[0.9375rem] sm:grid-cols-2">
                {contents.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`} className="inline-flex min-h-8 items-center text-blue underline decoration-blue/30 underline-offset-2 hover:text-blue-dark">
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </PageShell>
  );
}
