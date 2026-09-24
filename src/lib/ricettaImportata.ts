import type { DietaCalcolata, DietaRicetta, Ingrediente, Pasto, ProteinaPrincipale } from "../types";

/**
 * Tipi condivisi fra le due sorgenti di importazione (link e testo
 * incollato) e la loro normalizzazione — un solo posto, usato sia dal
 * codice client (`parseRecipeText.ts`, `normalizeRicetta.ts`,
 * `importRecipe.ts`, l'anteprima in `RicettaFormScreen.tsx`) sia dalla
 * funzione serverless `api/import-link.ts` (che importa da qui, non il
 * contrario: nessun codice server nel bundle del client).
 */

export type CampoConfidenza = "nome" | "porzioniBase" | "tempoMin" | "pasto" | "ingredienti" | "passi";

export type RicettaImportata = {
  nome: string;
  descrizione: string;
  porzioniBase: number;
  tempoMin: number;
  costoStimatoPorzione: number;
  pasto: Pasto[];
  stile: "veloce" | "ricercata";
  tags: string[];
  dieta: DietaRicetta;
  ingredienti: Ingrediente[];
  passi: string[];
  fonte: "import_link" | "import_testo";
  fonteUrl?: string;
  dieteCalcolate: DietaCalcolata[];
  proteinaPrincipale: ProteinaPrincipale;
  trasportabile: boolean;
};

export type ImportErrorCode =
  | "url_non_valido"
  | "fetch_fallito"
  | "timeout"
  | "nessuna_ricetta_trovata"
  | "solo_didascalia_video"
  | "rate_limited"
  | "richiesta_non_valida"
  | "errore_server";

/**
 * Risposta del link: o un `RicettaGrezza`/AI-free già strutturato (JSON-LD o
 * microdata, alta confidenza), o del testo pulito che il CLIENT passa a
 * `parseRecipeText.ts` (stessa strada di "Incolla testo").
 */
export type ImportLinkResponse =
  | { ok: true; tipo: "strutturato"; ricetta: RicettaImportata; confidenza: Partial<Record<CampoConfidenza, number>> }
  | { ok: true; tipo: "testo"; testo: string; fonteUrl: string }
  | { ok: false; error: string; code: ImportErrorCode };
