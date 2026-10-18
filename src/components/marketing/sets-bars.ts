// Bars in a real screenshot that load up as it scrolls into view, in screenshot pixels.
export type Bar = { x0: number; x1: number; y0: number; y1: number };

// The five bars of sets-by-muscle.png, measured off the screenshot.
export const SETS_BY_MUSCLE_BARS: Bar[] = [
  { x0: 90, x1: 541, y0: 1671, y1: 1691 },
  { x0: 90, x1: 500, y0: 1784, y1: 1804 },
  { x0: 90, x1: 459, y0: 1897, y1: 1917 },
  { x0: 90, x1: 418, y0: 2010, y1: 2030 },
  { x0: 90, x1: 418, y0: 2123, y1: 2143 },
];
