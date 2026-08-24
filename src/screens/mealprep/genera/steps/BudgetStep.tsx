import { Slider } from "../../../../components/Slider";

type BudgetStepProps = {
  persone: number;
  budget: number;
  onChangeBudget: (value: number) => void;
};

export function BudgetStep({ persone, budget, onChangeBudget }: BudgetStepProps) {
  const min = 30 * persone;
  const max = 150 * persone;

  return (
    <div>
      <div className="text-center mb-4">
        <div className="text-display-lg font-display font-semibold text-paper-900 tabular-nums">
          € {budget}
        </div>
        <p className="text-body-sm text-paper-500 mt-1">≈ € {(budget / persone).toFixed(0)} a persona</p>
      </div>
      <Slider value={budget} min={min} max={max} step={5} onChange={onChangeBudget} />
      <div className="flex justify-between mt-1.5">
        <span className="text-caption text-paper-400">€ {min}</span>
        <span className="text-caption text-paper-400">€ {max}</span>
      </div>
    </div>
  );
}
