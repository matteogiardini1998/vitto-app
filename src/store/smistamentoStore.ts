import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reparto } from "../types";
import { normalizza } from "../lib/nutrizione";

type SmistamentoState = {
  mappa: Record<string, Reparto>;
  /** barcode -> nome voce lista (normalizzato) a cui è stato associato una volta: rende il matching a colpo sicuro dalle volte successive. */
  associazioniListaSpesa: Record<string, string>;
  impara: (nomeLibero: string, categoria: Reparto) => void;
  cerca: (nomeLibero: string) => Reparto | null;
  impareAssociazioneLista: (barcode: string, nomeVoceNormalizzato: string) => void;
  cercaAssociazioneLista: (barcode: string) => string | null;
};

export const useSmistamentoStore = create<SmistamentoState>()(
  persist(
    (set, get) => ({
      mappa: {},
      associazioniListaSpesa: {},
      impara: (nomeLibero, categoria) => {
        const chiave = normalizza(nomeLibero);
        if (!chiave) return;
        set((s) => ({ mappa: { ...s.mappa, [chiave]: categoria } }));
      },
      cerca: (nomeLibero) => {
        const chiave = normalizza(nomeLibero);
        if (!chiave) return null;
        return get().mappa[chiave] ?? null;
      },
      impareAssociazioneLista: (barcode, nomeVoceNormalizzato) => {
        if (!barcode || !nomeVoceNormalizzato) return;
        set((s) => ({ associazioniListaSpesa: { ...s.associazioniListaSpesa, [barcode]: nomeVoceNormalizzato } }));
      },
      cercaAssociazioneLista: (barcode) => get().associazioniListaSpesa[barcode] ?? null,
    }),
    { name: "mealprep-smistamento" },
  ),
);
