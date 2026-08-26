import { useMemo, useState } from "react";
import { BottomSheet } from "../../../components/BottomSheet";
import { SearchInput } from "../../../components/SearchInput";
import { EmptyState } from "../../../components/EmptyState";
import { PastoIcon } from "../../../components/PastoIcon";
import { useRecipeStore, RICETTA_VUOTA } from "../../../store/recipeStore";
import { filtraEOrdinaRicette } from "../../../lib/recipeFilters";
import { FILTRI_VUOTI } from "../../../lib/filtriRicette";
import { BookOpen, Clock3, Euro, Plus } from "lucide-react";
import type { Giorno, Pasto } from "../../../types";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";

type AssignRecipeSheetProps = {
  open: boolean;
  onClose: () => void;
  giorno: Giorno | null;
  pasto: Pasto | null;
  onAssegna: (ricettaId: string, porzioniBase: number) => void;
};

export function AssignRecipeSheet({ open, onClose, giorno, pasto, onAssegna }: AssignRecipeSheetProps) {
  const ricette = useRecipeStore((s) => s.ricette);
  const addRicetta = useRecipeStore((s) => s.addRicetta);
  const [ricerca, setRicerca] = useState("");

  const risultati = useMemo(() => {
    const filtri = pasto ? { ...FILTRI_VUOTI, pasto: [pasto] } : FILTRI_VUOTI;
    return filtraEOrdinaRicette(ricette, ricerca, filtri, "consigliati");
  }, [ricette, ricerca, pasto]);

  const nomeDigitato = ricerca.trim();
  const corrispondenzaEsatta = ricette.some(
    (r) => r.nome.trim().toLowerCase() === nomeDigitato.toLowerCase(),
  );
  const mostraCreaNuova = nomeDigitato.length > 0 && !corrispondenzaEsatta;

  const creaEAssegna = () => {
    const nuovoId = addRicetta({
      ...RICETTA_VUOTA,
      nome: nomeDigitato,
      pasto: pasto ? [pasto] : RICETTA_VUOTA.pasto,
    });
    onAssegna(nuovoId, RICETTA_VUOTA.porzioniBase);
    setRicerca("");
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={giorno && pasto ? `${giorno} · ${PASTO_LABEL[pasto]}` : "Assegna ricetta"}
    >
      <div className="flex flex-col gap-3">
        <SearchInput value={ricerca} onChange={setRicerca} placeholder="Cerca o scrivi un pasto nuovo..." />

        {mostraCreaNuova && (
          <button
            onClick={creaEAssegna}
            className="flex items-center gap-3 p-2.5 rounded-md border-2 border-dashed border-primary-300 bg-primary-50 active:bg-primary-100 dark:bg-primary-900/40 dark:active:bg-primary-900/60 text-left"
          >
            <div className="h-11 w-11 shrink-0 rounded-md bg-primary-700 text-paper-50 flex items-center justify-center">
              <Plus size={20} />
            </div>
            <p className="text-body-md font-medium text-primary-800 dark:text-primary-200">
              Aggiungi "{nomeDigitato}"
            </p>
          </button>
        )}

        <div className="flex flex-col gap-2 max-h-[42vh] overflow-y-auto">
          {risultati.length === 0 ? (
            !mostraCreaNuova && (
              <EmptyState icon={BookOpen} title="Nessuna ricetta trovata" description="Scrivi un nome per aggiungerla direttamente." />
            )
          ) : (
            risultati.map((r) => (
              <button
                key={r.id}
                onClick={() => onAssegna(r.id, r.porzioniBase)}
                className="flex items-center gap-3 p-2.5 rounded-md border border-paper-200 bg-paper-0 active:bg-paper-100 text-left"
              >
                <div className="h-11 w-11 shrink-0 rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 flex items-center justify-center">
                  <PastoIcon pasti={r.pasto} size={18} strokeWidth={1.7} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-body-md font-medium text-paper-900 truncate">{r.nome}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-caption text-paper-500">
                      <Clock3 size={12} /> {r.tempoMin} min
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-caption text-paper-500">
                      <Euro size={12} /> {r.costoStimatoPorzione.toFixed(2)}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
