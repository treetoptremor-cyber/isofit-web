import Link from "next/link";
import { ShellBackdrop } from "@/components/pwa/shell-backdrop";

type AppShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ title, description, actions, children }: AppShellProps) {
  return (
    <main className="relative isolate min-h-screen bg-paper px-4 py-5 text-ink sm:px-5 sm:py-6 md:px-6">
      <ShellBackdrop />
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-5 rounded-3xl border border-rule bg-white p-4 shadow-[0_18px_40px_rgba(42,36,32,0.08)] sm:mb-6 sm:p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Isofit PWA</p>
              <h1 className="mt-1 font-display text-[clamp(1.85rem,8vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">{title}</h1>
              {description ? <p className="mt-2 text-sm text-ink-2">{description}</p> : null}
            </div>
            {actions ? <div className="w-full sm:w-auto">{actions}</div> : null}
          </div>
        </header>

        <div className="space-y-4">{children}</div>

        <footer className="mt-6 text-center text-xs text-ink-3 sm:mt-8">
          <Link href="/" className="font-medium text-ink-2 hover:text-ink">
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
