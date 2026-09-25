import { HOME_SOCIAL_HEADLINE } from "@/lib/metadata";

const PHI = (1 + Math.sqrt(5)) / 2;
const WIDTH = 1200;
const HEIGHT = 630;
// Golden section: 61.8% copy, 38.2% imagery. The portrait frame is also 1:φ.
const COPY_WIDTH = WIDTH / PHI;
const ART_WIDTH = WIDTH - COPY_WIDTH;
const FRAME_WIDTH = 340;
const FRAME_HEIGHT = FRAME_WIDTH * PHI;
const HEAT_COLORS = ["#cfc3a4", "#8f9868", "#c2a55e", "#d48f56", "#b8623a", "#9a4527"];

// This is rendered by next/og: use its supported flex/absolute CSS subset.
export default function HomeSocialImage({ logoSrc, bodyGraphSrc }: { logoSrc: string; bodyGraphSrc: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", backgroundColor: "#f3efe6", color: "#2a2420", fontFamily: "Unbounded" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: COPY_WIDTH, height: HEIGHT, display: "flex", backgroundImage: "linear-gradient(rgba(106,165,238,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(106,165,238,0.10) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* The color field repeats the golden section vertically. */}
      <div style={{ position: "absolute", top: 0, left: COPY_WIDTH, width: ART_WIDTH, height: HEIGHT, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: HEIGHT / PHI, backgroundColor: "#6aa5ee" }} />
        <div style={{ display: "flex", flex: 1, backgroundColor: "#b8623a" }} />
      </div>

      <div style={{ position: "absolute", top: 48, left: 60, display: "flex", alignItems: "center", gap: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={54} height={54} alt="" />
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1, color: "#245c9b" }}>Isofit</div>
      </div>

      <div style={{ position: "absolute", top: 132, left: 64, display: "flex", fontSize: 15, fontWeight: 500, letterSpacing: 1.6, color: "#526b46" }}>
        WORKOUT TRACKING FOR IPHONE
      </div>

      <div style={{ position: "absolute", top: 180, left: 60, width: COPY_WIDTH - 100, display: "flex", flexDirection: "column", fontSize: 54, lineHeight: 1.18, fontWeight: 700, letterSpacing: -2.5 }}>
        {HOME_SOCIAL_HEADLINE.map((line, index) => (
          <div key={line} style={{ display: "flex", color: index === 0 ? "#2a2420" : "#245c9b" }}>{line}</div>
        ))}
      </div>

      <div style={{ position: "absolute", top: 407, left: 64, width: COPY_WIDTH - 120, display: "flex", flexDirection: "column", gap: 12, fontSize: 22, lineHeight: 1.45, fontWeight: 500, color: "#4a423b" }}>
        <div style={{ display: "flex" }}>Log by tap, text or voice.</div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>Get guidance from Atlas, your AI coach.</div>
      </div>

      <div style={{ position: "absolute", bottom: 44, left: 64, width: COPY_WIDTH - 128, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(42,36,32,0.18)", paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 19, fontWeight: 700 }}>
          <div style={{ display: "flex" }}>isofit.app</div>
          <svg width="24" height="20" viewBox="0 0 26 22"><path d="M1 11h22M15 3l8 8-8 8" fill="none" stroke="#9a4527" strokeWidth="3" /></svg>
        </div>
        <div style={{ display: "flex", fontSize: 16, fontWeight: 500, color: "#526b46" }}>Free workout logging</div>
      </div>

      <div style={{ position: "absolute", top: (HEIGHT - FRAME_HEIGHT) / 2, left: COPY_WIDTH + (ART_WIDTH - FRAME_WIDTH) / 2, width: FRAME_WIDTH, height: FRAME_HEIGHT, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 24, backgroundColor: "#f8f5ee", border: "1px solid rgba(42,36,32,0.2)", boxShadow: "0 16px 32px rgba(42,36,32,0.2)", overflow: "hidden" }}>
        <div style={{ display: "flex", width: "100%", padding: "24px 20px 18px", flexDirection: "column", gap: 14, borderBottom: "1px solid rgba(42,36,32,0.14)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: 19, fontWeight: 700, letterSpacing: -0.7 }}>Your muscle map</div>
            <div style={{ display: "flex", backgroundColor: "#e6eadd", color: "#435b38", padding: "5px 7px", borderRadius: 5, fontSize: 11, fontWeight: 700 }}>PRO</div>
          </div>
          <div style={{ display: "flex", fontSize: 13, fontWeight: 500, color: "#6c6259" }}>Every working set, muscle by muscle.</div>
        </div>

        {/* Crop the real app screen to its front/back muscle figures. */}
        <div style={{ display: "flex", position: "relative", width: 308, height: 334, flexShrink: 0, overflow: "hidden", marginTop: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bodyGraphSrc} width={308} height={670} alt="" style={{ position: "absolute", top: -164, left: 0 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20, width: 292 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {HEAT_COLORS.map((color) => (
              <div key={color} style={{ display: "flex", flex: 1, height: 10, borderRadius: 5, backgroundColor: color }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 500, color: "#6c6259" }}>
            <div style={{ display: "flex" }}>Less work</div>
            <div style={{ display: "flex" }}>More work</div>
          </div>
        </div>
      </div>
    </div>
  );
}
