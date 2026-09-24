import type { ImportLinkResponse } from "./ricettaImportata";

export type { ImportLinkResponse, ImportErrorCode, RicettaImportata, CampoConfidenza } from "./ricettaImportata";

/** Chiama la funzione serverless che scarica la pagina (il browser non può, per CORS): nessuna AI, solo JSON-LD/microdata/testo pulito. */
export async function importaDaLink(url: string): Promise<ImportLinkResponse> {
  try {
    const risposta = await fetch("/api/import-link", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return (await risposta.json()) as ImportLinkResponse;
  } catch {
    return { ok: false, error: "Connessione assente o server non raggiungibile.", code: "fetch_fallito" };
  }
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

/** Come sopra, ma per un blocco di testo lungo negli appunti (Step 4, "Incolla testo"): non un URL, un testo "sostanzioso". */
export async function testoDagliAppunti(minimoCaratteri = 80): Promise<string | null> {
  try {
    if (!navigator.clipboard?.readText) return null;
    const testo = (await navigator.clipboard.readText()).trim();
    if (testo.length >= minimoCaratteri && !/^https?:\/\/\S+$/i.test(testo)) return testo;
    return null;
  } catch {
    return null;
  }
}
