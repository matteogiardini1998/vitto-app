import { Plus, Trash2 } from "lucide-react";
import { Chip } from "../../../../components/Chip";
import { Button } from "../../../../components/Button";
import { Stepper } from "../../../../components/Stepper";
import { TIPO_VINCOLO_LABEL, type TipoVincolo, type VincoloPuntuale } from "../../../../lib/generator";
import { generaId } from "../../../../lib/id";

type VincoliStepProps = {
  value: VincoloPuntuale[];
  onChange: (value: VincoloPuntuale[]) => void;
};

const TIPI: TipoVincolo[] = ["almeno", "massimo", "poco", "molto"];

export function VincoliStep({ value, onChange }: VincoliStepProps) {
  const aggiungi = () => {
    onChange([...value, { id: generaId(), testo: "", tipo: "almeno", volte: 1 }]);
  };

  const aggiorna = (id: string, patch: Partial<VincoloPuntuale>) => {
    onChange(value.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  };

  const rimuovi = (id: string) => {
    onChange(value.filter((v) => v.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      {value.map((v) => (
        <div key={v.id} className="p-3.5 rounded-md border border-paper-200 bg-paper-0 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              value={v.testo}
              onChange={(e) => aggiorna(v.id, { testo: e.target.value })}
              placeholder="Es. pollo al curry, pasta, carne..."
              className="flex-1 h-11 rounded-md border border-paper-200 bg-paper-0 px-3 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
            <button onClick={() => rimuovi(v.id)} aria-label="Rimuovi" className="text-paper-400 shrink-0 p-1">
              <Trash2 size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {TIPI.map((tipo) => (
              <Chip key={tipo} selected={v.tipo === tipo} onClick={() => aggiorna(v.id, { tipo })}>
                {TIPO_VINCOLO_LABEL[tipo]}
              </Chip>
            ))}
          </div>
          {(v.tipo === "almeno" || v.tipo === "massimo") && (
            <div className="flex justify-center pt-1">
              <Stepper value={v.volte} min={1} max={7} label="volte" onChange={(volte) => aggiorna(v.id, { volte })} />
            </div>
          )}
        </div>
      ))}
      <Button variant="secondary" fullWidth onClick={aggiungi} className="gap-2">
        <Plus size={18} /> Aggiungi richiesta
      </Button>
    </div>
  );
}
