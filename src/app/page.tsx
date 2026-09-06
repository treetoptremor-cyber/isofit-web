import Image from "next/image";
import Link from "next/link";

import RecoveryRedirect from "@/components/recovery-redirect";
import WaitlistForm from "@/components/waitlist-form";

type Feature = {
  icon: "stopwatch" | "camera" | "chart" | "body" | "calendar" | "program";
  title: string;
  copy: string;
  color: string;
};

const FEATURES: Feature[] = [
  { icon: "stopwatch", color: "#69A5F0", title: "Quick Logger", copy: "Log any workout in seconds. Manual, voice, or tap-and-go." },
  { icon: "camera", color: "#b4583a", title: "Form Check", copy: "Film a lift. Get instant, actionable corrections from Atlas." },
  { icon: "chart", color: "#69A5F0", title: "Progression", copy: "Track volume, PRs, and overload across every muscle group." },
  { icon: "body", color: "#3f5a32", title: "Body Graph", copy: "See what you're training — and what you're missing." },
  { icon: "calendar", color: "#3f5a32", title: "Streaks", copy: "Show up. Log it. Watch consistency compound into results." },
  { icon: "program", color: "#b4583a", title: "Periodization", copy: "Training plans shaped by your history, and personalized templates for ease and consistency." },
];

const PRIMARY_NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "/faq", label: "FAQ" },
] as const;

const VALUE_PROPS = [
  {
    title: "Atlas mfc - Machine Fitness Coach",
    copy:
      "Nine specialized training domains: from strength, cardio, and hypertrophy, to combat sports and recovery. A machine fitness coach that remembers you and adapts to your goals.",
  },
  {
    title: "The Bonfire - Where Good Form Gets Famous",
    copy:
      "Share your workouts, your PRs, and your best lifts. The community votes, and the top posts become the form references everyone else learns from.",
  },
] as const;

function IsoLogo({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/iso-logo.png"
      alt="Isofit"
      width={size}
      height={size}
      priority
      className="shrink-0"
    />
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5">
      <IsoLogo size={34} />
      <div className="leading-none">
        <p className="font-display text-xl font-bold leading-none tracking-tight text-[#69A5F0]">Isofit</p>
        <p className="mt-px font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-[#7a7066]">Atlas mfc</p>
      </div>
    </div>
  );
}

function ChalkGridBG({ opacity = 1 }: { opacity?: number }) {
  const minor = 26;
  return (
    <svg
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      <defs>
        <pattern id="isoGridMinor" width={minor} height={minor} patternUnits="userSpaceOnUse">
          <line x1="0" y1={minor} x2={minor} y2={minor} stroke="#69A5F0" strokeWidth="1" opacity="0.5" />
          <line x1={minor} y1="0" x2={minor} y2={minor} stroke="#69A5F0" strokeWidth="1" opacity="0.5" />
        </pattern>
        <pattern id="isoGridMajor" width={minor * 5} height={minor * 5} patternUnits="userSpaceOnUse">
          <line x1="0" y1={minor * 5} x2={minor * 5} y2={minor * 5} stroke="#2d6cb8" strokeWidth="1.5" opacity="0.8" />
          <line x1={minor * 5} y1="0" x2={minor * 5} y2={minor * 5} stroke="#2d6cb8" strokeWidth="1.5" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#f3efe6" />
      <rect width="100%" height="100%" fill="url(#isoGridMinor)" />
      <rect width="100%" height="100%" fill="url(#isoGridMajor)" />
    </svg>
  );
}

function FeatureIcon({ kind, color }: { kind: Feature["icon"]; color: string }) {
  const s = { stroke: color, strokeWidth: 1.7, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const p = { width: 24, height: 24, viewBox: "0 0 28 28", "aria-hidden": true } as const;
  switch (kind) {
    case "stopwatch":
      return <svg {...p}><circle cx="14" cy="16" r="9" {...s} /><path d="M14 16V11M14 7V4M11 4h6M22 9l1.5-1.5" {...s} /></svg>;
    case "camera":
      return <svg {...p}><rect x="3" y="8" width="22" height="15" rx="3" {...s} /><circle cx="14" cy="15.5" r="4.5" {...s} /><path d="M10 8l1.6-2.6h4.8L18 8" {...s} /></svg>;
    case "chart":
      return <svg {...p}><path d="M4 24h20" {...s} /><rect x="6" y="14" width="3.5" height="8" rx="1" {...s} /><rect x="12.5" y="9" width="3.5" height="13" rx="1" {...s} /><rect x="19" y="5" width="3.5" height="17" rx="1" {...s} /></svg>;
    case "body":
      return <svg {...p}><circle cx="14" cy="6" r="2.6" {...s} /><path d="M14 9v8M14 12l-5-2M14 12l5-2M14 17l-3.5 6M14 17l3.5 6" {...s} /></svg>;
    case "calendar":
      return <svg {...p}><rect x="4" y="6" width="20" height="18" rx="3" {...s} /><path d="M4 11h20M9 3v5M19 3v5M10 17l2.5 2.5L18 14" {...s} /></svg>;
    case "program":
      return <svg {...p}><rect x="4" y="4" width="9" height="9" rx="2" {...s} /><rect x="15" y="4" width="9" height="9" rx="2" {...s} /><rect x="4" y="15" width="9" height="9" rx="2" {...s} /><rect x="15" y="15" width="9" height="9" rx="2" {...s} /></svg>;
  }
}

export default function Page() {
  return (
    <main className="relative text-[#2a2420]">
      <RecoveryRedirect />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
          maskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
        }}
      >
        <ChalkGridBG opacity={0.4} />
      </div>
      <header className="sticky top-0 z-[120] border-b border-[#2a2420]/15 bg-[#f3efe6]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8">
          <div className="shrink-0">
            <LogoLockup />
          </div>
          <nav className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4a423b] md:flex">
            {PRIMARY_NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="#waitlist-form"
              className="rounded-xl bg-[#67835a] px-3 py-2 font-display text-[12px] font-semibold text-white transition-colors hover:bg-[#5a7350] sm:px-4 sm:text-[13px]"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-[#2a2420]/20 bg-white px-3 py-2 font-display text-[12px] font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee] sm:px-4 sm:text-[13px]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-10 pt-8 sm:px-5 md:px-8 md:pb-14 md:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2420]/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4a423b]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#69A5F0]" />
          Workout app · designed for iOS · launching October 1
        </div>
        <h1 className="mt-6 max-w-[920px] font-display text-[clamp(2.2rem,10vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#2a2420]">
          You <span className="text-[#69A5F0]">log workouts</span>. Then what?
        </h1>
        <p className="mt-5 max-w-[860px] text-base leading-relaxed text-[#4a423b] sm:text-lg">
          Log any session in seconds. Atlas — your machine fitness coach — reads every rep, spots what&apos;s missing, and shapes what comes next. Your history stops being a diary and starts being a plan.
        </p>
        <div className="mt-7">
          <WaitlistForm formId="waitlist-form" />
        </div>
      </section>

      <section id="features" className="border-y border-[#2a2420]/15 bg-[#fbf9f3]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <h2 className="max-w-[620px] font-display text-[clamp(1.9rem,7vw,3rem)] font-semibold leading-tight tracking-[-0.02em]">
            More than a logger.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {VALUE_PROPS.map((block) => (
              <article
                key={block.title}
                className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 text-[#2a2420] shadow-[0_14px_30px_rgba(42,36,32,0.07)] sm:p-6"
              >
                <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.015em]">{block.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#4a423b]">{block.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <h2 className="mb-8 max-w-[520px] font-display text-2xl font-semibold leading-tight tracking-[-0.015em] sm:text-3xl md:mb-10 md:text-4xl">
          One app, many ways to train smarter.
        </h2>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2a2420]/10 bg-white shadow-[0_1px_0_rgba(42,36,32,0.04)]">
                <FeatureIcon kind={f.icon} color={f.color} />
              </div>
              <h3 className="font-display text-base font-semibold">{f.title}</h3>
              <p className="text-sm text-[#4a423b]">{f.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#2a2420] p-6 sm:p-8 md:p-14">
          <div className="absolute inset-0 opacity-40">
            <ChalkGridBG opacity={0.32} />
          </div>
          <div className="absolute inset-0" style={{ background: "radial-gradient(90% 120% at 100% 0%, rgba(105,165,240,0.2), transparent 55%)" }} />
          <div className="relative max-w-[620px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]/60">Launching October 1</p>
            <h2 className="mt-4 font-display text-[clamp(34px,5vw,56px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#f3efe6]">
              Start training with a <span className="text-[#69A5F0]">new coach</span> who understands the data.
            </h2>
            <p className="mt-4 max-w-[500px] text-[#f3efe6]/75">Isofit lands on iOS October 1. Join the waitlist and be first in.</p>
            <div className="mt-8">
              <Link
                href="#waitlist-form"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#67835a] px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5a7350]"
              >
                Join the Waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a2420]/15">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start gap-5 px-4 py-8 sm:px-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
          <LogoLockup />
          <div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
            <a href="https://x.com/isofit_app" target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
          </div>
          <p className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066] md:text-right">© 2026 Isofit · humbly designed in queens, NY</p>
        </div>
      </footer>
    </main>
  );
}
