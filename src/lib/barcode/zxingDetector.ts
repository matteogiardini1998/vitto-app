import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType, NotFoundException } from "@zxing/library";
import type { IScannerControls } from "@zxing/browser";
import type { MotoreBarcode } from "./types";

/** Motore di riserva per i browser senza Barcode Detection API nativa (Safari/iOS): caricato solo qui, mai nel bundle iniziale. */
export function creaMotoreZXing(): MotoreBarcode {
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.CODE_128,
  ]);
  const reader = new BrowserMultiFormatReader(hints);
  let controls: IScannerControls | null = null;

  return {
    avvia(video, stream, onHit) {
      reader
        .decodeFromStream(stream, video, (risultato, errore) => {
          if (risultato) onHit({ codice: risultato.getText(), formato: String(risultato.getBarcodeFormat()) });
          else if (errore && !(errore instanceof NotFoundException)) {
            // Frame non valido per questo giro: si riprova al prossimo, ZXing continua da solo.
          }
        })
        .then((c) => {
          controls = c;
        })
        .catch(() => {
          // Se l'avvio fallisce qui non c'è molto da fare: lo stream stesso non si è aperto.
        });
    },
    ferma() {
      controls?.stop();
      controls = null;
    },
  };
}
