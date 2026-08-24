import { Info } from "lucide-react";
import { TagInput } from "../../../../components/TagInput";

type EsclusioniSettimanaStepProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function EsclusioniSettimanaStep({ value, onChange }: EsclusioniSettimanaStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 p-4 rounded-md bg-primary-50 border border-primary-100">
        <Info size={20} className="text-primary-700 shrink-0 mt-0.5" strokeWidth={1.8} />
        <p className="text-body-sm text-primary-800">
          Si aggiungono alle tue esigenze assolute solo per questa settimana, senza modificare il profilo.
        </p>
      </div>
      <TagInput value={value} onChange={onChange} placeholder="Es. melanzane, tonno..." />
    </div>
  );
}
