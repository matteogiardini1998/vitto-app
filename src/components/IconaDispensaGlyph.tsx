import { Archive, Refrigerator, Home, Luggage, Briefcase, type LucideIcon } from "lucide-react";
import type { IconaDispensa } from "../types";

export const ICONE_DISPENSA: { id: IconaDispensa; label: string; icon: LucideIcon }[] = [
  { id: "casa", label: "Casa", icon: Home },
  { id: "credenza", label: "Credenza", icon: Archive },
  { id: "frigo", label: "Frigo", icon: Refrigerator },
  { id: "valigia", label: "Seconda casa", icon: Luggage },
  { id: "ufficio", label: "Ufficio", icon: Briefcase },
];

export function IconaDispensaGlyph({ icona, size = 20, className }: { icona: IconaDispensa; size?: number; className?: string }) {
  const Icon = ICONE_DISPENSA.find((i) => i.id === icona)?.icon ?? Home;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
