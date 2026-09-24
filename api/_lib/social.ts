/**
 * Didascalie dai social: solo endpoint pubblici, nessun login, nessun
 * download di video né trascrizione audio (esplicitamente fuori scope R3 —
 * TODO Fase R4: se la didascalia non basta, offrire la trascrizione audio
 * del video come alternativa allo screenshot manuale).
 */

export type Piattaforma = "tiktok" | "instagram" | "youtube" | null;

export function riconoscePiattaformaSicura(url: URL): Piattaforma {
  const host = url.hostname.replace(/^www\./, "");
  if (host.includes("tiktok.com")) return "tiktok";
  if (host.includes("instagram.com")) return "instagram";
  if (host.includes("youtube.com") || host.includes("youtu.be")) return "youtube";
  return null;
}

const USER_AGENT = "Mozilla/5.0 (compatible; VittoBot/1.0; +https://vitto.app)";

async function fetchTesto(url: string, timeoutMs = 8000): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const r = await fetch(url, { headers: { "user-agent": USER_AGENT }, signal: controller.signal });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Le `content` dei meta tag arrivano con entità HTML (numeriche comprese) non decodificate dalla regex: vanno decodificate a mano. */
export function decodificaEntita(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function estraiMetaContent(html: string, proprieta: string): string | null {
  const m = html.match(new RegExp(`<meta[^>]+property=["']${proprieta}["'][^>]+content=["']([^"']*)["']`, "i"));
  return m ? decodificaEntita(m[1]) : null;
}

function estraiMetaDescription(html: string): string | null {
  return (
    estraiMetaContent(html, "og:description") ||
    (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]
      ? decodificaEntita(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)![1])
      : null)
  );
}

/**
 * TikTok espone un oEmbed pubblico che include `title` — dove TikTok mette
 * la didascalia del video.
 */
async function didascaliaTikTok(url: string): Promise<string | null> {
  const json = await fetchTesto(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
  if (!json) return null;
  try {
    const dati = JSON.parse(json) as { title?: string };
    return dati.title || null;
  } catch {
    return null;
  }
}

/** "Nome Autore on Instagram: "la didascalia vera e propria...."" — il formato con cui Instagram valorizza `og:title`. */
export function estraiDidascaliaDaOgTitle(ogTitle: string): string {
  const m = ogTitle.match(/on Instagram:\s*"(.*)"\s*$/s);
  return (m ? m[1] : ogTitle).trim();
}

/**
 * Instagram non ha più un oEmbed davvero pubblico dal 2020 (richiede un access
 * token di un'app Meta approvata, che qui non abbiamo): best-effort sulla
 * pagina pubblica del post. La didascalia completa oggi si trova più spesso
 * in `og:title` (formato "Autore on Instagram: \"...\"") che in
 * `og:description` — si controllano entrambi e si tiene il più lungo. Se
 * Instagram richiede login lato server (sempre più spesso), questo torna
 * null e l'app propone lo screenshot.
 */
async function didascaliaInstagram(url: string): Promise<string | null> {
  const html = await fetchTesto(url);
  if (!html) return null;
  const daDescription = estraiMetaDescription(html);
  const ogTitle = estraiMetaContent(html, "og:title");
  const daTitle = ogTitle ? estraiDidascaliaDaOgTitle(ogTitle) : null;
  if (daTitle && (!daDescription || daTitle.length > daDescription.length)) return daTitle;
  return daDescription;
}

/**
 * YouTube: l'oEmbed pubblico dà solo il `title`, non la descrizione estesa
 * (serve la Data API con una chiave propria per quella, fuori scope qui). Si
 * usa la `og:description` della pagina del video come approssimazione:
 * spesso contiene le prime righe della descrizione, dove capita la ricetta.
 */
async function didascaliaYouTube(url: string): Promise<string | null> {
  const html = await fetchTesto(url);
  if (!html) return null;
  return estraiMetaDescription(html);
}

export type EsitoDidascalia = { testo: string | null; soloVideoParlato: boolean };

/** Lunghezza sotto la quale una didascalia è quasi certamente solo un hashtag/hook, non una ricetta scritta. */
const LUNGHEZZA_MINIMA_DIDASCALIA_UTILE = 60;

export async function recuperaDidascalia(url: string, piattaforma: Piattaforma): Promise<EsitoDidascalia> {
  const testo =
    piattaforma === "tiktok"
      ? await didascaliaTikTok(url)
      : piattaforma === "instagram"
        ? await didascaliaInstagram(url)
        : piattaforma === "youtube"
          ? await didascaliaYouTube(url)
          : null;

  if (!testo || testo.trim().length < LUNGHEZZA_MINIMA_DIDASCALIA_UTILE) {
    return { testo: null, soloVideoParlato: true };
  }
  return { testo, soloVideoParlato: false };
}
