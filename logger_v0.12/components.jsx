// ── Workout Logger Components ──────────────────────────

// Hero brand color: sky blue
const ACCENT_SCHEMES = {
  sky: { primary: '#3F92C9', glow: 'rgba(63,146,201,.14)', text: '#fff' },
};

// Atlas AI coach palette — reserved for Atlas surfaces (voice input, coach)
const ATLAS = {
  terra: '#D2622E', terraBg: 'rgba(210,98,46,.12)',
  sage: '#93A37B', sageBg: 'rgba(147,163,123,.18)',
};

const MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace";
const SANS = "'Hanken Grotesk', -apple-system, 'Helvetica Neue', sans-serif";
const DISPLAY = "'Unbounded', 'Hanken Grotesk', sans-serif";

function useTheme(tweaks) {
  const scheme = ACCENT_SCHEMES[tweaks.accentScheme] || ACCENT_SCHEMES.sky;
  const dark = tweaks.darkMode;
  const bold = tweaks.typographyWeight === 'bold';
  const compact = tweaks.gridDensity === 'compact';
  return {
    bg: dark ? '#101316' : '#FAF8F4',
    bg2: dark ? '#171b1f' : '#F1EEE7',
    bg3: dark ? '#1e2329' : '#EAE6DC',
    surface: dark ? '#1a1f24' : '#ffffff',
    ink: dark ? '#e9ecee' : '#20242A',
    ink2: dark ? '#a5adb5' : '#4a5158',
    ink3: dark ? '#646d76' : '#8a9097',
    border: dark ? 'rgba(255,255,255,.08)' : 'rgba(32,36,42,.12)',
    border2: dark ? 'rgba(255,255,255,.16)' : 'rgba(32,36,42,.24)',
    warn: '#c4880d',
    warnBg: dark ? 'rgba(196,136,13,.1)' : 'rgba(196,136,13,.08)',
    warnBorder: dark ? 'rgba(196,136,13,.3)' : 'rgba(196,136,13,.25)',
    danger: '#c43d2b',
    atlasTerra: ATLAS.terra,
    atlasTerraBg: ATLAS.terraBg,
    atlasSage: ATLAS.sage,
    atlasSageBg: ATLAS.sageBg,
    ...scheme,
    dark, bold, compact,
    rowH: compact ? 58 : 70,
    fontSize: bold ? 14 : 13,
    headSize: bold ? 28 : 24,
    font: SANS,
    display: DISPLAY,
  };
}

// ── Inline Editable Cell ─────────────────────────────
function EditableCell({ value, onChange, style, placeholder }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef();

  React.useEffect(() => { setDraft(value); }, [value]);
  React.useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  if (editing) {
    return (
      <input ref={inputRef} value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false); } }}
        style={{
          ...style, background: 'transparent', border: 'none', outline: 'none',
          borderBottom: '1.5px solid currentColor', padding: '2px 0', width: '100%',
        }}
      />
    );
  }
  return (
    <div onClick={() => setEditing(true)}
      style={{ ...style, cursor: 'text', minHeight: 20 }}>
      {value || <span style={{ opacity: .35 }}>{placeholder || '—'}</span>}
    </div>
  );
}

function EditableNum({ value, onChange, style }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(String(value));
  const inputRef = React.useRef();

  React.useEffect(() => { setDraft(String(value)); }, [value]);
  React.useEffect(() => { if (editing && inputRef.current) { inputRef.current.focus(); inputRef.current.select(); } }, [editing]);

  const commit = () => {
    setEditing(false);
    const n = parseInt(draft);
    if (!isNaN(n) && n !== value) onChange(n);
    else setDraft(String(value));
  };

  if (editing) {
    return (
      <input ref={inputRef} value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(String(value)); setEditing(false); } }}
        type="text" inputMode="numeric"
        style={{
          ...style, background: 'transparent', border: 'none', outline: 'none',
          borderBottom: '1.5px solid currentColor', padding: '2px 0',
          width: 40, textAlign: 'center',
        }}
      />
    );
  }
  return (
    <div onClick={() => setEditing(true)} style={{ ...style, cursor: 'text' }}>
      {value}
    </div>
  );
}

function CategoryPicker({ value, onChange, t, flagged }) {
  const [open, setOpen] = React.useState(false);
  const cats = ['Legs', 'Push', 'Pull', 'Core', 'Cardio', 'Arms', 'Back'];

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(!open)} style={{
        fontFamily: MONO, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase',
        color: flagged ? t.warn : t.primary,
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: flagged ? '1px 6px' : 0,
        background: flagged ? t.warnBg : 'transparent',
        border: flagged ? `1px solid ${t.warnBorder}` : 'none',
        borderRadius: 4,
      }}>
        {flagged && <span style={{ fontSize: 11 }}>⚑</span>}
        {value}
        <svg width="8" height="5" viewBox="0 0 8 5" style={{ opacity: .5 }}><path d="M0 0l4 5 4-5z" fill="currentColor"/></svg>
      </div>
      {open && (
        <React.Fragment>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 19 }} />
          <div style={{
            position: 'absolute', top: '100%', left: 0, zIndex: 20, marginTop: 4,
            background: t.dark ? '#222' : '#fff', border: `1px solid ${t.border2}`,
            borderRadius: 8, overflow: 'hidden', minWidth: 110,
            boxShadow: '0 8px 24px rgba(0,0,0,.3)',
          }}>
            {cats.map(c => (
              <div key={c} onClick={() => { onChange(c); setOpen(false); }}
                style={{
                  padding: '8px 12px', fontFamily: MONO, fontSize: 10, letterSpacing: '.12em',
                  textTransform: 'uppercase', color: c === value ? t.primary : t.ink2,
                  cursor: 'pointer', borderBottom: `1px solid ${t.border}`,
                  background: c === value ? t.glow : 'transparent',
                }}
              >{c}</div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

// ── Timer Button ──────────────────────────────────────
// ── Shared timer hook (lifted state) ─────────────────
// Coordinates per-row START and the single bottom REST.
function useTimers() {
  const [activeRowId, setActiveRowId] = React.useState(null); // id of row currently timing its set
  const [phase, setPhase] = React.useState('idle'); // idle | countdown | running
  const [setSec, setSetSec] = React.useState(0);
  const [countdown, setCountdown] = React.useState(5);
  const [restPhase, setRestPhase] = React.useState('idle'); // idle | resting
  const [restSec, setRestSec] = React.useState(0);
  const setRef = React.useRef(null);
  const restRef = React.useRef(null);

  React.useEffect(() => () => { clearInterval(setRef.current); clearInterval(restRef.current); }, []);

  const startSet = (rowId) => {
    clearInterval(restRef.current); setRestPhase('idle'); setRestSec(0);
    clearInterval(setRef.current);
    setActiveRowId(rowId); setPhase('countdown'); setCountdown(5);
    let c = 5;
    setRef.current = setInterval(() => {
      c--; setCountdown(c);
      if (c <= 0) {
        clearInterval(setRef.current);
        setPhase('running'); setSetSec(0);
        let s = 0;
        setRef.current = setInterval(() => { s++; setSetSec(s); }, 1000);
      }
    }, 1000);
  };
  const cancelSet = () => {
    clearInterval(setRef.current);
    setActiveRowId(null); setPhase('idle'); setSetSec(0);
  };
  const markInterval = () => { setSetSec(0); /* haptic beat in real app */ };
  const logSet = () => {
    clearInterval(setRef.current);
    setActiveRowId(null); setPhase('idle'); setSetSec(0);
    // Auto-kick rest
    startRest();
  };

  const startRest = () => {
    clearInterval(restRef.current);
    setRestPhase('resting'); setRestSec(0);
    let r = 0;
    restRef.current = setInterval(() => { r++; setRestSec(r); }, 1000);
  };
  const stopRest = () => {
    clearInterval(restRef.current);
    setRestPhase('idle'); setRestSec(0);
  };

  return {
    activeRowId, phase, setSec, countdown,
    restPhase, restSec,
    startSet, cancelSet, markInterval, logSet,
    startRest, stopRest,
  };
}

const fmtTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

// ── Row Timer: appears inline on each exercise row ───
// States: idle → countdown → running [INTERVAL | LOG]
function RowTimer({ rowId, timers, t }) {
  const isActive = timers.activeRowId === rowId;
  const phase = isActive ? timers.phase : 'idle';

  if (phase === 'idle') {
    return (
      <div onClick={(e) => { e.stopPropagation(); timers.startSet(rowId); }} style={{
        height: 22, borderRadius: 6, cursor: 'pointer', flexShrink: 0,
        border: `1px solid ${t.primary}`, background: 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: '0 7px', transition: 'all .2s',
      }}>
        <PlayIcon color={t.primary} size={7} />
        <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, letterSpacing: '.12em', color: t.primary }}>START</span>
      </div>
    );
  }
  if (phase === 'countdown') {
    return (
      <div onClick={(e) => { e.stopPropagation(); timers.cancelSet(); }} style={{
        height: 22, borderRadius: 6, cursor: 'pointer', flexShrink: 0,
        border: `1px solid ${t.primary}`, background: t.glow,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '0 8px',
      }}>
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: t.primary, lineHeight: 1 }}>
          {timers.countdown}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '.14em', color: t.ink3, fontWeight: 600 }}>S</span>
      </div>
    );
  }
  // running → INTERVAL | LOG split
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'stretch', flexShrink: 0,
      border: `1px solid ${t.primary}`, borderRadius: 6,
      background: t.glow, overflow: 'hidden', height: 22,
    }}>
      <div style={{
        padding: '0 5px', display: 'flex', alignItems: 'center',
        borderRight: `1px solid ${t.border2}`,
      }}>
        <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, color: t.primary, lineHeight: 1 }}>
          {fmtTime(timers.setSec)}
        </div>
      </div>
      <div onClick={(e) => { e.stopPropagation(); timers.markInterval(); }} style={{
        cursor: 'pointer', display: 'grid', placeItems: 'center', padding: '0 5px',
        fontFamily: MONO, fontSize: 7, letterSpacing: '.1em', color: t.ink2, fontWeight: 700,
        borderRight: `1px solid ${t.border2}`,
      }}>INT</div>
      <div onClick={(e) => { e.stopPropagation(); timers.logSet(); }} style={{
        cursor: 'pointer', display: 'grid', placeItems: 'center', padding: '0 7px',
        fontFamily: MONO, fontSize: 7, letterSpacing: '.12em', color: t.text, fontWeight: 700,
        background: t.primary,
      }}>LOG</div>
    </div>
  );
}

// ── Rest Timer: compact inline (sits right of START in each row) ──
function RestTimer({ timers, t }) {
  if (timers.restPhase === 'idle') {
    return (
      <div onClick={(e) => { e.stopPropagation(); timers.startRest(); }} style={{
        height: 22, borderRadius: 6, cursor: 'pointer', flexShrink: 0,
        border: `1px solid ${t.border2}`, background: 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: '0 7px', transition: 'all .2s',
      }}>
        <RestIcon color={t.ink2} size={7} />
        <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, letterSpacing: '.12em', color: t.ink2 }}>REST</span>
      </div>
    );
  }
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'stretch', flexShrink: 0,
      border: `1px solid ${t.warnBorder}`, borderRadius: 6,
      background: t.warnBg, overflow: 'hidden', height: 22,
    }}>
      <div style={{
        padding: '0 5px', display: 'flex', alignItems: 'center',
        borderRight: `1px solid ${t.warnBorder}`,
      }}>
        <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, color: t.warn, lineHeight: 1 }}>
          {fmtTime(timers.restSec)}
        </div>
      </div>
      <div onClick={(e) => { e.stopPropagation(); timers.stopRest(); }} style={{
        cursor: 'pointer', display: 'grid', placeItems: 'center', padding: '0 7px',
        fontFamily: MONO, fontSize: 7, letterSpacing: '.12em', color: t.text, fontWeight: 700,
        background: t.warn,
      }}>STOP</div>
    </div>
  );
}

function PlayIcon({ color, size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14"><polygon points="2,0 14,7 2,14" fill={color} /></svg>;
}
function PauseIcon({ color, size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14"><rect x="1" y="0" width="4" height="14" rx="1" fill={color}/><rect x="9" y="0" width="4" height="14" rx="1" fill={color}/></svg>;
}
function RestIcon({ color, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.5" />
      <path d="M4.5 5.5h5M4.5 8.5h5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ── Exercise Row (swipeable + editable) ──────────────
function ExerciseRow({ row, t, onUpdate, onDelete, showNotes, timers, columns }) {
  const [showDelete, setShowDelete] = React.useState(false);
  const longPressTimer = React.useRef(null);
  const didLongPress = React.useRef(false);

  const update = (key, val) => onUpdate({ ...row, [key]: val });
  const flagged = row.category === 'Quick';

  const onPointerDown = (e) => {
    if (e.target.tagName === 'INPUT') return;
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      setShowDelete(true);
      // Haptic feedback if available
      if (navigator.vibrate) navigator.vibrate(30);
    }, 500);
  };
  const onPointerUp = () => {
    clearTimeout(longPressTimer.current);
  };
  const onPointerCancel = () => {
    clearTimeout(longPressTimer.current);
  };
  const onPointerMove = (e) => {
    // Cancel long press if finger moves too much
    clearTimeout(longPressTimer.current);
  };
  const handleDelete = () => {
    setShowDelete(false);
    onDelete(row.id);
  };
  const cancelDelete = () => {
    setShowDelete(false);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Delete confirmation overlay */}
      {showDelete && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          background: 'rgba(196,61,43,.92)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          animation: 'isofit-fade-in .15s ease-out',
        }}>
          <div onClick={handleDelete} style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: '.18em', fontWeight: 700,
            color: '#fff', padding: '8px 18px', borderRadius: 6,
            border: '1.5px solid rgba(255,255,255,.5)', cursor: 'pointer',
            background: 'rgba(255,255,255,.12)',
          }}>DELETE</div>
          <div onClick={cancelDelete} style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: '.18em', fontWeight: 600,
            color: 'rgba(255,255,255,.7)', padding: '8px 18px', borderRadius: 6,
            border: '1.5px solid rgba(255,255,255,.2)', cursor: 'pointer',
          }}>CANCEL</div>
        </div>
      )}

      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerMove={onPointerMove}
        style={{
          display: 'flex', alignItems: 'stretch',
          minHeight: t.rowH,
          borderBottom: `1px solid ${t.border}`,
          background: flagged ? t.warnBg : row.done ? (t.dark ? 'rgba(255,255,255,.02)' : 'rgba(0,0,0,.02)') : t.bg,
          borderLeft: flagged ? `3px solid ${t.warn}` : '3px solid transparent',
          opacity: row.done ? .5 : 1,
          touchAction: 'pan-y',
          userSelect: 'none',
        }}>
        {/* PINNED LEFT: exercise name + category + timer */}
        <div style={{
          width: 168, flexShrink: 0, padding: '9px 12px 9px 18px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5,
          borderRight: `1px solid ${t.border}`,
          background: 'inherit',
          position: 'relative', zIndex: 2,
        }}>
          <EditableCell
            value={row.name}
            onChange={v => update('name', v)}
            placeholder="Exercise name"
            style={{
              fontFamily: SANS, fontSize: t.fontSize, fontWeight: t.bold ? 700 : 500,
              color: t.ink, textDecoration: row.done ? 'line-through' : 'none',
              letterSpacing: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}
          />
          <CategoryPicker
            value={row.category}
            onChange={v => update('category', v)}
            t={t}
            flagged={flagged}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}
            onPointerDown={(e) => e.stopPropagation()}>
            <RowTimer rowId={row.id} timers={timers} t={t} />
            <RestTimer timers={timers} t={t} />
          </div>
        </div>

        {/* SCROLLABLE: data columns + trailing START button */}
        <div
          className="row-scroll"
          style={{
            flex: 1, overflowX: 'auto', overflowY: 'hidden',
            display: 'flex', alignItems: 'center',
            scrollbarWidth: 'none',
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {columns.map(col => (
            <div key={col.key} style={{
              width: col.width, flexShrink: 0, textAlign: 'center',
              padding: '0 6px', borderRight: `1px solid ${t.border}`,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignSelf: 'stretch',
            }}>
              {col.kind === 'num' ? (
                <React.Fragment>
                  <EditableNum
                    value={row[col.key] ?? col.defaultValue ?? 0}
                    onChange={v => update(col.key, v)}
                    style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: col.accent ? t.primary : t.ink }}
                  />
                  <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '.2em', color: t.ink3, marginTop: 1 }}>
                    {col.label}{col.unit ? ` ${col.unit}` : ''}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <EditableCell
                    value={row[col.key] ?? ''}
                    onChange={v => update(col.key, v)}
                    placeholder="—"
                    style={{ fontFamily: SANS, fontSize: 12, color: t.ink2, textAlign: 'center' }}
                  />
                </React.Fragment>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceIcon({ color, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="5.5" y="1" width="5" height="9" rx="2.5" stroke={color} strokeWidth="1.4" />
      <path d="M3 7.5a5 5 0 0 0 10 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function QuickLogBar({ t, onAdd }) {
  const [text, setText] = React.useState('');
  const [listening, setListening] = React.useState(false);
  const submit = () => {
    if (!text.trim()) return;
    const match = text.match(/^(.+?)(?:\s+(\d+)\s*x\s*(\d+))?\s*$/i);
    if (match) {
      onAdd({
        name: match[1].trim(),
        category: 'Quick',
        reps: parseInt(match[2]) || 10,
        sets: parseInt(match[3]) || 3,
        note: '',
        done: false,
      });
    }
    setText('');
  };

  const toggleVoice = () => {
    setListening(l => !l);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'center',
      padding: '10px 16px',
      borderTop: `1px solid ${t.border}`,
      background: t.bg,
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: 8,
        background: t.surface, border: `1px solid ${t.border}`,
        borderRadius: 24, padding: '4px 4px 4px 16px', minHeight: 44,
      }}>
        <input value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Quick log — bench 10x3"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: SANS, fontSize: 14, fontWeight: 500, color: t.ink,
            padding: '6px 0', minWidth: 0,
          }}
        />
        <div onClick={submit} style={{
          fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '.06em',
          color: text.trim() ? '#fff' : t.ink3,
          background: text.trim() ? t.primary : t.bg2,
          padding: '9px 16px', borderRadius: 18, cursor: 'pointer',
          transition: 'all .2s', flexShrink: 0,
        }}>LOG</div>
      </div>
      {/* Atlas voice — coach colors: terra cotta idle, sage while listening */}
      <div onClick={toggleVoice} title="Ask Atlas" style={{
        width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
        display: 'grid', placeItems: 'center', flexShrink: 0,
        background: listening ? t.atlasSage : t.atlasTerra,
        boxShadow: listening ? `0 0 0 5px ${t.atlasSageBg}` : 'none',
        transition: 'all .2s',
      }}>
        <VoiceIcon color="#fff" size={18} />
      </div>
    </div>
  );
}

// ── Bottom Nav ──────────────────────────────────────
function NavGlyph({ id, color }) {
  const s = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'log') return (
    <svg width="22" height="22" viewBox="0 0 22 22"><rect x="4" y="3.5" width="14" height="15" rx="3" {...s}></rect><path d="M8 8.5h6M8 12h6" {...s}></path></svg>
  );
  if (id === 'progress') return (
    <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 17.5v-4M11 17.5v-9M17 17.5v-13" {...s}></path></svg>
  );
  if (id === 'atlas') return (
    <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="5" r="1.8" {...s}></circle><ellipse cx="11" cy="10.5" rx="3.4" ry="1.9" {...s}></ellipse><ellipse cx="11" cy="16" rx="5.4" ry="2.2" {...s}></ellipse></svg>
  );
  if (id === 'bonfire') return (
    <svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 3.5c2.9 2.9 4.5 5 4.5 7.9a4.5 4.5 0 0 1-9 0c0-2.9 1.6-5 4.5-7.9Z" {...s}></path></svg>
  );
  // you
  return (
    <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="7.5" r="3" {...s}></circle><path d="M4.5 18.5a6.5 6.5 0 0 1 13 0" {...s}></path></svg>
  );
}

function BottomNav({ active, onSelect, t }) {
  const items = [
    { id: 'log', label: 'Log' },
    { id: 'progress', label: 'Progress' },
    { id: 'atlas', label: 'Atlas' },
    { id: 'bonfire', label: 'Bonfire' },
    { id: 'you', label: 'You' },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: `1px solid ${t.border}`,
      background: t.bg, padding: '8px 8px 0',
    }}>
      {items.map(it => {
        const on = active === it.id;
        return (
          <div key={it.id} onClick={() => onSelect(it.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 0', cursor: 'pointer', minHeight: 44,
          }}>
            <NavGlyph id={it.id} color={on ? t.primary : t.ink3} />
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: on ? 700 : 500, color: on ? t.primary : t.ink3 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}





// ── Main App ──────────────────────────────────────────
function WorkoutApp({ tweaks }) {
  const t = useTheme(tweaks);
  const showNotes = tweaks.showNotes !== false;
  const [navTab, setNavTab] = React.useState('log');
  const sync = useSyncQueue();
  const timers = useTimers();

  // Keep all horizontally-scrollable rows (header + each row) in lockstep
  const tableRef = React.useRef(null);
  React.useEffect(() => {
    const root = tableRef.current;
    if (!root) return;
    const els = () => Array.from(root.querySelectorAll('.row-scroll'));
    let lockedBy = null;
    const onScroll = (e) => {
      if (lockedBy && lockedBy !== e.target) return;
      lockedBy = e.target;
      const x = e.target.scrollLeft;
      for (const el of els()) if (el !== e.target && el.scrollLeft !== x) el.scrollLeft = x;
      requestAnimationFrame(() => { lockedBy = null; });
    };
    const list = els();
    list.forEach(el => el.addEventListener('scroll', onScroll, { passive: true }));
    // observe for new rows
    const mo = new MutationObserver(() => {
      const current = els();
      current.forEach(el => {
        el.removeEventListener('scroll', onScroll);
        el.addEventListener('scroll', onScroll, { passive: true });
      });
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      els().forEach(el => el.removeEventListener('scroll', onScroll));
    };
  }, []);

  // Column definitions — order matters; shows in scrollable track
  const columns = React.useMemo(() => {
    const base = [
      { key: 'reps',   label: 'REPS',   kind: 'num', width: 56 },
      { key: 'sets',   label: 'SETS',   kind: 'num', width: 56, accent: true },
      { key: 'weight', label: 'WEIGHT', unit: 'LB', kind: 'num', width: 66, defaultValue: 0 },
      { key: 'rpe',    label: 'RPE',    kind: 'num', width: 50, defaultValue: 0 },
    ];
    if (showNotes) base.push({ key: 'note', label: 'NOTES', kind: 'text', width: 140 });
    return base;
  }, [showNotes]);

  const [exercises, setExercises] = React.useState([
    { id: 1, name: 'Barbell Squat', category: 'Legs', reps: 8, sets: 4, weight: 225, rpe: 8, note: 'ATG depth', done: false },
    { id: 2, name: 'Romanian DL',   category: 'Legs', reps: 10, sets: 3, weight: 185, rpe: 7, note: 'Slow eccentric', done: false },
    { id: 4, name: 'OHP',           category: 'Push', reps: 10, sets: 3, weight: 115, rpe: 7, note: '', done: false },
    { id: 5, name: 'Pull-ups',      category: 'Pull', reps: 8, sets: 3, weight: 25,  rpe: 8, note: 'Weighted +25', done: false },
  ]);

  const addExercise = (ex) => {
    const withId = { ...ex, id: Date.now() + Math.random() };
    setExercises(prev => [...prev, withId]);
    sync.enqueue({ type: 'add', payload: withId });
  };
  const updateExercise = (updated) => {
    setExercises(prev => prev.map(e => e.id === updated.id ? updated : e));
    sync.enqueue({ type: 'update', payload: updated });
  };
  const deleteExercise = (id) => {
    setExercises(prev => prev.filter(e => e.id !== id));
    sync.enqueue({ type: 'delete', payload: { id } });
  };

  const flaggedCount = exercises.filter(e => e.category === 'Quick').length;

  const today = new Date();
  const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  return (
    <div style={{
      width: '100%', height: '100%', background: t.bg,
      backgroundImage: t.dark ? 'none' : 'linear-gradient(rgba(63,146,201,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(63,146,201,.06) 1px, transparent 1px)',
      backgroundSize: '26px 26px',
      display: 'flex', flexDirection: 'column', fontFamily: SANS,
    }}>
      {/* Status bar */}
      <div style={{ padding: '14px 24px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontWeight: 500, color: t.ink }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="3" height="4" rx=".5" fill={t.ink}/><rect x="4.5" y="4.5" width="3" height="6.5" rx=".5" fill={t.ink}/><rect x="9" y="2" width="3" height="9" rx=".5" fill={t.ink}/><rect x="13.5" y="0" width="2.5" height="11" rx=".5" fill={t.ink}/></svg>
          <svg width="20" height="10" viewBox="0 0 20 10"><rect x=".5" y=".5" width="17" height="9" rx="2" stroke={t.ink} strokeWidth="1" fill="none"/><rect x="2" y="2" width="12" height="6" rx="1" fill={t.ink}/><rect x="18.5" y="3" width="1.5" height="4" rx=".5" fill={t.ink} opacity=".4"/></svg>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.2em', color: t.ink3 }}>
            {`${dayNames[today.getDay()]} ${monthNames[today.getMonth()]} ${today.getDate()}`}
          </div>
          <div style={{ fontFamily: DISPLAY, fontSize: t.headSize, fontWeight: 700, color: t.ink, marginTop: 2, letterSpacing: '-.03em' }}>
            {navTab === 'log' ? "Today's session" : navTab === 'progress' ? 'Body graph' : navTab.charAt(0).toUpperCase() + navTab.slice(1)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div title="Cairn logo" style={{
            width: 42, height: 42, display: 'grid', placeItems: 'center',
          }}>
            <img
              src="assets/cairn-logo.png"
              alt="Cairn logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <SyncBadge sync={sync} t={t} />
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${t.border}` }} />

      {navTab === 'log' ? (
        <React.Fragment>
          {flaggedCount > 0 && (
            <div style={{
              margin: '0 20px 8px', padding: '6px 12px', borderRadius: 8,
              background: t.warnBg, border: `1px solid ${t.warnBorder}`,
              fontFamily: MONO, fontSize: 10, letterSpacing: '.1em', color: t.warn,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 13 }}>⚑</span>
              {flaggedCount} QUICK LOG{flaggedCount > 1 ? 'S' : ''} NEED CATEGORIZING
            </div>
          )}

          {/* Column header — pinned name + scrollable data columns */}
          <div ref={tableRef} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'stretch',
            borderBottom: `1.5px solid ${t.border2}`,
            borderTop: `1px solid ${t.border}`,
            background: t.bg2,
            fontFamily: MONO, fontSize: 9, letterSpacing: '.2em', color: t.ink3,
          }}>
            <div style={{
              width: 168, flexShrink: 0, padding: '10px 12px 10px 18px',
              borderRight: `1px solid ${t.border}`,
            }}>EXERCISE</div>
            <div
              className="row-scroll"
              style={{
                flex: 1, overflowX: 'auto', overflowY: 'hidden',
                display: 'flex', alignItems: 'center',
                scrollbarWidth: 'none',
              }}>
              {columns.map(col => (
                <div key={col.key} style={{
                  width: col.width, flexShrink: 0, textAlign: 'center',
                  padding: '10px 6px',
                  borderRight: `1px solid ${t.border}`,
                }}>{col.label}</div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'auto' }}>
            {exercises.map(ex => (
              <ExerciseRow
                key={ex.id}
                row={ex}
                t={t}
                onUpdate={updateExercise}
                onDelete={deleteExercise}
                showNotes={showNotes}
                timers={timers}
                columns={columns}
              />
            ))}
            {exercises.length > 0 && (
              <div style={{
                padding: '12px 20px', fontFamily: SANS, fontSize: 11, fontWeight: 500,
                color: t.ink3, textAlign: 'center',
              }}>Hold a row to delete · scroll columns for more</div>
            )}

            <TemplatesSection t={t} onAdd={addExercise} />
          </div>
          </div>

          <QuickLogBar t={t} onAdd={addExercise} />
        </React.Fragment>
      ) : navTab === 'progress' ? (
        <ProgressScreen t={t} />
      ) : (
        <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: .6 }}>
            <NavGlyph id={navTab} color={t.ink3} />
            <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: t.ink2, textTransform: 'capitalize' }}>{navTab}</div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.18em', color: t.ink3 }}>NOT IN THIS PROTOTYPE</div>
          </div>
        </div>
      )}

      <BottomNav active={navTab} onSelect={setNavTab} t={t} />

      <div style={{ height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 110, height: 4, borderRadius: 2, background: t.dark ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.2)' }} />
      </div>
    </div>
  );
}

// ── Sync / Offline Queue ─────────────────────────────
function useSyncQueue() {
  const [online, setOnline] = React.useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [queue, setQueue] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('isofit_queue') || '[]'); } catch { return []; }
  });
  const [syncing, setSyncing] = React.useState(false);
  const [lastSync, setLastSync] = React.useState(null);
  const [justSynced, setJustSynced] = React.useState(false);

  React.useEffect(() => {
    try { localStorage.setItem('isofit_queue', JSON.stringify(queue)); } catch {}
  }, [queue]);

  React.useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

  // Flush queue when we come online
  React.useEffect(() => {
    if (!online || queue.length === 0 || syncing) return;
    let cancelled = false;
    setSyncing(true);
    // Simulate a batched upload — ~180ms per op, min 600ms
    const delay = Math.max(600, queue.length * 180);
    const timer = setTimeout(() => {
      if (cancelled) return;
      setQueue([]);
      setSyncing(false);
      setLastSync(new Date());
      setJustSynced(true);
      setTimeout(() => setJustSynced(false), 2200);
    }, delay);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [online, queue.length, syncing]);

  const enqueue = React.useCallback((op) => {
    setQueue(q => [...q, { ...op, ts: Date.now(), id: Math.random().toString(36).slice(2, 9) }]);
  }, []);

  const forceSync = () => {
    if (!online || queue.length === 0 || syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setQueue([]);
      setSyncing(false);
      setLastSync(new Date());
      setJustSynced(true);
      setTimeout(() => setJustSynced(false), 2200);
    }, 700);
  };

  return { online, queue, syncing, lastSync, justSynced, enqueue, forceSync,
           // dev-only simulators
           _simulateOffline: () => setOnline(false),
           _simulateOnline: () => setOnline(true) };
}

// ── Sync Status Badge ────────────────────────────────
function SyncBadge({ sync, t }) {
  const { online, queue, syncing, justSynced, forceSync, _simulateOffline, _simulateOnline } = sync;
  const [expanded, setExpanded] = React.useState(false);

  let state = 'synced';
  let label = 'SYNCED';
  let dotColor = t.primary;
  let bg = 'transparent';
  let border = t.border;
  let textColor = t.ink3;

  if (!online) {
    state = 'offline';
    label = queue.length > 0 ? `OFFLINE · ${queue.length} QUEUED` : 'OFFLINE';
    dotColor = t.warn;
    bg = t.warnBg;
    border = t.warnBorder;
    textColor = t.warn;
  } else if (syncing) {
    state = 'syncing';
    label = `SYNCING ${queue.length}…`;
    dotColor = t.primary;
    bg = t.glow;
    border = t.primary;
    textColor = t.primary;
  } else if (justSynced) {
    state = 'just-synced';
    label = 'SYNCED ✓';
    dotColor = t.primary;
    bg = t.glow;
    border = t.primary;
    textColor = t.primary;
  } else if (queue.length > 0) {
    state = 'pending';
    label = `${queue.length} PENDING`;
    dotColor = t.warn;
    bg = t.warnBg;
    border = t.warnBorder;
    textColor = t.warn;
  }

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setExpanded(!expanded)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 9px', borderRadius: 100,
        background: bg, border: `1px solid ${border}`,
        fontFamily: MONO, fontSize: 9, letterSpacing: '.14em', fontWeight: 600,
        color: textColor, cursor: 'pointer', transition: 'all .2s',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: dotColor,
          animation: state === 'syncing' ? 'isofit-pulse 1s ease-in-out infinite' : state === 'offline' ? 'isofit-blink 1.4s steps(2) infinite' : 'none',
        }} />
        {label}
      </div>
      {expanded && (
        <React.Fragment>
          <div onClick={() => setExpanded(false)} style={{ position: 'fixed', inset: 0, zIndex: 29 }} />
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 6, zIndex: 30,
            background: t.bg2, border: `1px solid ${t.border2}`, borderRadius: 10,
            padding: '10px 12px', minWidth: 200,
            boxShadow: '0 10px 24px rgba(0,0,0,.3)',
          }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.2em', color: t.ink3, marginBottom: 8 }}>
              SYNC STATUS
            </div>
            <div style={{ display: 'grid', gap: 6, fontFamily: MONO, fontSize: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: t.ink3 }}>Network</span>
                <span style={{ color: online ? t.primary : t.warn, fontWeight: 600 }}>
                  {online ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: t.ink3 }}>Queued ops</span>
                <span style={{ color: queue.length > 0 ? t.warn : t.ink, fontWeight: 600 }}>{queue.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: t.ink3 }}>Last sync</span>
                <span style={{ color: t.ink2 }}>
                  {sync.lastSync ? sync.lastSync.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '—'}
                </span>
              </div>
            </div>

            {queue.length > 0 && online && !syncing && (
              <div onClick={forceSync} style={{
                marginTop: 10, padding: '6px 10px', borderRadius: 6,
                background: t.primary, color: t.text, textAlign: 'center',
                fontFamily: MONO, fontSize: 9, letterSpacing: '.18em', fontWeight: 600, cursor: 'pointer',
              }}>SYNC NOW</div>
            )}

            <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 6 }}>
              <div onClick={online ? _simulateOffline : _simulateOnline} style={{
                flex: 1, padding: '5px 8px', textAlign: 'center', cursor: 'pointer',
                border: `1px solid ${t.border2}`, borderRadius: 5,
                fontFamily: MONO, fontSize: 8, letterSpacing: '.16em', color: t.ink3, fontWeight: 500,
              }}>
                SIM {online ? 'OFFLINE' : 'ONLINE'}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

Object.assign(window, { WorkoutApp, useTheme, ACCENT_SCHEMES, useSyncQueue, SyncBadge, MONO, SANS, DISPLAY, VoiceIcon, NavGlyph });
