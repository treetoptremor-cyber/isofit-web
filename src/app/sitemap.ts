import type { MetadataRoute } from "next";

import { ALL_DOCS } from "@/content";
import { LEGAL_LINKS, SITE, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = new Date(`${SITE.factsReviewed}T00:00:00Z`);
  return [
    ...ALL_DOCS.map((doc) => ({
      url: absoluteUrl(doc.path),
      lastModified: reviewed,
      changeFrequency: "weekly" as const,
      priority: doc.path === "/" ? 1 : doc.path.split("/").length > 2 ? 0.7 : 0.8,
    })),
    ...LEGAL_LINKS.map((link) => ({
      url: absoluteUrl(link.href),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
