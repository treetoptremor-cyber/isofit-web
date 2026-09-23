// The app's GridBackground (DesignSystem.swift): a 26pt square grid in sky at
// 12% opacity, one-point lines, on every tab. The same lines here, on paper
// and on the ink bands. The page-level edge fade lives in PageShell.
export default function IsoGrid({
  id,
  tone = "paper",
  className = "",
}: {
  id: string;
  tone?: "paper" | "ink";
  className?: string;
}) {
  const spacing = 26;
  const stroke = tone === "ink" ? "rgba(106,165,238,0.14)" : "rgba(106,165,238,0.12)";

  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={`${id}-lines`} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <path d={`M${spacing} 0V${spacing}H0`} fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-lines)`} />
    </svg>
  );
}
