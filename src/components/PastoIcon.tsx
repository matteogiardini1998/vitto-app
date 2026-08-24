import { Coffee, Sandwich, UtensilsCrossed, type LucideProps } from "lucide-react";
import type { Pasto } from "../types";

type PastoIconProps = LucideProps & { pasti: Pasto[] };

export function PastoIcon({ pasti, ...props }: PastoIconProps) {
  if (pasti.includes("colazione")) return <Coffee {...props} />;
  if (pasti.includes("pranzo")) return <Sandwich {...props} />;
  return <UtensilsCrossed {...props} />;
}
