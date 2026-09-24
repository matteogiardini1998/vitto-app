import type { VercelRequest, VercelResponse } from "@vercel/node";
import { scaricaHtml } from "./_lib/fetchPagina";
import { ipDaRichiesta, verificaRateLimit } from "./_lib/rateLimit";
import { recuperaDidascalia, riconoscePiattaformaSicura } from "./_lib/social";
import { estraiRecipeJsonLd, estraiRecipeMicrodata, estraiTestoPrincipale } from "../src/lib/htmlExtract";
import { normalizzaRigheLibere, componiRicettaImportata } from "../src/lib/normalizeRicetta";
import type { ImportLinkResponse } from "../src/lib/ricettaImportata";

/**
 * Fase R3b: l'unica cosa che questa funzione fa è scaricare una pagina
 * esterna (il browser non può, per via del CORS) e provare a leggerci una
 * ricetta con JSON-LD/microdata — nessuna chiamata a un modello, nessuna
 * chiave API, costo zero. Quando JSON-LD/microdata non bastano, torna il
 * testo pulito della pagina: è il CLIENT a farci girare sopra
 * `parseRecipeText.ts` (la stessa strada di "Incolla testo"), tutto in
 * locale, di nuovo senza rete né costo.
 */
export const config = { maxDuration: 15 };

function erroreJson(res: VercelResponse, status: number, body: Extract<ImportLinkResponse, { ok: false }>) {
  res.status(status).json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return erroreJson(res, 405, { ok: false, error: "Metodo non consentito.", code: "richiesta_non_valida" });
  }

  const ip = ipDaRichiesta(req.headers);
  const rateLimit = verificaRateLimit(ip);
  if (!rateLimit.consentito) {
    return erroreJson(res, 429, { ok: false, error: "Hai raggiunto il numero massimo di importazioni per oggi. Riprova domani.", code: "rate_limited" });
  }

  const corpo = req.body as { url?: unknown } | undefined;
  if (!corpo || typeof corpo.url !== "string" || !corpo.url.trim()) {
    return erroreJson(res, 400, { ok: false, error: "Manca il link.", code: "richiesta_non_valida" });
  }

  let url: URL;
  try {
    url = new URL(corpo.url.trim());
    if (!/^https?:$/.test(url.protocol)) throw new Error("protocollo non valido");
  } catch {
    return erroreJson(res, 400, { ok: false, error: "Il link non sembra valido.", code: "url_non_valido" });
  }

  try {
    const piattaforma = riconoscePiattaformaSicura(url);
    if (piattaforma) {
      const { testo, soloVideoParlato } = await recuperaDidascalia(url.toString(), piattaforma);
      if (soloVideoParlato || !testo) {
        return erroreJson(res, 200, {
          ok: false,
          error: "In questo video la ricetta è solo parlata. Se trovi i passaggi scritti da qualche parte, incollali qui.",
          code: "solo_didascalia_video",
        });
      }
      return void res.status(200).json({ ok: true, tipo: "testo", testo, fonteUrl: url.toString() } satisfies ImportLinkResponse);
    }

    const pagina = await scaricaHtml(url.toString());
    const grezza = estraiRecipeJsonLd(pagina.html) ?? estraiRecipeMicrodata(pagina.html);
    if (grezza) {
      const { ricetta, confidenza } = componiRicettaImportata({
        nome: grezza.nome,
        descrizione: grezza.descrizione,
        porzioniBase: grezza.porzioniBase,
        tempoMin: grezza.tempoMin,
        ingredienti: normalizzaRigheLibere(grezza.ingredienti),
        passi: grezza.passi,
        fonte: "import_link",
        fonteUrl: pagina.urlFinale,
      });
      return void res.status(200).json({ ok: true, tipo: "strutturato", ricetta, confidenza } satisfies ImportLinkResponse);
    }

    const testo = estraiTestoPrincipale(pagina.html);
    return void res.status(200).json({ ok: true, tipo: "testo", testo, fonteUrl: pagina.urlFinale } satisfies ImportLinkResponse);
  } catch (e) {
    const messaggio = e instanceof Error ? e.message : "";
    const bloccato = /HTTP 40[13]/.test(messaggio);
    const timeout = e instanceof Error && e.name === "AbortError";
    if (bloccato) {
      return erroreJson(res, 200, {
        ok: false,
        error: "Questo sito non mi lascia leggere la pagina. Copia il testo della ricetta e incollalo: ci penso io a sistemarlo.",
        code: "fetch_fallito",
      });
    }
    if (timeout) {
      return erroreJson(res, 504, { ok: false, error: "La pagina ci ha messo troppo a rispondere.", code: "timeout" });
    }
    console.error("import-link:", e);
    return erroreJson(res, 502, { ok: false, error: "Non sono riuscito a scaricare questa pagina.", code: "fetch_fallito" });
  }
}
