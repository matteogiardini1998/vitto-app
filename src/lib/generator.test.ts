import { describe, expect, it } from "vitest";
import { generaPiano, type PreferenzeGenerazione } from "./generator";
import { SEED_RECIPES } from "../data/seedRecipes";
import { PROFILO_VUOTO } from "../store/profileStore";
import { GIORNI, PASTI, chiaveSlot, type Profilo, type TempoMaxCucina } from "../types";

const TUTTI_GLI_SLOT = GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p)));
const SLOT_PRANZO_CENA = GIORNI.flatMap((g) => (["pranzo", "cena"] as const).map((p) => chiaveSlot(g, p)));

function preferenzeVuote(overrides: Partial<PreferenzeGenerazione> = {}): PreferenzeGenerazione {
  return { tags: [], vincoli: [], esclusioniTemporanee: [], budgetTotale: 999, supermercato: [], ...overrides };
}

function profiloDiTest(overrides: Partial<Profilo> = {}): Profilo {
  return { ...PROFILO_VUOTO, nucleo: { persone: 2, tipo: "coppia" }, ...overrides };
}

describe("generaPiano — Fase R2", () => {
  it("household vegano: mai un ingrediente animale in 50 settimane generate", () => {
    const profilo = profiloDiTest({ dieta: "vegana" });
    for (let seed = 0; seed < 50; seed++) {
      const r = generaPiano({
        ricette: SEED_RECIPES,
        profilo,
        pianoAttuale: {},
        preferenze: preferenzeVuote(),
        slotSelezionati: TUTTI_GLI_SLOT,
        seed,
      });
      for (const chiave of TUTTI_GLI_SLOT) {
        const slot = r.piano[chiave];
        if (!slot) continue;
        const ricetta = SEED_RECIPES.find((x) => x.id === slot.ricettaId);
        expect(ricetta, `ricetta ${slot.ricettaId} non trovata`).toBeDefined();
        expect(ricetta!.dieteCalcolate, `${ricetta!.nome} (seed ${seed}) non è vegana`).toContain("vegana");
      }
    }
  });

  it("gennaio, area Nord: nessuna ricetta con pomodoro fresco, zucchine o melanzane come ingrediente principale", () => {
    const INGREDIENTI_ESTIVI = ["pomodoro", "zucchina", "melanzana"];
    const profilo = profiloDiTest({ area: "nord" });
    const r = generaPiano({
      ricette: SEED_RECIPES,
      profilo,
      pianoAttuale: {},
      preferenze: preferenzeVuote(),
      slotSelezionati: TUTTI_GLI_SLOT,
      mese: 1,
      seed: 42,
    });
    for (const chiave of TUTTI_GLI_SLOT) {
      const slot = r.piano[chiave];
      if (!slot) continue;
      const ricetta = SEED_RECIPES.find((x) => x.id === slot.ricettaId)!;
      const nomeVieta = ricetta.ingredientiStagionali.find((nome) =>
        INGREDIENTI_ESTIVI.some((estivo) => nome.toLowerCase().includes(estivo)),
      );
      expect(nomeVieta, `${ricetta.nome} ha "${nomeVieta}" come ingrediente stagionale a gennaio`).toBeUndefined();
    }
  });

  it("nessuna colazione assegnata a pranzo/cena, nessun primo assegnato a colazione", () => {
    const profilo = profiloDiTest();
    const r = generaPiano({
      ricette: SEED_RECIPES,
      profilo,
      pianoAttuale: {},
      preferenze: preferenzeVuote(),
      slotSelezionati: TUTTI_GLI_SLOT,
      seed: 7,
    });
    for (const giorno of GIORNI) {
      for (const pasto of PASTI) {
        const slot = r.piano[chiaveSlot(giorno, pasto)];
        if (!slot) continue;
        const ricetta = SEED_RECIPES.find((x) => x.id === slot.ricettaId)!;
        expect(ricetta.pasto, `${ricetta.nome} assegnata a ${pasto} ma ammessa solo a ${ricetta.pasto}`).toContain(pasto);
      }
    }
  });

  it("pranzo fuori casa: sempre ricette trasportabili", () => {
    const profilo = profiloDiTest({ pranzoFuoriCasa: ["Lun", "Mer", "Ven"] });
    const r = generaPiano({
      ricette: SEED_RECIPES,
      profilo,
      pianoAttuale: {},
      preferenze: preferenzeVuote(),
      slotSelezionati: TUTTI_GLI_SLOT,
      seed: 3,
    });
    for (const giorno of ["Lun", "Mer", "Ven"] as const) {
      const slot = r.piano[chiaveSlot(giorno, "pranzo")];
      if (!slot) continue;
      const ricetta = SEED_RECIPES.find((x) => x.id === slot.ricettaId)!;
      expect(ricetta.trasportabile, `${ricetta.nome} non è trasportabile ma assegnata a pranzo fuori casa di ${giorno}`).toBe(true);
    }
  });

  it("meal prep domenica: nessuna ricetta mangiata oltre i suoi conservabilitaGiorni (o congelabile)", () => {
    const profilo = profiloDiTest({ giornoMealPrep: "Dom" });
    const r = generaPiano({
      ricette: SEED_RECIPES,
      profilo,
      pianoAttuale: {},
      preferenze: preferenzeVuote(),
      slotSelezionati: TUTTI_GLI_SLOT,
      seed: 11,
    });
    const indiceGiorno = (g: string) => GIORNI.indexOf(g as (typeof GIORNI)[number]);
    const indicePrep = indiceGiorno("Dom");
    for (const chiave of SLOT_PRANZO_CENA) {
      const slot = r.piano[chiave];
      if (!slot) continue;
      const [giorno] = chiave.split("|");
      const giorniTrascorsi = (indiceGiorno(giorno) - indicePrep + 7) % 7;
      const ricetta = SEED_RECIPES.find((x) => x.id === slot.ricettaId)!;
      const entroConservabilita = giorniTrascorsi <= ricetta.conservabilitaGiorni || ricetta.congelabile;
      expect(entroConservabilita, `${ricetta.nome} si conserva ${ricetta.conservabilitaGiorni}gg ma servirebbe reggere ${giorniTrascorsi}gg da domenica`).toBe(true);
    }
  });

  it("con pochissime ricette compatibili (vegano + senza glutine + tempo minimo): gli slot restano aperti invece di essere riempiti male", () => {
    const profilo = profiloDiTest({
      dieta: "vegana",
      // Sotto il minimo tipizzato in UI (20): forza una scarsità estrema di candidate, apposta per questo test.
      tempoMaxCucina: 15 as TempoMaxCucina,
      esclusioniAssolute: ["farina", "pasta", "riso", "pane", "avena", "orzo", "farro", "grano"],
    });
    const r = generaPiano({
      ricette: SEED_RECIPES,
      profilo,
      pianoAttuale: {},
      preferenze: preferenzeVuote(),
      slotSelezionati: TUTTI_GLI_SLOT,
      seed: 1,
    });
    const slotAssegnati = TUTTI_GLI_SLOT.filter((c) => r.piano[c]).length;
    expect(slotAssegnati, "con condizioni quasi impossibili il piano non dovrebbe riempirsi tutto").toBeLessThan(TUTTI_GLI_SLOT.length);
  });

  it("stessa settimana + stesso seed = stesso piano", () => {
    const profilo = profiloDiTest();
    const preferenze = preferenzeVuote();
    const a = generaPiano({ ricette: SEED_RECIPES, profilo, pianoAttuale: {}, preferenze, slotSelezionati: TUTTI_GLI_SLOT, mese: 5, seed: 99 });
    const b = generaPiano({ ricette: SEED_RECIPES, profilo, pianoAttuale: {}, preferenze, slotSelezionati: TUTTI_GLI_SLOT, mese: 5, seed: 99 });
    expect(b.piano).toEqual(a.piano);
  });
});
