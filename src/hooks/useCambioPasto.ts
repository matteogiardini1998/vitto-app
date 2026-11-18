import { useRef, useState } from "react";
import { rigeneraSlot, type PreferenzeGenerazione, type VincoloSlot } from "../lib/generator";
import { applicaComando } from "../lib/comandiPiano";
import { useProfileStore } from "../store/profileStore";
import { useRecipeStore } from "../store/recipeStore";
import { useDispensaStore } from "../store/dispensaStore";
import type { Piano, Profilo } from "../types";

export function preferenzeDiDefault(profilo: Profilo): PreferenzeGenerazione {
  return {
    tags: [],
    vincoli: [],
    esclusioniTemporanee: [],
    budgetTotale: Math.round((90 * profilo.nucleo.persone) / 5) * 5,
    supermercato: profilo.supermercatoPreferito,
  };
}

function descriviVincolo(v: VincoloSlot): string {
  if (v.vuole === "carne") return " con carne";
  if (v.vuole === "pesce") return " con pesce";
  if (v.vuole === "vegetariana") return " vegetariana";
  if (v.stile === "veloce") return " più veloce";
  if (v.stile === "leggera") return " più leggera";
  return "";
}

/**
 * Cambia un singolo pasto (o esegue un comando a voce/testo) su un piano
 * qualunque: quello del wizard prima di accettarlo, o quello salvato.
 * Tiene a mente le ricette già scartate per ogni slot, così "Un'altra
 * proposta" premuto più volte non rimbalza fra le stesse due.
 */
export function useCambioPasto(piano: Piano, setPiano: (p: Piano) => void, preferenze: PreferenzeGenerazione | undefined) {
  const ricette = useRecipeStore((s) => s.ricette);
  const profilo = useProfileStore((s) => s.profilo);
  const dispensa = useDispensaStore((s) => s.dispense.find((d) => d.id === s.dispensaAttivaId) ?? s.dispense[0]);
  const scartate = useRef<Record<string, string[]>>({});
  const [avviso, setAvviso] = useState<string | null>(null);
  const pref = preferenze ?? preferenzeDiDefault(profilo);

  const cambia = (chiave: string, vincolo: VincoloSlot) => {
    const attuale = piano[chiave]?.ricettaId;
    const giaViste = Array.from(new Set([...(scartate.current[chiave] ?? []), ...(attuale ? [attuale] : [])]));
    const prova = (escludi: string[]) =>
      rigeneraSlot({ ricette, profilo, piano, preferenze: pref, chiave, dispensa, vincolo: { ...vincolo, escludiRicette: escludi } });
    let esito = prova(giaViste);
    // Finite le alternative: si ricomincia il giro, escludendo solo quella attuale.
    if (!esito.ricettaId && giaViste.length > 1) {
      scartate.current[chiave] = [];
      esito = prova(attuale ? [attuale] : []);
    }
    if (!esito.ricettaId) {
      setAvviso(
        `Nessuna ricetta${descriviVincolo(vincolo)} adatta a questo pasto: dipende da dieta, tempo a disposizione o da quanto si conserva dal giorno del meal prep.`,
      );
      return;
    }
    scartate.current[chiave] = giaViste;
    setPiano(esito.piano);
    setAvviso(esito.ripiego ? "Nessuna proposta perfetta: questa è la più vicina." : null);
  };

  const comando = (testo: string): string => {
    const esito = applicaComando(testo, piano, { ricette, profilo, preferenze: pref, dispensa });
    if (esito.slotCambiati.length > 0) setPiano(esito.piano);
    return esito.messaggio;
  };

  return { cambia, comando, avviso, azzeraAvviso: () => setAvviso(null) };
}
