import { Heart } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { Chip } from "../../../components/Chip";
import { Switch } from "../../../components/Switch";
import { Button } from "../../../components/Button";
import { StarRating } from "../../../components/StarRating";
import type { Pasto, DietaRicetta } from "../../../types";
import { DIETA_RICETTA_LABEL, PASTO_LABEL } from "../../../lib/recipeDisplay";
import { FILTRI_VUOTI, type Filtri, type Ordinamento } from "../../../lib/filtriRicette";

const ORDINAMENTI: { value: Ordinamento; label: string }[] = [
  { value: "consigliati", label: "Consigliati" },
  { value: "nome", label: "Nome (A-Z)" },
  { value: "tempo", label: "Tempo di preparazione" },
  { value: "costo", label: "Costo per porzione" },
  { value: "rating", label: "Voto" },
];

type FiltriSheetProps = {
  open: boolean;
  onClose: () => void;
  filtri: Filtri;
  onChangeFiltri: (f: Filtri) => void;
  ordinamento: Ordinamento;
  onChangeOrdinamento: (o: Ordinamento) => void;
  risultati: number;
};

function toggleIn<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function FiltriSheet({
  open,
  onClose,
  filtri,
  onChangeFiltri,
  ordinamento,
  onChangeOrdinamento,
  risultati,
}: FiltriSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Filtri e ordinamento">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide mb-2">
            Ordina per
          </h3>
          <div className="flex flex-wrap gap-2">
            {ORDINAMENTI.map((o) => (
              <Chip key={o.value} selected={ordinamento === o.value} onClick={() => onChangeOrdinamento(o.value)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide mb-2">Pasto</h3>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PASTO_LABEL) as Pasto[]).map((p) => (
              <Chip
                key={p}
                selected={filtri.pasto.includes(p)}
                onClick={() => onChangeFiltri({ ...filtri, pasto: toggleIn(filtri.pasto, p) })}
              >
                {PASTO_LABEL[p]}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide mb-2">Stile</h3>
          <div className="flex flex-wrap gap-2">
            {(["veloce", "ricercata"] as const).map((s) => (
              <Chip
                key={s}
                selected={filtri.stile.includes(s)}
                onClick={() => onChangeFiltri({ ...filtri, stile: toggleIn(filtri.stile, s) })}
              >
                {s === "veloce" ? "Veloce" : "Ricercata"}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide mb-2">Dieta</h3>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DIETA_RICETTA_LABEL) as DietaRicetta[]).map((d) => (
              <Chip
                key={d}
                selected={filtri.dieta.includes(d)}
                onClick={() => onChangeFiltri({ ...filtri, dieta: toggleIn(filtri.dieta, d) })}
              >
                {DIETA_RICETTA_LABEL[d]}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide mb-2">
            Voto minimo
          </h3>
          <StarRating
            value={filtri.ratingMinimo as 0 | 1 | 2 | 3 | 4 | 5}
            onChange={(v) => onChangeFiltri({ ...filtri, ratingMinimo: v })}
            size={26}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-body-lg font-medium text-paper-900">
            <Heart size={18} className="text-accent-500" /> Solo preferite
          </span>
          <Switch
            checked={filtri.soloPreferite}
            onChange={(v) => onChangeFiltri({ ...filtri, soloPreferite: v })}
            label="Solo preferite"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="secondary" fullWidth onClick={() => onChangeFiltri(FILTRI_VUOTI)}>
            Reimposta
          </Button>
          <Button fullWidth onClick={onClose}>
            Mostra {risultati} {risultati === 1 ? "ricetta" : "ricette"}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
