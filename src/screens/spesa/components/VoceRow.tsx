import { animate, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { useEffect } from "react";
import { Check, Home, ShoppingCart, Trash2, Undo2 } from "lucide-react";
import type { VoceSpesa } from "../../../types";
import { formattaQtaUnita } from "../../../lib/format";
import { cn } from "../../../lib/cn";

export type StatoVoce = "da-comprare" | "carrello" | "in-casa";

type Azione = { id: string; label: string; icona: React.ReactNode; classe: string; onClick: () => void };

type VoceRowProps = {
  voce: VoceSpesa;
  stato: StatoVoce;
  /** Solo una riga aperta alla volta: il genitore sa quale. */
  aperta: boolean;
  onApri: (aperta: boolean) => void;
  onTapTesto: () => void;
  onCambiaStato: (stato: StatoVoce) => void;
  onElimina?: () => void;
  /** Riga "già in casa" grazie alla dispensa (non a una scelta tua): lo si dice. */
  daDispensa?: boolean;
};

const LARGHEZZA_AZIONE = 84;

/**
 * Voce della lista con swipe da destra verso sinistra: escono le azioni
 * («Ce l'ho già», «Nel carrello», ed «Elimina» per le voci aggiunte a mano).
 * Si può fare tutto anche senza swipe: il cerchio a sinistra mette e toglie
 * dal carrello come prima. Lo scroll verticale resta libero (il drag è solo
 * orizzontale).
 */
export function VoceRow({ voce, stato, aperta, onApri, onTapTesto, onCambiaStato, onElimina, daDispensa }: VoceRowProps) {
  const x = useMotionValue(0);

  const azioni: Azione[] =
    stato === "da-comprare"
      ? [
          { id: "casa", label: "Ce l'ho già", icona: <Home size={18} />, classe: "bg-sage-600 text-paper-50", onClick: () => onCambiaStato("in-casa") },
          { id: "carrello", label: "Nel carrello", icona: <ShoppingCart size={18} />, classe: "bg-primary-700 text-paper-50", onClick: () => onCambiaStato("carrello") },
        ]
      : [
          {
            id: "lista",
            label: "Da comprare",
            icona: <Undo2 size={18} />,
            classe: "bg-paper-600 text-paper-50",
            onClick: () => onCambiaStato("da-comprare"),
          },
        ];
  if (onElimina) {
    azioni.push({ id: "elimina", label: "Elimina", icona: <Trash2 size={18} />, classe: "bg-danger-500 text-paper-50", onClick: onElimina });
  }
  const larghezza = azioni.length * LARGHEZZA_AZIONE;
  const opacitaAzioni = useTransform(x, [-larghezza, -24, 0], [1, 0.6, 0]);

  useEffect(() => {
    animate(x, aperta ? -larghezza : 0, { type: "spring", stiffness: 500, damping: 42 });
  }, [aperta, larghezza, x]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const apri = info.offset.x < -larghezza / 3 || info.velocity.x < -400;
    const chiudi = info.offset.x > 24 || info.velocity.x > 400;
    const nuova = apri ? true : chiudi ? false : aperta;
    animate(x, nuova ? -larghezza : 0, { type: "spring", stiffness: 500, damping: 42 });
    if (nuova !== aperta) onApri(nuova);
  };

  const esegui = (a: Azione) => {
    onApri(false);
    a.onClick();
  };

  const nelCarrello = stato === "carrello";
  const inCasa = stato === "in-casa";

  return (
    <div className="relative overflow-hidden">
      <motion.div className="absolute inset-y-0 right-0 flex" style={{ width: larghezza, opacity: opacitaAzioni }}>
        {azioni.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => esegui(a)}
            className={cn("h-full flex flex-col items-center justify-center gap-0.5 text-caption font-semibold", a.classe)}
            style={{ width: LARGHEZZA_AZIONE }}
            tabIndex={aperta ? 0 : -1}
          >
            {a.icona}
            {a.label}
          </button>
        ))}
      </motion.div>
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -larghezza, right: 0 }}
        dragElastic={{ left: 0.08, right: 0.02 }}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative flex items-center gap-3 px-4 py-3 bg-paper-0"
      >
        <motion.button
          onClick={() => onCambiaStato(nelCarrello ? "da-comprare" : "carrello")}
          aria-label={nelCarrello ? "Togli dal carrello" : "Metti nel carrello"}
          whileTap={{ scale: 0.85 }}
          className={cn(
            "h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
            nelCarrello ? "bg-primary-700 border-primary-700" : inCasa ? "bg-sage-100 border-sage-300" : "border-paper-300 bg-paper-0",
          )}
        >
          {nelCarrello && <Check size={14} className="text-paper-50 animate-check-pop" strokeWidth={3} />}
          {inCasa && <Home size={12} className="text-sage-700" strokeWidth={2.5} />}
        </motion.button>
        <button onClick={aperta ? () => onApri(false) : onTapTesto} className="flex-1 min-w-0 text-left">
          <span
            className={cn(
              "text-body-md truncate block transition-colors",
              nelCarrello ? "text-paper-400 line-through" : inCasa ? "text-paper-500" : "text-paper-900 font-medium",
            )}
          >
            {voce.nome}
          </span>
          {inCasa && daDispensa && <span className="block text-caption text-paper-400">È nella tua dispensa</span>}
        </button>
        {(voce.qta != null || voce.unita) && (
          <span className={cn("text-body-sm shrink-0", nelCarrello || inCasa ? "text-paper-300" : "text-paper-500")}>
            {formattaQtaUnita(voce.qta, voce.unita)}
          </span>
        )}
      </motion.div>
    </div>
  );
}
