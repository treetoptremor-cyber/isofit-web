import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
