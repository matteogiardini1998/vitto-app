import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Clock3, Copy, Edit3, Euro, Heart, Pin, ThumbsDown, Trash2 } from "lucide-react";
import { useRecipeStore } from "../../store/recipeStore";
import { useToastStore } from "../../store/toastStore";
import { StarRating } from "../../components/StarRating";
import { Stepper } from "../../components/Stepper";
import { Chip } from "../../components/Chip";
import { Button } from "../../components/Button";
import { DIETA_RICETTA_LABEL, PASTO_LABEL, formattaTag } from "../../lib/recipeDisplay";
import { formattaQtaUnita } from "../../lib/format";
import { AddToPlanSheet } from "./components/AddToPlanSheet";
import { calcolaNutrizione, mostraComeStima, tagNutrizionaliCalcolati, TAG_NUTRIZIONALE_LABEL } from "../../lib/nutrizione";

export function RicettaDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ricetta = useRecipeStore((s) => s.ricette.find((r) => r.id === id));
  const updateRicetta = useRecipeStore((s) => s.updateRicetta);
  const deleteRicetta = useRecipeStore((s) => s.deleteRicetta);
  const duplicateRicetta = useRecipeStore((s) => s.duplicateRicetta);
  const showToast = useToastStore((s) => s.show);

  const [porzioni, setPorzioni] = useState(ricetta?.porzioniBase ?? 2);
  const [confermaElimina, setConfermaElimina] = useState(false);
  const [pianoAperto, setPianoAperto] = useState(false);

  const scala = ricetta ? porzioni / ricetta.porzioniBase : 1;

  const ingredientiScalati = useMemo(() => {
    if (!ricetta) return [];
    return ricetta.ingredienti.map((ing) => ({
      ...ing,
      qtaScalata: ing.qta != null ? ing.qta * scala : null,
    }));
  }, [ricetta, scala]);

  const nutrizione = useMemo(() => (ricetta ? calcolaNutrizione(ricetta) : null), [ricetta]);
  const tagCalcolati = useMemo(() => (ricetta ? tagNutrizionaliCalcolati(ricetta) : []), [ricetta]);

  if (!ricetta) {
    return (
      <div className="p-6 text-center">
        <p className="text-body-lg text-paper-600 mb-4">Ricetta non trovata.</p>
        <Link to="/ricettario" className="text-primary-700 dark:text-primary-300 font-semibold">
          Torna al ricettario
        </Link>
      </div>
    );
  }

  const handleDuplica = () => {
    const nuovoId = duplicateRicetta(ricetta.id);
    if (nuovoId) {
      showToast("Ricetta duplicata");
      navigate(`/ricettario/${nuovoId}`);
    }
  };

  const handleElimina = () => {
    if (!confermaElimina) {
      setConfermaElimina(true);
      return;
    }
    deleteRicetta(ricetta.id);
    showToast("Ricetta eliminata");
    navigate("/ricettario", { replace: true });
  };

  return (
    <div>
      <div className="safe-top px-4 pt-5 pb-3 flex items-center justify-between gap-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Indietro"
          className="h-10 w-10 flex items-center justify-center rounded-full text-paper-600 active:bg-paper-100"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleDuplica}
            aria-label="Duplica"
            className="h-10 w-10 flex items-center justify-center rounded-full text-paper-600 active:bg-paper-100"
          >
            <Copy size={18} />
          </button>
          <Link
            to={`/ricettario/${ricetta.id}/modifica`}
            aria-label="Modifica"
            className="h-10 w-10 flex items-center justify-center rounded-full text-paper-600 active:bg-paper-100"
          >
            <Edit3 size={18} />
          </Link>
          {ricetta.custom && (
            <button
              onClick={handleElimina}
              aria-label="Elimina"
              className={confermaElimina ? "px-3 h-10 rounded-full bg-danger-500 text-paper-50 text-body-sm font-semibold" : "h-10 w-10 flex items-center justify-center rounded-full text-danger-500 active:bg-danger-500/10"}
            >
              {confermaElimina ? "Conferma" : <Trash2 size={18} />}
            </button>
          )}
        </div>
      </div>

      <div className="px-5">
        <h1 className="text-display-sm font-display font-semibold text-paper-900">{ricetta.nome}</h1>
        <p className="text-body-md text-paper-500 mt-1.5">{ricetta.descrizione}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Chip>{DIETA_RICETTA_LABEL[ricetta.dieta]}</Chip>
          <Chip>{ricetta.stile === "veloce" ? "Veloce" : "Ricercata"}</Chip>
          {ricetta.pasto.map((p) => (
            <Chip key={p}>{PASTO_LABEL[p]}</Chip>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4 text-body-sm text-paper-600">
          <span className="inline-flex items-center gap-1">
            <Clock3 size={16} /> {ricetta.tempoMin} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Euro size={16} /> {ricetta.costoStimatoPorzione.toFixed(2)} / porzione
          </span>
        </div>

        {(ricetta.tags.length > 0 || tagCalcolati.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {ricetta.tags.map((t) => (
              <span key={t} className="text-caption text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full dark:bg-primary-900/40 dark:text-primary-300">
                {formattaTag(t)}
              </span>
            ))}
            {tagCalcolati.map((t) => (
              <span key={t} className="text-caption text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full dark:bg-primary-900/40 dark:text-primary-300">
                {TAG_NUTRIZIONALE_LABEL[t]}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 p-4 rounded-xl bg-paper-100">
          {mostraComeStima(nutrizione) && nutrizione ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-display-sm font-display font-bold text-primary-700 dark:text-primary-300">{nutrizione.kcal}</span>
                <span className="text-body-sm text-paper-500">kcal stimate a porzione</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-body-sm text-paper-700">
                <span>Proteine {nutrizione.proteine} g</span>
                <span>Carboidrati {nutrizione.carboidrati} g</span>
                <span>Grassi {nutrizione.grassi} g</span>
                <span>Fibre {nutrizione.fibre} g</span>
              </div>
            </>
          ) : (
            <p className="text-body-sm text-paper-500">Dati nutrizionali incompleti per questa ricetta.</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-5 p-4 rounded-md bg-paper-100">
          <StarRating value={ricetta.rating} onChange={(rating) => updateRicetta(ricetta.id, { rating })} size={24} />
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateRicetta(ricetta.id, { preferita: !ricetta.preferita })}
              aria-label="Preferita"
              className={`h-10 w-10 flex items-center justify-center rounded-full ${ricetta.preferita ? "text-accent-500" : "text-paper-400"}`}
            >
              <Heart size={20} fill={ricetta.preferita ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => updateRicetta(ricetta.id, { sfavorita: !ricetta.sfavorita })}
              aria-label="Sfavorita"
              className={`h-10 w-10 flex items-center justify-center rounded-full ${ricetta.sfavorita ? "text-danger-500" : "text-paper-400"}`}
            >
              <ThumbsDown size={20} fill={ricetta.sfavorita ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => updateRicetta(ricetta.id, { fissata: !ricetta.fissata })}
              aria-label="Fissata"
              className={`h-10 w-10 flex items-center justify-center rounded-full ${ricetta.fissata ? "text-accent-500" : "text-paper-400"}`}
            >
              <Pin size={20} fill={ricetta.fissata ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-title-lg font-display font-semibold text-paper-900">Ingredienti</h2>
          </div>
          <div className="flex justify-center mb-4">
            <Stepper value={porzioni} min={1} max={20} label="porzioni" onChange={setPorzioni} />
          </div>
          <ul className="flex flex-col divide-y divide-paper-100 rounded-md border border-paper-100 overflow-hidden">
            {ingredientiScalati.map((ing, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-3 bg-paper-0">
                <span className="text-body-md text-paper-800">{ing.nome}</span>
                <span className="text-body-sm text-paper-500 shrink-0 ml-3">
                  {ing.qtaScalata != null ? formattaQtaUnita(ing.qtaScalata, ing.unita) : ing.unita}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7">
          <h2 className="text-title-lg font-display font-semibold text-paper-900 mb-3">Preparazione</h2>
          {ricetta.passi.length > 0 ? (
            <ol className="flex flex-col gap-4">
              {ricetta.passi.map((passo, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-7 w-7 shrink-0 rounded-full bg-primary-700 text-paper-50 text-body-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-body-md text-paper-800 pt-0.5">{passo}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex items-center justify-between gap-3 p-4 rounded-md bg-paper-100">
              <p className="text-body-sm text-paper-500">Passi non ancora aggiunti.</p>
              <Link to={`/ricettario/${ricetta.id}/modifica`} className="text-body-sm font-semibold text-primary-700 dark:text-primary-300 shrink-0">
                Aggiungi
              </Link>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 -mx-5 px-5 pt-3 pb-4 mt-8 bg-paper-50/95 backdrop-blur border-t border-paper-100">
          <Button fullWidth size="lg" onClick={() => setPianoAperto(true)}>
            Aggiungi al piano
          </Button>
        </div>
      </div>

      <AddToPlanSheet open={pianoAperto} onClose={() => setPianoAperto(false)} ricetta={ricetta} />
    </div>
  );
}
