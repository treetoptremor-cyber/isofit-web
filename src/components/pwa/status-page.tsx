import Link from "next/link";

type StatusPageProps = {
  title: string;
  message: string;
  linkHref: string;
  linkLabel: string;
};

export function StatusPage({ title, message, linkHref, linkLabel }: StatusPageProps) {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-10 text-[#2a2420] sm:px-6">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-[#2a2420]/10 bg-white p-8 text-center shadow-[0_22px_50px_rgba(42,36,32,0.08)]">
        <h1 className="font-display text-3xl font-bold tracking-[-0.02em]">{title}</h1>
        <p className="mt-3 text-[15px] text-[#4a423b]">{message}</p>
        <Link
          href={linkHref}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#69A5F0] px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5c94da]"
        >
          {linkLabel}
        </Link>
      </div>
    </main>
  );
}
