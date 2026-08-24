import { useState } from "react";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/Button";
import { DaySection } from "./components/DaySection";
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
      <PageHeader title="Piano Pasti" />

      {!pianoVuoto && (
        <div className="px-4 mb-2 flex justify-center">
          <button
            onClick={handleSvuota}
            className="flex items-center gap-1.5 text-body-sm font-medium text-paper-500 active:text-danger-500"
          >
            <Trash2 size={14} />
            {confermaSvuota ? "Tocca di nuovo per confermare" : "Svuota piano pasti"}
          </button>
        </div>
      )}

      <div className="px-4 mt-4">
        {GIORNI.map((giorno) => (
          <DaySection key={giorno} giorno={giorno} isOggi={giorno === oggi} onTapSlot={onTapSlot} />
        ))}
      </div>

      <div className="px-4 mt-2">
        <Button
          fullWidth
          size="lg"
          variant="secondary"
          disabled={pianoVuoto}
          onClick={aggiornaListaSpesa}
          className="gap-2"
        >
          <ShoppingBasket size={18} /> Aggiorna lista della spesa
        </Button>
        <p className="text-caption text-paper-400 text-center mt-2">
          Carica gli ingredienti del piano nella lista della spesa. Rifallo ogni volta che cambi qualcosa.
        </p>
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
