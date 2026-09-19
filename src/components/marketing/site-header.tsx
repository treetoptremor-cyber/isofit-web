import Image from "next/image";
import Link from "next/link";

export const SHELL = "mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-10";

export function LogoLockup({ size = 32 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image src="/iso-logo.png" alt="" width={size} height={size} priority className="shrink-0" />
      <span className="font-display text-xl font-bold leading-none tracking-tight text-[#2a2420]">Isofit</span>
    </span>
  );
}

const NAV = [
  { href: "#what-it-is", label: "What it is" },
  { href: "#logging", label: "Logging" },
  { href: "#atlas", label: "Atlas" },
  { href: "#body-graph", label: "Body Graph" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[120] border-b border-[#2a2420]/15 bg-[#f3efe6]/92 backdrop-blur">
      <div className={`${SHELL} flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2.5`}>
        <Link href="/" aria-label="Isofit home" className="shrink-0">
          <LogoLockup />
        </Link>

        <nav
          aria-label="Page sections"
          className="hidden items-center gap-6 font-mono text-[0.8125rem] tracking-[0.02em] text-[#4a423b] lg:flex"
        >
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden min-w-0 flex-wrap items-center justify-end gap-2 sm:flex lg:ml-0">
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#2a2420]/30 px-3.5 text-sm font-semibold text-[#2a2420] transition-colors hover:bg-[#faf8f3]"
          >
            Account &amp; billing
          </Link>
          <a
            href="#waitlist"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#245c9b] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1d4a7d]"
          >
            Join the waitlist
          </a>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-md px-2 font-mono text-xs uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Sections"
            className="absolute right-0 top-full z-50 mt-2 grid min-w-56 rounded-md border border-[#2a2420]/20 bg-[#f3efe6] p-2 shadow-lg"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded px-3 font-mono text-sm hover:bg-white/70"
              >
                {item.label}
              </a>
            ))}
            <a href="#waitlist" className="flex min-h-11 items-center rounded px-3 text-sm font-semibold hover:bg-white/70">
              Join the waitlist
            </a>
            <Link href="/login" className="flex min-h-11 items-center rounded px-3 text-sm hover:bg-white/70">
              Account &amp; billing
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
