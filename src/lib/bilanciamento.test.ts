import { describe, expect, it } from "vitest";
import { valutaSettimana } from "./bilanciamento";
import { REGOLE_BILANCIAMENTO } from "../data/regoleBilanciamento";
import { SEED_RECIPES } from "../data/seedRecipes";
import { GIORNI, PASTI, chiaveSlot, type Piano } from "../types";

describe("valutaSettimana", () => {
  it("un piano vuoto non soddisfa nessuna regola 'almeno' e resta a punteggio basso", () => {
    const report = valutaSettimana({}, SEED_RECIPES);
    expect(report.regole).toHaveLength(REGOLE_BILANCIAMENTO.length);
    expect(report.punteggio).toBeGreaterThanOrEqual(0);
    expect(report.punteggio).toBeLessThanOrEqual(100);
    const regolaPesce = report.regole.find((r) => r.regola.id === "pesce-almeno-2");
    expect(regolaPesce?.stato).toBe("mancata");
  });

  it("un piano con pesce a ogni pranzo e cena soddisfa la regola del pesce", () => {
    const pesce = SEED_RECIPES.find((r) => r.nome.toLowerCase().includes("salmone"));
    if (!pesce) throw new Error("Ricetta di salmone non trovata nelle seed");

    const piano: Piano = {};
    for (const giorno of GIORNI) {
      for (const pasto of PASTI) {
        if (pasto === "colazione") continue;
        piano[chiaveSlot(giorno, pasto)] = { ricettaId: pesce.id, porzioni: 2, lockata: false };
      }
    }

    const report = valutaSettimana(piano, SEED_RECIPES);
    const regolaPesce = report.regole.find((r) => r.regola.id === "pesce-almeno-2");
    expect(regolaPesce?.stato).toBe("soddisfatta");
  });
});
