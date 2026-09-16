import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isofit.app"),
  title: "Isofit — Your workouts, working for you",
  description:
    "A clean workout logger, an AI training guide, and a community where the work speaks for itself. iOS launch planned for October 1, 2026.",
  openGraph: {
    title: "Isofit — Your workouts, working for you",
    description:
      "A clean workout logger, an AI training guide, and a community where the work speaks for itself.",
    url: "/",
    siteName: "Isofit",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Isofit" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@isofit_app",
    title: "Isofit — Your workouts, working for you",
    description:
      "A clean workout logger, an AI training guide, and a community where the work speaks for itself.",
    images: ["/og.png"],
  },
};

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
