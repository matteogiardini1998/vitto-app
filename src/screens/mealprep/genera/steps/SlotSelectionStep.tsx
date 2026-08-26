import { Lock } from "lucide-react";
import { Card } from "../../../../components/Card";
import { Chip } from "../../../../components/Chip";
import { Checkbox } from "../../../../components/Checkbox";
import { GIORNI, PASTI, chiaveSlot, type Giorno, type Pasto, type Piano, type Ricetta } from "../../../../types";
import { GIORNO_LABEL_FULL } from "../../../../lib/date";
import { PASTO_LABEL } from "../../../../lib/recipeDisplay";
import { chiaviVuoteSelezionabili, chiaviPreparate } from "../../../../lib/planSlots";
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
  const selezione = new Set(selezionati);
  const liberi = chiaviVuoteSelezionabili(pianoAttuale);
  const liberiSet = new Set(liberi);
  const preparati = chiaviPreparate(pianoAttuale);

  const overriddenCount = preparati.filter((c) => selezione.has(c)).length;
  const liberiSelezionati = liberi.filter((c) => selezione.has(c)).length;
  const totaleDaGenerare = liberiSelezionati + overriddenCount;
  const preparatiCheRestano = preparati.length - overriddenCount;

  // Un tap diretto su un singolo slot (libero o già preparato) lo aggiunge/toglie dalla selezione: è l'unica
  // azione che può mettere in rigenerazione uno slot già preparato.
  const toggleSlot = (chiave: string) => {
    if (pianoAttuale[chiave]?.lockata) return;
    const next = new Set(selezione);
    if (next.has(chiave)) next.delete(chiave);
    else next.add(chiave);
    onChange(Array.from(next));
  };

  // I bottoni di gruppo agiscono SOLO sugli slot liberi: non toccano mai gli slot già preparati,
  // nemmeno quelli che l'utente ha messo in rigenerazione con un tap diretto.
  const applicaSuLiberi = (nuoviLiberi: Set<string>) => {
    const overrides = selezionati.filter((c) => !liberiSet.has(c));
    onChange([...overrides, ...nuoviLiberi]);
  };

  const selezionaTutti = () => applicaSuLiberi(new Set(liberi));
  const deselezionaTutti = () => applicaSuLiberi(new Set());

  const toggleGruppoLiberi = (chiaviGruppo: string[]) => {
    const valide = chiaviGruppo.filter((c) => liberiSet.has(c));
    const tutteSelezionate = valide.length > 0 && valide.every((c) => selezione.has(c));
    const nuovi = new Set(liberi.filter((c) => selezione.has(c)));
    valide.forEach((c) => (tutteSelezionate ? nuovi.delete(c) : nuovi.add(c)));
    applicaSuLiberi(nuovi);
  };

  const chiaviPasto = (pasto: Pasto) => GIORNI.map((g) => chiaveSlot(g, pasto));
  const chiaviGiorni = (giorni: Giorno[]) => giorni.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p)));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <Chip onClick={selezionaTutti}>Tutti</Chip>
        <Chip onClick={deselezionaTutti}>Nessuno</Chip>
        <Chip onClick={() => toggleGruppoLiberi(chiaviPasto("colazione"))}>Colazioni</Chip>
        <Chip onClick={() => toggleGruppoLiberi(chiaviPasto("pranzo"))}>Pranzi</Chip>
        <Chip onClick={() => toggleGruppoLiberi(chiaviPasto("cena"))}>Cene</Chip>
        <Chip onClick={() => toggleGruppoLiberi(chiaviGiorni(FERIALI))}>Feriali</Chip>
        <Chip onClick={() => toggleGruppoLiberi(chiaviGiorni(WEEKEND))}>Weekend</Chip>
      </div>

      <div className="px-4 py-2.5 rounded-md bg-primary-50 border border-primary-100">
        <p className="text-body-sm font-medium text-primary-800">
          Genererò {totaleDaGenerare} {totaleDaGenerare === 1 ? "pasto" : "pasti"}
          {preparatiCheRestano > 0 && (
            <> · {preparatiCheRestano} già {preparatiCheRestano === 1 ? "preparato" : "preparati"} {preparatiCheRestano === 1 ? "resterà" : "resteranno"} com'è</>
          )}
        </p>
      </div>

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
              const preparato = Boolean(slot) && !lockata;
              const selezionato = selezione.has(chiave) && !lockata;
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
                  {preparato && !selezionato ? (
                    <span className="h-5 w-5 shrink-0 rounded-full bg-paper-200 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-paper-400" />
                    </span>
                  ) : (
                    <Checkbox checked={selezionato} disabled={lockata} />
                  )}
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
                  ) : preparato && selezionato ? (
                    <span className="text-caption font-medium text-accent-600 shrink-0">Verrà sostituito</span>
                  ) : (
                    preparato && <span className="text-caption text-paper-400 shrink-0">Già preparato</span>
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
