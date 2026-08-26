import { useState } from "react";
import { User, Users, Baby, UsersRound, Home } from "lucide-react";
import type { Profilo, TipoNucleo } from "../../../types";
import { Stepper } from "../../../components/Stepper";
import { SelectableCard } from "../../../components/SelectableCard";

const TIPI: { value: TipoNucleo; label: string; icon: typeof User; personeDefault: number }[] = [
  { value: "single", label: "Solo per me", icon: User, personeDefault: 1 },
  { value: "coppia", label: "Coppia", icon: Users, personeDefault: 2 },
  { value: "famiglia-bambini", label: "Famiglia con bambini piccoli", icon: Baby, personeDefault: 3 },
  { value: "famiglia-adulta", label: "Famiglia adulta", icon: UsersRound, personeDefault: 3 },
  { value: "coinquilini", label: "Coinquilini", icon: Home, personeDefault: 1 },
];

type NucleoStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function NucleoStep({ draft, onChange }: NucleoStepProps) {
  // Finché l'utente non tocca lo stepper a mano, scegliere un tipo di nucleo
  // pre-compila il numero di persone. Al primo tocco manuale, vince sempre lui.
  const [personeModificateAMano, setPersoneModificateAMano] = useState(false);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-3 py-5 rounded-lg bg-primary-50 border border-primary-100">
        <span className="text-body-md font-medium text-primary-800">Per quanti cucini?</span>
        <Stepper
          size="lg"
          value={draft.nucleo.persone}
          min={1}
          max={12}
          label="persone"
          onChange={(persone) => {
            setPersoneModificateAMano(true);
            onChange({ nucleo: { ...draft.nucleo, persone } });
          }}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        {TIPI.map((t) => (
          <SelectableCard
            key={t.value}
            label={t.label}
            icon={t.icon}
            selected={draft.nucleo.tipo === t.value}
            onClick={() =>
              onChange({
                nucleo: {
                  ...draft.nucleo,
                  tipo: t.value,
                  persone: personeModificateAMano ? draft.nucleo.persone : t.personeDefault,
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
