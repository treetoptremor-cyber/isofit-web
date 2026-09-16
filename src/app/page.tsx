import Image from "next/image";
import Link from "next/link";

import RecoveryRedirect from "@/components/recovery-redirect";
import ScreenshotCarousel from "@/components/screenshot-carousel";
import WaitlistForm from "@/components/waitlist-form";

const PRIMARY_NAV_LINKS = [{ href: "/faq", label: "FAQ" }] as const;

function IsoLogo({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/iso-logo.png"
      alt="Isofit"
      width={size}
      height={size}
      loading="eager"
      className="shrink-0"
    />
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5">
      <IsoLogo size={34} />
      <p className="font-display text-xl font-bold leading-none tracking-tight text-sky">Isofit</p>
    </div>
  );
}

function ChalkGridBG({ id, opacity = 1 }: { id: string; opacity?: number }) {
  const minor = 26;
  return (
    <svg
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      <defs>
        <pattern id={`${id}-minor`} width={minor} height={minor} patternUnits="userSpaceOnUse">
          <line x1="0" y1={minor} x2={minor} y2={minor} stroke="var(--color-sky)" strokeWidth="1" opacity="0.5" />
          <line x1={minor} y1="0" x2={minor} y2={minor} stroke="var(--color-sky)" strokeWidth="1" opacity="0.5" />
        </pattern>
        <pattern id={`${id}-major`} width={minor * 5} height={minor * 5} patternUnits="userSpaceOnUse">
          <line x1="0" y1={minor * 5} x2={minor * 5} y2={minor * 5} stroke="#2d6cb8" strokeWidth="1.5" opacity="0.8" />
          <line x1={minor * 5} y1="0" x2={minor * 5} y2={minor * 5} stroke="#2d6cb8" strokeWidth="1.5" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#f3efe6" />
      <rect width="100%" height="100%" fill={`url(#${id}-minor)`} />
      <rect width="100%" height="100%" fill={`url(#${id}-major)`} />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="relative text-[#2a2420]">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[200] rounded-xl bg-white px-4 py-3 font-semibold text-[#245c9b] focus:not-sr-only">Skip to content</a>
      <RecoveryRedirect />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
          maskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
        }}
      >
        <ChalkGridBG id="page-grid" opacity={0.2} />
      </div>
      <header className="sticky top-0 z-[120] border-b border-[#2a2420]/15 bg-[#f3efe6]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between gap-3 px-4 py-2 sm:px-5 sm:py-3 md:px-8">
          <div className="shrink-0">
            <LogoLockup />
          </div>
          <nav aria-label="Main navigation" className="hidden items-center gap-6 font-mono text-sm font-medium text-[#4a423b] md:flex">
            {PRIMARY_NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center">
                {item.label}
              </Link>
            ))}
            <a href="mailto:support@isofit.app" className="inline-flex min-h-11 items-center">Support</a>
          </nav>
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="#waitlist-form"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#526b46] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#435b38] sm:px-4"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#2a2420]/20 bg-transparent px-3 py-2 text-sm font-semibold text-[#2a2420] transition-colors hover:bg-[#f8f5ee] sm:px-4"
            >
              Member login
            </Link>
          </div>
          <details className="relative md:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-lg px-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-full mt-2 grid min-w-48 rounded-xl border border-[#2a2420]/15 bg-[#f3efe6] p-2 text-sm shadow-lg">
              <Link href="/faq" className="flex min-h-11 items-center rounded-lg px-3 font-mono hover:bg-white/60">FAQ</Link>
              <a href="mailto:support@isofit.app" className="flex min-h-11 items-center rounded-lg px-3 font-mono hover:bg-white/60">Support</a>
              <Link href="/login" className="flex min-h-11 items-center rounded-lg px-3 hover:bg-white/60">Member login</Link>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="scroll-mt-20">
        <section aria-labelledby="hero-heading" className="mx-auto grid w-full max-w-[1080px] gap-x-4 gap-y-2 px-4 pb-10 pt-5 sm:px-5 sm:pt-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_27.75rem] lg:items-center lg:pb-14 lg:pt-4">
          <div className="flex min-w-0 flex-col">
            <p className="order-0 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.04em] text-[#4a423b]">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#526b46]" />
              Workout tracking for iOS
            </p>
            <h1 id="hero-heading" className="order-1 mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] lg:mt-5">
              <span className="block text-black">
                Your workout log remembers, but…
              </span>
              <span className="mt-2 block max-w-[640px] text-sky">
                What does it tell you?
              </span>
            </h1>
            <p className="order-2 mt-5 max-w-[600px] text-base leading-relaxed text-[#4a423b] sm:text-lg">
              See which muscles you’ve trained, how your workouts add up, and what to consider next—with Atlas using your training history to guide the conversation.
            </p>
            <div className="order-3 mt-5 lg:mt-6">
              <WaitlistForm formId="waitlist-form" />
              <p className="mt-2 font-mono text-xs leading-5 text-[#6c6259]">iOS launch planned <time dateTime="2026-10-01" className="tabular-nums">October 1, 2026</time>.</p>
            </div>
          </div>
          <ScreenshotCarousel />
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-4 pb-14 sm:px-5 md:px-8 md:pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#2a2420] p-6 sm:p-8 md:p-14">
            <div className="absolute inset-0 opacity-40">
              <ChalkGridBG id="payoff-grid" opacity={0.32} />
            </div>
            <div className="absolute inset-0" style={{ background: "radial-gradient(90% 120% at 100% 0%, rgba(106,165,238,0.2), transparent 55%)" }} />
            <div className="relative max-w-[620px]">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#f3efe6]/85">Launch planned October 1, 2026</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                Your workouts,<br /><span className="text-sky">working for you.</span>
              </h2>
              <p className="mt-4 max-w-[500px] font-sans text-[#f3efe6]/90">Isofit is planned to launch on iOS <time dateTime="2026-10-01">October 1, 2026</time>. Join the waitlist and be first in.</p>
              <div className="mt-8">
                <Link
                  href="#waitlist-form"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#526b46] px-6 text-base font-semibold text-white transition-colors hover:bg-[#435b38]"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-[#2a2420]/15">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col items-start gap-5 px-4 py-8 sm:px-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
          <LogoLockup />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm uppercase tracking-[0.12em] text-[#6c6259]">
            <a href="mailto:support@isofit.app" className="inline-flex min-h-11 items-center">Support</a>
            <Link href="/terms" className="inline-flex min-h-11 items-center">Terms of Service</Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center">Privacy Policy</Link>
            <Link href="/health-privacy" className="inline-flex min-h-11 items-center">Consumer Health Data Privacy Policy</Link>
            <Link href="/research" className="inline-flex min-h-11 items-center">Research</Link>
            <Link href="/faq" className="inline-flex min-h-11 items-center">FAQ</Link>
            <a className="inline-flex min-h-11 items-center" href="https://x.com/isofit_app" target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
          </div>
          <p className="text-left font-mono text-xs uppercase tracking-[0.12em] text-[#6c6259] md:text-right">© 2026 Isofit · humbly designed in queens, NY</p>
        </div>
      </footer>
    </div>
  );
}
