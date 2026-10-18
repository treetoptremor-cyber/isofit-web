// The Isofit cube from the app's loading screen (CubePulseLogo): geometry and pulse timing, shared by
// the scroll-driven background logo and the header logo's tap pulse.
export const CYCLE = 1.08;
const FLIGHT = 0.48;
export const PATHS = {
  top: "M616 118L601 121L583 128L255 323L248 328L239 339L236 347L236 361L241 372L249 381L400 472L587 583L610 593L629 596L652 594L677 584L998 387L1007 381L1016 371L1021 357L1018 340L1015 335L1002 323L679 131L662 123L641 118Z",
  i: "M197 434L190 436L183 442L179 453L179 876L184 890L193 901L254 937L260 936L265 927L265 485L262 474L254 465L204 435Z",
  s: "M346 530L334 540L328 556L328 754L333 773L345 794L362 810L504 898L510 904L518 917L521 929L521 970L517 979L514 981L506 980L347 881L342 878L335 877L332 878L328 884L329 976L333 983L347 993L561 1123L574 1127L581 1127L591 1123L599 1114L604 1099L604 900L598 877L586 854L569 836L432 751L418 739L411 727L408 714L408 672L409 668L414 663L421 662L578 757L594 765L601 763L604 758L604 695L600 680L589 662L576 651L373 533L358 528L348 530Z",
  o: "M1064 439L1050 434L1039 435L1028 439L833 560L695 643L681 655L669 672L661 692L659 703L659 1083L661 1092L667 1104L676 1113L686 1118L696 1120L709 1119L725 1113L1045 921L1056 912L1068 896L1075 879L1078 860L1078 468L1075 454L1070 445ZM979 590L988 599L993 613L993 800L987 822L978 840L972 848L954 865L793 963L779 968L769 968L763 966L751 954L747 944L745 932L745 766L748 746L755 727L767 708L786 690L954 589L960 587L973 587Z",
};
export const BOX = { x: 179, y: 118, w: 899, h: 1009 };
const FACE_HEIGHT = 478;
const anchor = (nx: number, ny: number) => [BOX.x + nx * BOX.w, BOX.y + ny * BOX.h] as const;
const ANCHORS = {
  top: anchor(0.5, 0.4737),
  i: anchor(0.0478, 0.5624),
  s: anchor(0.3192, 0.7032),
  o: anchor(0.767, 0.6531),
};
const LETTERS = [
  { key: "i", launch: 0.36, amp: 26, dx: -0.866, dy: 0.5, kick: 0.07, glow: 0.9 },
  { key: "s", launch: 0.48, amp: 21, dx: -0.866, dy: 0.5, kick: 0.056, glow: 0.72 },
  { key: "o", launch: 0.6, amp: 17, dx: 0.866, dy: 0.5, kick: 0.045, glow: 0.585 },
] as const;

const HOP: [number, number][] = [[0, 0], [0.16, -0.072], [0.36, 0]];
const SQUASH: [number, number][] = [[0, 0], [0.36, 0], [0.42, 0.05], [0.52, 0]];
const GLOW: [number, number][] = [[0, 0.35], [0.1, 0], [0.34, 0], [0.36, 1], [0.5, 0]];

// Smoothstep keyframe track, 0 outside its span.
function track(keys: [number, number][], t: number) {
  const last = keys[keys.length - 1];
  if (t <= 0 || t >= last[0]) return 0;
  for (let k = 1; k < keys.length; k++) {
    if (t <= keys[k][0]) {
      const [t0, v0] = keys[k - 1];
      const [t1, v1] = keys[k];
      const x = (t - t0) / (t1 - t0);
      return v0 + (v1 - v0) * (x * x * (3 - 2 * x));
    }
  }
  return 0;
}

// Raised-cosine flight: 0 to 1 to 0 over FLIGHT seconds.
function bump(r: number) {
  if (r <= 0 || r >= FLIGHT) return 0;
  const s = Math.sin((Math.PI * r) / FLIGHT);
  return s * s;
}

// Sky at rest, flashing toward a lighter sky at the pulse peak.
function fill(p: number) {
  const mix = (a: number, b: number) => Math.round(a + (b - a) * p);
  return `rgb(${mix(0x6a, 0x9c)} ${mix(0xa5, 0xc4)} ${mix(0xee, 0xf6)})`;
}

function place(el: SVGPathElement, key: keyof typeof ANCHORS, tx: number, ty: number, sx: number, sy: number, glow: number) {
  const [ax, ay] = ANCHORS[key];
  el.setAttribute("transform", `translate(${tx} ${ty}) translate(${ax} ${ay}) scale(${sx} ${sy}) translate(${-ax} ${-ay})`);
  el.style.fill = fill(glow);
  el.style.filter = glow > 0.02 ? `drop-shadow(0 0 ${(15 * glow).toFixed(1)}px rgb(106 165 238 / ${(0.95 * glow).toFixed(2)}))` : "";
}

// Poses the four cube pieces for `t` seconds into the cycle.
export function paintPulse(els: Record<string, SVGPathElement | null>, t: number) {
  const hop = track(HOP, t) * FACE_HEIGHT;
  const q = track(SQUASH, t);
  if (els.top) place(els.top, "top", 0, hop, 1 + q, 1 - q, track(GLOW, t));
  for (const l of LETTERS) {
    const el = els[l.key];
    if (!el) continue;
    const b = bump(t - l.launch);
    const k = 1 + l.kick * b;
    place(el, l.key, l.dx * l.amp * b, l.dy * l.amp * b, k, k, l.glow * b);
  }
}

export function restFill() {
  return fill(0);
}

