import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Markdown mirrors of the marketing pages: /pricing.md, /features/atlas.md, /index.md
      beforeFiles: [{ source: "/:path*.md", destination: "/md/:path*" }],
    };
  },
};

export default nextConfig;
