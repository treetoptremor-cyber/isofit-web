// A still of Quicklog: one typed line, the rows it becomes. Plain HTML so it is
// readable without JavaScript and by anything that parses the page.

const ROWS = [
  { exercise: "Bench", chips: [["5", "sets"], ["5", "reps"], ["225", "lbs"]] },
  { exercise: "Run", chips: [["5", "km"], ["25:00", "time"], ["7", "rpe"]] },
] as const;

export default function QuicklogDemo() {
  return (
    <figure className="rounded-[1.75rem] border border-rule bg-paper-raised p-5 sm:p-6">
      <p className="label">You type</p>
      <p className="mt-2 flex items-center gap-3 rounded-full border border-ink/25 bg-white px-5 py-3 font-mono text-[0.9375rem] text-ink">
        <span className="min-w-0 flex-1 truncate">bench 5x5 225lbs, run 5k 25:00 rpe 7</span>
        <span aria-hidden="true" className="rounded-full bg-paper-sunk px-3 py-1 text-xs tracking-[0.14em] text-ink-3">LOG</span>
      </p>
      <p className="label mt-6">Isofit logs</p>
      <ul className="mt-2 divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-white">
        {ROWS.map((row) => (
          <li key={row.exercise} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4">
            <span className="font-mono text-[1.0625rem] text-ink">{row.exercise}</span>
            <span className="flex gap-5">
              {row.chips.map(([value, unit], index) => (
                <span key={unit} className="text-center">
                  <span className={`block font-mono text-xl font-semibold tabular-nums ${index === 0 ? "text-blue" : "text-ink"}`}>{value}</span>
                  <span className="label !text-[0.625rem]">{unit}</span>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-sm leading-relaxed text-ink-3">
        Quicklog is parsed on the phone, with no network call. It reads sets and reps, weight, distance, duration and RPE, and keeps the rest as the exercise name.
      </figcaption>
    </figure>
  );
}

const HEAT = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4", "bg-heat-5"];

export function HeatLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="label">Rest</span>
      <span aria-hidden="true" className="flex gap-1">
        {HEAT.map((color) => (
          <span key={color} className={`h-2.5 w-7 rounded-full ${color}`} />
        ))}
      </span>
      <span className="label">Most worked</span>
    </div>
  );
}
