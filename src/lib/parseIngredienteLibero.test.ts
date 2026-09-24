import { describe, expect, it } from "vitest";
import { parsaIngredienteLibero } from "./parseIngredienteLibero";

describe("parsaIngredienteLibero", () => {
  it("quantità e unità in testa (formato più comune sul web)", () => {
    expect(parsaIngredienteLibero("200 g di farina 00")).toMatchObject({ nome: "farina 00", qta: 200, unita: "g" });
    expect(parsaIngredienteLibero("2 cucchiai di olio extravergine")).toMatchObject({ nome: "olio extravergine", qta: 2, unita: "cucchiai" });
    expect(parsaIngredienteLibero("1/2 cipolla")).toMatchObject({ nome: "cipolla", qta: 0.5, unita: "pz" });
  });

  it("quantità e unità in coda (formato GialloZafferano/Cookaround)", () => {
    expect(parsaIngredienteLibero("Riso Carnaroli 320 g")).toMatchObject({ nome: "Riso Carnaroli", qta: 320, unita: "g" });
    // Il qualificatore fra parentesi va nella nota, non nel nome (Step 3, Fase R3b).
    expect(parsaIngredienteLibero("Zafferano (2 bustine da 0,15 g cad) 0,3 g")).toMatchObject({
      nome: "Zafferano",
      qta: 0.3,
      unita: "g",
      nota: "2 bustine da 0,15 g cad",
    });
    expect(parsaIngredienteLibero("Scalogno 1")).toMatchObject({ nome: "Scalogno", qta: 1, unita: "pz" });
  });

  it("q.b. in testa e in coda", () => {
    expect(parsaIngredienteLibero("q.b. pepe nero")).toMatchObject({ nome: "pepe nero", qta: null, unita: "q.b." });
    expect(parsaIngredienteLibero("Sale q.b.")).toMatchObject({ nome: "Sale", qta: null, unita: "q.b." });
    expect(parsaIngredienteLibero("q.b.")).toMatchObject({ daVerificare: true });
  });

  it("senza numero riconoscibile: testo intero come nome, da verificare", () => {
    const r = parsaIngredienteLibero("circa quanto ne serve per la ricetta");
    expect(r.daVerificare).toBe(true);
    expect(r.nome).toBe("circa quanto ne serve per la ricetta");
  });

  it("numeri in parola", () => {
    expect(parsaIngredienteLibero("una cipolla")).toMatchObject({ nome: "cipolla", qta: 1, unita: "pz" });
    expect(parsaIngredienteLibero("mezza cipolla")).toMatchObject({ nome: "cipolla", qta: 0.5, unita: "pz" });
    expect(parsaIngredienteLibero("mezzo cucchiaino di sale")).toMatchObject({ nome: "sale", qta: 0.5, unita: "cucchiaini" });
  });

  it("nuove unità italiane (Fase R3b): bicchiere, mazzetto", () => {
    expect(parsaIngredienteLibero("1 bicchiere di latte")).toMatchObject({ nome: "latte", qta: 1, unita: "bicchiere" });
    expect(parsaIngredienteLibero("un mazzetto di prezzemolo")).toMatchObject({ nome: "prezzemolo", qta: 1, unita: "mazzetto", daVerificare: false });
  });

  it("prefissi decorativi (trattini, pallini, emoji) vengono rimossi prima del parsing", () => {
    expect(parsaIngredienteLibero("- 200 g farina")).toMatchObject({ nome: "farina", qta: 200, unita: "g" });
    expect(parsaIngredienteLibero("• 2 uova")).toMatchObject({ nome: "uova", qta: 2, unita: "pz" });
    expect(parsaIngredienteLibero("🍅 400 g pomodori")).toMatchObject({ nome: "pomodori", qta: 400, unita: "g" });
  });

  it("qualificatore fra parentesi va nella nota, non nel nome", () => {
    expect(parsaIngredienteLibero("guanciale (o pancetta) 100 g")).toMatchObject({ nome: "guanciale", qta: 100, unita: "g", nota: "o pancetta" });
  });
});
