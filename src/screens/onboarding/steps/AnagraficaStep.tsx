import type { Profilo } from "../../../types";
import { TextField } from "../../../components/TextField";

type AnagraficaStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function AnagraficaStep({ draft, onChange }: AnagraficaStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Nome"
        placeholder="Il tuo nome"
        value={draft.nome}
        onChange={(e) => onChange({ nome: e.target.value })}
        autoFocus
      />
      <TextField
        label="Cognome"
        placeholder="Il tuo cognome"
        value={draft.cognome}
        onChange={(e) => onChange({ cognome: e.target.value })}
      />
      <TextField
        label="Età"
        placeholder="Es. 32"
        type="number"
        inputMode="numeric"
        value={draft.eta || ""}
        onChange={(e) => onChange({ eta: Number(e.target.value) || 0 })}
      />
      <TextField
        label="Città di residenza"
        placeholder="Es. Milano"
        value={draft.residenza}
        onChange={(e) => onChange({ residenza: e.target.value })}
      />
    </div>
  );
}
