import { Lock, LockOpen, Repeat, Trash2, MoveRight } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { Stepper } from "../../../components/Stepper";
import { Button } from "../../../components/Button";
import { usePlanStore } from "../../../store/planStore";
import { useRecipeStore } from "../../../store/recipeStore";
import { useToastStore } from "../../../store/toastStore";
import type { Giorno, Pasto } from "../../../types";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";

type SlotActionsSheetProps = {
  open: boolean;
  onClose: () => void;
  chiave: string;
  giorno: Giorno;
  pasto: Pasto;
  onSostituisci: () => void;
  onSposta: () => void;
};

export function SlotActionsSheet({
  open,
  onClose,
  chiave,
  giorno,
  pasto,
  onSostituisci,
  onSposta,
}: SlotActionsSheetProps) {
  const slot = usePlanStore((s) => s.piano[chiave]);
  const setPorzioni = usePlanStore((s) => s.setPorzioni);
  const toggleLock = usePlanStore((s) => s.toggleLock);
  const removeSlot = usePlanStore((s) => s.removeSlot);
  const ricetta = useRecipeStore((s) => s.ricette.find((r) => r.id === slot?.ricettaId));
  const showToast = useToastStore((s) => s.show);

  if (!slot || !ricetta) return null;

  const rimuovi = () => {
    removeSlot(chiave);
    showToast("Rimossa dal piano");
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title={`${giorno} · ${PASTO_LABEL[pasto]}`}>
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-title-md font-display font-semibold text-paper-900">{ricetta.nome}</h3>
          <p className="text-body-sm text-paper-500 mt-0.5">{ricetta.descrizione}</p>
        </div>

        <div className="flex justify-center">
          <Stepper value={slot.porzioni} min={1} max={20} label="porzioni" onChange={(p) => setPorzioni(chiave, p)} />
        </div>

        <button
          onClick={() => toggleLock(chiave)}
          className="flex items-center justify-between p-4 rounded-md bg-paper-100"
        >
          <span className="flex items-center gap-2 text-body-md font-medium text-paper-800">
            {slot.lockata ? <Lock size={18} className="text-accent-500" /> : <LockOpen size={18} className="text-paper-400" />}
            {slot.lockata ? "Slot bloccato" : "Blocca slot"}
          </span>
          <span className="text-body-sm text-paper-500">
            {slot.lockata ? "La generazione non lo toccherà" : "Tocca per bloccare"}
          </span>
        </button>

        <div className="flex flex-col gap-2">
          <Button variant="secondary" fullWidth onClick={onSostituisci} className="justify-start gap-2.5">
            <Repeat size={18} /> Sostituisci ricetta
          </Button>
          <Button variant="secondary" fullWidth onClick={onSposta} className="justify-start gap-2.5">
            <MoveRight size={18} /> Sposta in un altro giorno
          </Button>
          <Button variant="danger" fullWidth onClick={rimuovi} className="justify-start gap-2.5">
            <Trash2 size={18} /> Rimuovi dal piano
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
