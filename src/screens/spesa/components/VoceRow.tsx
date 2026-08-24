import { animate, motion, useMotionValue } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import type { VoceSpesa } from "../../../types";
import { formattaQuantita } from "../../../lib/format";
import { cn } from "../../../lib/cn";
import { useShoppingStore } from "../../../store/shoppingStore";

type VoceRowProps = {
  voce: VoceSpesa;
  onTapTesto: () => void;
};

export function VoceRow({ voce, onTapTesto }: VoceRowProps) {
  const toggleVoce = useShoppingStore((s) => s.toggleVoce);
  const rimuoviVoce = useShoppingStore((s) => s.rimuoviVoce);
  const x = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (voce.manuale && info.offset.x < -60) {
      animate(x, -400, { duration: 0.18, onComplete: () => rimuoviVoce(voce.id) });
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
    }
  };

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
            {voce.qta != null ? formattaQuantita(voce.qta) : ""} {voce.unita}
          </span>
        )}
      </motion.div>
    </div>
  );
}
