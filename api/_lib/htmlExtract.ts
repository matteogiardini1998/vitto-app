const USER_AGENT =
  "Mozilla/5.0 (compatible; VittoBot/1.0; +https://vitto.app) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

export type PaginaScaricata = { html: string; urlFinale: string };

export async function scaricaHtml(url: string, timeoutMs = 12000): Promise<PaginaScaricata> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const risposta = await fetch(url, {
      headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: controller.signal,
    });
    if (!risposta.ok) throw new Error(`HTTP ${risposta.status}`);
    const html = await risposta.text();
    return { html, urlFinale: risposta.url };
  } finally {
    clearTimeout(timeout);
  }
}

/** Ricetta grezza estratta da JSON-LD/microdata: stringhe libere, la normalizzazione arriva dopo. */
export type RicettaGrezza = {
  nome: string;
  descrizione: string;
  porzioniBase: number | null;
  tempoMin: number | null;
  ingredienti: string[];
  passi: string[];
  immagineUrl?: string;
};

function estraiTestoJsonLd(html: string): unknown[] {
  const blocchi: unknown[] = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html))) {
    try {
      const parsed = JSON.parse(match[1].trim());
      blocchi.push(parsed);
    } catch {
      // Alcuni siti scrivono JSON-LD leggermente malformato (virgole finali, commenti): non blocca la pipeline, si passa oltre.
    }
  }
  return blocchi;
}

function eTipoRecipe(nodo: unknown): nodo is Record<string, unknown> {
  if (!nodo || typeof nodo !== "object") return false;
  const tipo = (nodo as Record<string, unknown>)["@type"];
  const tipi = Array.isArray(tipo) ? tipo : [tipo];
  return tipi.some((t) => typeof t === "string" && t.toLowerCase() === "recipe");
}

/** JSON-LD annida spesso il Recipe dentro `@graph`, o lo mette in un array di primo livello. */
function trovaNodoRecipe(blocco: unknown): Record<string, unknown> | null {
  if (Array.isArray(blocco)) {
    for (const el of blocco) {
      const trovato = trovaNodoRecipe(el);
      if (trovato) return trovato;
    }
    return null;
  }
  if (eTipoRecipe(blocco)) return blocco;
  if (blocco && typeof blocco === "object" && "@graph" in blocco) {
    return trovaNodoRecipe((blocco as Record<string, unknown>)["@graph"]);
  }
  return null;
}

function testoDaCampo(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(testoDaCampo).filter(Boolean).join(" ");
  if (v && typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if (typeof obj.text === "string") return obj.text;
    if (typeof obj.name === "string") return obj.name;
  }
  return "";
}

/** "PT1H30M" -> 90. Il resto (formati non-durata) torna null: meglio "non lo so" che un numero a caso. */
function minutiDaDurataIso(v: unknown): number | null {
  if (typeof v !== "string") return null;
  const m = v.match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
  if (!m) return null;
  const ore = m[1] ? Number(m[1]) : 0;
  const minuti = m[2] ? Number(m[2]) : 0;
  if (!ore && !minuti) return null;
  return ore * 60 + minuti;
}

function porzioniDaYield(v: unknown): number | null {
  const testo = Array.isArray(v) ? v[0] : v;
  if (typeof testo === "number") return Math.round(testo);
  if (typeof testo !== "string") return null;
  const m = testo.match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

function listaIngredienti(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map(testoDaCampo).map((s) => s.trim()).filter(Boolean);
}

function listaPassi(v: unknown): string[] {
  if (typeof v === "string") {
    // Alcuni siti mettono l'intero procedimento come singola stringa con newline.
    return v.split(/\r?\n+/).map((s) => s.trim()).filter(Boolean);
  }
  if (!Array.isArray(v)) return [];
  const passi: string[] = [];
  for (const el of v) {
    if (el && typeof el === "object" && (el as Record<string, unknown>)["@type"] === "HowToSection") {
      passi.push(...listaPassi((el as Record<string, unknown>).itemListElement));
      continue;
    }
    const testo = testoDaCampo(el);
    if (testo) passi.push(testo.trim());
  }
  return passi;
}

/** Step 1.1: JSON-LD schema.org/Recipe — nessuna AI necessaria. */
export function estraiRecipeJsonLd(html: string): RicettaGrezza | null {
  for (const blocco of estraiTestoJsonLd(html)) {
    const nodo = trovaNodoRecipe(blocco);
    if (!nodo) continue;
    const ingredienti = listaIngredienti(nodo.recipeIngredient ?? nodo.ingredients);
    const passi = listaPassi(nodo.recipeInstructions);
    if (ingredienti.length === 0 && passi.length === 0) continue;
    return {
      nome: testoDaCampo(nodo.name) || "Ricetta importata",
      descrizione: testoDaCampo(nodo.description),
      porzioniBase: porzioniDaYield(nodo.recipeYield),
      tempoMin: minutiDaDurataIso(nodo.totalTime) ?? minutiDaDurataIso(nodo.cookTime),
      ingredienti,
      passi,
      immagineUrl: typeof nodo.image === "string" ? nodo.image : Array.isArray(nodo.image) ? testoDaCampo(nodo.image[0]) : undefined,
    };
  }
  return null;
}

/**
 * Step 1.2: microdata (itemtype schema.org/Recipe) — copertura volutamente
 * parziale via regex (niente DOM parser, per restare senza dipendenze
 * pesanti): cerca gli itemprop più comuni. Se non basta, si passa comunque
 * al fallback AI sul testo della pagina.
 */
export function estraiRecipeMicrodata(html: string): RicettaGrezza | null {
  if (!/itemtype=["'][^"']*schema\.org\/Recipe["']/i.test(html)) return null;

  const estraiPerItemprop = (prop: string): string[] => {
    const regex = new RegExp(`itemprop=["']${prop}["'][^>]*(?:content=["']([^"']*)["'])?[^>]*>([^<]*)`, "gi");
    const risultati: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = regex.exec(html))) {
      const valore = (m[1] || m[2] || "").trim();
      if (valore) risultati.push(valore);
    }
    return risultati;
  };

  const ingredienti = estraiPerItemprop("recipeIngredient").length ? estraiPerItemprop("recipeIngredient") : estraiPerItemprop("ingredients");
  const passi = estraiPerItemprop("recipeInstructions");
  if (ingredienti.length === 0 && passi.length === 0) return null;

  return {
    nome: estraiPerItemprop("name")[0] || "Ricetta importata",
    descrizione: estraiPerItemprop("description")[0] || "",
    porzioniBase: porzioniDaYield(estraiPerItemprop("recipeYield")[0]),
    tempoMin: minutiDaDurataIso(estraiPerItemprop("totalTime")[0]),
    ingredienti,
    passi,
  };
}

const TAG_DA_RIMUOVERE = ["script", "style", "nav", "header", "footer", "noscript", "svg", "form", "iframe"];

/** Testo principale della pagina per il fallback AI: via i tag di navigazione/pubblicità/script, resto come testo semplice. */
export function estraiTestoPrincipale(html: string, maxCaratteri = 6000): string {
  let pulito = html;
  for (const tag of TAG_DA_RIMUOVERE) {
    pulito = pulito.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, "gi"), " ");
  }
  pulito = pulito.replace(/<!--[\s\S]*?-->/g, " ");
  pulito = pulito.replace(/<[^>]+>/g, "\n");
  pulito = pulito
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  pulito = pulito
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean)
    .join("\n");
  return pulito.slice(0, maxCaratteri);
}
