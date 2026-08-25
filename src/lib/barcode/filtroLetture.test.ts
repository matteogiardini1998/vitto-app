import { describe, expect, it } from "vitest";
import { creaFiltroLetture } from "./filtroLetture";

const CODICE_A = "8001120450911";
const CODICE_B = "3017620422003";
const CODICE_C = "5449000000996";

/** Simula un codice inquadrato di continuo: una lettura grezza ogni ~16ms (60fps), come farebbe il motore di decodifica. */
function tieniFermoNelMirino(filtro: ReturnType<typeof creaFiltroLetture>, codice: string, dalMs: number, alMs: number) {
  const risultati = [] as ReturnType<typeof filtro.elabora>[];
  for (let t = dalMs; t <= alMs; t += 16) {
    risultati.push(filtro.elabora({ codice, formato: "ean_13" }, t));
  }
  return risultati;
}

describe("filtroLetture", () => {
  it("un codice tenuto fermo nel mirino per 5 secondi genera esattamente 1 battuta", () => {
    const filtro = creaFiltroLetture();
    const risultati = tieniFermoNelMirino(filtro, CODICE_A, 0, 5000);
    const accettate = risultati.filter((r) => r.accettata);
    expect(accettate).toHaveLength(1);
  });

  it("tre prodotti diversi in sequenza ravvicinata generano 3 battute, senza rallentare la raffica", () => {
    const filtro = creaFiltroLetture();
    // Ogni prodotto resta nel mirino ~150ms (tempo realistico di un passaggio rapido), col respiro
    // del cooldown globale (1s) fra un prodotto e il successivo.
    const battuteA = tieniFermoNelMirino(filtro, CODICE_A, 0, 150).filter((r) => r.accettata);
    const battuteB = tieniFermoNelMirino(filtro, CODICE_B, 1050, 1200).filter((r) => r.accettata);
    const battuteC = tieniFermoNelMirino(filtro, CODICE_C, 2100, 2250).filter((r) => r.accettata);
    expect(battuteA).toHaveLength(1);
    expect(battuteB).toHaveLength(1);
    expect(battuteC).toHaveLength(1);
  });

  it("la stessa confezione battuta due volte con una pausa vera genera 2 battute (per l'incremento di quantità)", () => {
    const filtro = creaFiltroLetture();
    const primaBattuta = tieniFermoNelMirino(filtro, CODICE_A, 0, 100).filter((r) => r.accettata);
    // Il codice esce dal mirino: nessuna lettura per più del cooldown-per-codice (3s).
    const secondaBattuta = tieniFermoNelMirino(filtro, CODICE_A, 3200, 3300).filter((r) => r.accettata);
    expect(primaBattuta).toHaveLength(1);
    expect(secondaBattuta).toHaveLength(1);
  });

  it("lo stesso codice ripresentato prima del suo cooldown (breve pausa) non ribatte", () => {
    const filtro = creaFiltroLetture();
    const prima = tieniFermoNelMirino(filtro, CODICE_A, 0, 100).filter((r) => r.accettata);
    // Pausa di 1s, ben sotto i 3s del cooldown per-codice.
    const dopo = tieniFermoNelMirino(filtro, CODICE_A, 1100, 1200);
    const accettateDopo = dopo.filter((r) => r.accettata);
    const inCooldown = dopo.filter((r) => r.feedback === "cooldown");
    expect(prima).toHaveLength(1);
    expect(accettateDopo).toHaveLength(0);
    expect(inCooldown.length).toBeGreaterThan(0);
  });

  it("richiede conferme su più frame: una singola lettura isolata non basta", () => {
    const filtro = creaFiltroLetture();
    const esito = filtro.elabora({ codice: CODICE_A, formato: "ean_13" }, 0);
    expect(esito.accettata).toBe(false);
  });

  it("una lettura sporca isolata in mezzo a letture buone non fa scattare un codice sbagliato", () => {
    const filtro = creaFiltroLetture();
    filtro.elabora({ codice: CODICE_A, formato: "ean_13" }, 0);
    filtro.elabora({ codice: "0000000000000", formato: "ean_13" }, 16); // frame mosso, lettura sbagliata
    filtro.elabora({ codice: CODICE_A, formato: "ean_13" }, 32);
    filtro.elabora({ codice: CODICE_A, formato: "ean_13" }, 48);
    const esito = filtro.elabora({ codice: CODICE_A, formato: "ean_13" }, 64);
    expect(esito.accettata).toBe(true);
  });
});
