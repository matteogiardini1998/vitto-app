import { describe, expect, it, beforeEach } from "vitest";
import { trovaVoceListaCorrispondente, impareAssociazioneLista } from "./smistamento";
import { useSmistamentoStore } from "../store/smistamentoStore";
import type { VoceSpesa } from "../types";

function voce(nome: string, id = nome): VoceSpesa {
  return { id, nome, qta: null, unita: "", reparto: "altro", presa: false, manuale: true };
}

beforeEach(() => {
  useSmistamentoStore.setState({ mappa: {}, associazioniListaSpesa: {} });
});

describe("trovaVoceListaCorrispondente", () => {
  it("il bug della salsa di soia: nome verboso con marca e formato combacia con la voce breve in lista", () => {
    const lista = [voce("salsa di soia")];
    const esito = trovaVoceListaCorrispondente(
      { barcode: "1", nome: "Salsa di soia", marca: "Kikkoman" },
      lista,
    );
    expect(esito.tipo).toBe("match");
    if (esito.tipo === "match") expect(esito.voce.nome).toBe("salsa di soia");
  });

  it("un barcode già associato in passato trova subito la voce, anche con nome scansionato del tutto diverso", () => {
    const lista = [voce("olio evo")];
    impareAssociazioneLista("999", "olio evo");
    const esito = trovaVoceListaCorrispondente({ barcode: "999", nome: "Cosa Improbabile XYZ", marca: null }, lista);
    expect(esito.tipo).toBe("match");
  });

  it("ponte dizionario ingredienti: risolve nomi diversi verso lo stesso ingrediente quando il contenimento non basta", () => {
    const lista = [voce("pomodori")];
    // "pomodoro cuore di bue" non è contenuto in "pomodori" né viceversa, ma il dizionario risolve entrambi a "Pomodoro"
    const esito = trovaVoceListaCorrispondente({ barcode: "2", nome: "Pomodoro cuore di bue", marca: null }, lista);
    expect(esito.tipo).toBe("match");
  });

  it("similarità fuzzy alta: piccola variazione di battitura genera un match automatico", () => {
    const lista = [voce("passata di pomodoro")];
    const esito = trovaVoceListaCorrispondente({ barcode: "3", nome: "Passata di pomodor", marca: null }, lista);
    expect(esito.tipo).toBe("match");
  });

  it("similarità fuzzy media: un refuso su una parola chiave chiede conferma invece di un match automatico", () => {
    const lista = [voce("mozzarella")];
    const esito = trovaVoceListaCorrispondente({ barcode: "6", nome: "Mozarela di bufala", marca: null }, lista);
    expect(esito.tipo).toBe("conferma");
  });

  it("nessuna corrispondenza plausibile: prodotto scollegato dalla lista", () => {
    const lista = [voce("mele"), voce("latte")];
    const esito = trovaVoceListaCorrispondente({ barcode: "4", nome: "Detersivo piatti", marca: null }, lista);
    expect(esito.tipo).toBe("nessuno");
  });

  it("lista vuota: nessuna corrispondenza senza eccezioni", () => {
    const esito = trovaVoceListaCorrispondente({ barcode: "5", nome: "Qualcosa", marca: null }, []);
    expect(esito.tipo).toBe("nessuno");
  });
});
