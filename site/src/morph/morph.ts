export const clampT = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);
export const quantize = (t: number): number => (t < 0.5 ? 0 : 1);
export const STORAGE_KEY = "morph-t";
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
