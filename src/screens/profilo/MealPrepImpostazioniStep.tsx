import { Clock3, MapPinOff, ChefHat } from "lucide-react";
import { GIORNI, type Giorno, type Profilo, type TempoMaxCucina } from "../../types";
import { GIORNO_LABEL_FULL } from "../../lib/date";
import { Chip } from "../../components/Chip";
import { Switch } from "../../components/Switch";

const OPZIONI_TEMPO: { value: TempoMaxCucina; label: string }[] = [
  { value: 20, label: "20 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 ora" },
  { value: 120, label: "2 ore" },
];

type MealPrepImpostazioniStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function MealPrepImpostazioniStep({ draft, onChange }: MealPrepImpostazioniStepProps) {
  const haTempoWeekendDiverso = draft.tempoMaxCucinaWeekend != null;

  const toggleFuoriCasa = (giorno: Giorno) => {
    const has = draft.pranzoFuoriCasa.includes(giorno);
    onChange({
      pranzoFuoriCasa: has ? draft.pranzoFuoriCasa.filter((g) => g !== giorno) : [...draft.pranzoFuoriCasa, giorno],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock3 size={18} className="text-primary-600" />
          <span className="text-body-md font-semibold text-paper-900">Tempo diverso nel weekend</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-md bg-paper-50 border border-paper-100 mb-2.5">
          <span className="text-body-sm text-paper-600">Sabato e domenica ho più (o meno) tempo</span>
          <Switch
            checked={haTempoWeekendDiverso}
            onChange={(checked) => onChange({ tempoMaxCucinaWeekend: checked ? draft.tempoMaxCucina : undefined })}
          />
        </div>
        {haTempoWeekendDiverso && (
          <div className="flex flex-wrap gap-2">
            {OPZIONI_TEMPO.map((o) => (
              <Chip
                key={o.value}
                selected={draft.tempoMaxCucinaWeekend === o.value}
                onClick={() => onChange({ tempoMaxCucinaWeekend: o.value })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPinOff size={18} className="text-primary-600" />
          <span className="text-body-md font-semibold text-paper-900">Pranzo fuori casa</span>
        </div>
        <p className="text-body-sm text-paper-500 mb-2.5">
          Nei giorni che segni, proponiamo solo ricette da portare con te.
        </p>
        <div className="flex flex-wrap gap-2">
          {GIORNI.map((g) => (
            <Chip key={g} selected={draft.pranzoFuoriCasa.includes(g)} onClick={() => toggleFuoriCasa(g)}>
              {g}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <ChefHat size={18} className="text-primary-600" />
          <span className="text-body-md font-semibold text-paper-900">Giorno del meal prep</span>
        </div>
        <p className="text-body-sm text-paper-500 mb-2.5">
          Il giorno in cui cucini in blocco per la settimana: non proponiamo piatti che non si conservano fino a quel giorno.
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip selected={draft.giornoMealPrep === null} onClick={() => onChange({ giornoMealPrep: null })}>
            Nessuno
          </Chip>
          {GIORNI.map((g) => (
            <Chip key={g} selected={draft.giornoMealPrep === g} onClick={() => onChange({ giornoMealPrep: g })}>
              {GIORNO_LABEL_FULL[g]}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
