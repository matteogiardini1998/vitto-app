import { INGREDIENTI, type IngredienteBase } from "../data/ingredienti";
import { COPERTURA_MINIMA_STIMA, SOGLIE_TAG_NUTRIZIONALI } from "../data/soglieNutrizionali";
import type { Ricetta } from "../types";

const STOPWORD = new Set(["di", "d", "a", "al", "allo", "alla", "ai", "agli", "alle", "del", "della", "dei", "delle", "e", "con", "da"]);

function normalizza(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((parola) => parola && !STOPWORD.has(parola))
    .join(" ")
    .trim();
}

/** Un piccolo tentativo di singolare/plurale sull'ultima parola: "zucchine" <-> "zucchina". */
function varianteNumero(frase: string): string[] {
  const parole = frase.split(" ");
  const ultima = parole[parole.length - 1];
  if (!ultima) return [frase];
  const base = parole.slice(0, -1);
  const alternative = new Set<string>();
  if (ultima.endsWith("a")) alternative.add(ultima.slice(0, -1) + "e");
  if (ultima.endsWith("e")) {
    alternative.add(ultima.slice(0, -1) + "i");
    alternative.add(ultima.slice(0, -1) + "a");
  }
  if (ultima.endsWith("o")) alternative.add(ultima.slice(0, -1) + "i");
  if (ultima.endsWith("i")) {
    alternative.add(ultima.slice(0, -1) + "o");
    alternative.add(ultima.slice(0, -1) + "e");
  }
  return [frase, ...[...alternative].map((v) => [...base, v].join(" "))];
}

type VoceIndice = { chiave: string; ingrediente: IngredienteBase };

let indiceCache: VoceIndice[] | null = null;
function indice(): VoceIndice[] {
  if (indiceCache) return indiceCache;
  indiceCache = [];
  for (const ing of INGREDIENTI) {
    for (const forma of [ing.nome, ...ing.sinonimi]) {
      indiceCache.push({ chiave: normalizza(forma), ingrediente: ing });
    }
  }
  return indiceCache;
}

/**
 * Risolve un nome libero (come scritto in una ricetta) in una voce del
 * dizionario. Case-insensitive, tollerante a plurali semplici e a un
 * ordine leggermente diverso delle parole (grazie alla rimozione delle
 * preposizioni). Non risolve mai per approssimazione sui valori: o trova
 * la voce giusta, o ritorna null — MAI un dato inventato.
 */
export function risolviIngrediente(nomeLibero: string): IngredienteBase | null {
  const normalizzato = normalizza(nomeLibero);
  if (!normalizzato) return null;

  for (const candidato of varianteNumero(normalizzato)) {
    const trovato = indice().find((v) => v.chiave === candidato);
    if (trovato) return trovato.ingrediente;
  }
  return null;
}

export type EsitoConversione =
  | { calcolabile: true; grammi: number }
  | { calcolabile: false };

const UNITA_A_PEZZO = new Set(["pz", "fette", "spicchi", "filetti", "foglia", "costa"]);

function eContributoSempreZero(ing: IngredienteBase): boolean {
  return (
    ing.per100g.kcal === 0 &&
    ing.per100g.proteine === 0 &&
    ing.per100g.carboidrati === 0 &&
    ing.per100g.grassi === 0 &&
    ing.per100g.fibre === 0
  );
}

/** Converte una quantità scritta in ricetta in grammi, per un dato ingrediente del dizionario. */
export function quantitaInGrammi(qta: number | null, unita: string, ing: IngredienteBase): EsitoConversione {
  const u = unita.trim().toLowerCase();

  if (u === "q.b.") return { calcolabile: true, grammi: 0 };
  // Un ingrediente a contributo zero (spezie, erbe) resta calcolabile a
  // prescindere dal peso esatto: qualunque quantità di zero fa zero.
  if (eContributoSempreZero(ing)) return { calcolabile: true, grammi: 0 };

  if (qta == null) return { calcolabile: false };

  if (u === "g") return { calcolabile: true, grammi: qta };
  if (u === "kg") return { calcolabile: true, grammi: qta * 1000 };
  if (u === "ml") return { calcolabile: true, grammi: qta * (ing.densita ?? 1) };
  if (u === "cucchiai" || u === "cucchiaio") {
    if (ing.gPerCucchiaio == null) return { calcolabile: false };
    return { calcolabile: true, grammi: qta * ing.gPerCucchiaio };
  }
  if (UNITA_A_PEZZO.has(u)) {
    if (ing.pesoMedioPz == null) return { calcolabile: false };
    return { calcolabile: true, grammi: qta * ing.pesoMedioPz };
  }
  return { calcolabile: false };
}

export type NutrizionePorzione = {
  kcal: number;
  proteine: number;
  carboidrati: number;
  zuccheri: number;
  grassi: number;
  fibre: number;
  /** Percentuale (0-1) di ingredienti risolti e convertiti sul totale della ricetta. */
  copertura: number;
};

/**
 * Somma i macro di tutti gli ingredienti risolvibili di una ricetta e
 * divide per le porzioni. Se la copertura degli ingredienti è troppo
 * bassa, il chiamante deve mostrare "dati incompleti" invece dei numeri
 * (vedi `mostraComeStima`): qui torniamo comunque il calcolo grezzo più
 * la percentuale di copertura, la decisione di visualizzazione è della UI.
 */
export function calcolaNutrizione(ricetta: Ricetta): NutrizionePorzione | null {
  if (ricetta.ingredienti.length === 0) return null;

  const totale = { kcal: 0, proteine: 0, carboidrati: 0, zuccheri: 0, grassi: 0, fibre: 0 };
  let risolti = 0;

  for (const voce of ricetta.ingredienti) {
    const ing = risolviIngrediente(voce.nome);
    if (!ing) continue;
    const esito = quantitaInGrammi(voce.qta, voce.unita, ing);
    if (!esito.calcolabile) continue;

    risolti += 1;
    const fattore = esito.grammi / 100;
    totale.kcal += ing.per100g.kcal * fattore;
    totale.proteine += ing.per100g.proteine * fattore;
    totale.carboidrati += ing.per100g.carboidrati * fattore;
    totale.zuccheri += ing.per100g.zuccheri * fattore;
    totale.grassi += ing.per100g.grassi * fattore;
    totale.fibre += ing.per100g.fibre * fattore;
  }

  const copertura = risolti / ricetta.ingredienti.length;
  const porzioni = Math.max(1, ricetta.porzioniBase);

  return {
    kcal: Math.round(totale.kcal / porzioni),
    proteine: Math.round(totale.proteine / porzioni),
    carboidrati: Math.round(totale.carboidrati / porzioni),
    zuccheri: Math.round(totale.zuccheri / porzioni),
    grassi: Math.round(totale.grassi / porzioni),
    fibre: Math.round((totale.fibre / porzioni) * 10) / 10,
    copertura,
  };
}

export function mostraComeStima(nutrizione: NutrizionePorzione | null): boolean {
  return nutrizione != null && nutrizione.copertura >= COPERTURA_MINIMA_STIMA;
}

export type TagNutrizionaleCalcolato = "proteica" | "ipocalorica" | "basso-zucchero" | "ricca-di-fibre";

export const TAG_NUTRIZIONALE_LABEL: Record<TagNutrizionaleCalcolato, string> = {
  proteica: "Proteica",
  ipocalorica: "Ipocalorica",
  "basso-zucchero": "Basso zucchero",
  "ricca-di-fibre": "Ricca di fibre",
};

/**
 * Tag derivati dai macro reali — solo se la copertura è sufficiente per
 * fidarsi del dato. Nessun tag calcolato su ricette con dati incompleti.
 */
export function tagNutrizionaliCalcolati(ricetta: Ricetta): TagNutrizionaleCalcolato[] {
  const n = calcolaNutrizione(ricetta);
  if (!n || !mostraComeStima(n)) return [];

  const tags: TagNutrizionaleCalcolato[] = [];
  const kcalDaProteine = n.proteine * 4;
  const quotaProteica = n.kcal > 0 ? kcalDaProteine / n.kcal : 0;
  if (n.proteine >= SOGLIE_TAG_NUTRIZIONALI.proteicaMinGrammi || quotaProteica >= SOGLIE_TAG_NUTRIZIONALI.proteicaMinQuotaKcal) {
    tags.push("proteica");
  }
  if (n.kcal <= SOGLIE_TAG_NUTRIZIONALI.ipocaloricaMaxKcal) tags.push("ipocalorica");
  if (n.zuccheri <= SOGLIE_TAG_NUTRIZIONALI.bassoZuccheroMaxG) tags.push("basso-zucchero");
  if (n.fibre >= SOGLIE_TAG_NUTRIZIONALI.riccaDiFibreMinG) tags.push("ricca-di-fibre");
  return tags;
}

/** Grammi risolti di un gruppo alimentare per una singola ricetta (per il motore di bilanciamento). */
export function grammiPerGruppo(ricetta: Ricetta): Partial<Record<IngredienteBase["gruppo"], number>> {
  const risultato: Partial<Record<IngredienteBase["gruppo"], number>> = {};
  for (const voce of ricetta.ingredienti) {
    const ing = risolviIngrediente(voce.nome);
    if (!ing) continue;
    const esito = quantitaInGrammi(voce.qta, voce.unita, ing);
    if (!esito.calcolabile) continue;
    risultato[ing.gruppo] = (risultato[ing.gruppo] ?? 0) + esito.grammi;
  }
  return risultato;
}
