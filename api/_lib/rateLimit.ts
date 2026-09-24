/**
 * Rate limit per IP: N import al giorno (default 20). Implementazione in
 * memoria del singolo processo — un limite "best effort", non una garanzia
 * assoluta: una funzione serverless può girare su più istanze e viene
 * riavviata a freddo, quindi il contatore può azzerarsi prima delle 24 ore.
 * Sufficiente per scoraggiare un abuso occasionale e per stare tranquilli sui
 * costi; per un limite rigoroso servirebbe uno storage condiviso (Vercel KV
 * o Upstash Redis) — non incluso qui per non introdurre una dipendenza che
 * l'utente non ha ancora provisionato, ma il cambio è isolato a questo file.
 */

const LIMITE_GIORNALIERO = 20;
const FINESTRA_MS = 24 * 60 * 60 * 1000;

type Voce = { conteggio: number; scadeIl: number };

const contatori = new Map<string, Voce>();

/** Ripulisce ogni tanto le voci scadute, per non far crescere la mappa all'infinito nel processo. */
function pulisci(ora: number) {
  if (contatori.size < 500) return;
  for (const [chiave, voce] of contatori) {
    if (voce.scadeIl <= ora) contatori.delete(chiave);
  }
}

export type EsitoRateLimit = { consentito: true; rimanenti: number } | { consentito: false; riprovaTraMs: number };

export function verificaRateLimit(identificativo: string): EsitoRateLimit {
  const ora = Date.now();
  pulisci(ora);

  const voce = contatori.get(identificativo);
  if (!voce || voce.scadeIl <= ora) {
    contatori.set(identificativo, { conteggio: 1, scadeIl: ora + FINESTRA_MS });
    return { consentito: true, rimanenti: LIMITE_GIORNALIERO - 1 };
  }

  if (voce.conteggio >= LIMITE_GIORNALIERO) {
    return { consentito: false, riprovaTraMs: voce.scadeIl - ora };
  }

  voce.conteggio += 1;
  return { consentito: true, rimanenti: LIMITE_GIORNALIERO - voce.conteggio };
}

/** IP del chiamante da dietro il proxy di Vercel. */
export function ipDaRichiesta(headers: { [key: string]: string | string[] | undefined }): string {
  const forwarded = headers["x-forwarded-for"];
  const valore = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const primo = valore?.split(",")[0]?.trim();
  return primo || "sconosciuto";
}
