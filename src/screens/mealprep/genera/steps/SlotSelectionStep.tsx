import { Lock } from "lucide-react";
import { Card } from "../../../../components/Card";
import { Chip } from "../../../../components/Chip";
import { Checkbox } from "../../../../components/Checkbox";
import { GIORNI, PASTI, chiaveSlot, type Giorno, type Pasto, type Piano, type Ricetta } from "../../../../types";
import { GIORNO_LABEL_FULL } from "../../../../lib/date";
import { PASTO_LABEL } from "../../../../lib/recipeDisplay";
import { chiaviNonBloccate } from "../../../../lib/planSlots";
import { cn } from "../../../../lib/cn";

const FERIALI: Giorno[] = ["Lun", "Mar", "Mer", "Gio", "Ven"];
const WEEKEND: Giorno[] = ["Sab", "Dom"];

type SlotSelectionStepProps = {
  pianoAttuale: Piano;
  ricette: Ricetta[];
  selezionati: string[];
  onChange: (selezionati: string[]) => void;
};

export function SlotSelectionStep({ pianoAttuale, ricette, selezionati, onChange }: SlotSelectionStepProps) {
  const set = new Set(selezionati);
  const tutte = chiaviNonBloccate(pianoAttuale);

  const applica = (nuovo: Set<string>) => onChange(Array.from(nuovo));

  const toggleSlot = (chiave: string) => {
    if (pianoAttuale[chiave]?.lockata) return;
    const next = new Set(set);
    if (next.has(chiave)) next.delete(chiave);
    else next.add(chiave);
    applica(next);
  };

  const toggleGruppo = (chiaviGruppo: string[]) => {
    const valide = chiaviGruppo.filter((c) => !pianoAttuale[c]?.lockata);
    const tutteSelezionate = valide.every((c) => set.has(c));
    const next = new Set(set);
    valide.forEach((c) => (tutteSelezionate ? next.delete(c) : next.add(c)));
    applica(next);
  };

  const chiaviPasto = (pasto: Pasto) => GIORNI.map((g) => chiaveSlot(g, pasto));
  const chiaviGiorni = (giorni: Giorno[]) => giorni.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p)));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <Chip onClick={() => applica(new Set(tutte))}>Tutti</Chip>
        <Chip onClick={() => applica(new Set())}>Nessuno</Chip>
        <Chip onClick={() => toggleGruppo(chiaviPasto("colazione"))}>Colazioni</Chip>
        <Chip onClick={() => toggleGruppo(chiaviPasto("pranzo"))}>Pranzi</Chip>
        <Chip onClick={() => toggleGruppo(chiaviPasto("cena"))}>Cene</Chip>
        <Chip onClick={() => toggleGruppo(chiaviGiorni(FERIALI))}>Feriali</Chip>
        <Chip onClick={() => toggleGruppo(chiaviGiorni(WEEKEND))}>Weekend</Chip>
      </div>

      <p className="text-body-sm text-paper-500">
        Segna i pasti che vuoi far generare. I pasti già assegnati restano com'erano, a meno che tu
        non li selezioni tu stesso per rigenerarli.
      </p>

      {GIORNI.map((giorno) => (
        <div key={giorno}>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide px-1 mb-1.5">
            {GIORNO_LABEL_FULL[giorno]}
          </h3>
          <Card padded={false} className="divide-y divide-paper-100 overflow-hidden">
            {PASTI.map((pasto) => {
              const chiave = chiaveSlot(giorno, pasto);
              const slot = pianoAttuale[chiave];
              const ricetta = slot ? ricette.find((r) => r.id === slot.ricettaId) : undefined;
              const lockata = Boolean(slot?.lockata);
              const selezionato = set.has(chiave);
              return (
                <button
                  key={pasto}
                  onClick={() => toggleSlot(chiave)}
                  disabled={lockata}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    !lockata && "active:bg-paper-100",
                  )}
                >
                  <Checkbox checked={selezionato && !lockata} disabled={lockata} />
                  <div className="flex-1 min-w-0">
                    <div className="text-caption text-paper-500">{PASTO_LABEL[pasto]}</div>
                    {ricetta ? (
                      <div className="text-body-sm text-paper-700 truncate">{ricetta.nome}</div>
                    ) : (
                      <div className="text-body-sm text-paper-300">Vuoto</div>
                    )}
                  </div>
                  {lockata ? (
                    <Lock size={14} className="text-accent-500 shrink-0" />
                  ) : (
                    ricetta && (
                      <span className="text-caption text-paper-400 shrink-0">Già presente</span>
                    )
                  )}
                </button>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
