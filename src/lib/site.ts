// Single source for facts that appear in page copy, metadata, JSON-LD, llms.txt
// and the markdown mirrors. Change a fact here and every surface follows.

export const SITE = {
  name: "Isofit",
  url: "https://isofit.app",
  supportEmail: "support@isofit.app",
  privacyEmail: "privacy@isofit.app",
  xHandle: "@isofit_app",
  xUrl: "https://x.com/isofit_app",
  madeIn: "Queens, New York",
  company: "Isofit ltd.",
  // Where Isofit ltd. is domiciled. The app is designed in madeIn.
  domicile: "Pennsylvania",
  founded: "2026",
  founder: {
    name: "An Hu",
    linkedInUrl: "https://www.linkedin.com/in/an-hu/",
    xHandle: "@treetoptremor",
    xUrl: "https://x.com/treetoptremor",
    photo: "/team/an-hu-portrait.jpg",
    schools: ["Parsons School of Design, The New School", "Baruch College, Zicklin School of Business"],
  },
  supportResponse: "within 2 business days",
  launchDate: "2026-10-01",
  launchDateLong: "October 1, 2026",
  // Bump when product facts on the marketing pages are re-verified.
  factsReviewed: "2026-09-22",
  factsReviewedLong: "September 22, 2026",
} as const;

export const FEATURE_LINKS = [
  { href: "/features/workout-logging", label: "Workout logging", short: "Log" },
  { href: "/features/body-graph", label: "Body graph", short: "Progress" },
  { href: "/features/atlas", label: "Atlas AI coach", short: "Atlas" },
  { href: "/features/bonfire", label: "Bonfire community", short: "Bonfire" },
] as const;

export const PRIMARY_NAV = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compare", label: "Compare" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
] as const;

export const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/health-privacy", label: "Consumer Health Data Privacy Policy" },
] as const;

export function absoluteUrl(path: string) {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}
