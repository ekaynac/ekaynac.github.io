import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { clampT, quantize, STORAGE_KEY, prefersReducedMotion } from "./morph";

export const MorphContext = createContext<{ t: number; setT: (n: number) => void }>({ t: 0, setT: () => {} });

function initialT(): number {
  if (typeof window === "undefined") return 0;
  const saved = Number(window.localStorage?.getItem(STORAGE_KEY));
  const base = Number.isFinite(saved) ? clampT(saved) : 0;
  return prefersReducedMotion() ? quantize(base) : base;
}

export function MorphProvider({ children }: { children: ReactNode }) {
  const [t, setRaw] = useState<number>(initialT);

  const setT = useCallback((n: number) => {
    const next = prefersReducedMotion() ? quantize(clampT(n)) : clampT(n);
    setRaw(next);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--t", String(t));
    document.documentElement.dataset.pole = t < 0.5 ? "engineer" : "poet";
    try { window.localStorage?.setItem(STORAGE_KEY, String(t)); } catch { /* ignore */ }
  }, [t]);

  const value = useMemo(() => ({ t, setT }), [t, setT]);
  return <MorphContext.Provider value={value}>{children}</MorphContext.Provider>;
}
