import { describe, expect, it } from "vitest";
import { normalizzaIngredienti, normalizzaRigheLibere, stimaDieta, stimaProteinaPrincipale, stimaTrasportabile } from "./normalize";

describe("normalizzaRigheLibere", () => {
  it("risolve gli ingredienti riconosciuti e segnala quelli sconosciuti", () => {
    const risultato = normalizzaRigheLibere(["200 g di farina 00", "1 kg di melanzane", "3 bacche di ginepro selvatico"]);
    expect(risultato[0]).toMatchObject({ nome: "farina 00", daVerificare: false });
    expect(risultato[1]).toMatchObject({ nome: "melanzane", daVerificare: false, reparto: "frutta-verdura" });
    expect(risultato[2].daVerificare).toBe(true);
  });
});

describe("stimaDieta", () => {
  it("vegana se non ci sono ingredienti animali risolti", () => {
    const ingredienti = normalizzaRigheLibere(["1 kg di melanzane", "400 g di pomodori pelati"]);
    expect(stimaDieta(ingredienti)).toBe("vegana");
  });

  it("vegetariana con latticini ma senza carne/pesce", () => {
    const ingredienti = normalizzaRigheLibere(["200 g di mozzarella", "1 kg di melanzane"]);
    expect(stimaDieta(ingredienti)).toBe("vegetariana");
  });

  it("onnivora se anche un solo ingrediente non è riconosciuto (conservativo)", () => {
    const ingredienti = normalizzaIngredienti([{ nome: "un ingrediente misterioso", qta: null, unita: "" }]);
    expect(stimaDieta(ingredienti)).toBe("onnivora");
  });
});

describe("stimaProteinaPrincipale", () => {
  it("riconosce il pesce come proteina principale", () => {
    const ingredienti = normalizzaRigheLibere(["2 filetti di salmone", "1 limone"]);
    expect(stimaProteinaPrincipale(ingredienti)).toBe("pesce");
  });

  it("nessuna proteina se non risolve nulla di animale/legume", () => {
    const ingredienti = normalizzaRigheLibere(["1 kg di melanzane"]);
    expect(stimaProteinaPrincipale(ingredienti)).toBe("nessuna");
  });
});

describe("stimaTrasportabile", () => {
  it("falso per un fritto", () => {
    expect(stimaTrasportabile(["Friggere le cotolette in olio bollente."])).toBe(false);
  });

  it("vero per un piatto normale, anche se il testo contiene parole simili", () => {
    expect(stimaTrasportabile(["Cuocere la frittata a fuoco basso."])).toBe(true);
  });
});
