import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { TextField } from "../../../components/TextField";
import { Chip } from "../../../components/Chip";
import { Switch } from "../../../components/Switch";
import { REPARTI, type Dispensa, type VoceDispensa } from "../../../types";
import { deperibilePropostoPer } from "../../../lib/dispensa";
import { useDispensaStore } from "../../../store/dispensaStore";

type VoceDispensaSheetProps = {
  open: boolean;
  onClose: () => void;
  dispensaId: string;
  voce: VoceDispensa | null;
  altreDispense: Dispensa[];
};

export function VoceDispensaSheet({ open, onClose, dispensaId, voce, altreDispense }: VoceDispensaSheetProps) {
  const aggiornaVoce = useDispensaStore((s) => s.aggiornaVoce);
  const rimuoviVoce = useDispensaStore((s) => s.rimuoviVoce);
  const spostaVoce = useDispensaStore((s) => s.spostaVoce);

  const [draft, setDraft] = useState<VoceDispensa | null>(voce);
  const [confermaElimina, setConfermaElimina] = useState(false);
  const [spostaAperto, setSpostaAperto] = useState(false);

  useEffect(() => {
    setDraft(voce);
    setConfermaElimina(false);
    setSpostaAperto(false);
  }, [voce]);

  if (!draft) return null;

  const salva = (patch: Partial<VoceDispensa>) => {
    const aggiornato = { ...draft, ...patch };
    setDraft(aggiornato);
    aggiornaVoce(dispensaId, draft.id, patch);
  };

  const handleElimina = () => {
    if (!confermaElimina) {
      setConfermaElimina(true);
      return;
    }
    rimuoviVoce(dispensaId, draft.id);
    onClose();
  };

  const handleSposta = (aDispensaId: string) => {
    spostaVoce(draft.id, dispensaId, aDispensaId);
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Modifica voce">
      <div className="flex flex-col gap-4">
        <TextField label="Nome" value={draft.nome} onChange={(e) => salva({ nome: e.target.value })} />

        <div className="flex gap-3">
          <div className="flex-1">
            <TextField
              label="Quantità"
              type="number"
              inputMode="decimal"
              value={draft.qta ?? ""}
              onChange={(e) => salva({ qta: e.target.value === "" ? null : Number(e.target.value) })}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Unità"
              placeholder="g, pz, confezioni..."
              value={draft.unita ?? ""}
              onChange={(e) => salva({ unita: e.target.value || null })}
            />
          </div>
        </div>

        <div>
          <p className="text-body-sm font-medium text-paper-600 mb-1.5">Categoria</p>
          <div className="flex flex-wrap gap-2">
            {REPARTI.map((r) => (
              <Chip
                key={r.value}
                selected={draft.categoria === r.value}
                onClick={() => salva({ categoria: r.value, deperibile: deperibilePropostoPer(r.value) })}
              >
                {r.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 py-1">
          <span className="flex-1 text-body-lg font-medium text-paper-900">Deperibile</span>
          <Switch checked={draft.deperibile} onChange={(v) => salva({ deperibile: v })} label="Deperibile" />
        </div>

        <div className="flex items-center gap-3 py-1">
          <span className="flex-1 text-body-lg font-medium text-paper-900">Da consumare presto</span>
          <Switch
            checked={draft.daConsumarePresto}
            onChange={(v) => salva({ daConsumarePresto: v })}
            label="Da consumare presto"
          />
        </div>

        {altreDispense.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setSpostaAperto((v) => !v)}
              className="text-body-sm font-semibold text-primary-700"
            >
              Sposta in un'altra dispensa
            </button>
            {spostaAperto && (
              <div className="flex flex-wrap gap-2 mt-2">
                {altreDispense.map((d) => (
                  <Chip key={d.id} onClick={() => handleSposta(d.id)}>
                    {d.nome}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={handleElimina}
          className="flex items-center gap-2 text-body-md font-semibold text-danger-500 py-2"
        >
          <Trash2 size={17} />
          {confermaElimina ? "Tocca di nuovo per confermare" : "Elimina voce"}
        </button>
      </div>
    </BottomSheet>
  );
}
