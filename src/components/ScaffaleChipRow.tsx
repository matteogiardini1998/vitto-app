import { Apple, Beef, CupSoda, Croissant, FlaskConical, Milk, Package, Snowflake, Sparkles } from "lucide-react";
import type { Reparto } from "../types";
import { ORDINE_SCAFFALI } from "../lib/smistamento";
import { Chip } from "./Chip";

const GLYPH: Record<string, typeof Package> = {
  package: Package,
  apple: Apple,
  milk: Milk,
  beef: Beef,
  snowflake: Snowflake,
  croissant: Croissant,
  "cup-soda": CupSoda,
  "flask-conical": FlaskConical,
  sparkles: Sparkles,
};

type ScaffaleChipRowProps = {
  suggerito?: Reparto | null;
  onScegli: (categoria: Reparto) => void;
};

/** Riga di 9 chip-scaffale scrollabile: usata sia per lo smistamento rapido che per "sposta in un altro scaffale". */
export function ScaffaleChipRow({ suggerito, onScegli }: ScaffaleChipRowProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
      {ORDINE_SCAFFALI.map((r) => {
        const Glyph = GLYPH[r.icona];
        return (
          <Chip
            key={r.value}
            selected={r.value === suggerito}
            onClick={() => onScegli(r.value)}
            icon={<Glyph size={15} />}
            className="shrink-0"
          >
            {r.label}
          </Chip>
        );
      })}
    </div>
  );
}
