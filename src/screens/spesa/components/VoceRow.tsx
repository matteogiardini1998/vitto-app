import { animate, motion, useMotionValue } from "framer-motion";
import { Check, PackageCheck, Trash2 } from "lucide-react";
import type { VoceDispensa, VoceSpesa } from "../../../types";
import { formattaQtaUnita } from "../../../lib/format";
import { cn } from "../../../lib/cn";
import { useShoppingStore } from "../../../store/shoppingStore";

type VoceRowProps = {
  voce: VoceSpesa;
  onTapTesto: () => void;
  corrispondenza?: VoceDispensa | null;
};

export function VoceRow({ voce, onTapTesto, corrispondenza }: VoceRowProps) {
  const toggleVoce = useShoppingStore((s) => s.toggleVoce);
  const rimuoviVoce = useShoppingStore((s) => s.rimuoviVoce);
  const aggiornaVoce = useShoppingStore((s) => s.aggiornaVoce);
  const x = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (voce.manuale && info.offset.x < -60) {
      animate(x, -400, { duration: 0.18, onComplete: () => rimuoviVoce(voce.id) });
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
    }
  };

  const mostraBadge = corrispondenza && !voce.presa && !voce.giaInDispensaIgnorato;

  return (
    <div className="relative overflow-hidden">
      {voce.manuale && (
        <div className="absolute inset-0 bg-danger-500 flex items-center justify-end pr-5">
          <Trash2 size={18} className="text-paper-50" />
        </div>
      )}
      <motion.div
        drag={voce.manuale ? "x" : false}
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.15}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative flex items-center gap-3 px-4 py-3 bg-paper-0"
      >
        <motion.button
          onClick={() => toggleVoce(voce.id)}
          aria-label={voce.presa ? "Segna come da prendere" : "Segna come presa"}
          whileTap={{ scale: 0.85 }}
          className={cn(
            "h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
            voce.presa ? "bg-primary-700 border-primary-700" : "border-paper-300 bg-paper-0",
          )}
        >
          {voce.presa && (
            <Check size={14} className="text-paper-50 animate-check-pop" strokeWidth={3} />
          )}
        </motion.button>
        <button onClick={onTapTesto} className="flex-1 min-w-0 text-left">
          <span
            className={cn(
              "text-body-md truncate block transition-colors",
              voce.presa ? "text-paper-400 line-through" : "text-paper-900 font-medium",
            )}
          >
            {voce.nome}
          </span>
        </button>
        {(voce.qta != null || voce.unita) && (
          <span className={cn("text-body-sm shrink-0", voce.presa ? "text-paper-300" : "text-paper-500")}>
            {formattaQtaUnita(voce.qta, voce.unita)}
          </span>
        )}
      </motion.div>

      {mostraBadge && (
        <div className="relative flex items-center justify-between gap-2 flex-wrap px-4 pb-3 -mt-1 bg-paper-0">
          <span className="inline-flex items-center gap-1.5 text-caption font-medium text-primary-700 bg-primary-50 rounded-full px-2.5 py-1 dark:bg-primary-900/40 dark:text-primary-300">
            <PackageCheck size={13} />
            Già in dispensa
            {corrispondenza.qta != null ? ` · ${formattaQtaUnita(corrispondenza.qta, corrispondenza.unita)}` : ""}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => rimuoviVoce(voce.id)}
              className="text-caption font-semibold text-primary-700 dark:text-primary-300"
            >
              Ce l'ho, togli dalla lista
            </button>
            <button
              type="button"
              onClick={() => aggiornaVoce(voce.id, { giaInDispensaIgnorato: true })}
              className="text-caption font-semibold text-paper-400"
            >
              Compro comunque
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
