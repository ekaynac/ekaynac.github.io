import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../morph/morph";

export function useGenerateText(text: string, speedMs = 28): string {
  const [shown, setShown] = useState(prefersReducedMotion() ? text : "");
  useEffect(() => {
    if (prefersReducedMotion()) { setShown(text); return; }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);
  return shown;
}
