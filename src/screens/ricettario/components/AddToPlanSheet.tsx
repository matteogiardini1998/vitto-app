import { BottomSheet } from "../../../components/BottomSheet";
import { SlotPickerTable } from "../../../components/SlotPickerTable";
import { chiaveSlot, type Giorno, type Pasto, type Ricetta } from "../../../types";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";
import { usePlanStore } from "../../../store/planStore";
import { useToastStore } from "../../../store/toastStore";

type AddToPlanSheetProps = {
  open: boolean;
  onClose: () => void;
  ricetta: Ricetta;
};

export function AddToPlanSheet({ open, onClose, ricetta }: AddToPlanSheetProps) {
  const setSlot = usePlanStore((s) => s.setSlot);
  const showToast = useToastStore((s) => s.show);

  const assegna = (giorno: Giorno, pasto: Pasto) => {
    setSlot(chiaveSlot(giorno, pasto), ricetta.id, ricetta.porzioniBase);
    showToast(`Aggiunta a ${giorno} · ${PASTO_LABEL[pasto]}`);
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Aggiungi al piano">
      <SlotPickerTable onPick={assegna} />
      <p className="text-body-sm text-paper-500 mt-4">
        Tocca uno slot per assegnare <strong>{ricetta.nome}</strong>. Gli slot arancioni sono già
        occupati e verranno sovrascritti.
      </p>
    </BottomSheet>
  );
}
