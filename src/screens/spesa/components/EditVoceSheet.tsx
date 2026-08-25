import { useState } from "react";
import { Trash2 } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { REPARTI, type Reparto, type VoceSpesa } from "../../../types";
import { impareCategoria } from "../../../lib/smistamento";
import { useShoppingStore } from "../../../store/shoppingStore";

type EditVoceSheetProps = {
  open: boolean;
  onClose: () => void;
  voce: VoceSpesa | null;
};

export function EditVoceSheet({ open, onClose, voce }: EditVoceSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Modifica voce">
      {voce && <EditVoceForm key={voce.id} voce={voce} onClose={onClose} />}
    </BottomSheet>
  );
}

function EditVoceForm({ voce, onClose }: { voce: VoceSpesa; onClose: () => void }) {
  const aggiornaVoce = useShoppingStore((s) => s.aggiornaVoce);
  const rimuoviVoce = useShoppingStore((s) => s.rimuoviVoce);

  const [nome, setNome] = useState(voce.nome);
  const [qta, setQta] = useState(voce.qta != null ? String(voce.qta) : "");
  const [unita, setUnita] = useState(voce.unita);
  const [reparto, setReparto] = useState<Reparto>(voce.reparto);

  const salva = () => {
    const nomeFinale = nome.trim() || voce.nome;
    aggiornaVoce(voce.id, {
      nome: nomeFinale,
      qta: qta.trim() === "" ? null : Number(qta),
      unita: unita.trim(),
      reparto,
    });
    if (reparto !== voce.reparto) impareCategoria(nomeFinale, reparto);
    onClose();
  };

  const elimina = () => {
    rimuoviVoce(voce.id);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Quantità" type="number" value={qta} onChange={(e) => setQta(e.target.value)} placeholder="Es. 2" />
        <TextField label="Unità" value={unita} onChange={(e) => setUnita(e.target.value)} placeholder="Es. pz, g..." />
      </div>
      <div>
        <span className="text-body-sm font-medium text-paper-600 block mb-1.5">Reparto</span>
        <select
          value={reparto}
          onChange={(e) => setReparto(e.target.value as Reparto)}
          className="w-full h-11 rounded-md border border-paper-200 bg-paper-0 px-3 text-body-md text-paper-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        >
          {REPARTI.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <Button fullWidth size="lg" onClick={salva}>
        Salva
      </Button>
      <Button variant="danger" fullWidth onClick={elimina} className="gap-2">
        <Trash2 size={18} /> Rimuovi dalla lista
      </Button>
    </div>
  );
}
