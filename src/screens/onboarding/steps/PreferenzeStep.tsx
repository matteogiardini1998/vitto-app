import { Info } from "lucide-react";
import type { Profilo } from "../../../types";
import { TagInput } from "../../../components/TagInput";

type PreferenzeStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function PreferenzeStep({ draft, onChange }: PreferenzeStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 rounded-md bg-primary-50 border border-primary-100">
        <Info size={20} className="text-primary-700 shrink-0 mt-0.5" strokeWidth={1.8} />
        <p className="text-body-sm text-primary-800">
          Qui non è pericolo, è gusto: questi ingredienti potranno comparire come componente
          marginale, ma mai da protagonisti.
        </p>
      </div>
      <TagInput
        value={draft.preferenzeNegative}
        onChange={(preferenzeNegative) => onChange({ preferenzeNegative })}
        placeholder="Es. cavolfiore, liquirizia..."
      />
    </div>
  );
}
