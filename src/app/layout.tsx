import type { Metadata, Viewport } from "next";
import { Unbounded } from "next/font/google";

import JsonLd from "@/components/marketing/json-ld";
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
    "A clean workout logger, an AI training guide, and a community where the work speaks for itself. iOS launch planned for October 1, 2026.",
  applicationName: SITE.name,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Isofit" }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.xHandle,
    images: ["/og.png"],
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
    url: SITE.url,
    logo: `${SITE.url}/iso-logo.png`,
    email: SITE.supportEmail,
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
