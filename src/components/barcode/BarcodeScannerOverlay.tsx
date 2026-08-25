import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Flashlight, FlashlightOff, ScanBarcode, Settings, WifiOff, X } from "lucide-react";
import { useBarcodeScanner } from "../../hooks/useBarcodeScanner";
import { useBarcodeStore } from "../../store/barcodeStore";
import { feedbackLettura } from "../../lib/barcode/feedback";
import type { BarcodeHit } from "../../lib/barcode/types";
import { Button } from "../Button";

type VoceSessione = { codice: string; formato: string; quantita: number; il: number };

const FINESTRA_INCREMENTO_MS = 4000;

type BarcodeScannerOverlayProps = {
  open: boolean;
  onClose: () => void;
  onHit?: (hit: BarcodeHit) => void;
};

export function BarcodeScannerOverlay({ open, onClose, onHit }: BarcodeScannerOverlayProps) {
  return createPortal(
    <AnimatePresence>{open && <Contenuto onClose={onClose} onHit={onHit} />}</AnimatePresence>,
    document.body,
  );
}

function Contenuto({ onClose, onHit }: { onClose: () => void; onHit?: (hit: BarcodeHit) => void }) {
  const spiegazioneVista = useBarcodeStore((s) => s.spiegazioneVista);
  const segnaSpiegazioneVista = useBarcodeStore((s) => s.segnaSpiegazioneVista);
  const [spiegazioneAccettata, setSpiegazioneAccettata] = useState(spiegazioneVista);
  const [pila, setPila] = useState<VoceSessione[]>([]);
  const [tentativo, setTentativo] = useState(0);

  const gestisciHit = (hit: BarcodeHit) => {
    feedbackLettura(true);
    setPila((prec) => {
      const ora = Date.now();
      const [primo, ...resto] = prec;
      if (primo && primo.codice === hit.codice && ora - primo.il < FINESTRA_INCREMENTO_MS) {
        return [{ ...primo, quantita: primo.quantita + 1, il: ora }, ...resto];
      }
      return [{ codice: hit.codice, formato: hit.formato, quantita: 1, il: ora }, ...prec];
    });
    onHit?.(hit);
  };

  const attivaFotocamera = () => {
    segnaSpiegazioneVista();
    setSpiegazioneAccettata(true);
  };

  const rimuoviDallaPila = (il: number) => {
    setPila((prec) => prec.filter((v) => v.il !== il));
  };

  const totaleScansionati = pila.reduce((tot, v) => tot + v.quantita, 0);

  return (
    <div className="fixed inset-0 z-50 bg-paper-950">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 110 || info.velocity.y > 700) onClose();
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.9 }}
        className="absolute inset-0 flex flex-col bg-paper-950 text-paper-0"
      >
        <div className="flex items-center justify-center pt-2.5 pb-1 shrink-0">
          <div className="h-1.5 w-10 rounded-full bg-paper-0/25" />
        </div>

        <div className="flex items-center justify-between px-4 pb-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi scanner"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-paper-0/10 active:bg-paper-0/20"
          >
            <X size={19} />
          </button>
          <span className="text-body-sm font-medium text-paper-0/70">Scanner codici a barre</span>
          <div className="h-10 w-10" />
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden">
          {spiegazioneAccettata ? (
            <Fotocamera key={tentativo} onHit={gestisciHit} onRetry={() => setTentativo((t) => t + 1)} />
          ) : (
            <Spiegazione onAccetta={attivaFotocamera} />
          )}
        </div>

        {spiegazioneAccettata && (
          <div className="shrink-0 px-4 pt-3 pb-5 safe-bottom bg-paper-950/95">
            <div className="flex items-center justify-between mb-2">
              <span className="text-caption font-semibold text-paper-0/60 uppercase tracking-wide">
                {totaleScansionati === 0
                  ? "Ancora nessuna scansione"
                  : `${totaleScansionati} ${totaleScansionati === 1 ? "scansionato" : "scansionati"}`}
              </span>
            </div>
            {pila.length === 0 ? (
              <p className="text-body-sm text-paper-0/50">Inquadra un codice a barre per iniziare.</p>
            ) : (
              <div className="flex flex-col gap-2 max-h-[30dvh] overflow-y-auto">
                {pila.map((v) => (
                  <button
                    key={v.il}
                    type="button"
                    onClick={() => rimuoviDallaPila(v.il)}
                    className="flex items-center gap-3 rounded-xl bg-paper-0/10 px-3.5 py-2.5 text-left active:bg-paper-0/15"
                  >
                    <span className="h-8 w-8 shrink-0 rounded-full bg-paper-0/15 flex items-center justify-center">
                      <ScanBarcode size={15} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-body-sm font-medium text-paper-0 truncate font-mono">{v.codice}</span>
                      <span className="block text-caption text-paper-0/50 uppercase">{v.formato.replace(/_/g, " ")}</span>
                    </span>
                    {v.quantita > 1 && (
                      <span className="text-caption font-semibold text-paper-0 bg-primary-600 rounded-full h-6 min-w-6 px-1.5 flex items-center justify-center">
                        ×{v.quantita}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Fotocamera({ onHit, onRetry }: { onHit: (hit: BarcodeHit) => void; onRetry: () => void }) {
  const { videoRef, stato, torciaDisponibile, torciaAccesa, toggleTorcia } = useBarcodeScanner(true, onHit);

  return (
    <>
      <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" muted playsInline />

      {torciaDisponibile && stato === "attivo" && (
        <button
          type="button"
          onClick={toggleTorcia}
          aria-label={torciaAccesa ? "Spegni torcia" : "Accendi torcia"}
          className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-paper-950/50 text-paper-0 active:bg-paper-950/70"
        >
          {torciaAccesa ? <FlashlightOff size={18} /> : <Flashlight size={18} />}
        </button>
      )}

      {stato === "attivo" && <Mirino />}

      {stato === "avvio" && <StatoMessaggio icon={Camera} messaggio="Sto aprendo la fotocamera..." />}

      {stato === "permesso-negato" && (
        <StatoMessaggio
          icon={Settings}
          messaggio="Niente fotocamera, niente scansione."
          dettaglio="Hai negato il permesso alla fotocamera. Vai nelle impostazioni del browser (permessi del sito) e riattivalo, poi riprova."
          azione={{ label: "Riprova", onClick: onRetry }}
        />
      )}

      {stato === "errore" && (
        <StatoMessaggio
          icon={WifiOff}
          messaggio="Non riesco ad aprire la fotocamera."
          dettaglio={
            !window.isSecureContext
              ? "Sul telefono la fotocamera funziona solo con una connessione sicura (HTTPS)."
              : "Controlla che nessun'altra app la stia usando e riprova."
          }
          azione={{ label: "Riprova", onClick: onRetry }}
        />
      )}
    </>
  );
}

function Mirino() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="relative w-[78%] max-w-[340px] aspect-[8/5]">
        <div className="absolute inset-0 rounded-2xl border border-paper-0/25" />
        <span className="absolute top-0 left-0 h-7 w-7 border-t-[3px] border-l-[3px] border-primary-400 rounded-tl-xl" />
        <span className="absolute top-0 right-0 h-7 w-7 border-t-[3px] border-r-[3px] border-primary-400 rounded-tr-xl" />
        <span className="absolute bottom-0 left-0 h-7 w-7 border-b-[3px] border-l-[3px] border-primary-400 rounded-bl-xl" />
        <span className="absolute bottom-0 right-0 h-7 w-7 border-b-[3px] border-r-[3px] border-primary-400 rounded-br-xl" />
        <motion.div
          className="absolute left-2 right-2 h-[2px] bg-primary-400/90 rounded-full shadow-[0_0_8px_rgba(74,138,104,0.8)]"
          animate={{ top: ["8%", "88%", "8%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-5 text-body-sm text-paper-0/80 font-medium">Inquadra il codice a barre</p>
    </div>
  );
}

function StatoMessaggio({
  icon: Icon,
  messaggio,
  dettaglio,
  azione,
}: {
  icon: typeof Camera;
  messaggio: string;
  dettaglio?: string;
  azione?: { label: string; onClick: () => void };
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-3">
      <span className="h-14 w-14 rounded-full bg-paper-0/10 flex items-center justify-center">
        <Icon size={24} className="text-paper-0/80" />
      </span>
      <p className="text-body-lg font-medium text-paper-0">{messaggio}</p>
      {dettaglio && <p className="text-body-sm text-paper-0/60 max-w-[280px]">{dettaglio}</p>}
      {azione && (
        <Button size="md" onClick={azione.onClick} className="mt-1">
          {azione.label}
        </Button>
      )}
    </div>
  );
}

function Spiegazione({ onAccetta }: { onAccetta: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-4">
      <span className="h-16 w-16 rounded-full bg-primary-600/20 flex items-center justify-center">
        <ScanBarcode size={28} className="text-primary-400" />
      </span>
      <div>
        <p className="text-title-md font-display font-semibold text-paper-0 mb-1.5">
          Per leggere i codici mi serve la fotocamera
        </p>
        <p className="text-body-sm text-paper-0/60 max-w-[300px]">
          La userò solo per inquadrare i codici a barre, mentre lo scanner è aperto. Puoi chiuderlo quando vuoi.
        </p>
      </div>
      <Button size="lg" onClick={onAccetta} className="mt-1 gap-2">
        <Camera size={18} /> Attiva fotocamera
      </Button>
    </div>
  );
}
