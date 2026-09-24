/**
 * Client minimo per la Messages API di Anthropic via fetch — niente SDK,
 * per tenere la funzione serverless leggera. La key vive SOLO qui (variabile
 * d'ambiente Vercel `ANTHROPIC_API_KEY`), mai nel client.
 *
 * Modelli (verificati sulla documentazione ufficiale, settembre 2026):
 * - Claude Haiku 4.5 (`claude-haiku-4-5-20251001`): il più veloce ed
 *   economico della gamma attuale ($1 / $5 per MTok in-out), usato per il
 *   fallback testo (estrazione da pagina web/didascalia).
 * - Claude Sonnet 5 (`claude-sonnet-5`): "il miglior compromesso fra
 *   velocità e intelligenza" ($2 / $10 per MTok), usato per le foto — le
 *   foto sono il caso più difficile (grafia a mano, foto storte o sfocate),
 *   vale la spesa in più per leggerle bene.
 * Entrambi supportano input immagine nativamente: non serve un terzo modello.
 */

const ANTHROPIC_VERSION = "2023-06-01";
const MODELLO_TESTO = "claude-haiku-4-5-20251001";
const MODELLO_VISIONE = "claude-sonnet-5";

export type BloccoContenuto =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };

type ChiamataAnthropicParams = {
  modello: string;
  system: string;
  contenuto: BloccoContenuto[];
  toolName: string;
  toolSchema: Record<string, unknown>;
  maxTokens?: number;
  timeoutMs?: number;
};

export class ErroreAnthropic extends Error {
  tipo: "timeout" | "rete" | "risposta_non_valida" | "api";
  constructor(message: string, tipo: "timeout" | "rete" | "risposta_non_valida" | "api") {
    super(message);
    this.tipo = tipo;
  }
}

/**
 * Chiama il modello forzandolo a rispondere con un singolo uso dello
 * strumento `toolName` conforme a `toolSchema`: è il modo raccomandato da
 * Anthropic per ottenere JSON strutturato affidabile, invece di chiedere
 * "rispondi in JSON" nel prompt e sperare che non aggiunga testo attorno.
 */
export async function chiediJsonStrutturato<T>(params: ChiamataAnthropicParams): Promise<T> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new ErroreAnthropic("ANTHROPIC_API_KEY non configurata sul server", "api");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), params.timeoutMs ?? 25000);

  let risposta: Response;
  try {
    risposta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: params.modello,
        max_tokens: params.maxTokens ?? 4096,
        system: params.system,
        messages: [{ role: "user", content: params.contenuto }],
        tools: [
          {
            name: params.toolName,
            description: "Restituisce la ricetta estratta nello schema richiesto.",
            input_schema: params.toolSchema,
          },
        ],
        tool_choice: { type: "tool", name: params.toolName },
      }),
      signal: controller.signal,
    });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw new ErroreAnthropic("Timeout nella chiamata al modello", "timeout");
    throw new ErroreAnthropic(`Errore di rete verso Anthropic: ${(e as Error).message}`, "rete");
  } finally {
    clearTimeout(timeout);
  }

  if (!risposta.ok) {
    const testo = await risposta.text().catch(() => "");
    throw new ErroreAnthropic(`Anthropic ha risposto ${risposta.status}: ${testo.slice(0, 300)}`, "api");
  }

  const corpo = (await risposta.json()) as {
    content: { type: string; input?: unknown }[];
  };
  const usoStrumento = corpo.content.find((b) => b.type === "tool_use");
  if (!usoStrumento || typeof usoStrumento.input !== "object") {
    throw new ErroreAnthropic("Il modello non ha restituito lo strumento atteso", "risposta_non_valida");
  }
  return usoStrumento.input as T;
}

export const MODELLI = { testo: MODELLO_TESTO, visione: MODELLO_VISIONE };
