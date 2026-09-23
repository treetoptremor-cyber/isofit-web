import Link from "next/link";

import { FEATURE_LINKS, LEGAL_LINKS, SITE } from "@/lib/site";
import { LogoLockup } from "@/components/marketing/site-header";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "All features" },
      ...FEATURE_LINKS,
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/compare", label: "Compare workout apps" },
      { href: "/faq", label: "FAQ" },
      { href: "/about", label: "About Isofit" },
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
  { heading: "Legal", links: LEGAL_LINKS },
] as const;

export default function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-10 md:py-12">
        <div className="col-span-2 md:col-span-1">
          <LogoLockup />
          <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink-2">
            A workout logger for iPhone with a muscle-by-muscle body graph and an AI coach.
          </p>
          <p className="label mt-5">
            iOS launch planned <time dateTime={SITE.launchDate}>{SITE.launchDateLong}</time>
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <p className="label">{column.heading}</p>
            <ul className="mt-3 grid gap-0.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="inline-flex min-h-11 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="label">© {SITE.founded} {SITE.company}, a {SITE.domicile} company · humbly designed in Queens, NY</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
            <a href={`mailto:${SITE.supportEmail}`} className="inline-flex min-h-11 items-center hover:text-ink">{SITE.supportEmail}</a>
            <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer me" className="inline-flex min-h-11 items-center hover:text-ink">X / Twitter</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
