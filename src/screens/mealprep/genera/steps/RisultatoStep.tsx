import { Lock, Sprout, HelpCircle } from "lucide-react";
import { Card } from "../../../../components/Card";
import { GIORNI, PASTI, chiaveSlot, type Piano, type Ricetta } from "../../../../types";
import { GIORNO_LABEL_FULL } from "../../../../lib/date";
import { PASTO_LABEL } from "../../../../lib/recipeDisplay";
import type { SlotAperto } from "../../../../lib/generator";
import { cn } from "../../../../lib/cn";

type RisultatoStepProps = {
  piano: Piano;
  ricette: Ricetta[];
  spesaStimata: number;
  risparmioDispensa: number;
  budgetTarget: number;
  slotsAperti: Record<string, SlotAperto>;
  onScegli: (chiave: string, ricettaId: string) => void;
};

export function RisultatoStep({ piano, ricette, spesaStimata, risparmioDispensa, budgetTarget, slotsAperti, onScegli }: RisultatoStepProps) {
  const entroBudget = spesaStimata <= budgetTarget;
  const pct = Math.min(100, (spesaStimata / budgetTarget) * 100);
  const slotsVuoti = GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p))).filter((c) => !piano[c]).length;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-body-sm font-medium text-paper-600">Spesa stimata</span>
          <span className={cn("text-title-md font-display font-semibold", entroBudget ? "text-primary-700 dark:text-primary-300" : "text-danger-500")}>
            € {spesaStimata.toFixed(0)}{" "}
            <span className="text-body-sm text-paper-400 font-sans font-normal">/ € {budgetTarget}</span>
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-paper-200 overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", entroBudget ? "bg-primary-600" : "bg-danger-500")}
            style={{ width: `${pct}%` }}
          />
        </div>
        {risparmioDispensa >= 1 && (
          <p className="flex items-center gap-1.5 text-caption text-primary-700 dark:text-primary-300 mt-2">
            <Sprout size={13} /> € {risparmioDispensa.toFixed(0)} risparmiati grazie a quello che hai già in dispensa
          </p>
        )}
        {!entroBudget && (
          <p className="text-caption text-danger-500 mt-2">
            La spesa stimata supera il budget richiesto. Prova a rigenerare o ad alzare il budget.
          </p>
        )}
        {slotsVuoti > 0 && (
          <p className="text-caption text-paper-500 mt-2">
            {slotsVuoti} {slotsVuoti === 1 ? "slot è rimasto aperto" : "slot sono rimasti aperti"}: nessuna ricetta
            era abbastanza buona per quel pasto, meglio scegliere che forzare.
          </p>
        )}
      </Card>

      {GIORNI.map((giorno) => (
        <div key={giorno}>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide px-1 mb-1.5">
            {GIORNO_LABEL_FULL[giorno]}
          </h3>
          <Card padded={false} className="divide-y divide-paper-100 overflow-hidden">
            {PASTI.map((pasto) => {
              const chiave = chiaveSlot(giorno, pasto);
              const slot = piano[chiave];
              const ricetta = slot ? ricette.find((r) => r.id === slot.ricettaId) : undefined;
              const aperto = slotsAperti[chiave];
              return (
                <div key={pasto} className="flex flex-col gap-1.5 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-caption text-paper-400 w-20 shrink-0">{PASTO_LABEL[pasto]}</span>
                    <span className={cn("text-body-sm flex-1 min-w-0 truncate", ricetta ? "text-paper-800 font-medium" : "text-paper-300")}>
                      {ricetta ? ricetta.nome : aperto ? "Scegli tu" : "—"}
                    </span>
                    {slot?.diStagione && <Sprout size={13} className="text-primary-600 dark:text-primary-300 shrink-0" />}
                    {slot?.lockata && <Lock size={13} className="text-accent-500 shrink-0" />}
                  </div>
                  {ricetta && slot?.motivo && (
                    <p className="text-caption text-paper-500 pl-[5.5rem] -mt-1">{slot.motivo}</p>
                  )}
                  {!ricetta && aperto && (
                    <div className="pl-[5.5rem] flex flex-col gap-1.5 -mt-0.5">
                      {aperto.candidati.map((c) => {
                        const candidata = ricette.find((r) => r.id === c.ricettaId);
                        if (!candidata) return null;
                        return (
                          <button
                            key={c.ricettaId}
                            onClick={() => onScegli(chiave, c.ricettaId)}
                            className="flex items-start gap-1.5 text-left p-1.5 -m-1.5 rounded-md active:bg-paper-100"
                          >
                            <HelpCircle size={13} className="text-paper-400 shrink-0 mt-0.5" />
                            <span className="min-w-0">
                              <span className="block text-body-sm font-medium text-paper-800">{candidata.nome}</span>
                              <span className="block text-caption text-paper-500">{c.motivo}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
