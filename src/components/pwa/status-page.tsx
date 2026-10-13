import Link from "next/link";
import { HeatRibbon } from "@/components/marketing/primitives";
import { ShellBackdrop } from "@/components/pwa/shell-backdrop";

type StatusPageProps = {
  title: string;
  message: string;
  linkHref: string;
  linkLabel: string;
};

export function StatusPage({ title, message, linkHref, linkLabel }: StatusPageProps) {
  return (
    <main className="relative isolate min-h-screen bg-paper px-4 py-10 text-ink sm:px-6">
      <ShellBackdrop />
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-rule bg-white p-8 text-center shadow-[0_22px_50px_rgba(42,36,32,0.08)]">
        <HeatRibbon className="mx-auto mb-6 max-w-24" />
        <h1 className="font-display text-[clamp(1.85rem,8vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">{title}</h1>
        <p className="mt-3 text-[15px] text-ink-2">{message}</p>
        <Link
          href={linkHref}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-forest px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
        >
          {linkLabel}
        </Link>
      </div>
    </main>
  );
}
