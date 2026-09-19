const TAN30 = Math.tan(Math.PI / 6);

type IsoGridProps = {
  id: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
};

/**
 * A true isometric lattice: two 30-degree families plus verticals.
 * One stroke colour (the brand sky) and one tile size everywhere on the
 * page, so the motif reads as a single system; only the opacity changes
 * with the ground it sits on. The verticals run through the lattice
 * node at the centre of the tile and are no longer snapped with
 * `shapeRendering="crispEdges"`, so all three line families antialias
 * alike instead of the verticals rendering heavier.
 */
export default function IsoGrid({ id, opacity = 0.5, strokeWidth = 1, className = "" }: IsoGridProps) {
  const size = 58;
  const h = Number((size * TAN30).toFixed(3));
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id={id} width={size} height={h} patternUnits="userSpaceOnUse">
          <path
            d={`M0 0 L${size} ${h} M0 ${h} L${size} 0 M${size / 2} 0 L${size / 2} ${h}`}
            stroke="#6aa5ee"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
