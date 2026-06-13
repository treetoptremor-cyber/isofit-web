import Link from "next/link";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-6 text-[#2a2420] sm:px-5 sm:py-8 md:px-6">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#4a423b] sm:mb-6">
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <section className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-8">
          <h1 className="font-display text-[clamp(1.7rem,7vw,1.95rem)] font-bold tracking-[-0.02em]">{title}</h1>
          <p className="mt-2 text-sm text-[#4a423b]">{subtitle}</p>
          <div className="mt-5 space-y-4 sm:mt-6">{children}</div>
          <div className="mt-5 text-sm text-[#4a423b] sm:mt-6">{footer}</div>
        </section>
      </div>
    </main>
  );
}
