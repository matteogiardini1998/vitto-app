import { BottomSheet } from "../../../components/BottomSheet";
import { SlotPickerTable } from "../../../components/SlotPickerTable";
import { usePlanStore } from "../../../store/planStore";
import { useToastStore } from "../../../store/toastStore";
import { chiaveSlot, type Giorno, type Pasto } from "../../../types";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";

type MoveSlotSheetProps = {
  open: boolean;
  onClose: () => void;
  chiaveOrigine: string;
};

export function MoveSlotSheet({ open, onClose, chiaveOrigine }: MoveSlotSheetProps) {
  const slot = usePlanStore((s) => s.piano[chiaveOrigine]);
  const setSlot = usePlanStore((s) => s.setSlot);
  const removeSlot = usePlanStore((s) => s.removeSlot);
  const showToast = useToastStore((s) => s.show);

  const sposta = (giorno: Giorno, pasto: Pasto) => {
    if (!slot) return;
    const nuovaChiave = chiaveSlot(giorno, pasto);
    setSlot(nuovaChiave, slot.ricettaId, slot.porzioni);
    removeSlot(chiaveOrigine);
    showToast(`Spostata a ${giorno} · ${PASTO_LABEL[pasto]}`);
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Sposta in un altro giorno">
      <SlotPickerTable onPick={sposta} escludiChiave={chiaveOrigine} />
      <p className="text-body-sm text-paper-500 mt-4">
        Tocca lo slot di destinazione. Gli slot arancioni sono già occupati e verranno sovrascritti.
      </p>
    </BottomSheet>
  );
}
