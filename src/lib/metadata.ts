import type { Metadata } from "next";

import type { PageDoc } from "@/content/types";
import { mirrorPath } from "@/lib/markdown";
import { SITE } from "@/lib/site";

export const HOME_SOCIAL_HEADLINE = ["Put your workouts", "to work."] as const;
export const HOME_SOCIAL_IMAGE = {
  url: "/og/home?v=4",
  width: 1200,
  height: 630,
  alt: "Isofit: Put your workouts to work. Log by tap, text or voice and meet Atlas, your personal AI fitness coach. Front and back muscle maps show where your working sets go. Coming soon to iPhone and the web.",
};

export function ogSlug(path: string) {
  return path === "/" ? "home" : path.slice(1).replace(/\//g, "--");
}

export function docMetadata(doc: PageDoc): Metadata {
  const isHome = doc.path === "/";
  const image = isHome ? HOME_SOCIAL_IMAGE : { url: `/og/${ogSlug(doc.path)}`, width: 1200, height: 630, alt: doc.h1 };
  const socialTitle = isHome ? `${HOME_SOCIAL_HEADLINE.join(" ")} | Isofit` : doc.metaTitle;
  const socialDescription = doc.metaDescription;
  return {
    // `absolute` skips the layout's "%s | Isofit" template; metaTitle already carries the brand.
    title: { absolute: doc.metaTitle },
    description: doc.metaDescription,
    alternates: {
      canonical: doc.path,
      types: { "text/markdown": mirrorPath(doc.path) },
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: doc.path,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.xHandle,
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
