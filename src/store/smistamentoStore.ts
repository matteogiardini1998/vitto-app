import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reparto } from "../types";
import { normalizza } from "../lib/nutrizione";

type SmistamentoState = {
  mappa: Record<string, Reparto>;
  impara: (nomeLibero: string, categoria: Reparto) => void;
  cerca: (nomeLibero: string) => Reparto | null;
};

export const useSmistamentoStore = create<SmistamentoState>()(
  persist(
    (set, get) => ({
      mappa: {},
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
    }),
    { name: "mealprep-smistamento" },
  ),
);
