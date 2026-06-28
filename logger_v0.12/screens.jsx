// ── Templates + Progress screens ─────────────────────
// Relies on window globals from components.jsx: MONO, SANS, DISPLAY, VoiceIcon

const TEMPLATES = [
  {
    id: 'push', name: 'Push day', desc: 'Chest · Delts · Triceps', time: '~45m',
    exercises: [
      { name: 'Bench Press', category: 'Push', reps: 8, sets: 4, weight: 185, rpe: 8 },
      { name: 'Incline DB Press', category: 'Push', reps: 10, sets: 3, weight: 60, rpe: 7 },
      { name: 'Lateral Raise', category: 'Push', reps: 12, sets: 3, weight: 20, rpe: 7 },
      { name: 'Triceps Pushdown', category: 'Push', reps: 12, sets: 3, weight: 50, rpe: 7 },
    ],
  },
  {
    id: 'pull', name: 'Pull day', desc: 'Back · Biceps · Rear delts', time: '~45m',
    exercises: [
      { name: 'Deadlift', category: 'Pull', reps: 5, sets: 3, weight: 275, rpe: 8 },
      { name: 'Barbell Row', category: 'Pull', reps: 8, sets: 4, weight: 155, rpe: 7 },
      { name: 'Lat Pulldown', category: 'Pull', reps: 10, sets: 3, weight: 120, rpe: 7 },
      { name: 'EZ-bar Curl', category: 'Pull', reps: 12, sets: 3, weight: 60, rpe: 7 },
    ],
  },
  {
    id: 'legs', name: 'Leg day', desc: 'Quads · Hams · Glutes', time: '~50m',
    exercises: [
      { name: 'Barbell Squat', category: 'Legs', reps: 8, sets: 4, weight: 225, rpe: 8 },
      { name: 'Romanian DL', category: 'Legs', reps: 10, sets: 3, weight: 185, rpe: 7 },
      { name: 'Walking Lunge', category: 'Legs', reps: 12, sets: 3, weight: 40, rpe: 7 },
      { name: 'Calf Raise', category: 'Legs', reps: 15, sets: 4, weight: 90, rpe: 6 },
    ],
  },
  {
    id: 'core', name: 'Core + carry', desc: 'Abs · Grip · Conditioning', time: '~30m',
    exercises: [
      { name: 'Hanging Leg Raise', category: 'Core', reps: 12, sets: 3, weight: 0, rpe: 7 },
      { name: "Farmer's Carry", category: 'Core', reps: 1, sets: 4, weight: 140, rpe: 8 },
      { name: 'Plank', category: 'Core', reps: 1, sets: 3, weight: 0, rpe: 6 },
    ],
  },
];

function TemplatesSection({ t, onAdd }) {
  const [addedId, setAddedId] = React.useState(null);

  const useTemplate = (tpl) => {
    tpl.exercises.forEach(ex => onAdd({ ...ex, note: '', done: false }));
    setAddedId(tpl.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div style={{ padding: '6px 16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px 10px' }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.22em', color: t.ink3 }}>TEMPLATES</span>
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: t.ink3 }}>Suggested for you</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {TEMPLATES.map(tpl => {
          const added = addedId === tpl.id;
          return (
            <div key={tpl.id} style={{
              background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
              padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: t.ink, letterSpacing: '-.01em' }}>{tpl.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: t.ink3, textWrap: 'pretty' }}>{tpl.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.08em', color: t.ink3 }}>
                  {tpl.exercises.length} EX · {tpl.time}
                </span>
                <div onClick={() => !added && useTemplate(tpl)} style={{
                  fontFamily: SANS, fontSize: 11, fontWeight: 700,
                  color: added ? '#fff' : t.primary,
                  background: added ? t.primary : t.glow,
                  padding: '6px 12px', borderRadius: 14, cursor: 'pointer',
                  transition: 'all .2s', whiteSpace: 'nowrap',
                }}>{added ? 'Added ✓' : '+ Add'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Body graph (Progress tab) ────────────────────────
const BODYGRAPH = {
  volume: {
    img: 'assets/bodygraph-volume.png',
    listLabel: 'SETS BY MUSCLE',
    rows: [
      { m: 'Chest', v: '48', p: 1.0, c: '#C24E20' },
      { m: 'Back', v: '42', p: 0.87, c: '#D2622E' },
      { m: 'Quads', v: '40', p: 0.83, c: '#D2622E' },
      { m: 'Hams', v: '28', p: 0.58, c: '#DD8A4E' },
      { m: 'Delts', v: '22', p: 0.46, c: '#93A37B' },
    ],
    stats: [
      { label: 'Total sets', value: '180', glyph: 'bars' },
      { label: 'Most worked', value: 'Chest', glyph: 'up' },
      { label: 'Least worked', value: 'Delts', glyph: 'down' },
    ],
  },
  intensity: {
    img: 'assets/bodygraph-intensity.png',
    listLabel: 'INTENSITY BY MUSCLE',
    rows: [
      { m: 'Chest', v: '86%', p: 0.86, c: '#B5421F' },
      { m: 'Back', v: '81%', p: 0.81, c: '#C24E20' },
      { m: 'Quads', v: '77%', p: 0.77, c: '#D2622E' },
      { m: 'Hams', v: '63%', p: 0.63, c: '#DD8A4E' },
      { m: 'Delts', v: '49%', p: 0.49, c: '#E8B86A' },
    ],
    stats: [
      { label: 'Avg intensity', value: '78%', glyph: 'bars' },
      { label: 'Most intense', value: 'Chest', glyph: 'up' },
      { label: 'Least intense', value: 'Delts', glyph: 'down' },
    ],
  },
};

function StatGlyph({ kind, color }) {
  const s = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'bars') return (
    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 13V9.5M8 13V6M13 13V3" {...s}></path></svg>
  );
  if (kind === 'up') return (
    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 12L12 4M6 4h6v6" {...s}></path></svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 4l8 8M12 6v6H6" {...s}></path></svg>
  );
}

function ProgressScreen({ t }) {
  const [mode, setMode] = React.useState('volume');
  const [range, setRange] = React.useState('7d');
  const d = BODYGRAPH[mode];

  return (
    <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      <div style={{ padding: '10px 20px 0' }}>
        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: t.ink2, marginBottom: 12 }}>
          See where your work is accumulating.
        </div>

        {/* Volume / Intensity segmented control */}
        <div style={{
          display: 'flex', background: t.bg2, borderRadius: 22, padding: 3,
          border: `1px solid ${t.border}`,
        }}>
          {['volume', 'intensity'].map(m => {
            const on = mode === m;
            return (
              <div key={m} onClick={() => setMode(m)} style={{
                flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 18, cursor: 'pointer',
                fontFamily: SANS, fontSize: 13, fontWeight: on ? 700 : 500,
                color: on ? t.primary : t.ink3,
                background: on ? t.surface : 'transparent',
                boxShadow: on ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
                textTransform: 'capitalize', transition: 'all .15s',
              }}>{m}</div>
            );
          })}
        </div>

        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: t.ink3, padding: '10px 2px 2px' }}>
          Tap a muscle group for more
        </div>

        {/* Body diagram */}
        <div style={{
          borderRadius: 14, overflow: 'hidden',
          background: t.dark ? '#FAF8F4' : 'transparent',
        }}>
          <img src={d.img} alt={`Body graph — ${mode}`} draggable="false" style={{
            display: 'block', width: '100%',
            mixBlendMode: t.dark ? 'normal' : 'multiply',
            userSelect: 'none',
          }} />
        </div>

        {/* Bars + stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 10, marginTop: 12 }}>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '.22em', color: t.ink3, marginBottom: 10 }}>
              {d.listLabel}
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              {d.rows.map(r => (
                <div key={r.m} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 28px', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: t.ink }}>{r.m}</span>
                  <div style={{ height: 7, borderRadius: 4, background: t.bg2, overflow: 'hidden' }}>
                    <div style={{ width: `${r.p * 100}%`, height: '100%', borderRadius: 4, background: r.c }}></div>
                  </div>
                  <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: t.ink2, textAlign: 'right' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Range pills */}
            <div style={{ display: 'flex', gap: 2, background: t.bg2, borderRadius: 10, padding: 2 }}>
              {['7d', '30d', '90d', 'all'].map(rg => {
                const on = range === rg;
                return (
                  <div key={rg} onClick={() => setRange(rg)} style={{
                    flex: 1, textAlign: 'center', padding: '4px 0', borderRadius: 8, cursor: 'pointer',
                    fontFamily: SANS, fontSize: 10, fontWeight: on ? 700 : 500,
                    color: on ? t.ink : t.ink3,
                    background: on ? t.surface : 'transparent',
                    boxShadow: on ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                  }}>{rg}</div>
                );
              })}
            </div>
            {d.stats.map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: t.bg2, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <StatGlyph kind={s.glyph} color={t.ink2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 500, color: t.ink3 }}>{s.label}</div>
                  <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: t.ink, letterSpacing: '-.01em' }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atlas helper bar */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '14px 16px 12px' }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: 24, padding: '0 16px', minHeight: 44,
          fontFamily: SANS, fontSize: 14, fontWeight: 500, color: t.ink3,
        }}>Atlas can help</div>
        <div title="Ask Atlas" style={{
          width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
          display: 'grid', placeItems: 'center', flexShrink: 0,
          background: t.atlasTerra,
        }}>
          <VoiceIcon color="#fff" size={18} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TemplatesSection, ProgressScreen });
