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
    expect(parsaIngredienteLibero("Zafferano (2 bustine da 0,15 g cad) 0,3 g")).toMatchObject({
      nome: "Zafferano (2 bustine da 0,15 g cad)",
      qta: 0.3,
      unita: "g",
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
  });
});
