import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reparto, VoceSpesa } from "../types";
import { generaId } from "../lib/id";

type ShoppingState = {
  voci: VoceSpesa[];
  generaAutomatiche: (voci: VoceSpesa[]) => void;
  aggiungiManuale: (nome: string, reparto?: Reparto, presa?: boolean) => string;
  aggiornaVoce: (id: string, patch: Partial<VoceSpesa>) => void;
  toggleVoce: (id: string) => void;
  /** Swipe "Nel carrello" / "Ce l'ho già" / "Rimetti in lista". */
  impostaStato: (id: string, stato: "carrello" | "in-casa" | "da-comprare") => void;
  rimuoviVoce: (id: string) => void;
  azzeraSpunte: () => void;
  svuotaTutto: () => void;
};

export const useShoppingStore = create<ShoppingState>()(
  persist(
    (set) => ({
      voci: [],
      // Aggiornando la lista dal piano si tengono le decisioni già prese sulle
      // stesse voci (in carrello, già in casa): non si ricomincia da zero.
      generaAutomatiche: (nuoveVoci) =>
        set((s) => {
          const precedenti = new Map(s.voci.filter((v) => !v.manuale).map((v) => [v.nome.toLowerCase(), v]));
          const unite = nuoveVoci.map((v) => {
            const p = precedenti.get(v.nome.toLowerCase());
            return p ? { ...v, presa: p.presa, giaInCasa: p.giaInCasa, giaInDispensaIgnorato: p.giaInDispensaIgnorato } : v;
          });
          return { voci: [...s.voci.filter((v) => v.manuale), ...unite] };
        }),
      aggiungiManuale: (nome, reparto = "altro", presa = false) => {
        const id = generaId();
        set((s) => ({
          voci: [
            ...s.voci,
            {
              id,
              nome,
              qta: null,
              unita: "",
              reparto,
              presa,
              manuale: true,
            },
          ],
        }));
        return id;
      },
      aggiornaVoce: (id, patch) =>
        set((s) => ({ voci: s.voci.map((v) => (v.id === id ? { ...v, ...patch } : v)) })),
      toggleVoce: (id) =>
        set((s) => ({ voci: s.voci.map((v) => (v.id === id ? { ...v, presa: !v.presa } : v)) })),
      impostaStato: (id, stato) =>
        set((s) => ({
          voci: s.voci.map((v) => {
            if (v.id !== id) return v;
            if (stato === "carrello") return { ...v, presa: true, giaInCasa: false };
            if (stato === "in-casa") return { ...v, presa: false, giaInCasa: true };
            return { ...v, presa: false, giaInCasa: false, giaInDispensaIgnorato: true };
          }),
        })),
      rimuoviVoce: (id) => set((s) => ({ voci: s.voci.filter((v) => v.id !== id) })),
      azzeraSpunte: () => set((s) => ({ voci: s.voci.map((v) => ({ ...v, presa: false })) })),
      svuotaTutto: () => set({ voci: [] }),
    }),
    { name: "mealprep-spesa" },
  ),
);
