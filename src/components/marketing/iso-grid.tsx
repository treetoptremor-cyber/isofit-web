// The chalk grid from the app's canvas. Used as a plate behind imagery and in
// dark bands, never behind body copy.
export default function IsoGrid({
  id,
  tone = "paper",
  className = "",
}: {
  id: string;
  tone?: "paper" | "ink";
  className?: string;
}) {
  const minor = 26;
  const major = minor * 5;
  const minorStroke = tone === "ink" ? "rgba(106,165,238,0.16)" : "rgba(106,165,238,0.34)";
  const majorStroke = tone === "ink" ? "rgba(106,165,238,0.3)" : "rgba(45,108,184,0.34)";

  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={`${id}-minor`} width={minor} height={minor} patternUnits="userSpaceOnUse">
          <path d={`M${minor} 0V${minor}H0`} fill="none" stroke={minorStroke} strokeWidth="1" />
        </pattern>
        <pattern id={`${id}-major`} width={major} height={major} patternUnits="userSpaceOnUse">
          <path d={`M${major} 0V${major}H0`} fill="none" stroke={majorStroke} strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-minor)`} />
      <rect width="100%" height="100%" fill={`url(#${id}-major)`} />
    </svg>
  );
}
