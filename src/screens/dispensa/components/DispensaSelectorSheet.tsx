import { useState } from "react";
import { Check, Pencil, Plus } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { IconaDispensaGlyph } from "../../../components/IconaDispensaGlyph";
import { useDispensaStore } from "../../../store/dispensaStore";
import { cn } from "../../../lib/cn";

type DispensaSelectorSheetProps = {
  open: boolean;
  onClose: () => void;
  onModifica: (dispensaId: string) => void;
};

export function DispensaSelectorSheet({ open, onClose, onModifica }: DispensaSelectorSheetProps) {
  const dispense = useDispensaStore((s) => s.dispense);
  const attivaId = useDispensaStore((s) => s.dispensaAttivaId);
  const setAttiva = useDispensaStore((s) => s.setDispensaAttiva);
  const creaDispensa = useDispensaStore((s) => s.creaDispensa);

  const [nuovoNome, setNuovoNome] = useState("");

  const handleCrea = () => {
    const nome = nuovoNome.trim();
    if (!nome) return;
    const id = creaDispensa(nome, "credenza");
    setAttiva(id);
    setNuovoNome("");
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Le tue dispense">
      <div className="flex flex-col gap-2">
        {dispense.map((d) => (
          <div
            key={d.id}
            className={cn(
              "flex items-center gap-1 rounded-xl border",
              d.id === attivaId ? "border-primary-300 bg-primary-50" : "border-paper-200 bg-paper-0",
            )}
          >
            <button
              type="button"
              onClick={() => {
                setAttiva(d.id);
                onClose();
              }}
              className="flex-1 flex items-center gap-3 py-3 px-3.5 text-left"
            >
              <span
                className={cn(
                  "h-10 w-10 shrink-0 rounded-full flex items-center justify-center",
                  d.id === attivaId ? "bg-primary-700 text-paper-50" : "bg-paper-100 text-paper-600",
                )}
              >
                <IconaDispensaGlyph icona={d.icona} size={18} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-body-lg font-medium text-paper-900 truncate">{d.nome}</span>
                <span className="block text-caption text-paper-500">
                  {d.voci.length} {d.voci.length === 1 ? "voce" : "voci"}
                </span>
              </span>
              {d.id === attivaId && <Check size={18} className="text-primary-700 shrink-0" />}
            </button>
            <button
              type="button"
              onClick={() => onModifica(d.id)}
              aria-label={`Modifica ${d.nome}`}
              className="h-10 w-10 shrink-0 flex items-center justify-center text-paper-400 mr-1"
            >
              <Pencil size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          value={nuovoNome}
          onChange={(e) => setNuovoNome(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCrea();
            }
          }}
          placeholder="Nome nuova dispensa"
          className="flex-1 h-11 rounded-full border border-paper-200 bg-paper-0 px-4 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
        <button
          type="button"
          onClick={handleCrea}
          disabled={!nuovoNome.trim()}
          aria-label="Crea dispensa"
          className="h-11 w-11 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
        >
          <Plus size={20} />
        </button>
      </div>
    </BottomSheet>
  );
}
