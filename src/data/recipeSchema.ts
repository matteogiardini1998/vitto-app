/**
 * Fase R1 — nuovo schema ricetta. Diete e stagionalità NON si taggano a
 * mano: si calcolano dagli ingredienti con `getDiete`/`getMesiStagione`,
 * funzioni pure, testabili, sempre coerenti col database ingredienti.
 *
 * Riconciliazione con l'app esistente (concordata nell'audit prima di
 * scrivere questo file): il tipo `Recipe` qui sotto aggiunge due campi che
 * NON sono nella specifica originale — `descrizione` e `costoStimatoPorzione`
 * — perché il resto dell'app (dettaglio ricetta, form, stima di spesa nel
 * wizard) li usa già in 9 punti diversi. Toglierli avrebbe rotto l'app senza
 * alcun bisogno: sono metadati editoriali, non hanno nulla a che fare con
 * l'algoritmo del generatore che questa fase non deve toccare.
 *
 * L'algoritmo (generator.ts) continua a lavorare sul vecchio tipo `Ricetta`
 * (src/types.ts): `toRicetta()` in fondo a questo file traduce ogni `Recipe`
 * in un `Ricetta` equivalente, così la Fase R2 può sostituire l'algoritmo con
 * calma senza che questa fase debba toccarlo.
 */

import type {
  Area,
  DietaCalcolata,
  DietaRicetta,
  Ingrediente,
  Pasto,
  Portata,
  ProteinaPrincipale,
  Reparto as RepartoLegacy,
  Ricetta,
} from "../types.ts";
import { getIngredient, type Ingredient } from "./ingredients.ts";

export type { Area, DietaCalcolata, Portata, ProteinaPrincipale } from "../types.ts";

export type MealSlot = "colazione" | "pranzo" | "cena" | "spuntino";

export type IngredienteRicetta = {
  ingredientId: string;
  quantitaG: number;
  opzionale?: boolean;
  nota?: string;
};

export type Recipe = {
  id: string;
  titolo: string;
  slotAmmessi: MealSlot[];
  portata: Portata;
  pesantezza: "leggera" | "media" | "sostanziosa";
  proteinaPrincipale: ProteinaPrincipale;
  tempoPrepMin: number;
  tempoCotturaMin: number;
  difficolta: 1 | 2 | 3;
  porzioni: number;
  conservabilitaGiorni: number;
  congelabile: boolean;
  trasportabile: boolean;
  area: Area;
  ingredienti: IngredienteRicetta[];
  passaggi: string[];
  fonte: "seed" | "utente" | "import_link" | "import_foto";
  fonteUrl?: string;
  // --- aggiunti per compatibilità con l'app esistente (vedi commento in cima al file) ---
  descrizione: string;
  costoStimatoPorzione: number;
};

function ingredientiVincolanti(recipe: Recipe): Ingredient[] {
  // Un ingrediente opzionale (facoltativo, si può omettere) non vincola né la
  // dieta né la stagionalità: la ricetta resta valida anche senza di lui.
  return recipe.ingredienti
    .filter((i) => !i.opzionale)
    .map((i) => getIngredient(i.ingredientId))
    .filter((i): i is Ingredient => i !== undefined);
}

/**
 * Diete compatibili con la ricetta, calcolate dai soli ingredienti non
 * opzionali. "senza lattosio" è approssimata come "nessun ingrediente
 * caseario" (il flag disponibile è `latticini`, non un dato di lattosio
 * effettivo — un'approssimazione dichiarata, non un dato clinico).
 */
export function getDiete(recipe: Recipe): DietaCalcolata[] {
  const ing = ingredientiVincolanti(recipe);
  const haCarne = ing.some((i) => i.flags.carne);
  const haPesce = ing.some((i) => i.flags.pesce);
  const haLatticini = ing.some((i) => i.flags.latticini);
  const haUova = ing.some((i) => i.flags.uova);
  const haMiele = ing.some((i) => i.flags.miele);
  const haGlutine = ing.some((i) => i.flags.glutine);

  const diete: DietaCalcolata[] = ["onnivora"];
  if (!haCarne) diete.push("pescetariana");
  if (!haCarne && !haPesce) diete.push("vegetariana");
  if (!haCarne && !haPesce && !haLatticini && !haUova && !haMiele) diete.push("vegana");
  if (!haGlutine) diete.push("senza_glutine");
  if (!haLatticini) diete.push("senza_lattosio");
  return diete;
}

/**
 * Mesi in cui TUTTI gli ingredienti freschi stagionali non opzionali sono di
 * stagione. Una ricetta senza alcun ingrediente stagionale (solo dispensa,
 * proteine non stagionali) è disponibile tutto l'anno: 1..12.
 */
export function getMesiStagione(recipe: Recipe): number[] {
  const ing = ingredientiVincolanti(recipe);
  const stagionali = ing.filter((i) => i.mesiStagione && i.mesiStagione.length > 0);
  if (stagionali.length === 0) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((mese) => stagionali.every((i) => i.mesiStagione!.includes(mese)));
}

/** Vero se la ricetta è pienamente di stagione in quel mese (== ha almeno un vincolo stagionale, e tutti sono soddisfatti). */
export function ePienamenteDiStagione(recipe: Recipe, mese: number): boolean {
  const ing = ingredientiVincolanti(recipe);
  const stagionali = ing.filter((i) => i.mesiStagione && i.mesiStagione.length > 0);
  if (stagionali.length === 0) return false; // "tutto l'anno" non è "di stagione": è neutra.
  return stagionali.every((i) => i.mesiStagione!.includes(mese));
}

/** Vero se la ricetta non ha alcun ingrediente stagionale (disponibile in ogni momento dell'anno). */
export function eSempreDisponibile(recipe: Recipe): boolean {
  return ingredientiVincolanti(recipe).every((i) => !i.mesiStagione || i.mesiStagione.length === 0);
}

/** Nomi degli ingredienti stagionali che determinano `getMesiStagione` — per spiegare "Perché questo piatto" in R2. */
export function nomiIngredientiStagionali(recipe: Recipe): string[] {
  return ingredientiVincolanti(recipe)
    .filter((i) => i.mesiStagione && i.mesiStagione.length > 0)
    .map((i) => i.nome);
}

/**
 * Fase R2 — Sud e Isole anticipano le primizie di circa un mese e le
 * prolungano di circa un mese rispetto al calendario nazionale: qui in
 * un'unica costante, così si può ritoccare senza cercare nel codice.
 */
export const OFFSET_MESI_SUD_ISOLE = 1;

function meseSuccessivo(mese: number, delta: number): number {
  return ((mese - 1 + delta + 12) % 12) + 1;
}

/**
 * Applica lo scostamento di stagionalità per area a un elenco di mesi già
 * calcolato da `getMesiStagione`: per Sud/Isole allarga la finestra di un
 * mese su entrambi i lati (chi era di stagione a marzo lo è già a febbraio
 * e ancora ad aprile). Nazionale, Nord, Centro e Internazionale restano
 * invariati. Non tocca "tutto l'anno" (12 mesi): non c'è nulla da allargare.
 */
export function mesiStagioneConArea(mesiNazionali: number[], area: Area): number[] {
  if (mesiNazionali.length === 12 || mesiNazionali.length === 0) return mesiNazionali;
  if (area !== "sud" && area !== "isole") return mesiNazionali;
  const allargati = new Set<number>();
  for (const mese of mesiNazionali) {
    for (let d = -OFFSET_MESI_SUD_ISOLE; d <= OFFSET_MESI_SUD_ISOLE; d++) {
      allargati.add(meseSuccessivo(mese, d));
    }
  }
  return Array.from(allargati).sort((a, b) => a - b);
}

const REPARTO_LEGACY: Record<Ingredient["reparto"], RepartoLegacy> = {
  ortofrutta: "frutta-verdura",
  carne: "carne-pesce",
  pesce: "carne-pesce",
  latticini: "latticini-uova",
  uova: "latticini-uova",
  panetteria: "pane-forno",
  pasta_riso_cereali: "dispensa",
  legumi: "dispensa",
  dispensa: "dispensa",
  surgelati: "surgelati",
  spezie_condimenti: "condimenti-spezie",
  bevande: "bevande",
};

function ingredientiLegacy(recipe: Recipe): Ingrediente[] {
  return recipe.ingredienti.map((i) => {
    const ing = getIngredient(i.ingredientId);
    return {
      nome: ing ? ing.nome : i.ingredientId,
      qta: i.quantitaG,
      unita: "g",
      reparto: ing ? REPARTO_LEGACY[ing.reparto] : "dispensa",
    };
  });
}

function pastoLegacy(recipe: Recipe): Pasto[] {
  // "spuntino" non esiste ancora come slot per il generatore (R2 se ne
  // occuperà): una ricetta ammessa solo a spuntino risulta senza pasto
  // legacy, quindi semplicemente non entra nella generazione automatica —
  // non è una regressione, è uno stato "in attesa di R2".
  const mappa: Record<MealSlot, Pasto | null> = { colazione: "colazione", pranzo: "pranzo", cena: "cena", spuntino: null };
  const out: Pasto[] = [];
  for (const s of recipe.slotAmmessi) {
    const p = mappa[s];
    if (p && !out.includes(p)) out.push(p);
  }
  return out;
}

function dietaLegacy(recipe: Recipe): DietaRicetta {
  const diete = getDiete(recipe);
  if (diete.includes("vegana")) return "vegana";
  if (diete.includes("vegetariana")) return "vegetariana";
  // Il campo legacy a 3 valori non ha una casella "pescetariana": resta
  // "onnivora" qui (serve solo per badge/filtri di visualizzazione). Il
  // filtro vero del generatore, da Fase R2, usa `dieteCalcolate` qui sotto,
  // che distingue correttamente il pesce dalla carne.
  return "onnivora";
}

function stileLegacy(recipe: Recipe): "veloce" | "ricercata" {
  const tempoTotale = recipe.tempoPrepMin + recipe.tempoCotturaMin;
  return tempoTotale <= 25 && recipe.difficolta <= 2 ? "veloce" : "ricercata";
}

function tagsLegacy(recipe: Recipe): string[] {
  const tags: string[] = [];
  tags.push(stileLegacy(recipe));
  if (recipe.pesantezza === "leggera") tags.push("leggera");
  if (recipe.pesantezza === "sostanziosa") tags.push("comfort");
  if (recipe.proteinaPrincipale !== "nessuna") tags.push("proteica");
  const mesi = getMesiStagione(recipe);
  const eSempre = mesi.length === 12;
  if (!eSempre) {
    const soloEstate = mesi.every((m) => [5, 6, 7, 8, 9].includes(m));
    const soloInverno = mesi.every((m) => [10, 11, 12, 1, 2, 3].includes(m));
    if (soloEstate) tags.push("estiva");
    if (soloInverno) tags.push("invernale");
  }
  const diete = getDiete(recipe);
  if (diete.includes("vegana")) tags.push("vegana");
  else if (diete.includes("vegetariana")) tags.push("vegetariana");
  return tags;
}

/** Traduce una ricetta nel nuovo schema nel tipo `Ricetta` che l'algoritmo (generator.ts) e la UI si aspettano. */
export function toRicetta(recipe: Recipe): Omit<Ricetta, "rating" | "preferita" | "sfavorita" | "fissata" | "custom"> {
  return {
    id: recipe.id,
    nome: recipe.titolo,
    descrizione: recipe.descrizione,
    porzioniBase: recipe.porzioni,
    tempoMin: recipe.tempoPrepMin + recipe.tempoCotturaMin,
    costoStimatoPorzione: recipe.costoStimatoPorzione,
    pasto: pastoLegacy(recipe),
    stile: stileLegacy(recipe),
    tags: tagsLegacy(recipe),
    dieta: dietaLegacy(recipe),
    ingredienti: ingredientiLegacy(recipe),
    passi: recipe.passaggi,
    // --- Fase R2 ---
    dieteCalcolate: getDiete(recipe),
    portata: recipe.portata,
    pesantezza: recipe.pesantezza,
    proteinaPrincipale: recipe.proteinaPrincipale,
    conservabilitaGiorni: recipe.conservabilitaGiorni,
    congelabile: recipe.congelabile,
    trasportabile: recipe.trasportabile,
    area: recipe.area,
    mesiStagione: getMesiStagione(recipe),
    ingredientiStagionali: nomiIngredientiStagionali(recipe),
  };
}
