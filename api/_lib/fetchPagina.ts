/**
 * L'unica parte del percorso link che deve girare per forza lato server: il
 * fetch di una pagina esterna, che il browser non può fare direttamente per
 * via del CORS. Il parsing di quello che scarica è tutto in `src/lib/`
 * (condiviso col client, testabile senza rete).
 */
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
