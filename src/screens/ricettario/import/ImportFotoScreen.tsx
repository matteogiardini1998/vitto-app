import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, ImagePlus, X, AlertCircle } from "lucide-react";
import { Button } from "../../../components/Button";
import { Callout } from "../../../components/Callout";
import { useToastStore } from "../../../store/toastStore";
import { comprimiFoto, importaDaFoto, type ImportResponse } from "../../../lib/importRecipe";

const MAX_FOTO = 4;

const MICROCOPY_CARICAMENTO = ["Sto guardando le foto…", "Sto leggendo ingredienti e passaggi…", "Quasi pronto…"];

export function ImportFotoScreen() {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const [foto, setFoto] = useState<string[]>([]);
  const [caricamento, setCaricamento] = useState(false);
  const [microcopyIdx, setMicrocopyIdx] = useState(0);
  const [esito, setEsito] = useState<Extract<ImportResponse, { ok: false }> | null>(null);
  const galleriaRef = useRef<HTMLInputElement>(null);
  const fotocameraRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!caricamento) return;
    const id = setInterval(() => setMicrocopyIdx((i) => Math.min(i + 1, MICROCOPY_CARICAMENTO.length - 1)), 3000);
    return () => clearInterval(id);
  }, [caricamento]);

  const aggiungiFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const posto = MAX_FOTO - foto.length;
    if (posto <= 0) {
      showToast(`Puoi caricare al massimo ${MAX_FOTO} foto`, "info");
      return;
    }
    const daAggiungere = Array.from(files).slice(0, posto);
    try {
      const compresse = await Promise.all(daAggiungere.map(comprimiFoto));
      setFoto((f) => [...f, ...compresse]);
    } catch {
      showToast("Non sono riuscito a leggere una di queste foto", "error");
    }
  };

  const rimuovi = (i: number) => setFoto((f) => f.filter((_, idx) => idx !== i));

  const importa = async () => {
    if (foto.length === 0) return;
    setCaricamento(true);
    setMicrocopyIdx(0);
    setEsito(null);
    const risultato = await importaDaFoto(foto);
    setCaricamento(false);
    if (risultato.ok) {
      navigate("/ricettario/nuova", { state: { importDraft: risultato.ricetta, confidenza: risultato.confidenza } });
    } else {
      setEsito(risultato);
    }
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
        <h1 className="text-title-lg font-display font-semibold text-paper-900">Da foto</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
        {caricamento ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="h-12 w-12 rounded-full border-3 border-primary-200 border-t-primary-600 animate-spin" />
            <p className="text-body-md text-paper-600">{MICROCOPY_CARICAMENTO[microcopyIdx]}</p>
          </div>
        ) : (
          <>
            <p className="text-body-sm text-paper-500">
              Fino a {MAX_FOTO} foto della stessa ricetta: pagina di un libro, screenshot, foglio scritto a mano.
            </p>

            <div className="grid grid-cols-4 gap-2.5">
              {foto.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-paper-200">
                  <img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    onClick={() => rimuovi(i)}
                    aria-label="Rimuovi foto"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-paper-950/60 text-paper-0 flex items-center justify-center"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
              {foto.length < MAX_FOTO && (
                <button
                  onClick={() => galleriaRef.current?.click()}
                  className="aspect-square rounded-md border-2 border-dashed border-paper-300 flex items-center justify-center text-paper-400 active:bg-paper-100"
                  aria-label="Aggiungi foto dalla galleria"
                >
                  <ImagePlus size={22} />
                </button>
              )}
            </div>

            <Button variant="secondary" fullWidth onClick={() => fotocameraRef.current?.click()} className="gap-2">
              <Camera size={18} /> Scatta una foto
            </Button>

            <input
              ref={galleriaRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                aggiungiFile(e.target.files);
                e.target.value = "";
              }}
            />
            <input
              ref={fotocameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                aggiungiFile(e.target.files);
                e.target.value = "";
              }}
            />

            {esito && (
              <Callout icon={AlertCircle} tone="warning">
                {esito.error}
              </Callout>
            )}

            <Button fullWidth size="lg" disabled={foto.length === 0} onClick={importa}>
              Importa
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
