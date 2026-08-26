import { useState } from "react";
import { Trash2 } from "lucide-react";
import { REPARTI, type Ingrediente } from "../../../types";

const UNITA_OPZIONI = [
  { value: "pz", label: "pezzi/unità" },
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
  { value: "cucchiai", label: "cucchiai" },
  { value: "cucchiaini", label: "cucchiaini" },
  { value: "spicchi", label: "spicchi" },
  { value: "fette", label: "fette" },
  { value: "foglie", label: "foglie" },
  { value: "q.b.", label: "q.b." },
];
const UNITA_PRESET_VALUES = new Set(UNITA_OPZIONI.map((o) => o.value));
const ALTRO = "__altro__";

type IngredienteRowProps = {
  ingrediente: Ingrediente;
  onChange: (patch: Partial<Ingrediente>) => void;
  onRimuovi: () => void;
};

/** Riga ingrediente: nome, quantità+unità come un'unica pillola, reparto, elimina — sfoltita a 3 gruppi visivi invece di 4 caselle separate. */
export function IngredienteRow({ ingrediente, onChange, onRimuovi }: IngredienteRowProps) {
  const [personalizzata, setPersonalizzata] = useState(
    () => Boolean(ingrediente.unita) && !UNITA_PRESET_VALUES.has(ingrediente.unita),
  );

  return (
    <div className="flex items-center gap-2 bg-paper-0 border border-paper-200 rounded-md p-2">
      <input
        value={ingrediente.nome}
        onChange={(e) => onChange({ nome: e.target.value })}
        placeholder="Ingrediente"
        className="flex-[2] min-w-0 h-9 px-2 text-body-sm bg-transparent focus:outline-none"
      />
      <div className="flex items-center h-9 rounded-sm bg-paper-100 shrink-0">
        <input
          value={ingrediente.qta ?? ""}
          onChange={(e) => onChange({ qta: e.target.value === "" ? null : Number(e.target.value) })}
          placeholder="Qta"
          type="number"
          className="w-10 h-full pl-2 pr-0.5 text-body-sm text-center bg-transparent focus:outline-none"
        />
        <div className="w-px h-5 bg-paper-300 shrink-0" aria-hidden="true" />
        {personalizzata ? (
          <input
            value={ingrediente.unita}
            onChange={(e) => onChange({ unita: e.target.value })}
            placeholder="unità"
            autoFocus
            className="w-16 h-full pl-1.5 pr-1 text-caption bg-transparent focus:outline-none"
          />
        ) : (
          <select
            value={UNITA_PRESET_VALUES.has(ingrediente.unita) ? ingrediente.unita : "pz"}
            onChange={(e) => {
              if (e.target.value === ALTRO) {
                setPersonalizzata(true);
                onChange({ unita: "" });
              } else {
                onChange({ unita: e.target.value });
              }
            }}
            className="h-full pl-1.5 pr-0.5 text-caption bg-transparent focus:outline-none max-w-[78px]"
          >
            {UNITA_OPZIONI.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
            <option value={ALTRO}>unità personalizzata…</option>
          </select>
        )}
      </div>
      <select
        value={ingrediente.reparto}
        onChange={(e) => onChange({ reparto: e.target.value as Ingrediente["reparto"] })}
        className="h-9 text-caption bg-paper-100 rounded-sm px-1 shrink-0 max-w-[86px]"
      >
        {REPARTI.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <button onClick={onRimuovi} aria-label="Rimuovi ingrediente" className="text-paper-400 shrink-0">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
