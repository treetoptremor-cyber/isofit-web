import { ABOUT_DOC } from "@/content/about";
import { COMPARE_DOC, VERSUS_DOCS } from "@/content/compare";
import { FAQ_DOC } from "@/content/faq";
import { ATLAS_DOC, BODY_GRAPH_DOC, BONFIRE_DOC, FEATURES_DOC, LOGGING_DOC } from "@/content/features";
import { HOME_DOC } from "@/content/home";
import { PRICING_DOC } from "@/content/pricing";
import type { PageDoc } from "@/content/types";

export { HOME_DOC };

// Order here is the order in llms.txt, llms-full.txt and the sitemap.
export const ALL_DOCS: PageDoc[] = [
  HOME_DOC,
  FEATURES_DOC,
  LOGGING_DOC,
  BODY_GRAPH_DOC,
  ATLAS_DOC,
  BONFIRE_DOC,
  PRICING_DOC,
  COMPARE_DOC,
  ...VERSUS_DOCS,
  FAQ_DOC,
  ABOUT_DOC,
];

export const DOCS_BY_PATH: Record<string, PageDoc> = Object.fromEntries(ALL_DOCS.map((doc) => [doc.path, doc]));
