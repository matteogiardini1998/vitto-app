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
  // Fase R2: valori neutri — una ricetta scritta a mano non deve né favorire
  // né escludere nulla finché l'utente non la personalizza ulteriormente.
  dieteCalcolate: ["onnivora"],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: false,
  area: "nazionale",
  mesiStagione: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  ingredientiStagionali: [],
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
    {
      name: "mealprep-ricette",
      version: 1,
      // v0→v1 (Fase R2): i campi aggiunti a `Ricetta` per il nuovo algoritmo
      // (portata, pesantezza, proteinaPrincipale, conservabilità, trasportabilità,
      // area, stagionalità, dieteCalcolate) non esistono nelle ricette già
      // salvate in localStorage. Per gli id che corrispondono ancora a un seed
      // attuale si copiano i valori reali da lì (l'utente può averne modificato
      // nome/ingredienti/passi, ma non questi metadati, che non esistevano);
      // per il resto (ricette custom, o id di seed rimossi) si applicano gli
      // stessi valori neutri di `RICETTA_VUOTA`.
      migrate: (persisted) => {
        const s = persisted as { ricette?: Array<Ricetta & Partial<Ricetta>> };
        if (!s?.ricette) return s as RecipeState;
        const seedById = new Map(SEED_RECIPES.map((r) => [r.id, r]));
        s.ricette = s.ricette.map((r) => {
          if (r.portata !== undefined) return r; // già sullo schema nuovo
          const seed = seedById.get(r.id);
          const nuoviCampi: Pick<
            Ricetta,
            | "dieteCalcolate"
            | "portata"
            | "pesantezza"
            | "proteinaPrincipale"
            | "conservabilitaGiorni"
            | "congelabile"
            | "trasportabile"
            | "area"
            | "mesiStagione"
            | "ingredientiStagionali"
          > = seed
            ? {
                dieteCalcolate: seed.dieteCalcolate,
                portata: seed.portata,
                pesantezza: seed.pesantezza,
                proteinaPrincipale: seed.proteinaPrincipale,
                conservabilitaGiorni: seed.conservabilitaGiorni,
                congelabile: seed.congelabile,
                trasportabile: seed.trasportabile,
                area: seed.area,
                mesiStagione: seed.mesiStagione,
                ingredientiStagionali: seed.ingredientiStagionali,
              }
            : {
                dieteCalcolate: RICETTA_VUOTA.dieteCalcolate,
                portata: RICETTA_VUOTA.portata,
                pesantezza: RICETTA_VUOTA.pesantezza,
                proteinaPrincipale: RICETTA_VUOTA.proteinaPrincipale,
                conservabilitaGiorni: RICETTA_VUOTA.conservabilitaGiorni,
                congelabile: RICETTA_VUOTA.congelabile,
                trasportabile: RICETTA_VUOTA.trasportabile,
                area: RICETTA_VUOTA.area,
                mesiStagione: RICETTA_VUOTA.mesiStagione,
                ingredientiStagionali: RICETTA_VUOTA.ingredientiStagionali,
              };
          return { ...r, ...nuoviCampi };
        });
        return s as RecipeState;
      },
    },
  ),
);
