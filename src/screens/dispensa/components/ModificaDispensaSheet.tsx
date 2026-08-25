import { useEffect, useState } from "react";
import { Trash2, Eraser } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { TextField } from "../../../components/TextField";
import { ICONE_DISPENSA } from "../../../components/IconaDispensaGlyph";
import { useDispensaStore } from "../../../store/dispensaStore";
import { useToastStore } from "../../../store/toastStore";
import { cn } from "../../../lib/cn";

export function ModificaDispensaSheet({ dispensaId, onClose }: { dispensaId: string | null; onClose: () => void }) {
  const dispense = useDispensaStore((s) => s.dispense);
  const rinominaDispensa = useDispensaStore((s) => s.rinominaDispensa);
  const cambiaIconaDispensa = useDispensaStore((s) => s.cambiaIconaDispensa);
  const svuotaDispensa = useDispensaStore((s) => s.svuotaDispensa);
  const eliminaDispensa = useDispensaStore((s) => s.eliminaDispensa);
  const showToast = useToastStore((s) => s.show);

  const dispensa = dispense.find((d) => d.id === dispensaId) ?? null;
  const eUltima = dispense.length <= 1;

  const [nome, setNome] = useState(dispensa?.nome ?? "");
  const [confermaElimina, setConfermaElimina] = useState(false);
  const [confermaSvuota, setConfermaSvuota] = useState(false);

  useEffect(() => {
    setNome(dispensa?.nome ?? "");
    setConfermaElimina(false);
    setConfermaSvuota(false);
  }, [dispensa?.id]);

  if (!dispensa) return null;

  const handleSvuota = () => {
    if (!confermaSvuota) {
      setConfermaSvuota(true);
      return;
    }
    svuotaDispensa(dispensa.id);
    setConfermaSvuota(false);
    showToast("Dispensa svuotata");
  };

  const handleElimina = () => {
    if (!confermaElimina) {
      setConfermaElimina(true);
      return;
    }
    eliminaDispensa(dispensa.id);
    showToast("Dispensa eliminata");
    onClose();
  };

  return (
    <BottomSheet open={dispensaId != null} onClose={onClose} title="Modifica dispensa">
      <div className="flex flex-col gap-4">
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={() => rinominaDispensa(dispensa.id, nome)}
        />

        <div>
          <p className="text-body-sm font-medium text-paper-600 mb-1.5">Icona</p>
          <div className="flex gap-2">
            {ICONE_DISPENSA.map((opz) => (
              <button
                key={opz.id}
                type="button"
                onClick={() => cambiaIconaDispensa(dispensa.id, opz.id)}
                aria-label={opz.label}
                className={cn(
                  "h-11 w-11 rounded-full flex items-center justify-center transition-colors",
                  dispensa.icona === opz.id ? "bg-primary-700 text-paper-50" : "bg-paper-100 text-paper-600",
                )}
              >
                <opz.icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSvuota}
          className="flex items-center gap-2 text-body-md font-semibold text-paper-600 py-2"
        >
          <Eraser size={17} />
          {confermaSvuota ? "Tocca di nuovo per confermare" : "Svuota dispensa"}
        </button>

        {!eUltima && (
          <button
            type="button"
            onClick={handleElimina}
            className="flex items-center gap-2 text-body-md font-semibold text-danger-500 py-2"
          >
            <Trash2 size={17} />
            {confermaElimina ? "Tocca di nuovo per confermare" : "Elimina dispensa"}
          </button>
        )}
        {eUltima && (
          <p className="text-body-sm text-paper-400">
            Questa è l'unica dispensa rimasta: puoi svuotarla, ma non eliminarla.
          </p>
        )}
      </div>
    </BottomSheet>
  );
}
