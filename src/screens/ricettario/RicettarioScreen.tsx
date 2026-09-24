import { useMemo, useState } from "react";
import { BookOpen, Plus, SlidersHorizontal, Star } from "lucide-react";
import { AggiungiRicettaSheet } from "./components/AggiungiRicettaSheet";
import { PageHeader } from "../../components/PageHeader";
import { PAGE_ACCENT, PAGE_BLOB } from "../../components/WheelNav";
import { EmptyState } from "../../components/EmptyState";
import { SearchInput } from "../../components/SearchInput";
import { Chip } from "../../components/Chip";
import { Button } from "../../components/Button";
import { useRecipeStore } from "../../store/recipeStore";
import { useProfileStore } from "../../store/profileStore";
import { filtraEOrdinaRicette } from "../../lib/recipeFilters";
import { RecipeCard } from "./components/RecipeCard";
import { FiltriSheet } from "./components/FiltriSheet";
import { IncisivitaSheet } from "./components/IncisivitaSheet";
import { FILTRI_VUOTI, type Filtri, type Ordinamento } from "../../lib/filtriRicette";

export function RicettarioScreen() {
  const ricette = useRecipeStore((s) => s.ricette);
  const profilo = useProfileStore((s) => s.profilo);
  const updateProfilo = useProfileStore((s) => s.updateProfilo);

  const [ricerca, setRicerca] = useState("");
  const [filtri, setFiltri] = useState<Filtri>(FILTRI_VUOTI);
  const [ordinamento, setOrdinamento] = useState<Ordinamento>("consigliati");
  const [filtriAperti, setFiltriAperti] = useState(false);
  const [incisivitaAperta, setIncisivitaAperta] = useState(false);
  const [aggiungiAperto, setAggiungiAperto] = useState(false);

  const risultati = useMemo(
    () => filtraEOrdinaRicette(ricette, ricerca, filtri, ordinamento),
    [ricette, ricerca, filtri, ordinamento],
  );

  const filtriAttivi =
    filtri.pasto.length +
    filtri.stile.length +
    filtri.dieta.length +
    (filtri.ratingMinimo > 0 ? 1 : 0) +
    (filtri.soloPreferite ? 1 : 0);

  return (
    <div className="pb-8">
      <PageHeader title="Ricettario" subtitle="La tua dispensa di ricette" accent={PAGE_ACCENT["/ricettario"]} tutorialId="header-ricettario" />

      <div className="px-4 flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2">
          <SearchInput
            className="flex-1"
            value={ricerca}
            onChange={setRicerca}
            placeholder="Cerca ricette o tag..."
          />
          <button
            onClick={() => setAggiungiAperto(true)}
            aria-label="Aggiungi ricetta"
            className="h-11 w-11 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Chip icon={<SlidersHorizontal size={14} />} onClick={() => setFiltriAperti(true)} selected={filtriAttivi > 0}>
            Filtri{filtriAttivi > 0 ? ` (${filtriAttivi})` : ""}
          </Chip>
          <button
            onClick={() => setIncisivitaAperta(true)}
            aria-label="Incisività dei voti"
            className="h-10 w-10 shrink-0 rounded-full bg-paper-100 text-paper-600 flex items-center justify-center active:bg-paper-200"
          >
            <Star size={16} />
          </button>
          <span className="text-body-sm text-paper-500 truncate">
            {risultati.length} {risultati.length === 1 ? "ricetta" : "ricette"}
          </span>
        </div>
      </div>

      {risultati.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          blobColor={PAGE_BLOB["/ricettario"]}
          title="Nessuna ricetta trovata"
          description="Prova a modificare la ricerca o i filtri, oppure crea una nuova ricetta."
          action={
            <Button onClick={() => setFiltri(FILTRI_VUOTI)} variant="secondary">
              Reimposta filtri
            </Button>
          }
        />
      ) : (
        <div className="px-4 flex flex-col gap-3">
          {risultati.map((r) => (
            <RecipeCard key={r.id} ricetta={r} />
          ))}
        </div>
      )}

      <FiltriSheet
        open={filtriAperti}
        onClose={() => setFiltriAperti(false)}
        filtri={filtri}
        onChangeFiltri={setFiltri}
        ordinamento={ordinamento}
        onChangeOrdinamento={setOrdinamento}
        risultati={risultati.length}
      />

      <IncisivitaSheet
        open={incisivitaAperta}
        onClose={() => setIncisivitaAperta(false)}
        valore={profilo.incisivitaVoti}
        minimo={profilo.incisivitaVotiMinimo}
        onChange={(incisivitaVoti, incisivitaVotiMinimo) =>
          updateProfilo({ incisivitaVoti, incisivitaVotiMinimo })
        }
      />

      <AggiungiRicettaSheet open={aggiungiAperto} onClose={() => setAggiungiAperto(false)} />
    </div>
  );
}
