import { useState } from "react";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { PAGE_ACCENT } from "../../components/WheelNav";
import { Button } from "../../components/Button";
import { DaySection } from "./components/DaySection";
import { EquilibrioBadge } from "./components/EquilibrioBadge";
import { AssignRecipeSheet } from "./components/AssignRecipeSheet";
import { SlotActionsSheet } from "./components/SlotActionsSheet";
import { MoveSlotSheet } from "./components/MoveSlotSheet";
import { usePlanStore } from "../../store/planStore";
import { useRecipeStore } from "../../store/recipeStore";
import { useShoppingStore } from "../../store/shoppingStore";
import { useToastStore } from "../../store/toastStore";
import { chiaveSlot, GIORNI, type Giorno, type Pasto } from "../../types";
import { PASTO_LABEL } from "../../lib/recipeDisplay";
import { giornoOggi } from "../../lib/date";
import { generaVociAutomatiche } from "../../lib/shoppingList";

type SheetAperto = "assegna" | "azioni" | "sposta" | null;

export function MealPrepScreen() {
  const piano = usePlanStore((s) => s.piano);
  const setSlot = usePlanStore((s) => s.setSlot);
  const svuotaPiano = usePlanStore((s) => s.svuotaPiano);
  const ricette = useRecipeStore((s) => s.ricette);
  const generaAutomatiche = useShoppingStore((s) => s.generaAutomatiche);
  const showToast = useToastStore((s) => s.show);

  const [sheetAperto, setSheetAperto] = useState<SheetAperto>(null);
  const [target, setTarget] = useState<{ giorno: Giorno; pasto: Pasto } | null>(null);
  const [confermaSvuota, setConfermaSvuota] = useState(false);

  const chiudi = () => setSheetAperto(null);

  const onTapSlot = (giorno: Giorno, pasto: Pasto) => {
    setTarget({ giorno, pasto });
    const occupato = Boolean(piano[chiaveSlot(giorno, pasto)]);
    setSheetAperto(occupato ? "azioni" : "assegna");
  };

  const assegnaRicetta = (ricettaId: string, porzioniBase: number) => {
    if (!target) return;
    setSlot(chiaveSlot(target.giorno, target.pasto), ricettaId, porzioniBase);
    showToast(`Aggiunta a ${target.giorno} · ${PASTO_LABEL[target.pasto]}`);
    chiudi();
  };

  const chiaveTarget = target ? chiaveSlot(target.giorno, target.pasto) : null;
  const oggi = giornoOggi();
  const pianoVuoto = Object.keys(piano).length === 0;

  const aggiornaListaSpesa = () => {
    const voci = generaVociAutomatiche(piano, ricette);
    generaAutomatiche(voci);
    showToast(`Lista della spesa aggiornata con ${voci.length} articoli`);
  };

  const handleSvuota = () => {
    if (!confermaSvuota) {
      setConfermaSvuota(true);
      return;
    }
    svuotaPiano();
    setConfermaSvuota(false);
    showToast("Piano pasti svuotato");
  };

  return (
    <div className="pb-8">
      <PageHeader title="Piano Pasti" accent={PAGE_ACCENT[0]} />

      {!pianoVuoto && (
        <div className="mx-4 mb-4 px-4 py-3.5 rounded-xl bg-primary-50 border border-primary-100 dark:bg-primary-900/40 dark:border-primary-800 flex items-center gap-3">
          <span className="h-10 w-10 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center">
            <ShoppingBasket size={18} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-semibold text-primary-800 dark:text-primary-200">Il meal prep è pronto</p>
            <p className="text-caption text-primary-700 dark:text-primary-300">Aggiorna la lista con tutto quello che ti serve</p>
          </div>
          <Button size="md" onClick={aggiornaListaSpesa} className="shrink-0">
            Aggiorna
          </Button>
        </div>
      )}

      {!pianoVuoto && (
        <div className="px-4 mb-3 flex items-center justify-between gap-2">
          <EquilibrioBadge piano={piano} ricette={ricette} />
          <button
            onClick={handleSvuota}
            className="flex items-center gap-1.5 text-body-sm font-medium text-paper-500 active:text-danger-500 shrink-0"
          >
            <Trash2 size={14} />
            {confermaSvuota ? "Conferma" : "Svuota"}
          </button>
        </div>
      )}

      <div className="px-4 mt-4">
        {GIORNI.map((giorno) => (
          <DaySection key={giorno} giorno={giorno} isOggi={giorno === oggi} onTapSlot={onTapSlot} />
        ))}
      </div>

      <AssignRecipeSheet
        open={sheetAperto === "assegna"}
        onClose={chiudi}
        giorno={target?.giorno ?? null}
        pasto={target?.pasto ?? null}
        onAssegna={assegnaRicetta}
      />

      {sheetAperto === "azioni" && target && chiaveTarget && (
        <SlotActionsSheet
          open
          onClose={chiudi}
          chiave={chiaveTarget}
          giorno={target.giorno}
          pasto={target.pasto}
          onSostituisci={() => setSheetAperto("assegna")}
          onSposta={() => setSheetAperto("sposta")}
        />
      )}

      {sheetAperto === "sposta" && chiaveTarget && (
        <MoveSlotSheet open onClose={chiudi} chiaveOrigine={chiaveTarget} />
      )}
    </div>
  );
}
