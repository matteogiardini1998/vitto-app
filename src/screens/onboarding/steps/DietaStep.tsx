import { Beef, Carrot, Sprout, Fish, Apple, Salad } from "lucide-react";
import type { Dieta, Profilo } from "../../../types";
import { SelectableCard } from "../../../components/SelectableCard";

const OPZIONI: { value: Dieta; label: string; icon: typeof Beef }[] = [
  { value: "onnivora", label: "Onnivora", icon: Beef },
  { value: "vegetariana", label: "Vegetariana", icon: Carrot },
  { value: "vegana", label: "Vegana", icon: Sprout },
  { value: "pescetariana", label: "Pescetariana", icon: Fish },
  { value: "fruttariana", label: "Fruttariana", icon: Apple },
  { value: "crudista", label: "Crudista", icon: Salad },
];

type DietaStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function DietaStep({ draft, onChange }: DietaStepProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {OPZIONI.map((o) => (
        <SelectableCard
          key={o.value}
          label={o.label}
          icon={o.icon}
          selected={draft.dieta === o.value}
          onClick={() => onChange({ dieta: o.value })}
        />
      ))}
    </div>
  );
}
