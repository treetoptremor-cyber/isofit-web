"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import WaitlistForm from "@/components/waitlist-form";

type Feature = {
  icon: "stopwatch" | "camera" | "brain" | "chart" | "body" | "calendar" | "program" | "mic";
  title: string;
  copy: string;
  color: string;
};

const FEATURES: Feature[] = [
  { icon: "stopwatch", color: "#69A5F0", title: "Quick Logger", copy: "Log any workout in seconds. Manual, voice, or tap-and-go." },
  { icon: "camera", color: "#b4583a", title: "Form Check", copy: "Film a lift. Get instant, actionable corrections from Atlas." },
  { icon: "brain", color: "#b4583a", title: "Atlas mfc", copy: "A coach that reads your data — not a chatbot with opinions." },
  { icon: "chart", color: "#69A5F0", title: "Progression", copy: "Track volume, PRs, and overload across every muscle group." },
  { icon: "body", color: "#3f5a32", title: "Body Graph", copy: "See what you're training — and what you're missing." },
  { icon: "calendar", color: "#3f5a32", title: "Streaks", copy: "Show up. Log it. Watch consistency compound into results." },
  { icon: "program", color: "#b4583a", title: "Periodization", copy: "Training plans shaped by your history, and personalized templates for ease and consistency." },
  { icon: "mic", color: "#69A5F0", title: "Voice Log", copy: "Say what you did. Atlas structures it for you." },
];

const PRIMARY_NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#coach", label: "The coach" },
  { href: "/log", label: "Workout Log" },
  { href: "/faq", label: "FAQ" },
  { href: "/info", label: "Info" },
] as const;

const VALUE_PROPS = [
  {
    id: "coach",
    title: "Atlas MFC - Machine Fitness Coach",
    copy:
      "Nine specialized training domains: from strength, cardio, and hypertrophy, to combat sports and recovery. A machine fitness coach that remembers you and adapts to your goals.",
    tone: "light",
  },
  {
    id: "iso",
    title: "$ISO - Earned, Never Given",
    copy:
      "There is no way to buy $ISO. The only way in is consistency: log your training, hold your streak, watch it compound. Then spend it on things that matter to you.",
    tone: "dark",
  },
  {
    id: "bonfire",
    title: "The Bonfire - Where Good Form Gets Famous",
    copy:
      "Share your workouts, your PRs, and your best lifts. The community votes, and the top posts become the form references everyone else learns from. When your post earns attention, it earns you $ISO too.",
    tone: "light",
  },
] as const;

function IsoLogo({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/iso-logo.png"
      alt="ISOfit"
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
        <p className="font-display text-xl font-bold leading-none tracking-tight text-[#69A5F0]">ISOfit</p>
        <p className="mt-px font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-[#7a7066]">Atlas MFC</p>
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
    case "brain":
      return <svg {...p}><path d="M14 6.5C12 4.5 8.5 5 8 8c-2.2.4-3 3-1.6 4.6C5 14.4 6 17.5 9 17.7 9.2 20 11.2 21.5 14 21V6.5z" {...s} /><path d="M14 6.5C16 4.5 19.5 5 20 8c2.2.4 3 3 1.6 4.6C23 14.4 22 17.5 19 17.7 18.8 20 16.8 21.5 14 21" {...s} /></svg>;
    case "chart":
      return <svg {...p}><path d="M4 24h20" {...s} /><rect x="6" y="14" width="3.5" height="8" rx="1" {...s} /><rect x="12.5" y="9" width="3.5" height="13" rx="1" {...s} /><rect x="19" y="5" width="3.5" height="17" rx="1" {...s} /></svg>;
    case "body":
      return <svg {...p}><circle cx="14" cy="6" r="2.6" {...s} /><path d="M14 9v8M14 12l-5-2M14 12l5-2M14 17l-3.5 6M14 17l3.5 6" {...s} /></svg>;
    case "calendar":
      return <svg {...p}><rect x="4" y="6" width="20" height="18" rx="3" {...s} /><path d="M4 11h20M9 3v5M19 3v5M10 17l2.5 2.5L18 14" {...s} /></svg>;
    case "program":
      return <svg {...p}><rect x="4" y="4" width="9" height="9" rx="2" {...s} /><rect x="15" y="4" width="9" height="9" rx="2" {...s} /><rect x="4" y="15" width="9" height="9" rx="2" {...s} /><rect x="15" y="15" width="9" height="9" rx="2" {...s} /></svg>;
    case "mic":
      return <svg {...p}><rect x="10.5" y="3" width="7" height="13" rx="3.5" {...s} /><path d="M6.5 13a7.5 7.5 0 0 0 15 0M14 20.5V25M10 25h8" {...s} /></svg>;
  }
}

export default function Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="relative text-[#2a2420]">
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
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-4 py-3 sm:px-5 md:px-8">
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
          <div className="hidden items-center gap-2 md:flex">
            <Link href="#waitlist-form" className="rounded-xl bg-[#67835a] px-4 py-2 font-display text-[13px] font-semibold text-white transition-colors hover:bg-[#5a7350]">
              Join the Waitlist
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-[#2a2420]/20 bg-white px-4 py-2 font-display text-[13px] font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
            >
              Login
            </Link>
          </div>
          <div className="relative md:hidden">
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex items-center gap-2 rounded-xl border border-[#2a2420]/20 bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#2a2420]"
            >
              Menu
              <span className={`text-sm leading-none transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`}>v</span>
            </button>
            {isMobileMenuOpen ? (
              <>
                <button
                  type="button"
                  aria-label="Close mobile menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-[#2a2420]/10"
                />
                <div
                  id="mobile-nav-panel"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(86vw,290px)] rounded-2xl border border-[#2a2420]/15 bg-white p-3 shadow-[0_20px_40px_rgba(42,36,32,0.15)]"
                >
                  <nav className="flex flex-col gap-1">
                    {PRIMARY_NAV_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="rounded-lg px-2 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#4a423b] hover:bg-[#f8f5ee]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link
                      href="#waitlist-form"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl bg-[#67835a] px-4 py-2 text-center font-display text-[13px] font-semibold text-white transition-colors hover:bg-[#5a7350]"
                    >
                      Join the Waitlist
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl border border-[#2a2420]/20 bg-white px-4 py-2 text-center font-display text-[13px] font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1180px] items-center gap-8 px-4 pb-4 pt-8 sm:px-5 md:grid-cols-2 md:gap-12 md:px-8 md:pt-12">
        <div className="order-2 md:order-2">
          <div className="mx-auto w-full max-w-[430px] md:max-w-[560px]">
            <Image
              src="/mockups/body-graph-phone.png"
              alt="ISOfit body graph phone mockup"
              width={576}
              height={1024}
              preload
              sizes="(max-width: 768px) 86vw, (max-width: 1200px) 42vw, 520px"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="order-1 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2420]/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4a423b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#69A5F0]" />
            ISOfit · workout tracker · made for iOS
          </div>
          <h1 className="mt-6 max-w-[920px] font-display text-[clamp(2.2rem,10vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#2a2420]">
            You already know how to train. You just <span className="text-[#69A5F0]">stop.</span>
          </h1>
          <p className="mt-5 max-w-[980px] text-base leading-relaxed text-[#4a423b] sm:text-lg">
            We care about the one variable that matters: whether or not you showed up. We designed a clean workout logger, a personal pocket fitness coach that knows your stats, a rewards currency that compounds with your consistency, and a community where proof of work speaks loudest.
          </p>
          <div className="mt-6 flex w-full max-w-[460px] flex-col gap-2.5 sm:flex-row">
            <Link
              href="#waitlist-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#67835a] px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5a7350]"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/log"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#2a2420]/15 bg-white px-5 font-display text-sm font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
            >
              Open Workout Log
            </Link>
          </div>
        </div>
      </section>

      <section id="waitlist" className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-5 md:px-8 md:py-12">
        <div className="rounded-3xl border border-[#2a2420]/10 bg-white p-4 shadow-[0_16px_40px_rgba(42,36,32,0.08)] sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a7066]">Get early access</p>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,6vw,2.4rem)] font-bold tracking-[-0.02em]">
            Start with consistency.
          </h2>
          <p className="mt-2 max-w-[720px] text-[15px] text-[#4a423b]">
            Join the waitlist to get launch access and be first in line for Atlas MFC, $ISO rewards, and The Bonfire.
          </p>
          <div className="mt-5">
            <WaitlistForm formId="waitlist-form" />
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-[#2a2420]/15 bg-[#fbf9f3]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <h2 className="max-w-[620px] font-display text-[clamp(1.9rem,7vw,3rem)] font-semibold leading-tight tracking-[-0.02em]">
            Value props that reward showing up.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {VALUE_PROPS.map((block) => {
              const isDark = block.tone === "dark";
              return (
                <article
                  id={block.id}
                  key={block.title}
                  className={`rounded-3xl border p-5 shadow-[0_14px_30px_rgba(42,36,32,0.07)] sm:p-6 ${
                    isDark
                      ? "border-[#2a2420]/10 bg-[#2a2420] text-[#f3efe6]"
                      : "border-[#2a2420]/10 bg-white text-[#2a2420]"
                  }`}
                >
                  <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.015em]">{block.title}</h3>
                  <p className={`mt-3 text-[15px] leading-7 ${isDark ? "text-[#f3efe6]/85" : "text-[#4a423b]"}`}>
                    {block.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <h2 className="mb-8 max-w-[520px] font-display text-2xl font-semibold leading-tight tracking-[-0.015em] sm:text-3xl md:mb-10 md:text-4xl">
          One app, many ways to train smarter.
        </h2>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]/60">Join the waitlist</p>
            <h2 className="mt-4 font-display text-[clamp(34px,5vw,56px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#f3efe6]">
              Start training with a <span className="text-[#69A5F0]">new coach</span> who understands the data.
            </h2>
            <p className="mt-4 max-w-[500px] text-[#f3efe6]/75">ISOfit is launching summer 2026. Be first in — no spam, just a heads-up when we launch.</p>
            <div className="mt-8">
              <WaitlistForm dark compact />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a2420]/15">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start gap-5 px-4 py-8 sm:px-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
          <LogoLockup />
          <div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/info">Info</Link>
          </div>
          <p className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066] md:text-right">© 2026 ISOfit · humbly designed in queens, NY</p>
        </div>
      </footer>
    </main>
  );
}
