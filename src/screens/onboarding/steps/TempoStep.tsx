import { Zap, Clock3, Clock9, Clock12 } from "lucide-react";
import type { Profilo, TempoMaxCucina } from "../../../types";
import { SelectableCard } from "../../../components/SelectableCard";

const OPZIONI: { value: TempoMaxCucina; label: string; description: string; icon: typeof Zap }[] = [
  { value: 20, label: "Fino a 20 minuti", description: "Voglio essere veloce", icon: Zap },
  { value: 45, label: "Fino a 45 minuti", description: "Un buon compromesso", icon: Clock3 },
  { value: 60, label: "Fino a 1 ora", description: "Mi piace curare i dettagli", icon: Clock9 },
  { value: 120, label: "Fino a 2 ore", description: "La cucina è un piacere", icon: Clock12 },
];

type TempoStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function TempoStep({ draft, onChange }: TempoStepProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {OPZIONI.map((o) => (
        <SelectableCard
          key={o.value}
          label={o.label}
          description={o.description}
          icon={o.icon}
          selected={draft.tempoMaxCucina === o.value}
          onClick={() => onChange({ tempoMaxCucina: o.value })}
        />
      ))}
    </div>
  );
}
