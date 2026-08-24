import { BottomSheet } from "../../../components/BottomSheet";
import { SelectableCard } from "../../../components/SelectableCard";
import { StarRating } from "../../../components/StarRating";
import type { IncisivitaVoti } from "../../../types";

type IncisivitaSheetProps = {
  open: boolean;
  onClose: () => void;
  valore: IncisivitaVoti;
  minimo: number;
  onChange: (valore: IncisivitaVoti, minimo: number) => void;
};

const OPZIONI: { value: IncisivitaVoti; label: string; description: string }[] = [
  { value: "off", label: "Disattivata", description: "I voti non influenzano il generatore." },
  {
    value: "preferisci-ben-votate",
    label: "Preferisci ben votate",
    description: "A parità di condizioni, il generatore sceglie le ricette con voto più alto.",
  },
  {
    value: "solo-minimo",
    label: "Solo da un voto minimo",
    description: "Il generatore usa solo ricette che hanno almeno il voto indicato.",
  },
];

export function IncisivitaSheet({ open, onClose, valore, minimo, onChange }: IncisivitaSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Incisività dei voti">
      <div className="flex flex-col gap-4">
        <p className="text-body-sm text-paper-500 -mt-1">
          Decide quanto i tuoi voti pesano quando generi automaticamente il piano pasti.
        </p>
        {OPZIONI.map((o) => (
          <SelectableCard
            key={o.value}
            label={o.label}
            description={o.description}
            selected={valore === o.value}
            onClick={() => onChange(o.value, minimo)}
          />
        ))}
        {valore === "solo-minimo" && (
          <div className="flex items-center justify-between p-4 rounded-md bg-paper-100">
            <span className="text-body-md font-medium text-paper-700">Voto minimo</span>
            <StarRating
              value={minimo as 0 | 1 | 2 | 3 | 4 | 5}
              onChange={(v) => onChange(valore, v || 1)}
              size={22}
            />
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
