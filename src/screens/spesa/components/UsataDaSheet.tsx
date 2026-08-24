import { BottomSheet } from "../../../components/BottomSheet";
import type { VoceSpesa } from "../../../types";
import { formattaChiaveSlot } from "../../../lib/format";

type UsataDaSheetProps = {
  open: boolean;
  onClose: () => void;
  voce: VoceSpesa | null;
};

export function UsataDaSheet({ open, onClose, voce }: UsataDaSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title={voce?.nome ?? ""}>
      <p className="text-body-sm text-paper-500 mb-3">Serve per:</p>
      <ul className="flex flex-col divide-y divide-paper-100 rounded-md border border-paper-100 overflow-hidden">
        {voce?.usataDa?.map((u, i) => (
          <li key={i} className="flex items-center justify-between px-4 py-3 bg-paper-0">
            <span className="text-body-md text-paper-800">{u.ricettaNome}</span>
            <span className="text-body-sm text-paper-500 capitalize">{formattaChiaveSlot(u.chiaveSlot)}</span>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
