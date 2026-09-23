import Image from "next/image";
import Link from "next/link";

import MobileMenu from "@/components/marketing/mobile-menu";
import { PRIMARY_NAV } from "@/lib/site";

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
      <header className="relative sticky top-0 z-[120] border-b border-rule bg-paper/90 backdrop-blur">
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
          <MobileMenu waitlistHref={waitlistHref} />
        </div>
      </header>
    </>
  );
}
