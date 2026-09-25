import type { Metadata, Viewport } from "next";
import { Unbounded } from "next/font/google";

import JsonLd from "@/components/marketing/json-ld";
import { HOME_SOCIAL_IMAGE } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

// Marketing pages override all of this through docMetadata(); these are the
// defaults for account, billing and legal routes.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Isofit: workout logger for iPhone", template: "%s" },
  description:
    "Isofit is a workout logger for iPhone with a muscle-by-muscle body graph, an AI coach called Atlas, and a members-only community. iOS launch planned for October 1, 2026.",
  applicationName: SITE.name,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [HOME_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.xHandle,
    images: [HOME_SOCIAL_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
};

// Site-wide entities. Pages refer to these by @id instead of repeating them.
const SITE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.company,
    url: SITE.url,
    logo: `${SITE.url}/iso-logo.png`,
    description: "Isofit ltd. publishes Isofit, a workout logger for iPhone with a muscle-by-muscle body graph, an AI coach and a members-only community.",
    email: SITE.supportEmail,
    founder: {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: SITE.founder.name,
      jobTitle: "Founder",
      url: `${SITE.url}/about#team`,
      image: `${SITE.url}${SITE.founder.photo}`,
      sameAs: [SITE.founder.linkedInUrl, SITE.founder.xUrl],
      alumniOf: SITE.founder.schools.map((name) => ({ "@type": "CollegeOrUniversity", name })),
    },
    address: { "@type": "PostalAddress", addressRegion: "PA", addressCountry: "US" },
    sameAs: [SITE.xUrl],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE.url}/#organization` },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${unbounded.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={SITE_JSON_LD} />
        {children}
      </body>
    </html>
  );
}
