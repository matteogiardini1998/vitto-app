import { useEffect, useState } from "react";

export type VisualViewportInset = {
  /** Altezza visibile reale (esclusa la tastiera), in px. */
  altezza: number;
  /** Quanto il viewport visibile è scrollato dall'alto del layout viewport. */
  offsetTop: number;
  tastieraAperta: boolean;
};

function leggiInset(): VisualViewportInset {
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  if (!vv) return { altezza: window.innerHeight, offsetTop: 0, tastieraAperta: false };
  return {
    altezza: vv.height,
    offsetTop: vv.offsetTop,
    tastieraAperta: window.innerHeight - vv.height > 80,
  };
}

/**
 * Traccia window.visualViewport per adattare gli overlay quando la tastiera
 * del telefono si apre: senza, un elemento "fixed" resta ancorato al layout
 * viewport intero, metà del quale finisce coperto dalla tastiera.
 */
export function useVisualViewportInset(): VisualViewportInset {
  const [inset, setInset] = useState<VisualViewportInset>(leggiInset);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const aggiorna = () => setInset(leggiInset());
    aggiorna();
    vv.addEventListener("resize", aggiorna);
    vv.addEventListener("scroll", aggiorna);
    return () => {
      vv.removeEventListener("resize", aggiorna);
      vv.removeEventListener("scroll", aggiorna);
    };
  }, []);

  return inset;
}
