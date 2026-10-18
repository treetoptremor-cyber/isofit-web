import Link from "next/link";

import AppStoreLink from "@/components/marketing/app-store-link";
import LogoLockup from "@/components/marketing/logo-lockup";
import MobileMenu from "@/components/marketing/mobile-menu";
import WebAppLink from "@/components/marketing/web-app-link";
import { PRIMARY_NAV } from "@/lib/site";

export default function SiteHeader() {
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
          <nav aria-label="Main" className="hidden items-center gap-7 text-[0.9375rem] font-medium text-ink-2 lg:flex">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <WebAppLink compact />
            <AppStoreLink compact />
          </div>
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
