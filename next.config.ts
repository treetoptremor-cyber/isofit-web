import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product screenshots change rarely: smaller AVIF/WebP and a long optimizer cache cut repeat-visit transfer.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [{ source: "/atlas/squat/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] }];
  },
  // Pages from the pre-rebuild site that search results still list.
  async redirects() {
    return [
      { source: "/info", destination: "/features", permanent: true },
      { source: "/research", destination: "/features/body-graph", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // Markdown mirrors of the marketing pages: /pricing.md, /features/atlas.md, /index.md
      beforeFiles: [{ source: "/:path*.md", destination: "/md/:path*" }],
    };
  },
};

export default nextConfig;
