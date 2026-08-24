import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reparto, VoceSpesa } from "../types";
import { generaId } from "../lib/id";

type ShoppingState = {
  voci: VoceSpesa[];
  generaAutomatiche: (voci: VoceSpesa[]) => void;
  aggiungiManuale: (nome: string) => void;
  aggiornaVoce: (id: string, patch: Partial<VoceSpesa>) => void;
  toggleVoce: (id: string) => void;
  rimuoviVoce: (id: string) => void;
  azzeraSpunte: () => void;
  svuotaTutto: () => void;
};

export const useShoppingStore = create<ShoppingState>()(
  persist(
    (set) => ({
      voci: [],
      generaAutomatiche: (nuoveVoci) =>
        set((s) => ({ voci: [...s.voci.filter((v) => v.manuale), ...nuoveVoci] })),
      aggiungiManuale: (nome) =>
        set((s) => ({
          voci: [
            ...s.voci,
            {
              id: generaId(),
              nome,
              qta: null,
              unita: "",
              reparto: "altro" as Reparto,
              presa: false,
              manuale: true,
            },
          ],
        })),
      aggiornaVoce: (id, patch) =>
        set((s) => ({ voci: s.voci.map((v) => (v.id === id ? { ...v, ...patch } : v)) })),
      toggleVoce: (id) =>
        set((s) => ({ voci: s.voci.map((v) => (v.id === id ? { ...v, presa: !v.presa } : v)) })),
      rimuoviVoce: (id) => set((s) => ({ voci: s.voci.filter((v) => v.id !== id) })),
      azzeraSpunte: () => set((s) => ({ voci: s.voci.map((v) => ({ ...v, presa: false })) })),
      svuotaTutto: () => set({ voci: [] }),
    }),
    { name: "mealprep-spesa" },
  ),
);
