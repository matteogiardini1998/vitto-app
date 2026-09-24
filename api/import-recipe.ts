import type { VercelRequest, VercelResponse } from "@vercel/node";
import { chiediJsonStrutturato, ErroreAnthropic, MODELLI, type BloccoContenuto } from "./_lib/anthropic";
import { SCHEMA_ESTRAZIONE, SYSTEM_PROMPT_ESTRAZIONE } from "./_lib/estrazioneSchema";
import { estraiRecipeJsonLd, estraiRecipeMicrodata, estraiTestoPrincipale, scaricaHtml, type RicettaGrezza } from "./_lib/htmlExtract";
import { componiRicettaImportata, normalizzaIngredienti, normalizzaRigheLibere } from "./_lib/normalize";
import { ipDaRichiesta, verificaRateLimit } from "./_lib/rateLimit";
import { recuperaDidascalia, riconoscePiattaformaSicura } from "./_lib/social";
import type { EstrazioneAI, ImportRequest, ImportResponse } from "./_lib/types";

export const config = { maxDuration: 30 };

const MAX_FOTO = 4;
const MAX_BYTE_FOTO = 3 * 1024 * 1024; // dopo la compressione client (1600px, JPEG ~0.8) una foto sta ben sotto questa soglia

function erroreJson(res: VercelResponse, status: number, body: Extract<ImportResponse, { ok: false }>) {
  res.status(status).json(body);
}

async function estraiConAiDaTesto(testo: string): Promise<EstrazioneAI> {
  return chiediJsonStrutturato<EstrazioneAI>({
    modello: MODELLI.testo,
    system: SYSTEM_PROMPT_ESTRAZIONE,
    contenuto: [{ type: "text", text: `Estrai la ricetta da questo testo (pagina web o didascalia social):\n\n${testo}` }],
    toolName: "estrai_ricetta",
    toolSchema: SCHEMA_ESTRAZIONE,
  });
}

async function estraiConAiDaFoto(immagini: string[]): Promise<EstrazioneAI> {
  const blocchi: BloccoContenuto[] = [];
  for (const dataUri of immagini) {
    const match = dataUri.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) continue;
    const [, mediaType, base64] = match;
    blocchi.push({ type: "image", source: { type: "base64", media_type: mediaType, data: base64 } });
  }
  blocchi.push({
    type: "text",
    text: "Queste foto mostrano una ricetta (pagina di libro, screenshot, foglio scritto a mano, o lavagna di un ristorante). Se le foto sono più di una, appartengono alla stessa ricetta (es. ingredienti su una pagina, procedimento sull'altra): uniscile in un'unica estrazione. Estrai la ricetta.",
  });
  return chiediJsonStrutturato<EstrazioneAI>({
    modello: MODELLI.visione,
    system: SYSTEM_PROMPT_ESTRAZIONE,
    contenuto: blocchi,
    toolName: "estrai_ricetta",
    toolSchema: SCHEMA_ESTRAZIONE,
    maxTokens: 4096,
  });
}

function ricettaGrezzaInImportata(grezza: RicettaGrezza, fonteUrl: string) {
  const ingredienti = normalizzaRigheLibere(grezza.ingredienti);
  return componiRicettaImportata({
    nome: grezza.nome,
    descrizione: grezza.descrizione,
    porzioniBase: grezza.porzioniBase,
    tempoMin: grezza.tempoMin,
    ingredienti,
    passi: grezza.passi,
    fonte: "import_link",
    fonteUrl,
  });
}

function estrazioneAiInImportata(estrazione: EstrazioneAI, fonte: "import_link" | "import_foto", fonteUrl?: string) {
  const ingredienti = normalizzaIngredienti(estrazione.ingredienti);
  return componiRicettaImportata({
    nome: estrazione.nome,
    descrizione: estrazione.descrizione,
    porzioniBase: estrazione.porzioniBase,
    tempoMin: estrazione.tempoMin,
    pasto: estrazione.pasto,
    ingredienti,
    passi: estrazione.passi,
    fonte,
    fonteUrl,
    confidenzaIngresso: estrazione.confidenza,
  });
}

async function gestisciLink(url: string, res: VercelResponse): Promise<void> {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!/^https?:$/.test(parsedUrl.protocol)) throw new Error("protocollo non valido");
  } catch {
    return erroreJson(res, 400, { ok: false, error: "Il link non sembra valido.", code: "url_non_valido" });
  }

  const piattaforma = riconoscePiattaformaSicura(parsedUrl);

  if (piattaforma) {
    const { testo, soloVideoParlato } = await recuperaDidascalia(parsedUrl.toString(), piattaforma);
    if (soloVideoParlato || !testo) {
      return erroreJson(res, 200, {
        ok: false,
        error: "In questo video la ricetta è solo parlata. Fai uno screenshot dei passaggi o della lista ingredienti e caricalo.",
        code: "solo_didascalia_video",
      });
    }
    const estrazione = await estraiConAiDaTesto(testo);
    if (estrazione.nessunaRicettaTrovata) {
      return erroreJson(res, 200, { ok: false, error: "Non ho trovato una ricetta in questo link.", code: "nessuna_ricetta_trovata" });
    }
    const { ricetta, confidenza } = estrazioneAiInImportata(estrazione, "import_link", parsedUrl.toString());
    return void res.status(200).json({ ok: true, ricetta, confidenza } satisfies ImportResponse);
  }

  let html: string;
  let urlFinale: string;
  try {
    const pagina = await scaricaHtml(parsedUrl.toString());
    html = pagina.html;
    urlFinale = pagina.urlFinale;
  } catch (e) {
    const timeout = e instanceof Error && e.name === "AbortError";
    return erroreJson(res, timeout ? 504 : 502, {
      ok: false,
      error: timeout ? "La pagina ci ha messo troppo a rispondere." : "Non sono riuscito a scaricare questa pagina.",
      code: timeout ? "timeout" : "fetch_fallito",
    });
  }

  const jsonLd = estraiRecipeJsonLd(html);
  const grezza = jsonLd ?? estraiRecipeMicrodata(html);
  if (grezza) {
    const { ricetta, confidenza } = ricettaGrezzaInImportata(grezza, urlFinale);
    // JSON-LD/microdata: dato dichiarato dal sito, non indovinato dal modello — confidenza alta di default sui campi non già segnalati.
    return void res.status(200).json({ ok: true, ricetta, confidenza } satisfies ImportResponse);
  }

  const testoPagina = estraiTestoPrincipale(html);
  const estrazione = await estraiConAiDaTesto(testoPagina);
  if (estrazione.nessunaRicettaTrovata) {
    return erroreJson(res, 200, { ok: false, error: "Non ho trovato una ricetta in questa pagina.", code: "nessuna_ricetta_trovata" });
  }
  const { ricetta, confidenza } = estrazioneAiInImportata(estrazione, "import_link", urlFinale);
  return void res.status(200).json({ ok: true, ricetta, confidenza } satisfies ImportResponse);
}

async function gestisciFoto(immagini: unknown, res: VercelResponse): Promise<void> {
  if (!Array.isArray(immagini) || immagini.length === 0 || immagini.length > MAX_FOTO) {
    return erroreJson(res, 400, { ok: false, error: `Servono da 1 a ${MAX_FOTO} foto.`, code: "richiesta_non_valida" });
  }
  for (const img of immagini) {
    if (typeof img !== "string" || !img.startsWith("data:image/")) {
      return erroreJson(res, 400, { ok: false, error: "Formato immagine non valido.", code: "richiesta_non_valida" });
    }
    if (img.length > MAX_BYTE_FOTO * 1.4) {
      // base64 pesa ~4/3 del binario originale: soglia larga apposta.
      return erroreJson(res, 400, { ok: false, error: "Una foto è troppo pesante: riprova con una risoluzione più bassa.", code: "richiesta_non_valida" });
    }
  }

  const estrazione = await estraiConAiDaFoto(immagini as string[]);
  if (estrazione.nessunaRicettaTrovata) {
    return erroreJson(res, 200, {
      ok: false,
      error: "Non riesco a leggere una ricetta in questa foto. Prova con più luce o inquadrando da più vicino.",
      code: "foto_illeggibile",
    });
  }
  const { ricetta, confidenza } = estrazioneAiInImportata(estrazione, "import_foto");
  return void res.status(200).json({ ok: true, ricetta, confidenza } satisfies ImportResponse);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return erroreJson(res, 405, { ok: false, error: "Metodo non consentito.", code: "richiesta_non_valida" });
  }

  const ip = ipDaRichiesta(req.headers);
  const rateLimit = verificaRateLimit(ip);
  if (!rateLimit.consentito) {
    return erroreJson(res, 429, {
      ok: false,
      error: "Hai raggiunto il numero massimo di importazioni per oggi. Riprova domani.",
      code: "rate_limited",
    });
  }

  const corpo = req.body as ImportRequest | undefined;
  if (!corpo || typeof corpo !== "object" || (corpo.mode !== "link" && corpo.mode !== "photo")) {
    return erroreJson(res, 400, { ok: false, error: "Richiesta non valida.", code: "richiesta_non_valida" });
  }

  try {
    if (corpo.mode === "link") {
      if (typeof corpo.url !== "string" || !corpo.url.trim()) {
        return erroreJson(res, 400, { ok: false, error: "Manca il link.", code: "richiesta_non_valida" });
      }
      await gestisciLink(corpo.url.trim(), res);
    } else {
      await gestisciFoto(corpo.images, res);
    }
  } catch (e) {
    if (e instanceof ErroreAnthropic && e.tipo === "timeout") {
      return erroreJson(res, 504, { ok: false, error: "Ci ho messo troppo a leggere la ricetta, riprova.", code: "timeout" });
    }
    console.error("import-recipe:", e);
    return erroreJson(res, 500, { ok: false, error: "Qualcosa è andato storto, riprova fra un momento.", code: "errore_server" });
  }
}
