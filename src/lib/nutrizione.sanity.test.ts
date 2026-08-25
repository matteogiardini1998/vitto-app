import { describe, expect, it } from "vitest";
import { SEED_RECIPES } from "../data/seedRecipes";
import { calcolaNutrizione, mostraComeStima } from "./nutrizione";

/**
 * Test di plausibilità, non di precisione: verifica che i kcal/porzione
 * calcolati per alcune ricette note cadano in un range di buon senso da
 * cucina di casa (una carbonara non può fare 200 kcal, una vellutata non
 * può farne 900). Se una modifica al dizionario o alla logica di calcolo
 * sposta un valore fuori range, è quasi sempre un segnale reale da controllare.
 */
const RANGE_ATTESI: Record<string, [number, number]> = {
  "Spaghetti aglio, olio e peperoncino": [400, 650],
  "Pasta al pomodoro fresco e basilico": [300, 550],
  "Lasagne alla bolognese": [450, 750],
  "Pollo al curry con riso basmati": [450, 750],
  "Salmone al forno con patate": [300, 600],
  "Tagliata di manzo con rucola e grana": [300, 600],
  "Crema di zucca con semi tostati": [80, 350],
  "Zuppa di lenticchie e verdure": [150, 400],
  "Minestrone di verdure di stagione": [80, 300],
  "Petto di pollo alla griglia con verdure": [200, 450],
};

function trovaRicetta(nome: string) {
  const r = SEED_RECIPES.find((r) => r.nome === nome);
  if (!r) throw new Error(`Ricetta di riferimento non trovata: "${nome}" — è stata rinominata?`);
  return r;
}

describe("plausibilità nutrizionale (10 ricette note)", () => {
  for (const [nome, [min, max]] of Object.entries(RANGE_ATTESI)) {
    it(`${nome}: kcal/porzione tra ${min} e ${max}`, () => {
      const ricetta = trovaRicetta(nome);
      const nutrizione = calcolaNutrizione(ricetta);
      expect(nutrizione).not.toBeNull();
      expect(mostraComeStima(nutrizione)).toBe(true);
      expect(nutrizione!.kcal).toBeGreaterThanOrEqual(min);
      expect(nutrizione!.kcal).toBeLessThanOrEqual(max);
    });
  }
});

describe("copertura del dizionario sulle ricette seed", () => {
  it("ogni ricetta seed risolve tutti gli ingredienti (copertura 100%)", () => {
    const incomplete = SEED_RECIPES.filter((r) => {
      const n = calcolaNutrizione(r);
      return !n || n.copertura < 1;
    }).map((r) => r.nome);
    expect(incomplete).toEqual([]);
  });
});
