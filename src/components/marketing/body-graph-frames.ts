// The pre-rendered bloom frames of the app's body graph, shared by the page background and the
// phone. The figure's geometry stays in the private app repo; these are pictures of it.
export const FRAMES = 20;
const frameSrc = (index: number) => `/body-graph/bloom-${String(index + 1).padStart(2, "0")}.avif`;

// Reduced motion, Save-Data and 2G draw nothing at all, so the page reads the same without it.
export function bloomAllowed(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    connection?.saveData ||
    /(^|-)2g$/.test(connection?.effectiveType ?? "")
  );
}

const decoded = (src: string) => {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
  return image.decode().then(() => image);
};

let loading: Promise<HTMLImageElement[]> | null = null;

// One fetch for everyone, started once the page has settled so the frames never compete with it.
export function loadBloomFrames(): Promise<HTMLImageElement[]> {
  loading ??= new Promise<void>((resolve) => {
    const start = () => (window.requestIdleCallback ? window.requestIdleCallback(() => resolve(), { timeout: 3000 }) : window.setTimeout(resolve, 1500));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }).then(() => Promise.all(Array.from({ length: FRAMES }, (_, index) => decoded(frameSrc(index)))));
  return loading;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return decoded(src);
}

// Progress 0..1 picks a pair of frames and cross-fades them, so 20 frames read as continuous.
// Pass the key a previous call returned and an unchanged picture is not repainted.
export function drawBloom(ctx: CanvasRenderingContext2D, frames: HTMLImageElement[], progress: number, last = -1): number {
  const { width, height } = ctx.canvas;
  const position = Math.min(1, Math.max(0, progress)) * (FRAMES - 1);
  const base = Math.min(FRAMES - 2, Math.floor(position));
  const blend = Math.round((position - base) * 16) / 16;
  if (base + blend === last) return last;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(frames[base], 0, 0, width, height);
  if (blend > 0) {
    ctx.globalAlpha = blend;
    ctx.drawImage(frames[base + 1], 0, 0, width, height);
    ctx.globalAlpha = 1;
  }
  return base + blend;
}
