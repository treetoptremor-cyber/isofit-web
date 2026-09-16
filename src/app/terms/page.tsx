import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata = {
  title: "Terms of Service | Isofit",
  description: "The terms that govern your use of Isofit.",
};

const POLICY_PATH = path.join(process.cwd(), "src/app/terms/terms-of-service.md");

async function getPolicyMarkdown() {
  return fs.readFile(POLICY_PATH, "utf8");
}

export default async function TermsPage() {
  const markdown = await getPolicyMarkdown();

  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-8 text-[#2a2420] sm:px-5 md:px-8 md:py-12">
      <div className="mx-auto mb-4 w-full max-w-3xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl bg-[#245c9b] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#194b82]"
        >
          Back Home
        </Link>
      </div>
      <article className="mx-auto w-full max-w-3xl rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-8 md:p-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="font-display text-3xl font-extrabold tracking-[-0.02em] text-[#2a2420] sm:text-4xl"
                {...props}
              />
            ),
            h2: ({ children, ...props }) => (
              <h2
                id={String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                className="mt-12 mb-4 border-b border-[#2a2420]/10 pb-2 font-display text-2xl font-bold tracking-[-0.015em] text-[#2a2420]"
                {...props}
              >{children}</h2>
            ),
            h3: ({ children, ...props }) => (
              <h3
                id={String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                className="mt-8 mb-3 font-display text-lg font-semibold text-[#2a2420]"
                {...props}
              >{children}</h3>
            ),
            p: ({ ...props }) => (
              <p className="my-4 text-base leading-7 text-[#4a423b]" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="my-5 list-disc space-y-2 pl-6 text-base text-[#4a423b]" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="my-5 list-decimal space-y-2 pl-6 text-base text-[#4a423b]" {...props} />
            ),
            li: ({ ...props }) => <li className="leading-7" {...props} />,
            blockquote: ({ ...props }) => (
              <blockquote
                className="my-6 rounded-r-xl border-l-4 border-[#69A5F0] bg-[#245c9b]/5 px-5 py-3 text-base italic text-[#4a423b]"
                {...props}
              />
            ),
            hr: ({ ...props }) => <hr className="my-10 border-[#2a2420]/10" {...props} />,
            a: ({ ...props }) => (
              <a
                className="font-medium text-[#2d6cb8] underline decoration-[#69A5F0]/40 underline-offset-2 hover:text-[#194b82]"
                {...props}
              />
            ),
            strong: ({ ...props }) => (
              <strong className="font-semibold text-[#2a2420]" {...props} />
            ),
            table: ({ ...props }) => (
              <div className="my-6 overflow-x-auto rounded-xl border border-[#2a2420]/10">
                <table className="min-w-full border-collapse text-left text-sm text-[#4a423b]" {...props} />
              </div>
            ),
            thead: ({ ...props }) => <thead className="bg-[#f3efe6]" {...props} />,
            th: ({ ...props }) => (
              <th className="border-b border-[#2a2420]/10 px-4 py-2.5 font-semibold text-[#2a2420]" {...props} />
            ),
            td: ({ ...props }) => (
              <td className="border-b border-[#2a2420]/5 px-4 py-2.5 align-top" {...props} />
            ),
            code: ({ ...props }) => (
              <code className="rounded bg-[#ece6d9] px-1.5 py-0.5 font-mono text-[13px] text-[#2a2420]" {...props} />
            ),
            em: ({ ...props }) => <em className="text-[#6c6259]" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}
