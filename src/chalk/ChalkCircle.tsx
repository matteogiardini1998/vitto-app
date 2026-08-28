import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "../lib/cn";

type ChalkCircleProps = {
  className?: string;
  ritardo?: number;
  animaKey?: string | number;
  /** Controllo esplicito: quando definito, la tracciatura parte appena diventa true (niente osservatore). */
  attivo?: boolean;
  /** "gesso": crema chiaro, per il legno/overlay scuro (default). "inchiostro": scuro, per disegnare sopra uno screenshot chiaro (altrimenti invisibile). */
  tono?: "gesso" | "inchiostro";
};

/**
 * Cerchio tracciato a mano attorno a un elemento chiave: ellisse irregolare
 * che si sovrappone leggermente in chiusura, come un vero giro di gesso.
 * Si assoluto-posiziona sopra il bersaglio (il genitore fa da riferimento).
 */
export function ChalkCircle({ className, ritardo = 0, animaKey, attivo, tono = "gesso" }: ChalkCircleProps) {
  const filtroId = useId();
  const riduciMotion = useReducedMotion();
  const pilotato = attivo !== undefined;

  return (
    <motion.svg
      key={animaKey}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("overflow-visible pointer-events-none", className)}
      aria-hidden="true"
      initial={riduciMotion ? "visibile" : "nascosto"}
      {...(pilotato
        ? { animate: riduciMotion || attivo ? "visibile" : "nascosto" }
        : { whileInView: "visibile", viewport: { once: true, amount: 0.4 } })}
      fill="none"
      stroke={tono === "gesso" ? "#f6efe3" : "#1a3728"}
      strokeWidth={4.2}
      strokeLinecap="round"
    >
      <defs>
        <filter id={filtroId} x="-20%" y="-20%" width="140%" height="140%">
          {/* Stesso criterio di ChalkArrow: distorsione più lieve (era 0.05/3). */}
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" />
        </filter>
      </defs>
      <motion.path
        d="M50,7 C79,4 95,20 95,47 C95,76 76,94 49,94 C21,94 5,76 5,49 C5,22 24,9 52,8 C70,8 84,16 89,28"
        filter={`url(#${filtroId})`}
        variants={{
          nascosto: { pathLength: 0, opacity: 0 },
          visibile: {
            pathLength: 1,
            opacity: 0.92,
            transition: { duration: 0.8, delay: ritardo, ease: "easeInOut" },
          },
        }}
      />
    </motion.svg>
  );
}
