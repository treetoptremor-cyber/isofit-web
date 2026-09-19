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
  title: "Isofit — a workout logger for iPhone with a body graph and an AI coach",
  description:
    "Isofit is a workout logger for iPhone with a body-graph heatmap of the muscle regions your sets credited and an AI coach, Atlas, scoped to training questions. iOS launch planned for 1 October 2026.",
  openGraph: {
    title: "Isofit — a workout logger for iPhone with a body graph and an AI coach",
    description:
      "Isofit is a workout logger for iPhone with a body-graph heatmap of the muscle regions your sets credited and an AI coach, Atlas, scoped to training questions.",
    url: "/",
    siteName: "Isofit",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Isofit" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@isofit_app",
    title: "Isofit — a workout logger for iPhone with a body graph and an AI coach",
    description:
      "Isofit is a workout logger for iPhone with a body-graph heatmap of the muscle regions your sets credited and an AI coach, Atlas, scoped to training questions.",
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
