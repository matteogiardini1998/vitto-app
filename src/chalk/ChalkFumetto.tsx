import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";
import { ChalkText } from "./ChalkText";

type Lato = "sopra" | "sotto" | "sinistra" | "destra";

type ChalkFumettoProps = {
  children: ReactNode;
  /** Da che lato sta il bersaglio che questo fumetto commenta: decide su quale bordo va la punta. */
  lato: Lato;
  /**
   * Dove, lungo quel bordo, sta davvero il bersaglio (0–1, default centro).
   * Il fumetto può essere spostato dal suo box "naturale" per restare dentro
   * lo schermo (bersagli in un angolo, es. il profilo) — la punta deve
   * seguirlo, non restare sempre nel mezzo, altrimenti non punta più a nulla.
   */
  puntaOffset?: number;
  className?: string;
  animaKey?: string | number;
  attivo?: boolean;
};

const BORDO_PUNTA: Record<Lato, string> = {
  // Il fumetto sta SOTTO il bersaglio (bersaglio sopra) → la punta è sul bordo alto.
  sopra: "-top-2",
  sotto: "-bottom-2",
  sinistra: "-left-2",
  destra: "-right-2",
};

function clampOffset(v: number) {
  return Math.max(0.12, Math.min(0.88, v));
}

/**
 * Bigliettino da lavagna: sfondo pieno scuro (marchiatura) con una punta
 * verso il bersaglio, testo gesso chiaro dentro. A differenza del testo
 * "nudo" fluttuante, resta leggibile SEMPRE — lo sfondo è suo, non quello
 * (variabile) dell'app sotto. Usato dal tutorial in-app; il nome richiama
 * il fumetto da lavagnetta di cucina, coerente col resto del modulo.
 */
export function ChalkFumetto({ children, lato, puntaOffset = 0.5, className, animaKey, attivo }: ChalkFumettoProps) {
  const riduciMotion = useReducedMotion();
  const pilotato = attivo !== undefined;
  const offset = clampOffset(puntaOffset);
  const orizzontale = lato === "sopra" || lato === "sotto";
  const puntaStyle: CSSProperties = orizzontale
    ? { left: `${offset * 100}%`, transform: "translateX(-50%) rotate(45deg)" }
    : { top: `${offset * 100}%`, transform: "translateY(-50%) rotate(45deg)" };

  return (
    <motion.div
      key={animaKey}
      initial={riduciMotion ? "visibile" : "nascosto"}
      {...(pilotato
        ? { animate: riduciMotion || attivo ? "visibile" : "nascosto" }
        : { whileInView: "visibile", viewport: { once: true, amount: 0.5 } })}
      variants={{
        nascosto: { opacity: 0, scale: 0.9 },
        visibile: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: "easeOut" } },
      }}
      className={cn(
        // rounded-lg, non più rounded-2xl: rettangolo smussato, non più una pillola.
        "relative rounded-lg bg-marchiatura px-4 py-3 shadow-[0_8px_18px_-6px_rgb(0_0_0/0.5)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("absolute h-4 w-4 rounded-[3px] bg-marchiatura", BORDO_PUNTA[lato])}
        style={puntaStyle}
      />
      <ChalkText tono="gesso" centrato className="relative text-lg leading-snug">
        {children}
      </ChalkText>
    </motion.div>
  );
}
