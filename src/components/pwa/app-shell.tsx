import Link from "next/link";

type AppShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ title, description, actions, children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-6 text-[#2a2420] sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_18px_40px_rgba(42,36,32,0.08)] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a7066]">ISOfit PWA</p>
              <h1 className="mt-1 font-display text-3xl font-bold tracking-[-0.02em]">{title}</h1>
              {description ? <p className="mt-2 text-sm text-[#4a423b]">{description}</p> : null}
            </div>
            {actions}
          </div>
        </header>

        <div className="space-y-4">{children}</div>

        <footer className="mt-8 text-center text-xs text-[#7a7066]">
          <Link href="/" className="font-medium text-[#4a423b] hover:text-[#2a2420]">
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
