import { useEffect, useRef, useState } from "react";
import { supportoNativo } from "../lib/barcode/support";
import { creaMotoreNativo } from "../lib/barcode/nativeDetector";
import { creaFiltroLetture, type FeedbackLettura } from "../lib/barcode/filtroLetture";
import type { BarcodeHit, MotoreBarcode } from "../lib/barcode/types";

export type StatoScanner = "inattivo" | "avvio" | "attivo" | "permesso-negato" | "errore";
export type { FeedbackLettura };

/** Se un codice non si vede da così tanto, il mirino torna neutro: si assume sia uscito dall'inquadratura. */
const SILENZIO_RESET_MS = 500;
/** Quanto resta acceso il flash verde di conferma prima di tornare neutro (o "cooldown", se il codice è ancora lì). */
const DURATA_FLASH_MS = 450;

export function useBarcodeScanner(attivo: boolean, onHit: (hit: BarcodeHit) => void) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stato, setStato] = useState<StatoScanner>("inattivo");
  const [feedback, setFeedback] = useState<FeedbackLettura>("neutro");
  const [torciaDisponibile, setTorciaDisponibile] = useState(false);
  const [torciaAccesa, setTorciaAccesa] = useState(false);
  const trackRef = useRef<MediaStreamTrack | null>(null);
  const onHitRef = useRef(onHit);
  onHitRef.current = onHit;

  useEffect(() => {
    if (!attivo) {
      setStato("inattivo");
      setFeedback("neutro");
      setTorciaDisponibile(false);
      setTorciaAccesa(false);
      return;
    }

    let cancellato = false;
    let stream: MediaStream | null = null;
    let motore: MotoreBarcode | null = null;
    const filtro = creaFiltroLetture();
    let resetSilenzioTimeout = 0;
    let fineFlashTimeout = 0;

    const gestisciLetturaGrezza = (hit: BarcodeHit) => {
      window.clearTimeout(resetSilenzioTimeout);
      resetSilenzioTimeout = window.setTimeout(() => {
        filtro.silenzio();
        setFeedback((f) => (f === "cooldown" ? "neutro" : f));
      }, SILENZIO_RESET_MS);

      const esito = filtro.elabora(hit, Date.now());
      if (esito.feedback) setFeedback(esito.feedback);
      if (!esito.accettata) return;

      window.clearTimeout(fineFlashTimeout);
      fineFlashTimeout = window.setTimeout(() => setFeedback("neutro"), DURATA_FLASH_MS);
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
      m.avvia(video, stream, gestisciLetturaGrezza);
      setStato("attivo");
    }

    avvia();

    return () => {
      cancellato = true;
      motore?.ferma();
      stream?.getTracks().forEach((t) => t.stop());
      trackRef.current = null;
      window.clearTimeout(resetSilenzioTimeout);
      window.clearTimeout(fineFlashTimeout);
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

  return { videoRef, stato, feedback, torciaDisponibile, torciaAccesa, toggleTorcia };
}
