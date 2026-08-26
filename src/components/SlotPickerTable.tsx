import { GIORNI, PASTI, chiaveSlot, type Giorno, type Pasto } from "../types";
import { PASTO_LABEL } from "../lib/recipeDisplay";
import { usePlanStore } from "../store/planStore";
import { cn } from "../lib/cn";

type SlotPickerTableProps = {
  onPick: (giorno: Giorno, pasto: Pasto) => void;
  escludiChiave?: string;
};

export function SlotPickerTable({ onPick, escludiChiave }: SlotPickerTableProps) {
  const piano = usePlanStore((s) => s.piano);

  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full border-separate border-spacing-1.5 min-w-[560px]">
        <thead>
          <tr>
            <th className="w-14" />
            {GIORNI.map((g) => (
              <th key={g} className="text-caption font-semibold text-paper-500 pb-1">
                {g}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PASTI.map((pasto) => (
            <tr key={pasto}>
              <td className="text-caption font-medium text-paper-500 pr-2">{PASTO_LABEL[pasto]}</td>
              {GIORNI.map((giorno) => {
                const chiave = chiaveSlot(giorno, pasto);
                const occupato = Boolean(piano[chiave]);
                const corrente = chiave === escludiChiave;
                return (
                  <td key={chiave}>
                    <button
                      disabled={corrente}
                      onClick={() => onPick(giorno, pasto)}
                      className={cn(
                        "h-10 w-full rounded-sm border-2 transition-colors",
                        corrente
                          ? "border-paper-200 bg-paper-100 opacity-40"
                          : occupato
                            ? "border-accent-300 bg-accent-50 active:bg-accent-100 dark:bg-accent-900/40 dark:active:bg-accent-900/60"
                            : "border-paper-200 bg-paper-0 active:bg-primary-50 active:border-primary-400 dark:active:bg-primary-900/40",
                      )}
                      aria-label={`${giorno} ${PASTO_LABEL[pasto]}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
