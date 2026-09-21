import type { Metadata } from "next";

import type { PageDoc } from "@/content/types";
import { mirrorPath } from "@/lib/markdown";
import { SITE } from "@/lib/site";

export function ogSlug(path: string) {
  return path === "/" ? "home" : path.slice(1).replace(/\//g, "--");
}

export function docMetadata(doc: PageDoc): Metadata {
  const image = { url: `/og/${ogSlug(doc.path)}`, width: 1200, height: 630, alt: doc.h1 };
  return {
    // `absolute` skips the layout's "%s | Isofit" template; metaTitle already carries the brand.
    title: { absolute: doc.metaTitle },
    description: doc.metaDescription,
    alternates: {
      canonical: doc.path,
      types: { "text/markdown": mirrorPath(doc.path) },
    },
    openGraph: {
      title: doc.metaTitle,
      description: doc.metaDescription,
      url: doc.path,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.xHandle,
      title: doc.metaTitle,
      description: doc.metaDescription,
      images: [image.url],
    },
  };
}
