import { Lock } from "lucide-react";
import { Card } from "../../../../components/Card";
import { GIORNI, PASTI, chiaveSlot, type Piano, type Ricetta } from "../../../../types";
import { GIORNO_LABEL_FULL } from "../../../../lib/date";
import { PASTO_LABEL } from "../../../../lib/recipeDisplay";
import { cn } from "../../../../lib/cn";

type RisultatoStepProps = {
  piano: Piano;
  ricette: Ricetta[];
  spesaStimata: number;
  budgetTarget: number;
};

export function RisultatoStep({ piano, ricette, spesaStimata, budgetTarget }: RisultatoStepProps) {
  const entroBudget = spesaStimata <= budgetTarget;
  const pct = Math.min(100, (spesaStimata / budgetTarget) * 100);
  const slotsVuoti = GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p))).filter((c) => !piano[c]).length;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-body-sm font-medium text-paper-600">Spesa stimata</span>
          <span className={cn("text-title-md font-display font-semibold", entroBudget ? "text-primary-700" : "text-danger-500")}>
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
        {!entroBudget && (
          <p className="text-caption text-danger-500 mt-2">
            La spesa stimata supera il budget richiesto. Prova a rigenerare o ad alzare il budget.
          </p>
        )}
        {slotsVuoti > 0 && (
          <p className="text-caption text-paper-500 mt-2">
            {slotsVuoti} {slotsVuoti === 1 ? "slot non è stato" : "slot non sono stati"} assegnati: nessuna
            ricetta compatibile trovata.
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
              const slot = piano[chiaveSlot(giorno, pasto)];
              const ricetta = slot ? ricette.find((r) => r.id === slot.ricettaId) : undefined;
              return (
                <div key={pasto} className="flex items-center gap-2 px-4 py-2.5">
                  <span className="text-caption text-paper-400 w-20 shrink-0">{PASTO_LABEL[pasto]}</span>
                  <span className={cn("text-body-sm flex-1 min-w-0 truncate", ricetta ? "text-paper-800 font-medium" : "text-paper-300")}>
                    {ricetta ? ricetta.nome : "—"}
                  </span>
                  {slot?.lockata && <Lock size={13} className="text-accent-500 shrink-0" />}
                </div>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
