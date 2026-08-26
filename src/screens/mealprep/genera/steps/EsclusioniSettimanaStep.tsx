import { Info } from "lucide-react";
import { TagInput } from "../../../../components/TagInput";
import { Callout } from "../../../../components/Callout";

type EsclusioniSettimanaStepProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function EsclusioniSettimanaStep({ value, onChange }: EsclusioniSettimanaStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Callout icon={Info} tone="info">
        Si aggiungono alle tue esigenze assolute solo per questa settimana, senza modificare il profilo.
      </Callout>
      <TagInput value={value} onChange={onChange} placeholder="Es. melanzane, tonno..." />
    </div>
  );
}
