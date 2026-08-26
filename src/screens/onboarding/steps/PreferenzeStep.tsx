import { Info } from "lucide-react";
import type { Profilo } from "../../../types";
import { TagInput } from "../../../components/TagInput";
import { Callout } from "../../../components/Callout";

type PreferenzeStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function PreferenzeStep({ draft, onChange }: PreferenzeStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Callout icon={Info} tone="info">
        Qui non è pericolo, è gusto: questi ingredienti potranno comparire come componente marginale, ma
        mai da protagonisti.
      </Callout>
      <TagInput
        value={draft.preferenzeNegative}
        onChange={(preferenzeNegative) => onChange({ preferenzeNegative })}
        placeholder="Es. cavolfiore, liquirizia..."
      />
    </div>
  );
}
