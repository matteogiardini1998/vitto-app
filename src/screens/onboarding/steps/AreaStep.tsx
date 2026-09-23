import { useState } from "react";
import { Compass, MapPin } from "lucide-react";
import type { Area, Profilo } from "../../../types";
import { SelectableCard } from "../../../components/SelectableCard";
import { Button } from "../../../components/Button";
import { Callout } from "../../../components/Callout";

const OPZIONI: { value: Area; label: string; description: string }[] = [
  { value: "nord", label: "Nord", description: "Lombardia, Veneto, Piemonte, Emilia-Romagna..." },
  { value: "centro", label: "Centro", description: "Toscana, Lazio, Marche, Umbria..." },
  { value: "sud", label: "Sud", description: "Campania, Puglia, Calabria, Basilicata..." },
  { value: "isole", label: "Isole", description: "Sicilia, Sardegna" },
  { value: "nazionale", label: "Non so / preferisco non dirlo", description: "Nessun bonus per piatti tipici, stagionalità standard" },
];

/** Confini larghi e volutamente grossolani, solo per proporre un'area: mai salviamo le coordinate, solo il risultato. */
function areaDaCoordinate(lat: number, lon: number): Area {
  if (lon > 12.5 && lat < 40.5) return "isole"; // Sicilia
  if (lat < 39.5) return "isole"; // Sardegna e dintorni
  if (lat < 41.3) return "sud";
  if (lat < 43.3) return "centro";
  return "nord";
}

type AreaStepProps = {
  draft: Profilo;
  onChange: (patch: Partial<Profilo>) => void;
};

export function AreaStep({ draft, onChange }: AreaStepProps) {
  const [stato, setStato] = useState<"idle" | "in-corso" | "negato">("idle");

  const rileva = () => {
    if (!navigator.geolocation) {
      setStato("negato");
      return;
    }
    setStato("in-corso");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ area: areaDaCoordinate(pos.coords.latitude, pos.coords.longitude) });
        setStato("idle");
      },
      () => setStato("negato"),
      { timeout: 8000 },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Button variant="secondary" fullWidth onClick={rileva} className="gap-2" disabled={stato === "in-corso"}>
        <Compass size={18} /> {stato === "in-corso" ? "Rilevamento in corso..." : "Rileva la mia zona"}
      </Button>
      {stato === "negato" && (
        <Callout icon={MapPin} tone="shield">
          Non sono riuscito a rilevare la posizione. Scegli la tua zona qui sotto: puoi cambiarla quando vuoi.
        </Callout>
      )}
      <div className="flex flex-col gap-2.5">
        {OPZIONI.map((o) => (
          <SelectableCard
            key={o.value}
            label={o.label}
            description={o.description}
            selected={draft.area === o.value}
            onClick={() => onChange({ area: o.value })}
          />
        ))}
      </div>
    </div>
  );
}
