export type BarcodeHit = {
  codice: string;
  formato: string;
};

/**
 * Cosa succede dopo che un prodotto è stato riconosciuto: o è già fatto (con
 * un modo per annullare l'ultima azione di sessione su quel codice), o serve
 * una scelta immediata dell'utente (es. "non è in lista, che faccio?").
 */
export type RisultatoAzione =
  | { tipo: "fatto"; annulla?: () => void }
  | { tipo: "scelta"; domanda: string; opzioni: { label: string; onScegli: () => void }[] };

export type MotoreBarcode = {
  /** Avvia il rilevamento sul video già in riproduzione con lo stream indicato. */
  avvia(video: HTMLVideoElement, stream: MediaStream, onHit: (hit: BarcodeHit) => void): void;
  /** Ferma il rilevamento. Non tocca lo stream: lo stream lo chiude chi lo ha aperto. */
  ferma(): void;
};
