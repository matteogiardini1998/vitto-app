import { AlertTriangle } from "lucide-react";
import type { Profilo } from "../../../types";
import { Chip } from "../../../components/Chip";
import { TagInput } from "../../../components/TagInput";

const CHIP_RAPIDE = [
  "Glutine / celiachia",
  "Lattosio",
  "Frutta a guscio",
  "Crostacei",
  "Uova",
  "Pesce",
  "Soia",
  "Sesamo",
];

type EsclusioniStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function EsclusioniStep({ draft, onChange }: EsclusioniStepProps) {
  const toggle = (voce: string) => {
    const has = draft.esclusioniAssolute.includes(voce);
    onChange({
      esclusioniAssolute: has
        ? draft.esclusioniAssolute.filter((v) => v !== voce)
        : [...draft.esclusioniAssolute, voce],
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 rounded-md bg-accent-50 border border-accent-200">
        <AlertTriangle size={20} className="text-accent-600 shrink-0 mt-0.5" strokeWidth={1.8} />
        <p className="text-body-sm text-accent-800">
          Questi alimenti non compariranno <strong>mai</strong> in nessuna ricetta, nemmeno in
          tracce.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CHIP_RAPIDE.map((voce) => (
          <Chip key={voce} selected={draft.esclusioniAssolute.includes(voce)} onClick={() => toggle(voce)}>
            {voce}
          </Chip>
        ))}
      </div>

      <div>
        <span className="text-body-sm font-medium text-paper-600 block mb-2">Altro</span>
        <TagInput
          value={draft.esclusioniAssolute.filter((v) => !CHIP_RAPIDE.includes(v))}
          onChange={(altro) =>
            onChange({
              esclusioniAssolute: [
                ...draft.esclusioniAssolute.filter((v) => CHIP_RAPIDE.includes(v)),
                ...altro,
              ],
            })
          }
          placeholder="Es. arachidi, kiwi..."
        />
      </div>
    </div>
  );
}
