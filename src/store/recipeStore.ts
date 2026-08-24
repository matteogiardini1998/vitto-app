import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Ricetta } from "../types";
import { SEED_RECIPES } from "../data/seedRecipes";
import { generaId } from "../lib/id";

function nuovoId(): string {
  return `custom-${generaId()}`;
}

export const RICETTA_VUOTA: Omit<Ricetta, "id"> = {
  nome: "",
  descrizione: "",
  porzioniBase: 2,
  tempoMin: 30,
  costoStimatoPorzione: 2,
  pasto: ["cena"],
  stile: "veloce",
  tags: [],
  dieta: "onnivora",
  ingredienti: [],
  passi: [],
  rating: 0,
  preferita: false,
  sfavorita: false,
  fissata: false,
  custom: true,
};

type RecipeState = {
  ricette: Ricetta[];
  addRicetta: (ricetta: Omit<Ricetta, "id">) => string;
  updateRicetta: (id: string, patch: Partial<Ricetta>) => void;
  deleteRicetta: (id: string) => void;
  duplicateRicetta: (id: string) => string | null;
};

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      ricette: SEED_RECIPES,
      addRicetta: (ricetta) => {
        const id = nuovoId();
        set((s) => ({ ricette: [...s.ricette, { ...ricetta, id }] }));
        return id;
      },
      updateRicetta: (id, patch) =>
        set((s) => ({
          ricette: s.ricette.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),
      deleteRicetta: (id) =>
        set((s) => ({ ricette: s.ricette.filter((r) => !(r.id === id && r.custom)) })),
      duplicateRicetta: (id) => {
        const original = get().ricette.find((r) => r.id === id);
        if (!original) return null;
        const newId = nuovoId();
        const copia: Ricetta = {
          ...original,
          id: newId,
          nome: `${original.nome} (copia)`,
          custom: true,
          rating: 0,
          preferita: false,
          sfavorita: false,
          fissata: false,
        };
        set((s) => ({ ricette: [...s.ricette, copia] }));
        return newId;
      },
    }),
    { name: "mealprep-ricette" },
  ),
);
