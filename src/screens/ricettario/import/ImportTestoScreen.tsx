import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Clipboard, ChevronDown, ChevronUp, Check, Circle } from "lucide-react";
import { Button } from "../../../components/Button";
import { testoDagliAppunti } from "../../../lib/importRecipe";
import { parseRecipeText } from "../../../lib/parseRecipeText";
import { componiRicettaImportata } from "../../../lib/normalizeRicetta";

type Piattaforma = "ios" | "android" | "desktop";

function rilevaPiattaforma(): Piattaforma {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

const AIUTO_PER_PIATTAFORMA: Record<Piattaforma, string> = {
  ios: "Scatta o apri la foto della ricetta, tieni premuto sul testo, tocca Copia. Poi torna qui e incolla.",
  android: "Apri la foto in Google Foto, tocca Lens, seleziona il testo e copialo. Poi torna qui e incolla.",
  desktop: "Copia il testo della ricetta da dove si trova e incollalo qui.",
};

export function ImportTestoScreen() {
  const navigate = useNavigate();
  const [testo, setTesto] = useState("");
  const [suggerito, setSuggerito] = useState<string | null>(null);
  const [aiutoAperto, setAiutoAperto] = useState(false);
  const piattaforma = useMemo(rilevaPiattaforma, []);

  useEffect(() => {
    testoDagliAppunti().then((trovato) => {
      if (trovato) setSuggerito(trovato);
    });
  }, []);

  const bozza = useMemo(() => (testo.trim() ? parseRecipeText(testo) : null), [testo]);

  const continua = () => {
    if (!bozza) return;
    const { ricetta, confidenza } = componiRicettaImportata({ ...bozza, fonte: "import_testo" });
    navigate("/ricettario/nuova", { state: { importDraft: ricetta, confidenza } });
  };

  return (
    <div className="pb-10">
      <div className="safe-top px-4 pt-5 pb-3 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Indietro"
          className="h-10 w-10 flex items-center justify-center rounded-full text-paper-600 active:bg-paper-100"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-title-lg font-display font-semibold text-paper-900">Incolla testo</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
        <div className="rounded-md border border-paper-200 bg-paper-50 dark:bg-paper-900/40">
          <button
            onClick={() => setAiutoAperto((a) => !a)}
            className="w-full flex items-center justify-between gap-2 p-3.5 text-left"
          >
            <span className="text-body-sm font-medium text-paper-700">Hai solo una foto della ricetta?</span>
            {aiutoAperto ? <ChevronUp size={16} className="text-paper-400 shrink-0" /> : <ChevronDown size={16} className="text-paper-400 shrink-0" />}
          </button>
          {aiutoAperto && (
            <p className="px-3.5 pb-3.5 text-body-sm text-paper-500">{AIUTO_PER_PIATTAFORMA[piattaforma]}</p>
          )}
        </div>

        {suggerito && (
          <button
            onClick={() => {
              setTesto(suggerito);
              setSuggerito(null);
            }}
            className="flex items-center gap-3 p-3.5 rounded-md border border-primary-200 bg-primary-50 text-left active:bg-primary-100 dark:bg-primary-900/40 dark:border-primary-800"
          >
            <Clipboard size={18} className="text-primary-700 dark:text-primary-300 shrink-0" />
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-primary-800 dark:text-primary-200">Testo trovato negli appunti</p>
              <p className="text-caption text-primary-700 dark:text-primary-300 truncate">{suggerito.slice(0, 80)}…</p>
            </div>
          </button>
        )}

        <textarea
          value={testo}
          onChange={(e) => setTesto(e.target.value)}
          placeholder={"Incolla qui il testo della ricetta: titolo, ingredienti, procedimento...\n\nEs.\nIngredienti\n- 320 g pasta\n- 400 g pomodori pelati\n\nProcedimento\n1. Cuoci la pasta.\n2. Prepara il sugo."}
          rows={10}
          className="rounded-lg border border-paper-200 bg-paper-0 p-4 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />

        {bozza && (
          <div className="rounded-md border border-paper-200 bg-paper-0 p-4 flex flex-col gap-2">
            <p className="text-body-sm font-semibold text-paper-800">{bozza.nome}</p>
            <div className="flex items-center gap-4 text-body-sm text-paper-600">
              <span className="inline-flex items-center gap-1.5">
                {bozza.ingredienti.length >= 3 ? (
                  <Check size={14} className="text-primary-600" />
                ) : (
                  <Circle size={8} fill="currentColor" className="text-paper-300" />
                )}
                {bozza.ingredienti.length} {bozza.ingredienti.length === 1 ? "ingrediente" : "ingredienti"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                {bozza.passi.length > 0 ? (
                  <Check size={14} className="text-primary-600" />
                ) : (
                  <Circle size={8} fill="currentColor" className="text-paper-300" />
                )}
                {bozza.passi.length} {bozza.passi.length === 1 ? "passaggio" : "passaggi"}
              </span>
            </div>
          </div>
        )}

        <Button fullWidth size="lg" disabled={!bozza || (bozza.ingredienti.length === 0 && bozza.passi.length === 0)} onClick={continua}>
          Continua
        </Button>
      </div>
    </div>
  );
}
