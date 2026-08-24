import { User, Users, Baby, UsersRound, Home } from "lucide-react";
import type { Profilo, TipoNucleo } from "../../../types";
import { Stepper } from "../../../components/Stepper";
import { SelectableCard } from "../../../components/SelectableCard";

const TIPI: { value: TipoNucleo; label: string; icon: typeof User }[] = [
  { value: "single", label: "Solo per me", icon: User },
  { value: "coppia", label: "Coppia", icon: Users },
  { value: "famiglia-bambini", label: "Famiglia con bambini piccoli", icon: Baby },
  { value: "famiglia-adulta", label: "Famiglia adulta", icon: UsersRound },
  { value: "coinquilini", label: "Coinquilini", icon: Home },
];

type NucleoStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function NucleoStep({ draft, onChange }: NucleoStepProps) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-3 py-2">
        <span className="text-body-sm font-medium text-paper-500">Per quanti cucini?</span>
        <Stepper
          value={draft.nucleo.persone}
          min={1}
          max={12}
          label="persone"
          onChange={(persone) => onChange({ nucleo: { ...draft.nucleo, persone } })}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        {TIPI.map((t) => (
          <SelectableCard
            key={t.value}
            label={t.label}
            icon={t.icon}
            selected={draft.nucleo.tipo === t.value}
            onClick={() => onChange({ nucleo: { ...draft.nucleo, tipo: t.value } })}
          />
        ))}
      </div>
    </div>
  );
}
