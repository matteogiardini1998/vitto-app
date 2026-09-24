import { risolviIngrediente } from "../../src/lib/nutrizione";
import type { DietaCalcolata, DietaRicetta, Ingrediente, Pasto, ProteinaPrincipale, Reparto } from "../../src/types";
import { parsaIngredienteLibero } from "./parseIngredienteLibero";
import type { CampoConfidenza, RicettaImportata } from "./types";

const MAPPA_UNITA: Record<string, string> = {
  g: "g",
  gr: "g",
  grammi: "g",
  kg: "kg",
  ml: "ml",
  l: "l",
  cucchiaio: "cucchiai",
  cucchiai: "cucchiai",
  cucchiaino: "cucchiaini",
  cucchiaini: "cucchiaini",
  tazza: "tazza",
  tazze: "tazze",
  pizzico: "pizzico",
  spicchio: "spicchi",
  spicchi: "spicchi",
  fetta: "fette",
  fette: "fette",
  foglia: "foglie",
  foglie: "foglie",
  pezzo: "pz",
  pezzi: "pz",
  pz: "pz",
  "q.b.": "q.b.",
  qb: "q.b.",
};

function normalizzaUnita(u: string): string {
  const chiave = u.trim().toLowerCase();
  return MAPPA_UNITA[chiave] ?? chiave;
}

export type IngredienteGrezzo = { nome: string; qta: number | null; unita: string; nota?: string };

/** Mappa ogni ingrediente sul database canonico (match esatto/sinonimi/fuzzy, già in `risolviIngrediente`); non risolti restano testo libero con `daVerificare`. */
export function normalizzaIngredienti(grezzi: IngredienteGrezzo[]): Ingrediente[] {
  return grezzi
    .filter((g) => g.nome.trim().length > 0)
    .map((g) => {
      const risolto = risolviIngrediente(g.nome);
      const reparto: Reparto = risolto?.reparto ?? "altro";
      return {
        nome: g.nome.trim(),
        qta: g.qta,
        unita: normalizzaUnita(g.unita || (g.qta == null ? "q.b." : "pz")),
        reparto,
        nota: g.nota,
        daVerificare: !risolto,
      };
    });
}

/** Ingredienti dal testo grezzo di una riga JSON-LD/microdata ("200 g di farina 00"), poi normalizzati come sopra. */
export function normalizzaRigheLibere(righe: string[]): Ingrediente[] {
  return normalizzaIngredienti(righe.map(parsaIngredienteLibero));
}

const GRUPPI_CARNE = new Set(["carne-rossa", "carne-bianca"]);

/**
 * Dieta stimata dagli ingredienti risolti — conservativa: se anche un solo
 * ingrediente non è stato riconosciuto, non possiamo escludere che sia carne
 * o pesce, quindi resta "onnivora" invece di rischiare di proporre carne a
 * un profilo vegano. Meglio un falso negativo (non compare) che un falso
 * positivo (compare dove non dovrebbe).
 */
export function stimaDieta(ingredienti: Ingrediente[]): DietaRicetta {
  if (ingredienti.length === 0) return "onnivora";
  const risolti = ingredienti.map((i) => risolviIngrediente(i.nome));
  if (risolti.some((r) => !r)) return "onnivora";

  const haCarne = risolti.some((r) => GRUPPI_CARNE.has(r!.gruppo));
  const haPesce = risolti.some((r) => r!.gruppo === "pesce");
  const haLatticiniOUova = risolti.some((r) => r!.gruppo === "latticini" || r!.gruppo === "uova");

  if (haCarne || haPesce) return "onnivora";
  if (haLatticiniOUova) return "vegetariana";
  return "vegana";
}

/** Come `stimaDieta`, ma nel formato a più valori che usa il filtro rigido del generatore R2 — stessa cautela sui non risolti. */
export function stimaDieteCalcolate(ingredienti: Ingrediente[]): DietaCalcolata[] {
  if (ingredienti.length === 0) return ["onnivora"];
  const risolti = ingredienti.map((i) => risolviIngrediente(i.nome));
  if (risolti.some((r) => !r)) return ["onnivora"];

  const haCarne = risolti.some((r) => GRUPPI_CARNE.has(r!.gruppo));
  const haPesce = risolti.some((r) => r!.gruppo === "pesce");
  const haLatticiniOUova = risolti.some((r) => r!.gruppo === "latticini" || r!.gruppo === "uova");

  const diete: DietaCalcolata[] = ["onnivora"];
  if (!haCarne) diete.push("pescetariana");
  if (!haCarne && !haPesce) diete.push("vegetariana");
  if (!haCarne && !haPesce && !haLatticiniOUova) diete.push("vegana");
  return diete;
}

/** Proteina principale: il gruppo animale/legume più presente fra gli ingredienti risolti, per punteggio R2. */
export function stimaProteinaPrincipale(ingredienti: Ingrediente[]): ProteinaPrincipale {
  const conteggi = new Map<ProteinaPrincipale, number>();
  const mappa: Record<string, ProteinaPrincipale> = {
    "carne-rossa": "carne_rossa",
    "carne-bianca": "carne_bianca",
    pesce: "pesce",
    uova: "uova",
    latticini: "latticini",
    legumi: "legumi",
  };
  for (const ing of ingredienti) {
    const risolto = risolviIngrediente(ing.nome);
    if (!risolto) continue;
    const proteina = mappa[risolto.gruppo];
    if (!proteina) continue;
    conteggi.set(proteina, (conteggi.get(proteina) ?? 0) + 1);
  }
  // Priorità carne/pesce sulle altre a parità: sono di solito l'ingrediente che dà il nome al piatto.
  const ordinePriorita: ProteinaPrincipale[] = ["carne_rossa", "carne_bianca", "pesce", "uova", "legumi", "latticini"];
  let scelta: ProteinaPrincipale = "nessuna";
  let max = 0;
  for (const p of ordinePriorita) {
    const n = conteggi.get(p) ?? 0;
    if (n > max) {
      max = n;
      scelta = p;
    }
  }
  return scelta;
}

const REGEX_FRITTO = /\bfriggi\b|\bfriggere\b|\bfritt[oie]\b|\bfritte\b|\bsoufflé\b|\bsouffle\b/i;

/** Euristica di trasportabilità sui passaggi (stesso principio del validatore R1: parole intere, non sottostringhe). */
export function stimaTrasportabile(passi: string[]): boolean {
  const testo = passi.join(" ");
  return !REGEX_FRITTO.test(testo);
}

function stimaStile(tempoMin: number): "veloce" | "ricercata" {
  return tempoMin > 0 && tempoMin <= 25 ? "veloce" : "ricercata";
}

function stimaPasto(pasto: Pasto[] | undefined, nome: string): Pasto[] {
  if (pasto && pasto.length > 0) return pasto;
  // Nessuna indicazione: meglio proporla per pranzo e cena (i pasti principali) che lasciarla fuori da tutto.
  const paroleColazione = /colazion|pancake|porridge|overnight oats|muffin dolce/i;
  if (paroleColazione.test(nome)) return ["colazione"];
  return ["pranzo", "cena"];
}

export type InputNormalizzazione = {
  nome: string;
  descrizione: string;
  porzioniBase: number | null;
  tempoMin: number | null;
  pasto?: Pasto[];
  ingredienti: Ingrediente[];
  passi: string[];
  fonte: "import_link" | "import_foto";
  fonteUrl?: string;
  confidenzaIngresso?: Partial<Record<CampoConfidenza, number>>;
};

export function componiRicettaImportata(input: InputNormalizzazione): { ricetta: RicettaImportata; confidenza: Partial<Record<CampoConfidenza, number>> } {
  const tempoMin = input.tempoMin && input.tempoMin > 0 ? input.tempoMin : 30;
  const porzioniBase = input.porzioniBase && input.porzioniBase > 0 ? input.porzioniBase : 4;
  const pasto = stimaPasto(input.pasto, input.nome);
  const dieta = stimaDieta(input.ingredienti);

  const confidenza: Partial<Record<CampoConfidenza, number>> = { ...input.confidenzaIngresso };
  if (!input.tempoMin) confidenza.tempoMin = Math.min(confidenza.tempoMin ?? 1, 0.3);
  if (!input.porzioniBase) confidenza.porzioniBase = Math.min(confidenza.porzioniBase ?? 1, 0.3);
  if (!input.pasto || input.pasto.length === 0) confidenza.pasto = Math.min(confidenza.pasto ?? 1, 0.3);
  if (input.ingredienti.some((i) => i.daVerificare)) confidenza.ingredienti = Math.min(confidenza.ingredienti ?? 1, 0.5);

  const ricetta: RicettaImportata = {
    nome: input.nome.trim() || "Ricetta importata",
    descrizione: input.descrizione.trim(),
    porzioniBase,
    tempoMin,
    costoStimatoPorzione: 0,
    pasto,
    stile: stimaStile(tempoMin),
    tags: [],
    dieta,
    ingredienti: input.ingredienti,
    passi: input.passi,
    fonte: input.fonte,
    fonteUrl: input.fonteUrl,
    dieteCalcolate: stimaDieteCalcolate(input.ingredienti),
    proteinaPrincipale: stimaProteinaPrincipale(input.ingredienti),
    trasportabile: stimaTrasportabile(input.passi),
  };

  return { ricetta, confidenza };
}
