import { Archive } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { PAGE_ACCENT } from "../../components/WheelNav";
import { EmptyState } from "../../components/EmptyState";

// TODO(dispensa): store dedicato + aggiunta rapida + raggruppamento per reparto (punto 3 del prompt).
export function DispensaScreen() {
  return (
    <div className="pb-8">
      <PageHeader title="Dispensa" subtitle="Quello che hai già in casa" accent={PAGE_ACCENT[3]} />
      <EmptyState
        icon={Archive}
        title="La tua dispensa è vuota"
        description="Presto potrai aggiungere qui quello che hai già in casa."
      />
    </div>
  );
}
