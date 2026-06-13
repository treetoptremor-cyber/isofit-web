import Link from "next/link";

export const metadata = {
  title: "Info | ISOfit",
  description: "Product information, philosophy, and launch details for ISOfit.",
};

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-8 text-[#2a2420] sm:px-5 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl space-y-4 sm:space-y-6">
        <section className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_18px_40px_rgba(42,36,32,0.08)] sm:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">ISOfit · Info</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,8vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Built for people who already know what to do, but need help doing it consistently.
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#4a423b] sm:text-base">
            ISOfit combines a clean workout logger, Atlas MFC coaching, and an earned rewards system into one mobile-first experience. Every feature is designed around one core question: did you show up?
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl bg-[#69A5F0] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5c94da]"
            >
              Back home
            </Link>
            <Link
              href="/faq"
              className="rounded-xl border border-[#2a2420]/15 bg-white px-4 py-2 font-display text-sm font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
            >
              Read FAQ
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-[#2a2420]/15 bg-white px-4 py-2 font-display text-sm font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
            >
              Login
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_14px_30px_rgba(42,36,32,0.07)]">
            <h2 className="font-display text-xl font-semibold tracking-[-0.015em]">Atlas MFC</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#4a423b]">
              Machine Fitness Coach with domain-specific context. It remembers your history and adapts recommendations to your training goals.
            </p>
          </article>
          <article className="rounded-3xl border border-[#2a2420]/10 bg-[#2a2420] p-5 text-[#f3efe6] shadow-[0_14px_30px_rgba(42,36,32,0.07)]">
            <h2 className="font-display text-xl font-semibold tracking-[-0.015em]">$ISO</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#f3efe6]/85">
              Earned, never bought. Consistency and streaks unlock value over time and create a direct relationship between training and rewards.
            </p>
          </article>
          <article className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_14px_30px_rgba(42,36,32,0.07)]">
            <h2 className="font-display text-xl font-semibold tracking-[-0.015em]">The Bonfire</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#4a423b]">
              A proof-of-work community where quality training posts rise through voting and help define form standards for everyone else.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_14px_30px_rgba(42,36,32,0.07)] sm:p-7">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.015em]">Launch notes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[#4a423b]">
            <li>Primary surface is mobile-first with fast workout logging and quick session review.</li>
            <li>Atlas MFC will support multiple training domains from day one, with broader specialization added over time.</li>
            <li>$ISO is tied to consistency mechanics and designed to compound through participation.</li>
            <li>The Bonfire will highlight best-in-class lifts and training posts based on community proof.</li>
          </ul>
          <p className="mt-4 text-sm text-[#7a7066]">
            Questions about privacy or data handling? Read the{" "}
            <Link href="/privacy" className="font-semibold text-[#2d6cb8] hover:text-[#69A5F0]">
              privacy policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
