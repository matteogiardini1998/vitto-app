import { Lock, LockOpen, RefreshCw, BookOpen, Trash2 } from "lucide-react";
import { OPZIONI_CAMBIO, type OpzioneCambio } from "./opzioniCambio";
import { BottomSheet } from "../../../components/BottomSheet";
import type { Ricetta } from "../../../types";
import { cn } from "../../../lib/cn";

type CambiaPastoSheetProps = {
  open: boolean;
  onClose: () => void;
  titolo: string;
  ricetta?: Ricetta;
  motivo?: string;
  lockata?: boolean;
  /** Ultimo esito di un cambio, mostrato sotto la ricetta (es. "Nessuna ricetta di pesce adatta"). */
  avviso?: string | null;
  inCorso?: boolean;
  onCambia: (opzione: OpzioneCambio) => void;
  onToggleLock?: () => void;
  onScegliDalRicettario?: () => void;
  onTogli?: () => void;
};

/**
 * Pannello "cambia questo pasto": la ricetta attuale resta in alto e si
 * aggiorna sul posto a ogni tocco, così si può premere "Un'altra proposta"
 * finché non piace, senza chiudere e riaprire nulla.
 */
export function CambiaPastoSheet({
  open,
  onClose,
  titolo,
  ricetta,
  motivo,
  lockata,
  avviso,
  inCorso,
  onCambia,
  onToggleLock,
  onScegliDalRicettario,
  onTogli,
}: CambiaPastoSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title={titolo}>
      <div className="flex flex-col gap-4">
        <div className="rounded-lg bg-paper-100 px-4 py-3">
          <p className="text-caption text-paper-500 uppercase tracking-wide font-semibold">Adesso</p>
          <p className={cn("text-title-md font-display font-semibold text-paper-900 mt-0.5 transition-opacity", inCorso && "opacity-40")}>
            {ricetta ? ricetta.nome : "Nessun piatto"}
          </p>
          {ricetta && (
            <p className="text-caption text-paper-500 mt-0.5">
              {ricetta.tempoMin} min · € {ricetta.costoStimatoPorzione.toFixed(2)}/porz.{motivo ? ` · ${motivo}` : ""}
            </p>
          )}
          {avviso && <p className="text-body-sm text-danger-500 mt-2">{avviso}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {OPZIONI_CAMBIO.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onCambia(o)}
              className={cn(
                "flex items-center gap-2 h-12 px-3 rounded-lg border text-left text-body-sm font-medium active:scale-[0.98] transition-transform",
                o.id === "altra"
                  ? "col-span-2 justify-center bg-primary-700 border-primary-700 text-paper-50"
                  : "bg-paper-0 border-paper-200 text-paper-800",
              )}
            >
              {o.id === "altra" ? <RefreshCw size={18} /> : o.icona}
              {o.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {onToggleLock && (
            <button type="button" onClick={onToggleLock} className="flex items-center gap-2.5 h-11 px-1 text-body-md text-paper-700">
              {lockata ? <Lock size={18} className="text-accent-500" /> : <LockOpen size={18} className="text-paper-400" />}
              {lockata ? "Fisso: «Rigenera» non lo cambia" : "Tienilo fisso quando rigeneri"}
            </button>
          )}
          {onScegliDalRicettario && (
            <button type="button" onClick={onScegliDalRicettario} className="flex items-center gap-2.5 h-11 px-1 text-body-md text-paper-700">
              <BookOpen size={18} className="text-paper-400" /> Scegli tu dal ricettario
            </button>
          )}
          {onTogli && ricetta && (
            <button type="button" onClick={onTogli} className="flex items-center gap-2.5 h-11 px-1 text-body-md text-danger-500">
              <Trash2 size={18} /> Lascia vuoto questo pasto
            </button>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
