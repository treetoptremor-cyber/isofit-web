import Link from "next/link";

import { LogoLockup, SHELL } from "./site-header";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#2a2420]/15 bg-[#f3efe6] text-[#2a2420]">
      <div className={`${SHELL} flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between`}>
        <LogoLockup />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.14em] text-[#6c6259]">
          <a href="mailto:support@isofit.app" className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
            Support
          </a>
          <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
            Terms of Service
          </Link>
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
            Privacy Policy
          </Link>
          <Link href="/health-privacy" className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
            Consumer Health Data Privacy Policy
          </Link>
          <Link href="/research" className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
            Research
          </Link>
          <Link href="/faq" className="inline-flex min-h-11 items-center hover:text-[#245c9b]">
            FAQ
          </Link>
          <a
            className="inline-flex min-h-11 items-center hover:text-[#245c9b]"
            href="https://x.com/isofit_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter
          </a>
        </div>
        <p className="font-mono text-xs uppercase leading-5 tracking-[0.14em] text-[#6c6259] md:text-right">
          © 2026 Isofit · humbly designed in queens, NY
        </p>
      </div>
    </footer>
  );
}
