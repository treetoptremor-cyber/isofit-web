import Link from "next/link";

type AppShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ title, description, actions, children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-5 text-[#2a2420] sm:px-5 sm:py-6 md:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-5 rounded-3xl border border-[#2a2420]/10 bg-white p-4 shadow-[0_18px_40px_rgba(42,36,32,0.08)] sm:mb-6 sm:p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a7066]">ISOfit PWA</p>
              <h1 className="mt-1 font-display text-[clamp(1.7rem,7vw,1.95rem)] font-bold tracking-[-0.02em]">{title}</h1>
              {description ? <p className="mt-2 text-sm text-[#4a423b]">{description}</p> : null}
            </div>
            {actions ? <div className="w-full sm:w-auto">{actions}</div> : null}
          </div>
        </header>

        <div className="space-y-4">{children}</div>

        <footer className="mt-6 text-center text-xs text-[#7a7066] sm:mt-8">
          <Link href="/" className="font-medium text-[#4a423b] hover:text-[#2a2420]">
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
