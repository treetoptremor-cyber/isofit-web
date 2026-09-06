import type { Metadata } from "next";
import { Inter, Unbounded, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isofit.app"),
  title: "Isofit — Your workouts, working for you",
  description:
    "A clean workout logger, a machine fitness coach, and a community where the work speaks for itself. Launching on iOS October 1.",
  openGraph: {
    title: "Isofit — Your workouts, working for you",
    description:
      "A clean workout logger, a machine fitness coach, and a community where the work speaks for itself.",
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
      "A clean workout logger, a machine fitness coach, and a community where the work speaks for itself.",
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
      className={`h-full antialiased ${inter.variable} ${unbounded.variable} ${dmMono.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
