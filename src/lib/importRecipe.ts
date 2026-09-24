import type { DietaCalcolata, DietaRicetta, Ingrediente, Pasto, ProteinaPrincipale } from "../types";

/**
 * Stessa forma di `ImportResponse`/`RicettaImportata` in `api/_lib/types.ts`,
 * duplicata qui apposta invece di importata: `src/` e `api/` restano due
 * lati distinti del confine client/server, senza alcun import incrociato —
 * un modo in più (oltre alla key mai spedita al client) per rendere ovvio
 * che nel bundle del browser non deve mai finire codice del server.
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
  fonte: "import_link" | "import_foto";
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
  | "foto_illeggibile"
  | "rate_limited"
  | "richiesta_non_valida"
  | "errore_server";

export type ImportResponse =
  | { ok: true; ricetta: RicettaImportata; confidenza: Partial<Record<CampoConfidenza, number>> }
  | { ok: false; error: string; code: ImportErrorCode };

const LATO_LUNGO_MAX = 1600;
const QUALITA_JPEG = 0.8;

/** Ridimensiona (lato lungo max 1600px) e ricomprime in JPEG ~0.8 prima dell'invio: stessa tecnica di `avatarPhoto.ts`. */
export function comprimiFoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scala = Math.min(1, LATO_LUNGO_MAX / Math.max(img.naturalWidth, img.naturalHeight));
      const larghezza = Math.round(img.naturalWidth * scala);
      const altezza = Math.round(img.naturalHeight * scala);

      const canvas = document.createElement("canvas");
      canvas.width = larghezza;
      canvas.height = altezza;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas non disponibile"));
        return;
      }
      ctx.drawImage(img, 0, 0, larghezza, altezza);
      resolve(canvas.toDataURL("image/jpeg", QUALITA_JPEG));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Immagine non leggibile"));
    };
    img.src = url;
  });
}

async function chiamaApi(corpo: object): Promise<ImportResponse> {
  try {
    const risposta = await fetch("/api/import-recipe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(corpo),
    });
    return (await risposta.json()) as ImportResponse;
  } catch {
    return { ok: false, error: "Connessione assente o server non raggiungibile.", code: "fetch_fallito" };
  }
}

export function importaDaLink(url: string): Promise<ImportResponse> {
  return chiamaApi({ mode: "link", url });
}

export function importaDaFoto(immagini: string[]): Promise<ImportResponse> {
  return chiamaApi({ mode: "photo", images: immagini });
}

/** Se negli appunti c'è già un URL, per proporlo subito con un tap (Step 4). Richiede permesso, fallisce silenziosamente se negato. */
export async function urlDagliAppunti(): Promise<string | null> {
  try {
    if (!navigator.clipboard?.readText) return null;
    const testo = (await navigator.clipboard.readText()).trim();
    if (/^https?:\/\/\S+$/i.test(testo)) return testo;
    return null;
  } catch {
    return null;
  }
}
