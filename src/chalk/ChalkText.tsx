import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type ChalkTextProps = {
  children: ReactNode;
  className?: string;
  /** Secondi di attesa prima che la scritta cominci a disegnarsi. */
  ritardo?: number;
  /** Rotazione in gradi: le scritte a mano non sono mai perfettamente dritte. */
  ruota?: number;
  /** Cambia questo valore per far ridisegnare la scritta (es. testo che cambia col mockup attivo). */
  animaKey?: string | number;
  /**
   * Controllo esplicito: quando definito, la scrittura parte appena `attivo`
   * diventa true (niente osservatore di viewport — utile per il tutorial e per
   * annotazioni che si ridisegnano dentro una sezione già visibile).
   */
  attivo?: boolean;
  /** "gesso": bianco-crema, per scrivere sopra il legno/overlay scuro (default). "inchiostro": scuro, per scrivere sopra un post-it o una superficie chiara. */
  tono?: "gesso" | "inchiostro";
  /** Occupa tutta la larghezza disponibile e centra le righe (utile dentro un post-it a larghezza fissa). Default: si stringe al contenuto. */
  centrato?: boolean;
};

/**
 * Scritta in stile gessetto: font handwritten, animazione di scrittura
 * (reveal da sinistra) quando entra nel viewport, una volta sola. L'osservatore
 * di visibilità sta sul wrapper NON clippato: il clip-path di partenza
 * renderebbe l'elemento invisibile all'IntersectionObserver.
 */
export function ChalkText({ children, className, ritardo = 0, ruota = 0, animaKey, attivo, tono = "gesso", centrato = false }: ChalkTextProps) {
  const riduciMotion = useReducedMotion();
  const pilotato = attivo !== undefined;

  return (
    <motion.span
      key={animaKey}
      initial={riduciMotion ? "visibile" : "nascosto"}
      {...(pilotato
        ? { animate: riduciMotion || attivo ? "visibile" : "nascosto" }
        : { whileInView: "visibile", viewport: { once: true, amount: 0.4 } })}
      style={{ rotate: ruota }}
      className={centrato ? "block w-full text-center" : "inline-block"}
    >
      <motion.span
        variants={{
          nascosto: { clipPath: "inset(-15% 100% -15% 0)", opacity: 0.4 },
          visibile: {
            clipPath: "inset(-15% 0% -15% 0)",
            opacity: 1,
            transition: { duration: 0.9, delay: ritardo, ease: "easeOut" },
          },
        }}
        className={cn(
          centrato ? "block w-full text-center" : "inline-block",
          "font-chalk font-medium leading-tight",
          tono === "gesso"
            ? "text-[#f6efe3] [text-shadow:0_0_6px_rgb(0_0_0_/_0.5),0_1px_2px_rgb(0_0_0_/_0.6)]"
            : "text-primary-900 [text-shadow:0_1px_0_rgb(255_255_255_/_0.4)]",
          className,
        )}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
