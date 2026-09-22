/**
 * Fase R1: le ricette vere adesso vivono nel nuovo schema, divise per pasto
 * in `src/data/recipes/{colazione,pranzo,cena,spuntino}.ts` (vedi
 * `recipeSchema.ts` per il tipo `Recipe` e le funzioni `getDiete`/
 * `getMesiStagione`). Questo file resta solo come adattatore verso il vecchio
 * tipo `Ricetta` che l'algoritmo del generatore (generator.ts) e la UI si
 * aspettano — così nessun punto dell'app che già importava `SEED_RECIPES` da
 * qui ha dovuto cambiare una sola riga.
 */
import { RICETTE_COLAZIONE } from "./recipes/colazione";
import { RICETTE_PRANZO } from "./recipes/pranzo";
import { RICETTE_CENA } from "./recipes/cena";
import { RICETTE_SPUNTINO } from "./recipes/spuntino";
import { toRicetta } from "./recipeSchema";
import type { Ricetta } from "../types";

const TUTTE_LE_RICETTE = [...RICETTE_COLAZIONE, ...RICETTE_PRANZO, ...RICETTE_CENA, ...RICETTE_SPUNTINO];

export const SEED_RECIPES: Ricetta[] = TUTTE_LE_RICETTE.map((r) => ({
  ...toRicetta(r),
  rating: 0,
  preferita: false,
  sfavorita: false,
  fissata: false,
  custom: false,
}));
