import type { Profilo } from "../../../types";
import { SupermercatoGrid } from "../../../components/SupermercatoGrid";

type SupermercatoStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function SupermercatoStep({ draft, onChange }: SupermercatoStepProps) {
  return (
    <SupermercatoGrid
      value={draft.supermercatoPreferito}
      onChange={(supermercatoPreferito) => onChange({ supermercatoPreferito })}
    />
  );
}
