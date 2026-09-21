import Image from "next/image";
import Link from "next/link";

import { FEATURE_LINKS, PRIMARY_NAV, SITE } from "@/lib/site";

export function LogoLockup() {
  return (
    <Link href="/" aria-label="Isofit home" className="flex min-h-11 items-center gap-2.5">
      <Image src="/iso-logo.png" alt="" width={34} height={34} loading="eager" className="shrink-0" />
      <span className="font-display text-xl font-bold leading-none tracking-tight text-sky">Isofit</span>
    </Link>
  );
}

export default function SiteHeader({ waitlistHref = "/#waitlist" }: { waitlistHref?: string }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[200] rounded-xl bg-white px-4 py-3 font-semibold text-blue focus:not-sr-only"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-[120] border-b border-rule bg-paper/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-2.5">
          <LogoLockup />
          <nav aria-label="Main" className="hidden items-center gap-7 text-[0.9375rem] font-medium text-ink-2 md:flex">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/login" className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink">
              Log in
            </Link>
            <Link
              href={waitlistHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-forest px-4 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-forest-dark"
            >
              Join the waitlist
            </Link>
          </div>
          <details className="relative md:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-lg px-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-full mt-2 grid w-64 rounded-2xl border border-rule bg-paper p-2 text-[0.9375rem] shadow-[0_18px_40px_rgba(42,36,32,0.16)]"
            >
              {PRIMARY_NAV.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center rounded-lg px-3 font-medium hover:bg-white/70">
                    {item.label}
                  </Link>
                  {item.href === "/features"
                    ? FEATURE_LINKS.map((feature) => (
                        <Link key={feature.href} href={feature.href} className="flex min-h-10 items-center rounded-lg pl-7 pr-3 text-ink-2 hover:bg-white/70">
                          {feature.label}
                        </Link>
                      ))
                    : null}
                </div>
              ))}
              <hr className="my-2 border-rule" />
              <Link href="/login" className="flex min-h-11 items-center rounded-lg px-3 font-medium hover:bg-white/70">
                Log in
              </Link>
              <Link href={waitlistHref} className="mt-1 flex min-h-11 items-center justify-center rounded-xl bg-forest px-3 font-semibold text-white">
                Join the waitlist
              </Link>
              <p className="label px-3 pb-1 pt-3">iOS · {SITE.launchDateLong}</p>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
