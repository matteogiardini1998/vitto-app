import type { Pasto, DietaRicetta } from "../types";

export type Ordinamento = "consigliati" | "nome" | "tempo" | "costo" | "rating";

export type Filtri = {
  pasto: Pasto[];
  stile: ("veloce" | "ricercata")[];
  dieta: DietaRicetta[];
  ratingMinimo: number;
  soloPreferite: boolean;
};

export const FILTRI_VUOTI: Filtri = {
  pasto: [],
  stile: [],
  dieta: [],
  ratingMinimo: 0,
  soloPreferite: false,
};
