import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Check, Flashlight, FlashlightOff, Loader2, ScanBarcode, Settings, WifiOff, X } from "lucide-react";
import { useBarcodeScanner, type FeedbackLettura } from "../../hooks/useBarcodeScanner";
import { useBarcodeStore } from "../../store/barcodeStore";
import { useBarcodeCacheStore, type ProdottoBarcode } from "../../store/barcodeCacheStore";
import { feedbackLettura } from "../../lib/barcode/feedback";
import { riconosciProdotto, ritentaCodaDaRiconoscere } from "../../lib/barcode/riconoscimento";
import { impareCategoria } from "../../lib/smistamento";
import type { BarcodeHit, RisultatoAzione } from "../../lib/barcode/types";
import type { NutrizionePer100g, Reparto } from "../../types";
import { Button } from "../Button";
import { TextField } from "../TextField";
import { ScaffaleChipRow } from "../ScaffaleChipRow";

type Bozza = { nome: string; marca: string | null; formato: string | null; nutrizionePer100g: NutrizionePer100g | null; suggerimento: Reparto | null };

type VoceSessione = {
  codice: string;
  formato: string;
  quantita: number;
  il: number;
  stato: "cercando" | "risolto" | "da-completare";
  prodotto?: ProdottoBarcode;
  bozza?: Bozza;
  scelta?: Extract<RisultatoAzione, { tipo: "scelta" }>;
  notaScelta?: string;
  annulla?: () => void;
};

/**
 * Solo cosmetico: raggruppa in una riga con ×N i bip ravvicinati dello
 * stesso codice invece di mostrare tante card separate. Deve stare comodo
 * sopra il minimo possibile fra due bip legittimi dello stesso codice
 * (COOLDOWN_STESSO_CODICE_MS nell'hook, 3s), altrimenti un doppione voluto
 * finirebbe in due righe invece di una a ×2.
 */
const FINESTRA_RAGGRUPPAMENTO_PILA_MS = 6000;

type BarcodeScannerOverlayProps = {
  open: boolean;
  onClose: () => void;
  onRisolto?: (prodotto: ProdottoBarcode) => RisultatoAzione | void;
};

export function BarcodeScannerOverlay({ open, onClose, onRisolto }: BarcodeScannerOverlayProps) {
  return createPortal(
    <AnimatePresence>{open && <Contenuto onClose={onClose} onRisolto={onRisolto} />}</AnimatePresence>,
    document.body,
  );
}

function Contenuto({ onClose, onRisolto }: { onClose: () => void; onRisolto?: (prodotto: ProdottoBarcode) => RisultatoAzione | void }) {
  const spiegazioneVista = useBarcodeStore((s) => s.spiegazioneVista);
  const segnaSpiegazioneVista = useBarcodeStore((s) => s.segnaSpiegazioneVista);
  const [spiegazioneAccettata, setSpiegazioneAccettata] = useState(spiegazioneVista);
  const [pila, setPila] = useState<VoceSessione[]>([]);
  const [tentativo, setTentativo] = useState(0);
  const risoltiRef = useRef(new Map<string, ProdottoBarcode>());
  const inCorsoRef = useRef(new Set<string>());

  useEffect(() => {
    if (navigator.onLine) ritentaCodaDaRiconoscere();
  }, []);

  const aggiornaVoce = (codice: string, patch: Partial<VoceSessione>) => {
    setPila((prec) => prec.map((v) => (v.codice === codice ? { ...v, ...patch } : v)));
  };

  const applicaAzione = (codice: string, prodotto: ProdottoBarcode) => {
    const risultato = onRisolto?.(prodotto);
    if (!risultato || risultato.tipo === "fatto") {
      aggiornaVoce(codice, { annulla: risultato?.annulla, scelta: undefined });
    } else {
      aggiornaVoce(codice, { scelta: risultato, annulla: undefined });
    }
  };

  const gestisciHit = (hit: BarcodeHit) => {
    feedbackLettura(true);
    const ora = Date.now();

    setPila((prec) => {
      const [primo, ...resto] = prec;
      if (primo && primo.codice === hit.codice && ora - primo.il < FINESTRA_RAGGRUPPAMENTO_PILA_MS) {
        return [{ ...primo, quantita: primo.quantita + 1, il: ora }, ...resto];
      }
      const prodottoNoto = risoltiRef.current.get(hit.codice);
      return [
        {
          codice: hit.codice,
          formato: hit.formato,
          quantita: 1,
          il: ora,
          stato: prodottoNoto ? "risolto" : "cercando",
          prodotto: prodottoNoto,
        },
        ...prec,
      ];
    });

    const prodottoNoto = risoltiRef.current.get(hit.codice);
    if (prodottoNoto) {
      applicaAzione(hit.codice, prodottoNoto);
      return;
    }
    if (inCorsoRef.current.has(hit.codice)) return;
    inCorsoRef.current.add(hit.codice);

    riconosciProdotto(hit.codice).then((esito) => {
      inCorsoRef.current.delete(hit.codice);
      if (esito.tipo === "risolto") {
        risoltiRef.current.set(hit.codice, esito.prodotto);
        aggiornaVoce(hit.codice, { stato: "risolto", prodotto: esito.prodotto });
        applicaAzione(hit.codice, esito.prodotto);
      } else if (esito.tipo === "incerto") {
        aggiornaVoce(hit.codice, {
          stato: "da-completare",
          bozza: { nome: esito.nome, marca: esito.marca, formato: esito.formato, nutrizionePer100g: esito.nutrizionePer100g, suggerimento: esito.suggerimento },
        });
      } else {
        aggiornaVoce(hit.codice, {
          stato: "da-completare",
          bozza: { nome: "", marca: null, formato: null, nutrizionePer100g: null, suggerimento: null },
        });
      }
    });
  };

  const completaVoce = (codice: string, nome: string, categoria: Reparto, bozza: Bozza) => {
    const nomeFinale = nome.trim();
    if (!nomeFinale) return;
    impareCategoria(nomeFinale, categoria);
    const prodotto: ProdottoBarcode = {
      barcode: codice,
      nome: nomeFinale,
      marca: bozza.marca,
      formato: bozza.formato,
      scaffale: categoria,
      nutrizionePer100g: bozza.nutrizionePer100g,
      fonte: "manuale",
    };
    useBarcodeCacheStore.getState().salva(prodotto);
    risoltiRef.current.set(codice, prodotto);
    aggiornaVoce(codice, { stato: "risolto", prodotto });
    applicaAzione(codice, prodotto);
  };

  const sceltaFatta = (codice: string, label: string, onScegli: () => void) => {
    onScegli();
    aggiornaVoce(codice, { scelta: undefined, notaScelta: label });
  };

  const attivaFotocamera = () => {
    segnaSpiegazioneVista();
    setSpiegazioneAccettata(true);
  };

  const rimuoviDallaPila = (voce: VoceSessione) => {
    voce.annulla?.();
    setPila((prec) => prec.filter((v) => v.il !== voce.il));
  };

  const totaleScansionati = pila.reduce((tot, v) => tot + v.quantita, 0);

  return (
    // z-index sopra il motore del tutorial (z-[999]): uno scanner a schermo intero deve
    // sempre coprirlo, altrimenti la sua annotazione (freccia/testo per il passo corrente)
    // resta visibile per trasparenza sopra la fotocamera, scollegata da qualunque bersaglio
    // reale ormai nascosto sotto — un elemento decorativo senza funzione apparente.
    <div className="fixed inset-0 z-[1000] bg-paper-950">
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
              <div className="flex flex-col gap-2 max-h-[38dvh] overflow-y-auto">
                {pila.map((v) => {
                  if (v.stato === "da-completare" && v.bozza) {
                    return (
                      <RigaDaCompletare
                        key={v.il}
                        bozza={v.bozza}
                        onCompleta={(nome, categoria) => completaVoce(v.codice, nome, categoria, v.bozza!)}
                        onRimuovi={() => rimuoviDallaPila(v)}
                      />
                    );
                  }
                  if (v.scelta) {
                    return (
                      <RigaScelta
                        key={v.il}
                        titolo={v.prodotto?.nome ?? v.codice}
                        scelta={v.scelta}
                        onScegli={(label, onScegli) => sceltaFatta(v.codice, label, onScegli)}
                        onRimuovi={() => rimuoviDallaPila(v)}
                      />
                    );
                  }
                  return <RigaVoce key={v.il} voce={v} onTap={() => rimuoviDallaPila(v)} />;
                })}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function RigaVoce({ voce, onTap }: { voce: VoceSessione; onTap: () => void }) {
  const titolo =
    voce.stato === "risolto" && voce.prodotto
      ? [voce.prodotto.nome, voce.prodotto.marca].filter(Boolean).join(" · ")
      : voce.codice;
  const sottotitolo = voce.notaScelta
    ? voce.notaScelta
    : voce.stato === "risolto" && voce.prodotto
      ? (voce.prodotto.formato ?? voce.codice)
      : voce.stato === "cercando"
        ? "Sto cercando..."
        : voce.formato.replace(/_/g, " ");

  const Contenitore = voce.annulla ? "div" : "button";

  return (
    <Contenitore
      type={voce.annulla ? undefined : "button"}
      onClick={voce.annulla ? undefined : onTap}
      className="flex items-center gap-3 rounded-xl bg-paper-0/10 px-3.5 py-2.5 text-left"
    >
      <span className="h-8 w-8 shrink-0 rounded-full bg-paper-0/15 flex items-center justify-center">
        {voce.stato === "cercando" ? <Loader2 size={15} className="animate-spin" /> : <ScanBarcode size={15} />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-body-sm font-medium text-paper-0 truncate">{titolo}</span>
        <span className="block text-caption text-paper-0/50 truncate">{sottotitolo}</span>
      </span>
      {voce.quantita > 1 && (
        <span className="text-caption font-semibold text-paper-0 bg-primary-600 rounded-full h-6 min-w-6 px-1.5 flex items-center justify-center">
          ×{voce.quantita}
        </span>
      )}
      {voce.annulla && (
        <button type="button" onClick={onTap} className="text-caption font-semibold text-paper-0/70 shrink-0 px-1">
          Annulla
        </button>
      )}
    </Contenitore>
  );
}

function RigaDaCompletare({
  bozza,
  onCompleta,
  onRimuovi,
}: {
  bozza: Bozza;
  onCompleta: (nome: string, categoria: Reparto) => void;
  onRimuovi: () => void;
}) {
  const [nome, setNome] = useState(bozza.nome);

  return (
    <div className="rounded-xl bg-paper-0 px-3.5 py-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-body-sm font-medium text-paper-800">
          {bozza.nome ? "Dove lo metto?" : "Questo non lo conosco ancora — come si chiama?"}
        </p>
        <button
          type="button"
          onClick={onRimuovi}
          aria-label="Rimuovi"
          className="h-7 w-7 shrink-0 flex items-center justify-center rounded-full bg-paper-100 text-paper-500"
        >
          <X size={14} />
        </button>
      </div>
      {!bozza.nome && (
        <TextField
          label="Nome prodotto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Es. Detersivo piatti"
          autoFocus
        />
      )}
      <ScaffaleChipRow
        suggerito={bozza.suggerimento}
        onScegli={(categoria) => {
          if (!nome.trim()) return;
          onCompleta(nome, categoria);
        }}
      />
    </div>
  );
}

function RigaScelta({
  titolo,
  scelta,
  onScegli,
  onRimuovi,
}: {
  titolo: string;
  scelta: Extract<RisultatoAzione, { tipo: "scelta" }>;
  onScegli: (label: string, onScegli: () => void) => void;
  onRimuovi: () => void;
}) {
  return (
    <div className="rounded-xl bg-paper-0 px-3.5 py-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-body-sm font-semibold text-paper-900 truncate">{titolo}</p>
          <p className="text-caption text-paper-500">{scelta.domanda}</p>
        </div>
        <button
          type="button"
          onClick={onRimuovi}
          aria-label="Chiudi"
          className="h-7 w-7 shrink-0 flex items-center justify-center rounded-full bg-paper-100 text-paper-500"
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        {scelta.opzioni.map((op) => (
          <button
            key={op.label}
            type="button"
            onClick={() => onScegli(op.label, op.onScegli)}
            className="h-10 rounded-lg bg-paper-100 text-body-sm font-semibold text-paper-800 active:bg-paper-200"
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Fotocamera({ onHit, onRetry }: { onHit: (hit: BarcodeHit) => void; onRetry: () => void }) {
  const { videoRef, stato, feedback, torciaDisponibile, torciaAccesa, toggleTorcia } = useBarcodeScanner(true, onHit);

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

      {stato === "attivo" && <Mirino feedback={feedback} />}

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

function Mirino({ feedback }: { feedback: FeedbackLettura }) {
  const quieto = feedback !== "neutro";
  return (
    // fixed, non absolute: l'area camera è più bassa dell'header e si stringe quando
    // il pannello dei prodotti scansionati cresce sotto — un centraggio "absolute" su
    // quell'area risulterebbe visibilmente decentrato rispetto allo schermo reale.
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="relative w-[78%] max-w-[340px] aspect-[8/5]">
        <motion.div
          className="absolute inset-0 rounded-2xl border"
          animate={{
            borderColor: feedback === "accettata" ? "rgba(74,138,104,0.9)" : "rgba(255,255,255,0.25)",
          }}
          transition={{ duration: 0.15 }}
        />
        {(
          [
            ["top-0 left-0", "border-t-[3px] border-l-[3px] rounded-tl-xl"],
            ["top-0 right-0", "border-t-[3px] border-r-[3px] rounded-tr-xl"],
            ["bottom-0 left-0", "border-b-[3px] border-l-[3px] rounded-bl-xl"],
            ["bottom-0 right-0", "border-b-[3px] border-r-[3px] rounded-br-xl"],
          ] as const
        ).map(([pos, bordi]) => (
          <span
            key={pos}
            className={`absolute ${pos} h-7 w-7 ${bordi} ${quieto ? "border-primary-300" : "border-primary-400"}`}
          />
        ))}
        {feedback === "neutro" && (
          <motion.div
            className="absolute left-2 right-2 h-[2px] bg-primary-400/90 rounded-full shadow-[0_0_8px_rgba(74,138,104,0.8)]"
            animate={{ top: ["8%", "88%", "8%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <AnimatePresence>
          {quieto && (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  feedback === "accettata" ? "bg-primary-500" : "bg-primary-500/60"
                }`}
              >
                <Check size={22} className="text-paper-0" strokeWidth={3} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
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
