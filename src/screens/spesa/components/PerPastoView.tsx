import { useMemo } from "react";
import { Check, CalendarX } from "lucide-react";
import { Card } from "../../../components/Card";
import { EmptyState } from "../../../components/EmptyState";
import { PastoIcon } from "../../../components/PastoIcon";
import { usePlanStore } from "../../../store/planStore";
import { useRecipeStore } from "../../../store/recipeStore";
import { useShoppingStore } from "../../../store/shoppingStore";
import { GIORNI, PASTI, chiaveSlot, type Giorno, type Pasto, type Ricetta } from "../../../types";
import { GIORNO_LABEL_FULL } from "../../../lib/date";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";
import { chiaveIngrediente } from "../../../lib/shoppingList";
import { formattaQtaUnita } from "../../../lib/format";
import { cn } from "../../../lib/cn";

type Sezione = {
  chiave: string;
  giorno: Giorno;
  pasto: Pasto;
  ricetta: Ricetta;
  ingredienti: { nome: string; unita: string; qtaScalata: number | null }[];
};

export function PerPastoView() {
  const piano = usePlanStore((s) => s.piano);
  const ricette = useRecipeStore((s) => s.ricette);
  const voci = useShoppingStore((s) => s.voci);
  const toggleVoce = useShoppingStore((s) => s.toggleVoce);

  const vociMap = useMemo(() => {
    const m = new Map<string, (typeof voci)[number]>();
    voci.forEach((v) => m.set(chiaveIngrediente(v.nome, v.unita), v));
    return m;
  }, [voci]);

  const sezioni: Sezione[] = useMemo(() => {
    const out: Sezione[] = [];
    for (const giorno of GIORNI) {
      for (const pasto of PASTI) {
        const chiave = chiaveSlot(giorno, pasto);
        const slot = piano[chiave];
        if (!slot) continue;
        const ricetta = ricette.find((r) => r.id === slot.ricettaId);
        if (!ricetta) continue;
        const scala = slot.porzioni / ricetta.porzioniBase;
        out.push({
          chiave,
          giorno,
          pasto,
          ricetta,
          ingredienti: ricetta.ingredienti.map((i) => ({
            nome: i.nome,
            unita: i.unita,
            qtaScalata: i.qta != null ? i.qta * scala : null,
          })),
        });
      }
    }
    return out;
  }, [piano, ricette]);

  if (sezioni.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="Nessun pasto in programma"
        description="Assegna delle ricette al piano pasti per vedere qui cosa serve, pasto per pasto."
      />
    );
  }

  return (
    <div className="px-4 flex flex-col gap-5 mt-5">
      {sezioni.map((s) => (
        <div key={s.chiave}>
          <div className="flex items-center gap-2 px-1 mb-1.5">
            <PastoIcon pasti={[s.pasto]} size={14} className="text-primary-600" />
            <h3 className="text-body-sm font-semibold text-paper-500">
              {GIORNO_LABEL_FULL[s.giorno]} · {PASTO_LABEL[s.pasto]} — {s.ricetta.nome}
            </h3>
          </div>
          <Card padded={false} className="divide-y divide-paper-100 overflow-hidden">
            {s.ingredienti.map((ing, i) => {
              const voce = vociMap.get(chiaveIngrediente(ing.nome, ing.unita));
              const presa = voce?.presa ?? false;
              return (
                <button
                  key={i}
                  onClick={() => voce && toggleVoce(voce.id)}
                  disabled={!voce}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-paper-100"
                >
                  <span
                    className={cn(
                      "h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                      presa ? "bg-primary-700 border-primary-700" : "border-paper-300 bg-paper-0",
                    )}
                  >
                    {presa && <Check size={14} className="text-paper-50" strokeWidth={3} />}
                  </span>
                  <span className={cn("flex-1 text-body-md", presa ? "text-paper-400 line-through" : "text-paper-900")}>
                    {ing.nome}
                  </span>
                  <span className="text-body-sm text-paper-500 shrink-0">
                    {formattaQtaUnita(ing.qtaScalata, ing.unita)}
                  </span>
                </button>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
