import { motion } from "framer-motion";
import type { VoceDispensa } from "../../../types";
import { cn } from "../../../lib/cn";
import { formattaQuantita } from "../../../lib/format";

export function VoceDispensaCard({
  voce,
  onTap,
  evidenziata,
}: {
  voce: VoceDispensa;
  onTap: () => void;
  evidenziata?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onTap}
      layout
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 text-center rounded-2xl border px-2 py-3 min-h-[76px] transition-colors",
        evidenziata
          ? "bg-primary-50 border-primary-400 ring-2 ring-primary-300"
          : voce.daConsumarePresto
            ? "bg-accent-50 border-accent-300 active:bg-accent-100"
            : "bg-paper-0 border-paper-100 active:bg-paper-100",
      )}
    >
      {voce.daConsumarePresto && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
      )}
      <span className="text-body-sm font-semibold text-paper-900 leading-tight line-clamp-2">{voce.nome}</span>
      {voce.qta != null && (
        <span className="text-caption text-paper-500">
          {formattaQuantita(voce.qta)} {voce.unita ?? ""}
        </span>
      )}
    </motion.button>
  );
}
