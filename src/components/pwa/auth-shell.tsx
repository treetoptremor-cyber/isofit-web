import Link from "next/link";
import { HeatRibbon } from "@/components/marketing/primitives";
import { ShellBackdrop } from "@/components/pwa/shell-backdrop";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="relative isolate min-h-screen bg-paper px-4 py-6 text-ink sm:px-5 sm:py-8 md:px-6">
      <ShellBackdrop />
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink sm:mb-6">
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <section className="rounded-3xl border border-rule bg-white p-5 shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-8">
          <HeatRibbon className="mb-5 max-w-24" />
          <h1 className="font-display text-[clamp(1.85rem,8vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">{title}</h1>
          <p className="mt-3 text-sm text-ink-2">{subtitle}</p>
          <div className="mt-5 space-y-4 sm:mt-6">{children}</div>
          <div className="mt-5 text-sm text-ink-2 sm:mt-6">{footer}</div>
        </section>
      </div>
    </main>
  );
}
