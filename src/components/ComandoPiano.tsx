import { useEffect, useRef, useState } from "react";
import { Mic, Send, Sparkles } from "lucide-react";
import { ESEMPI_COMANDI } from "../lib/comandiPiano";
import { cn } from "../lib/cn";

/**
 * Riconoscimento vocale del browser (Web Speech API): gratuito, nessuna
 * chiave, nessun server nostro. Dove non c'è (alcune PWA installate su iOS,
 * Firefox) il microfono non compare e resta la dettatura della tastiera del
 * telefono, che per il parser è testo come un altro.
 */
type RiconoscimentoVocale = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function creaRiconoscimento(): RiconoscimentoVocale | null {
  const w = window as unknown as { SpeechRecognition?: new () => RiconoscimentoVocale; webkitSpeechRecognition?: new () => RiconoscimentoVocale };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const r = new Ctor();
  r.lang = "it-IT";
  r.interimResults = true;
  r.maxAlternatives = 1;
  return r;
}

type ComandoPianoProps = {
  /** Esegue il comando e restituisce la frase da mostrare (cosa è stato fatto). */
  onComando: (testo: string) => string;
  className?: string;
};

export function ComandoPiano({ onComando, className }: ComandoPianoProps) {
  const [testo, setTesto] = useState("");
  const [risposta, setRisposta] = useState<string | null>(null);
  const [inAscolto, setInAscolto] = useState(false);
  const [vocePossibile] = useState(() => typeof window !== "undefined" && creaRiconoscimento() !== null);
  const riconoscimento = useRef<RiconoscimentoVocale | null>(null);

  useEffect(() => () => riconoscimento.current?.stop(), []);

  const invia = (t: string) => {
    const pulito = t.trim();
    if (!pulito) return;
    setRisposta(onComando(pulito));
    setTesto("");
  };

  const ascolta = () => {
    if (inAscolto) {
      riconoscimento.current?.stop();
      return;
    }
    const r = creaRiconoscimento();
    if (!r) return;
    riconoscimento.current = r;
    let finale = "";
    r.onresult = (e) => {
      let parziale = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finale += res[0].transcript;
        else parziale += res[0].transcript;
      }
      setTesto(finale + parziale);
    };
    r.onerror = (e) => {
      setInAscolto(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setRisposta("Il microfono non è autorizzato: puoi scrivere, o usare il microfono della tastiera.");
      }
    };
    r.onend = () => {
      setInAscolto(false);
      if (finale.trim()) invia(finale);
    };
    setRisposta(null);
    setInAscolto(true);
    r.start();
  };

  return (
    <div className={cn("rounded-xl border border-paper-200 bg-paper-0 p-3 flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-accent-500 shrink-0" />
        <input
          value={testo}
          onChange={(e) => setTesto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              invia(testo);
            }
          }}
          placeholder={inAscolto ? "Ti ascolto…" : "Dimmi cosa cambiare…"}
          enterKeyHint="send"
          className="flex-1 min-w-0 h-10 bg-transparent text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none"
        />
        {vocePossibile && (
          <button
            type="button"
            onClick={ascolta}
            aria-label={inAscolto ? "Smetti di ascoltare" : "Parla"}
            className={cn(
              "h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors",
              inAscolto ? "bg-danger-500 text-paper-50 animate-pulse" : "bg-paper-100 text-paper-700 active:bg-paper-200",
            )}
          >
            <Mic size={18} />
          </button>
        )}
        <button
          type="button"
          onClick={() => invia(testo)}
          disabled={!testo.trim()}
          aria-label="Invia"
          className="h-10 w-10 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
      {risposta ? (
        <p className="text-body-sm text-paper-700 px-1">{risposta}</p>
      ) : (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          {ESEMPI_COMANDI.slice(0, 3).map((es) => (
            <button
              key={es}
              type="button"
              onClick={() => invia(es)}
              className="shrink-0 h-7 px-2.5 rounded-full bg-paper-100 text-caption text-paper-600 active:bg-paper-200"
            >
              {es}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
