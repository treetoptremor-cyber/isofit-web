import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISOfit — Your workouts, working for you",
  description: "Log it. Track it. Own it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}