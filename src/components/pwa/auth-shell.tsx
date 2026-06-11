import Link from "next/link";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-8 text-[#2a2420] sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#4a423b]">
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <section className="rounded-3xl border border-[#2a2420]/10 bg-white p-6 shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-8">
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em]">{title}</h1>
          <p className="mt-2 text-sm text-[#4a423b]">{subtitle}</p>
          <div className="mt-6 space-y-4">{children}</div>
          <div className="mt-6 text-sm text-[#4a423b]">{footer}</div>
        </section>
      </div>
    </main>
  );
}
