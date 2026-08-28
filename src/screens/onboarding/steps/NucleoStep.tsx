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

/**
 * L'automatismo vale anche partendo dal numero: cambiare le persone con lo
 * stepper sposta il tipo lungo la scala naturale solo↔coppia↔famiglia.
 * "Coinquilini" e "famiglia con bambini" restano invece scelte esplicite che
 * il numero da solo non tocca — un coinquilino in più non fa "famiglia", un
 * figlio in più (o in meno) non lo toglie.
 */
function tipoAutomaticoPer(persone: number, tipoAttuale: TipoNucleo): TipoNucleo {
  if (tipoAttuale === "coinquilini" || tipoAttuale === "famiglia-bambini") return tipoAttuale;
  if (persone <= 1) return "single";
  if (persone === 2) return "coppia";
  return "famiglia-adulta";
}

type NucleoStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function NucleoStep({ draft, onChange }: NucleoStepProps) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-3 py-5 rounded-lg bg-primary-50 border border-primary-100 dark:bg-primary-900/40 dark:border-primary-800">
        <span className="text-body-md font-medium text-primary-800 dark:text-primary-200">Per quanti cucini?</span>
        <Stepper
          size="lg"
          value={draft.nucleo.persone}
          min={1}
          max={Infinity}
          label="persone"
          onChange={(persone) =>
            onChange({ nucleo: { ...draft.nucleo, persone, tipo: tipoAutomaticoPer(persone, draft.nucleo.tipo) } })
          }
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
              // Scegliere un tipo pre-compila SEMPRE il numero di persone col suo
              // default, in entrambe le direzioni — a meno che sia già quello attivo,
              // per non azzerare un aggiustamento manuale fatto sullo stesso tipo.
              onChange({
                nucleo: {
                  ...draft.nucleo,
                  tipo: t.value,
                  persone: t.value === draft.nucleo.tipo ? draft.nucleo.persone : t.personeDefault,
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
