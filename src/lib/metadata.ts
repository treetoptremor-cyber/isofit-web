import type { Metadata } from "next";

import type { PageDoc } from "@/content/types";
import { mirrorPath } from "@/lib/markdown";
import { SITE } from "@/lib/site";

export const HOME_SOCIAL_HEADLINE = ["Log your workouts.", "See the muscles", "you’re training."] as const;
export const HOME_SOCIAL_IMAGE = {
  url: "/og/home?v=3",
  width: 1200,
  height: 630,
  alt: "Isofit: Log your workouts. See the muscles you’re training. Log by tap, text or voice and get guidance from Atlas, your AI coach. Front and back muscle maps show where your working sets go.",
};

export function ogSlug(path: string) {
  return path === "/" ? "home" : path.slice(1).replace(/\//g, "--");
}

export function docMetadata(doc: PageDoc): Metadata {
  const isHome = doc.path === "/";
  const image = isHome ? HOME_SOCIAL_IMAGE : { url: `/og/${ogSlug(doc.path)}`, width: 1200, height: 630, alt: doc.h1 };
  const socialTitle = isHome ? `${HOME_SOCIAL_HEADLINE.join(" ")} | Isofit` : doc.metaTitle;
  const socialDescription = isHome
    ? "Log workouts by tap, text or voice. See which muscles you train and get guidance from Atlas, your AI coach. Built for iPhone."
    : doc.metaDescription;
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
