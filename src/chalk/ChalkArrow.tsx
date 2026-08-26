import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "../lib/cn";

export type VarianteFreccia = "curva-giu" | "curva-su" | "dritta" | "ricciolo";

/**
 * Tracciati disegnati a mano libera in un viewBox 100x100: asta + punta.
 * Tutti puntano verso destra; per l'altro verso si usa `specchia`.
 */
const TRACCIATI: Record<VarianteFreccia, { asta: string; punta: string }> = {
  "curva-giu": {
    asta: "M10,18 q16,-6 30,-2 q18,5 27,17 q7,10 11,22 q2,7 3,13",
    punta: "M68,63 l13,7 M89,58 l-8,12",
  },
  "curva-su": {
    asta: "M10,80 q14,4 28,1 q19,-4 30,-16 q9,-10 13,-22 q2,-6 3,-11",
    punta: "M72,38 l12,-6 M88,45 l-4,-13",
  },
  dritta: {
    asta: "M8,52 q22,-4 44,-2 q20,2 36,1",
    punta: "M76,38 l14,13 M76,64 l14,-13",
  },
  ricciolo: {
    asta: "M12,30 q26,-14 44,-2 q14,10 4,22 q-10,11 -20,2 q-9,-9 3,-18 q16,-11 34,-3 q10,5 14,13",
    punta: "M80,32 l11,10 M94,28 l-3,15",
  },
};

type ChalkArrowProps = {
  variante?: VarianteFreccia;
  className?: string;
  /** Ribalta orizzontalmente: la freccia punta a sinistra. */
  specchia?: boolean;
  /** Rotazione libera in gradi, per orientarla sul bersaglio. */
  ruota?: number;
  ritardo?: number;
  animaKey?: string | number;
  /** Controllo esplicito: quando definito, la tracciatura parte appena diventa true (niente osservatore). */
  attivo?: boolean;
  /** "gesso": crema chiaro, per il legno/overlay scuro (default). "inchiostro": scuro, per disegnare sopra uno screenshot chiaro (altrimenti invisibile). */
  tono?: "gesso" | "inchiostro";
};

/**
 * Freccia disegnata a mano col gesso: tratto tremolante (turbolenza SVG),
 * animazione di tracciatura quando entra nel viewport, una volta sola.
 * L'osservatore vive sull'SVG intero (mai clippato), le varianti scendono ai path.
 */
export function ChalkArrow({
  variante = "curva-giu",
  className,
  specchia = false,
  ruota = 0,
  ritardo = 0,
  animaKey,
  attivo,
  tono = "gesso",
}: ChalkArrowProps) {
  const filtroId = useId();
  const riduciMotion = useReducedMotion();
  const pilotato = attivo !== undefined;
  const { asta, punta } = TRACCIATI[variante];

  const varianti = (delay: number, durata: number) => ({
    nascosto: { pathLength: 0, opacity: 0 },
    visibile: {
      pathLength: 1,
      opacity: 0.92,
      transition: { duration: durata, delay, ease: "easeInOut" as const },
    },
  });

  return (
    <motion.svg
      key={animaKey}
      viewBox="0 0 100 100"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
      initial={riduciMotion ? "visibile" : "nascosto"}
      {...(pilotato
        ? { animate: riduciMotion || attivo ? "visibile" : "nascosto" }
        : { whileInView: "visibile", viewport: { once: true, amount: 0.4 } })}
      style={{ transform: `${specchia ? "scaleX(-1) " : ""}rotate(${ruota}deg)` }}
      fill="none"
      stroke={tono === "gesso" ? "#f6efe3" : "#1a3728"}
      strokeWidth={4.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <filter id={filtroId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
        </filter>
      </defs>
      <g filter={`url(#${filtroId})`}>
        <motion.path d={asta} variants={varianti(ritardo, 0.55)} />
        <motion.path d={punta} variants={varianti(ritardo + 0.5, 0.25)} />
      </g>
    </motion.svg>
  );
}
