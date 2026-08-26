import { ShieldCheck } from "lucide-react";
import type { Profilo } from "../../../types";
import { Chip } from "../../../components/Chip";
import { TagInput } from "../../../components/TagInput";
import { Callout } from "../../../components/Callout";

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
      <Callout icon={ShieldCheck} tone="shield">
        Questi alimenti non compariranno <strong>mai</strong> in nessuna ricetta, nemmeno in tracce: te lo
        garantiamo.
      </Callout>

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
