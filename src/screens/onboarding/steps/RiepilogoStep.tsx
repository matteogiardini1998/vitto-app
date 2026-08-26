import type { Profilo } from "../../../types";
import { Card } from "../../../components/Card";

const TIPO_LABEL: Record<Profilo["nucleo"]["tipo"], string> = {
  single: "Solo per me",
  coppia: "Coppia",
  "famiglia-bambini": "Famiglia con bambini piccoli",
  "famiglia-adulta": "Famiglia adulta",
  coinquilini: "Coinquilini",
};

const DIETA_LABEL: Record<Profilo["dieta"], string> = {
  onnivora: "Onnivora",
  vegetariana: "Vegetariana",
  vegana: "Vegana",
  pescetariana: "Pescetariana",
  fruttariana: "Fruttariana",
  crudista: "Crudista",
};

type RiepilogoStepProps = {
  draft: Profilo;
  onEdit: (step: number) => void;
};

function RiepilogoRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <Card className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-body-sm text-paper-500">{label}</div>
        <div className="text-body-lg font-medium text-paper-900 truncate">{value}</div>
      </div>
      <button
        onClick={onEdit}
        className="text-body-sm font-semibold text-primary-700 dark:text-primary-300 shrink-0 active:text-primary-800"
      >
        Modifica
      </button>
    </Card>
  );
}

export function RiepilogoStep({ draft, onEdit }: RiepilogoStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <RiepilogoRow
        label="Anagrafica"
        value={`${draft.nome} ${draft.cognome} · ${draft.eta} anni${draft.residenza ? ` · ${draft.residenza}` : ""}`}
        onEdit={() => onEdit(1)}
      />
      <RiepilogoRow
        label="Nucleo"
        value={`${draft.nucleo.persone} ${draft.nucleo.persone === 1 ? "persona" : "persone"} · ${TIPO_LABEL[draft.nucleo.tipo]}`}
        onEdit={() => onEdit(2)}
      />
      <RiepilogoRow label="Tempo in cucina" value={`Fino a ${draft.tempoMaxCucina} min`} onEdit={() => onEdit(3)} />
      <RiepilogoRow label="Dieta" value={DIETA_LABEL[draft.dieta]} onEdit={() => onEdit(4)} />
      <RiepilogoRow
        label="Allergie e intolleranze"
        value={draft.esclusioniAssolute.length ? draft.esclusioniAssolute.join(", ") : "Nessuna"}
        onEdit={() => onEdit(5)}
      />
      <RiepilogoRow
        label="Preferenze"
        value={draft.preferenzeNegative.length ? draft.preferenzeNegative.join(", ") : "Nessuna"}
        onEdit={() => onEdit(6)}
      />
      <RiepilogoRow
        label="Supermercato"
        value={draft.supermercatoPreferito || "Non impostato"}
        onEdit={() => onEdit(7)}
      />
    </div>
  );
}
