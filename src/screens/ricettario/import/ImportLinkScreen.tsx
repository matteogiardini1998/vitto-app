import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Clipboard, ClipboardPaste, AlertCircle } from "lucide-react";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { Callout } from "../../../components/Callout";
import { importaDaLink, urlDagliAppunti, type ImportLinkResponse } from "../../../lib/importRecipe";
import { parseRecipeText } from "../../../lib/parseRecipeText";
import { componiRicettaImportata } from "../../../lib/normalizeRicetta";

const MICROCOPY_CARICAMENTO = [
  "Sto leggendo la ricetta…",
  "Sto controllando ingredienti e passaggi…",
  "Quasi pronto…",
];

export function ImportLinkScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const urlIniziale = (location.state as { urlIniziale?: string } | null)?.urlIniziale;
  const [url, setUrl] = useState(urlIniziale ?? "");
  const [suggerito, setSuggerito] = useState<string | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const [microcopyIdx, setMicrocopyIdx] = useState(0);
  const [esito, setEsito] = useState<Extract<ImportLinkResponse, { ok: false }> | null>(null);

  useEffect(() => {
    // Se arriviamo già con un link (condivisione da Android), lo si importa subito, senza un tap in più.
    if (urlIniziale) {
      importa(urlIniziale);
      return;
    }
    urlDagliAppunti().then((trovato) => {
      if (trovato) setSuggerito(trovato);
    });
  }, []);

  useEffect(() => {
    if (!caricamento) return;
    const id = setInterval(() => setMicrocopyIdx((i) => Math.min(i + 1, MICROCOPY_CARICAMENTO.length - 1)), 3000);
    return () => clearInterval(id);
  }, [caricamento]);

  const importa = async (link: string) => {
    if (!link.trim()) return;
    setCaricamento(true);
    setMicrocopyIdx(0);
    setEsito(null);
    const risultato = await importaDaLink(link.trim());
    setCaricamento(false);
    if (!risultato.ok) {
      setEsito(risultato);
      return;
    }
    if (risultato.tipo === "strutturato") {
      navigate("/ricettario/nuova", { state: { importDraft: risultato.ricetta, confidenza: risultato.confidenza } });
      return;
    }
    // JSON-LD/microdata non c'erano: il server ha dato il testo pulito della pagina,
    // lo si passa allo stesso parser deterministico di "Incolla testo" — tutto qui, senza rete.
    const bozza = parseRecipeText(risultato.testo);
    const { ricetta, confidenza } = componiRicettaImportata({ ...bozza, fonte: "import_link", fonteUrl: risultato.fonteUrl });
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
        <h1 className="text-title-lg font-display font-semibold text-paper-900">Incolla link</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
        {caricamento ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="h-12 w-12 rounded-full border-3 border-primary-200 border-t-primary-600 animate-spin" />
            <p className="text-body-md text-paper-600">{MICROCOPY_CARICAMENTO[microcopyIdx]}</p>
          </div>
        ) : (
          <>
            {suggerito && (
              <button
                onClick={() => {
                  setUrl(suggerito);
                  importa(suggerito);
                }}
                className="flex items-center gap-3 p-3.5 rounded-md border border-primary-200 bg-primary-50 text-left active:bg-primary-100 dark:bg-primary-900/40 dark:border-primary-800"
              >
                <Clipboard size={18} className="text-primary-700 dark:text-primary-300 shrink-0" />
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-primary-800 dark:text-primary-200">Link trovato negli appunti</p>
                  <p className="text-caption text-primary-700 dark:text-primary-300 truncate">{suggerito}</p>
                </div>
              </button>
            )}

            <TextField
              label="Link della ricetta"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              type="url"
            />

            {esito && (
              <Callout icon={esito.code === "solo_didascalia_video" ? ClipboardPaste : AlertCircle} tone="warning">
                {esito.error}
              </Callout>
            )}
            {(esito?.code === "solo_didascalia_video" || esito?.code === "fetch_fallito") && (
              <Button variant="secondary" fullWidth onClick={() => navigate("/ricettario/importa/testo")}>
                Vai a "Incolla testo"
              </Button>
            )}

            <Button fullWidth size="lg" disabled={!url.trim()} onClick={() => importa(url)}>
              Importa
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
