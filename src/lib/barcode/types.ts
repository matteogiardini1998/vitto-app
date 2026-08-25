export type BarcodeHit = {
  codice: string;
  formato: string;
};

export type MotoreBarcode = {
  /** Avvia il rilevamento sul video già in riproduzione con lo stream indicato. */
  avvia(video: HTMLVideoElement, stream: MediaStream, onHit: (hit: BarcodeHit) => void): void;
  /** Ferma il rilevamento. Non tocca lo stream: lo stream lo chiude chi lo ha aperto. */
  ferma(): void;
};
