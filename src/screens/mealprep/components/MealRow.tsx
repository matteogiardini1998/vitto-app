import { ChevronRight, Lock, Plus, Sprout } from "lucide-react";
import { usePlanStore } from "../../../store/planStore";
import { useRecipeStore } from "../../../store/recipeStore";
import { chiaveSlot, type Giorno, type Pasto } from "../../../types";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";
import { PastoIcon } from "../../../components/PastoIcon";

type MealRowProps = {
  giorno: Giorno;
  pasto: Pasto;
  onTap: (giorno: Giorno, pasto: Pasto) => void;
};

export function MealRow({ giorno, pasto, onTap }: MealRowProps) {
  const chiave = chiaveSlot(giorno, pasto);
  const slot = usePlanStore((s) => s.piano[chiave]);
  const ricetta = useRecipeStore((s) => (slot ? s.ricette.find((r) => r.id === slot.ricettaId) : undefined));

  return (
    <button
      onClick={() => onTap(giorno, pasto)}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-paper-100 transition-colors"
    >
      <div className="h-10 w-10 shrink-0 rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 flex items-center justify-center">
        <PastoIcon pasti={[pasto]} size={18} strokeWidth={1.7} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-caption text-paper-500">{PASTO_LABEL[pasto]}</div>
        {slot && ricetta ? (
          <>
            <div className="text-body-md font-semibold text-paper-900 break-words flex items-center gap-1.5">
              {ricetta.nome}
              {slot.diStagione && <Sprout size={13} className="text-primary-600 dark:text-primary-300 shrink-0" />}
            </div>
            <div className="text-caption text-paper-500 mt-0.5">
              {slot.porzioni} {slot.porzioni === 1 ? "porzione" : "porzioni"}
            </div>
            {slot.motivo && <div className="text-caption text-paper-400 mt-0.5 truncate">{slot.motivo}</div>}
          </>
        ) : (
          <div className="text-body-md text-paper-400 flex items-center gap-1.5 mt-0.5">
            <Plus size={15} /> Aggiungi
          </div>
        )}
      </div>
      {slot?.lockata && <Lock size={15} className="text-accent-500 shrink-0" />}
      <ChevronRight size={18} className="text-paper-300 shrink-0" />
    </button>
  );
}
