import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import HomeSocialImage from "@/components/marketing/home-social-image";
import { ALL_DOCS } from "@/content";
import { ogSlug } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_DOCS.map((doc) => ({ slug: ogSlug(doc.path) }));
}

const size = { width: 1200, height: 630 };

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = ALL_DOCS.find((candidate) => ogSlug(candidate.path) === slug);
  if (!doc) return new Response("Not found", { status: 404 });

  const [bold, medium, logo, bodyGraph] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/Unbounded-Bold.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/Unbounded-Medium.ttf")),
    readFile(join(process.cwd(), "public/iso-logo.png")),
    doc.path === "/" ? readFile(join(process.cwd(), "public/screenshots/body-graph.png")) : null,
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const minor = 40;

  return new ImageResponse(
    bodyGraph ? (
      <HomeSocialImage logoSrc={logoSrc} bodyGraphSrc={`data:image/png;base64,${bodyGraph.toString("base64")}`} />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#f3efe6",
          backgroundImage: `linear-gradient(rgba(106,165,238,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(106,165,238,0.28) 1px, transparent 1px)`,
          backgroundSize: `${minor}px ${minor}px`,
          color: "#2a2420",
          fontFamily: "Unbounded",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, color: "#6aa5ee", letterSpacing: -1 }}>Isofit</div>
        </div>
        <div style={{ display: "flex", fontSize: doc.h1.length > 60 ? 50 : 60, fontWeight: 700, lineHeight: 1.12, letterSpacing: -2, maxWidth: 1000 }}>
          {doc.h1}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, fontWeight: 500, color: "#4a423b" }}>
          <div style={{ display: "flex" }}>isofit.app{doc.path === "/" ? "" : doc.path}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["#8f9868", "#c2a55e", "#d48f56", "#b8623a", "#9a4527"].map((color) => (
              <div key={color} style={{ width: 34, height: 14, borderRadius: 7, backgroundColor: color }} />
            ))}
            <div style={{ display: "flex", marginLeft: 12 }}>iOS · {SITE.launchDateLong}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: bold, weight: 700, style: "normal" },
        { name: "Unbounded", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
