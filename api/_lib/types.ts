import type { DietaCalcolata, Ingrediente, Pasto, DietaRicetta, ProteinaPrincipale } from "../../src/types";

export type ImportRequest =
  | { mode: "link"; url: string }
  | { mode: "photo"; images: string[] }; // data URI (base64), già compresse lato client

/** Campi su cui l'anteprima mostra un segnale "da verificare" quando la confidenza è bassa. */
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
  fonte: "import_link" | "import_foto";
  fonteUrl?: string;
  // Stimati dagli ingredienti risolti (Step 3), per integrare subito la ricetta nel generatore R2.
  dieteCalcolate: DietaCalcolata[];
  proteinaPrincipale: ProteinaPrincipale;
  trasportabile: boolean;
};

export type ImportResponse =
  | {
      ok: true;
      ricetta: RicettaImportata;
      /** 0-1 per campo: sotto 0.6 l'anteprima lo evidenzia (senza allarmismi). */
      confidenza: Partial<Record<CampoConfidenza, number>>;
    }
  | { ok: false; error: string; code: ImportErrorCode };

export type ImportErrorCode =
  | "url_non_valido"
  | "fetch_fallito"
  | "timeout"
  | "nessuna_ricetta_trovata"
  | "solo_didascalia_video"
  | "foto_illeggibile"
  | "rate_limited"
  | "richiesta_non_valida"
  | "errore_server";

/** Struttura JSON che chiediamo al modello (sia per il fallback testo sia per le foto) — un sottoinsieme di RicettaImportata più le note di conversione e la confidenza. */
export type EstrazioneAI = {
  nome: string;
  descrizione: string;
  porzioniBase: number;
  tempoMin: number;
  pasto: Pasto[];
  ingredienti: {
    nome: string;
    qta: number | null;
    unita: string;
    nota?: string;
  }[];
  passi: string[];
  linguaOriginale: string;
  confidenza: Partial<Record<CampoConfidenza, number>>;
  /** Vero se il testo/immagine analizzato non conteneva affatto una ricetta riconoscibile. */
  nessunaRicettaTrovata: boolean;
};
