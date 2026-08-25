import { useEffect, useRef, useState } from "react";
import { supportoNativo } from "../lib/barcode/support";
import { creaMotoreNativo } from "../lib/barcode/nativeDetector";
import type { BarcodeHit, MotoreBarcode } from "../lib/barcode/types";

export type StatoScanner = "inattivo" | "avvio" | "attivo" | "permesso-negato" | "errore";

/** Non riemette lo stesso codice più di una volta ogni ~700ms: il loop di rilevamento gira a piena frequenza. */
const FINESTRA_ANTIFLOOD_MS = 700;

export function useBarcodeScanner(attivo: boolean, onHit: (hit: BarcodeHit) => void) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stato, setStato] = useState<StatoScanner>("inattivo");
  const [torciaDisponibile, setTorciaDisponibile] = useState(false);
  const [torciaAccesa, setTorciaAccesa] = useState(false);
  const trackRef = useRef<MediaStreamTrack | null>(null);
  const ultimoEmessoRef = useRef<{ codice: string; il: number } | null>(null);
  const onHitRef = useRef(onHit);
  onHitRef.current = onHit;

  useEffect(() => {
    if (!attivo) {
      setStato("inattivo");
      setTorciaDisponibile(false);
      setTorciaAccesa(false);
      return;
    }

    let cancellato = false;
    let stream: MediaStream | null = null;
    let motore: MotoreBarcode | null = null;

    const gestisciHit = (hit: BarcodeHit) => {
      const ora = Date.now();
      const ultimo = ultimoEmessoRef.current;
      if (ultimo && ultimo.codice === hit.codice && ora - ultimo.il < FINESTRA_ANTIFLOOD_MS) return;
      ultimoEmessoRef.current = { codice: hit.codice, il: ora };
      onHitRef.current(hit);
    };

    async function avvia() {
      setStato("avvio");

      if (!navigator.mediaDevices?.getUserMedia) {
        setStato("errore");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
      } catch (err) {
        if (cancellato) return;
        setStato(err instanceof DOMException && err.name === "NotAllowedError" ? "permesso-negato" : "errore");
        return;
      }

      if (cancellato) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.setAttribute("playsinline", "true");
      await video.play().catch(() => {});

      const track = stream.getVideoTracks()[0];
      trackRef.current = track;
      const caps = track.getCapabilities?.();
      setTorciaDisponibile(Boolean(caps && "torch" in caps));

      const m = supportoNativo()
        ? creaMotoreNativo()
        : await import("../lib/barcode/zxingDetector").then((mod) => mod.creaMotoreZXing());
      if (cancellato) return;
      motore = m;
      m.avvia(video, stream, gestisciHit);
      setStato("attivo");
    }

    avvia();

    return () => {
      cancellato = true;
      motore?.ferma();
      stream?.getTracks().forEach((t) => t.stop());
      trackRef.current = null;
      ultimoEmessoRef.current = null;
    };
  }, [attivo]);

  const toggleTorcia = async () => {
    const track = trackRef.current;
    if (!track) return;
    const nuovoStato = !torciaAccesa;
    try {
      // @ts-expect-error "torch" non è nei tipi standard di MediaTrackConstraintSet
      await track.applyConstraints({ advanced: [{ torch: nuovoStato }] });
      setTorciaAccesa(nuovoStato);
    } catch {
      // Alcuni device espongono la capability ma rifiutano il vincolo: si ignora in silenzio.
    }
  };

  return { videoRef, stato, torciaDisponibile, torciaAccesa, toggleTorcia };
}
