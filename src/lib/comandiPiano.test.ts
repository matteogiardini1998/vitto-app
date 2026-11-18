import { describe, expect, it } from "vitest";
import { applicaComando, interpretaComando } from "./comandiPiano";
import { generaPiano, rigeneraSlot, ricettaInCategoria, type PreferenzeGenerazione } from "./generator";
import { SEED_RECIPES } from "../data/seedRecipes";
import { PROFILO_VUOTO } from "../store/profileStore";
import { GIORNI, PASTI, chiaveSlot, type Piano, type Profilo } from "../types";

const TUTTI = GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p)));
const PRINCIPALI = GIORNI.flatMap((g) => (["pranzo", "cena"] as const).map((p) => chiaveSlot(g, p)));
const prefs = (o: Partial<PreferenzeGenerazione> = {}): PreferenzeGenerazione => ({
  tags: [], vincoli: [], esclusioniTemporanee: [], budgetTotale: 999, supermercato: [], ...o,
});
const profilo = (o: Partial<Profilo> = {}): Profilo => ({ ...PROFILO_VUOTO, nucleo: { persone: 2, tipo: "coppia" }, ...o });
const ricetta = (id: string) => SEED_RECIPES.find((r) => r.id === id)!;
const pianoBase = (seed = 7): Piano =>
  generaPiano({ ricette: SEED_RECIPES, profilo: profilo(), pianoAttuale: {}, preferenze: prefs(), slotSelezionati: TUTTI, seed, mese: 11 }).piano;

describe("interpretaComando", () => {
  it("capisce le frasi tipiche", () => {
    expect(interpretaComando("aggiungi un po' di carne sparsa in giro per il menu")).toEqual([
      { tipo: "aggiungi", categoria: "carne", quanti: 3, giorni: [], pasti: [] },
    ]);
    expect(interpretaComando("Niente pesce")[0]).toMatchObject({ tipo: "togli", categoria: "pesce", tutti: true });
    expect(interpretaComando("meno legumi")[0]).toMatchObject({ tipo: "togli", categoria: "legumi", tutti: false });
    expect(interpretaComando("la cena di venerdì più veloce")[0]).toMatchObject({ tipo: "cambia", giorni: ["Ven"], pasti: ["cena"], stile: "veloce" });
    expect(interpretaComando("cambia il pranzo di martedì")[0]).toMatchObject({ tipo: "cambia", giorni: ["Mar"], pasti: ["pranzo"] });
    expect(interpretaComando("più legumi a cena")[0]).toMatchObject({ tipo: "aggiungi", categoria: "legumi", pasti: ["cena"] });
    expect(interpretaComando("tutto più leggero")[0]).toMatchObject({ tipo: "stile", stile: "leggera" });
    expect(interpretaComando("metti due volte il pollo")[0]).toMatchObject({ tipo: "aggiungi", categoria: "carne_bianca", quanti: 2 });
  });

  it("spezza i comandi composti", () => {
    const azioni = interpretaComando("aggiungi carne e togli il pesce, poi sabato a cena qualcosa di sostanzioso");
    expect(azioni.map((a) => a.tipo)).toEqual(["aggiungi", "togli", "cambia"]);
  });

  it("dice di non aver capito invece di indovinare", () => {
    expect(interpretaComando("boh ciao")).toEqual([]);
    const esito = applicaComando("boh ciao", pianoBase(), { ricette: SEED_RECIPES, profilo: profilo(), preferenze: prefs() });
    expect(esito.capito).toBe(false);
  });
});

describe("applicaComando", () => {
  const ctx = { ricette: SEED_RECIPES, profilo: profilo(), preferenze: prefs() };

  it("«aggiungi un po' di carne» mette carne in 3 pasti diversi, senza toccare il resto", () => {
    const prima = pianoBase();
    const esito = applicaComando("aggiungi un po' di carne", prima, ctx);
    expect(esito.slotCambiati).toHaveLength(3);
    for (const k of esito.slotCambiati) expect(ricettaInCategoria(ricetta(esito.piano[k].ricettaId), "carne")).toBe(true);
    // distribuiti: non tutti nello stesso giorno
    expect(new Set(esito.slotCambiati.map((k) => k.split("|")[0])).size).toBeGreaterThan(1);
    for (const k of TUTTI) if (!esito.slotCambiati.includes(k)) expect(esito.piano[k]).toEqual(prima[k]);
  });

  it("«niente pesce» toglie tutto il pesce dai pasti principali", () => {
    const esito = applicaComando("niente pesce", pianoBase(3), ctx);
    for (const k of PRINCIPALI) {
      const s = esito.piano[k];
      if (s) expect(ricetta(s.ricettaId).proteinaPrincipale).not.toBe("pesce");
    }
  });

  it("non tocca mai i pasti bloccati", () => {
    const prima = pianoBase();
    const bloccati: Piano = Object.fromEntries(Object.entries(prima).map(([k, v]) => [k, { ...v, lockata: true }]));
    const esito = applicaComando("aggiungi carne", bloccati, ctx);
    expect(esito.slotCambiati).toEqual([]);
    expect(esito.piano).toEqual(bloccati);
  });

  it("un profilo vegano non riceve carne nemmeno se la chiede", () => {
    const vegano = { ...ctx, profilo: profilo({ dieta: "vegana" }) };
    const p = generaPiano({ ricette: SEED_RECIPES, profilo: vegano.profilo, pianoAttuale: {}, preferenze: prefs(), slotSelezionati: TUTTI, seed: 1, mese: 11 }).piano;
    const esito = applicaComando("aggiungi carne", p, vegano);
    expect(esito.slotCambiati).toEqual([]);
    expect(esito.messaggio).toMatch(/Non ho trovato/);
  });
});

describe("rigeneraSlot", () => {
  it("cambia solo lo slot chiesto e non ripropone la stessa ricetta", () => {
    const prima = pianoBase();
    const chiave = "Mer|cena";
    const attuale = prima[chiave].ricettaId;
    const esito = rigeneraSlot({ ricette: SEED_RECIPES, profilo: profilo(), piano: prima, preferenze: prefs(), chiave, vincolo: { escludiRicette: [attuale] }, mese: 11 });
    expect(esito.ricettaId).not.toBeNull();
    expect(esito.ricettaId).not.toBe(attuale);
    for (const k of TUTTI) if (k !== chiave) expect(esito.piano[k]).toEqual(prima[k]);
  });

  it("rispetta stile e categoria richiesti", () => {
    const prima = pianoBase();
    const v = rigeneraSlot({ ricette: SEED_RECIPES, profilo: profilo(), piano: prima, preferenze: prefs(), chiave: "Gio|pranzo", vincolo: { stile: "veloce" }, mese: 11 });
    expect(ricetta(v.ricettaId!).tempoMin).toBeLessThanOrEqual(25);
    const c = rigeneraSlot({ ricette: SEED_RECIPES, profilo: profilo(), piano: prima, preferenze: prefs(), chiave: "Lun|cena", vincolo: { vuole: "pesce" }, mese: 11 });
    expect(ricetta(c.ricettaId!).proteinaPrincipale).toBe("pesce");
  });

  it("mantiene le porzioni scelte a mano", () => {
    const prima = pianoBase();
    prima["Lun|cena"] = { ...prima["Lun|cena"], porzioni: 5 };
    const esito = rigeneraSlot({ ricette: SEED_RECIPES, profilo: profilo(), piano: prima, preferenze: prefs(), chiave: "Lun|cena", vincolo: {}, mese: 11 });
    expect(esito.piano["Lun|cena"].porzioni).toBe(5);
  });
});

describe("vincolo «poco» del wizard", () => {
  it("«poco carne» porta 1-2 pasti di carne in settimana, non zero e non tanti", () => {
    const vincoli = [{ id: "v", testo: "carne", tipo: "poco" as const, volte: 1 }];
    for (let seed = 0; seed < 20; seed++) {
      const r = generaPiano({ ricette: SEED_RECIPES, profilo: profilo(), pianoAttuale: {}, preferenze: prefs({ vincoli }), slotSelezionati: TUTTI, seed, mese: 11 });
      const carne = PRINCIPALI.filter((k) => r.piano[k] && ricettaInCategoria(ricetta(r.piano[k].ricettaId), "carne")).length;
      expect(carne, `seed ${seed}`).toBeGreaterThanOrEqual(1);
      expect(carne, `seed ${seed}`).toBeLessThanOrEqual(3);
    }
  });
});
