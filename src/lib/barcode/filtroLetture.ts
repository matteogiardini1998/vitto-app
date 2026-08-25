import type { BarcodeHit } from "./types";

/** Stato visivo del mirino: "neutro" scansiona, "accettata" è il flash di conferma, "cooldown" è "già preso, fermo qui". */
export type FeedbackLettura = "neutro" | "accettata" | "cooldown";

export type EsitoFiltro = { accettata: boolean; feedback: FeedbackLettura | null };

export type ConfigFiltroLetture = {
  /** Quanti frame di fila devono concordare sullo stesso codice prima di accettarlo: filtra le letture sporche da frame mossi. */
  confermeRichieste: number;
  /** Dopo QUALSIASI battuta accettata, ignora tutto per questo tempo: il "respiro" prima del prossimo prodotto. Deve restare corto. */
  cooldownGlobaleMs: number;
  /** Lo stesso codice non può ribattere finché non è passato questo tempo dall'ultima volta che lo si è VISTO (non da quando è stato accettato). */
  cooldownStessoCodiceMs: number;
};

export const CONFIG_DEFAULT: ConfigFiltroLetture = {
  confermeRichieste: 3,
  cooldownGlobaleMs: 1000,
  cooldownStessoCodiceMs: 3000,
};

/**
 * Il cervello del lettore "da supermercato": conferma su frame consecutivi,
 * poi due cooldown (globale e per-codice, misurato dall'ultima volta VISTO
 * così un codice tenuto fermo nel mirino non fa mai scadere il suo stesso
 * cooldown). Pura logica, senza timer né DOM: testabile con timestamp finti.
 */
export function creaFiltroLetture(config: ConfigFiltroLetture = CONFIG_DEFAULT) {
  const consecutivi = { codice: "", conteggio: 0 };
  const ultimaVoltaVisto = new Map<string, number>();
  const codiciGiaBattuti = new Set<string>();
  let ultimaAccettazioneGlobale = -Infinity;

  return {
    /** Da chiamare a ogni lettura grezza del motore di decodifica, col timestamp di quel momento. */
    elabora(hit: BarcodeHit, ora: number): EsitoFiltro {
      const vistoUltimaVolta = ultimaVoltaVisto.get(hit.codice);
      if (vistoUltimaVolta != null && ora - vistoUltimaVolta >= config.cooldownStessoCodiceMs) {
        codiciGiaBattuti.delete(hit.codice); // è come se fosse uscito dal mirino e rientrato: si riarma
      }
      ultimaVoltaVisto.set(hit.codice, ora);

      if (consecutivi.codice === hit.codice) consecutivi.conteggio += 1;
      else {
        consecutivi.codice = hit.codice;
        consecutivi.conteggio = 1;
      }
      if (consecutivi.conteggio < config.confermeRichieste) return { accettata: false, feedback: null };

      // Pausa di ritmo generale: si ignora, senza cambiare feedback (che sta già finendo il suo flash da solo).
      if (ora - ultimaAccettazioneGlobale < config.cooldownGlobaleMs) return { accettata: false, feedback: null };

      if (codiciGiaBattuti.has(hit.codice)) return { accettata: false, feedback: "cooldown" };

      ultimaAccettazioneGlobale = ora;
      codiciGiaBattuti.add(hit.codice);
      return { accettata: true, feedback: "accettata" };
    },
    /** Da chiamare quando non arriva nessuna lettura per un po': il codice è probabilmente uscito dal mirino. */
    silenzio() {
      consecutivi.codice = "";
      consecutivi.conteggio = 0;
    },
  };
}
