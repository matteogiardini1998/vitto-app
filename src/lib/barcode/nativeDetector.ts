import type { MotoreBarcode } from "./types";

const FORMATI = ["ean_13", "ean_8", "upc_a", "code_128"];

/** Motore basato sulla Barcode Detection API nativa: hardware-accelerata dove disponibile. */
export function creaMotoreNativo(): MotoreBarcode {
  const detector = new BarcodeDetector({ formats: FORMATI });
  let attivo = false;
  let raf = 0;

  const loop = (video: HTMLVideoElement, onHit: (hit: { codice: string; formato: string }) => void) => {
    if (!attivo) return;
    if (video.readyState >= 2) {
      detector
        .detect(video)
        .then((risultati) => {
          for (const r of risultati) {
            if (r.rawValue) onHit({ codice: r.rawValue, formato: r.format });
          }
        })
        .catch(() => {
          // Frame non valido per questo giro: si riprova al prossimo.
        });
    }
    raf = requestAnimationFrame(() => loop(video, onHit));
  };

  return {
    avvia(video, _stream, onHit) {
      attivo = true;
      loop(video, onHit);
    },
    ferma() {
      attivo = false;
      cancelAnimationFrame(raf);
    },
  };
}
