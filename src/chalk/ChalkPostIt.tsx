import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { ChalkText } from "./ChalkText";

type ChalkPostItProps = {
  children: ReactNode;
  className?: string;
  ruota?: number;
  ritardo?: number;
  animaKey?: string | number;
  attivo?: boolean;
};

/**
 * Bigliettino da lavagna magnetica: carta post-it retta da un magnete
 * tondo, scritta a mano dentro. Richiama la lavagnetta da cucina, non una
 * lavagna nera — il testo qui è inchiostro scuro su carta chiara, non gesso.
 */
export function ChalkPostIt({ children, className, ruota = -4, ritardo = 0, animaKey, attivo }: ChalkPostItProps) {
  const riduciMotion = useReducedMotion();
  const pilotato = attivo !== undefined;

  return (
    <motion.div
      key={animaKey}
      initial={riduciMotion ? "visibile" : "nascosto"}
      {...(pilotato
        ? { animate: riduciMotion || attivo ? "visibile" : "nascosto" }
        : { whileInView: "visibile", viewport: { once: true, amount: 0.5 } })}
      variants={{
        nascosto: { opacity: 0, scale: 0.85, y: -8 },
        visibile: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, delay: ritardo, ease: "easeOut" } },
      }}
      style={{ rotate: ruota }}
      className={cn(
        "relative rounded-[3px] bg-[#ffe07a] px-3.5 pb-3 pt-4",
        "shadow-[0_12px_20px_-8px_rgb(20_12_8/0.45),0_3px_6px_-1px_rgb(20_12_8/0.3)]",
        className,
      )}
    >
      {/* Magnete: disco tondo che "regge" il foglietto sul bordo superiore. */}
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#5c9276,#1a3728_75%)] shadow-[0_2px_3px_rgb(0_0_0/0.5)] ring-1 ring-white/40"
      />
      <ChalkText tono="inchiostro" centrato className="text-lg leading-snug md:text-xl">
        {children}
      </ChalkText>
    </motion.div>
  );
}
