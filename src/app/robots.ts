import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

// Account, billing and auth surfaces carry nothing worth indexing.
const PRIVATE_PATHS = [
  "/api/",
  "/auth/",
  "/billing",
  "/checkout/",
  "/iso-sync/",
  "/login",
  "/signup",
  "/forgot-password",
  "/update-password",
  "/waitlist/",
];

// Named explicitly so the policy is unambiguous: assistants and their search
// indexes are welcome to read and cite the public pages.
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_AGENTS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
