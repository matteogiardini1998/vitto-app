import type { AvatarId } from "../types";

export const AVATAR_OPZIONI: { id: AvatarId; label: string; bg: string }[] = [
  { id: "chef", label: "Chef", bg: "bg-pop-yellow-400" },
  { id: "fornaio", label: "Fornaio", bg: "bg-accent-300" },
  { id: "contadina", label: "Contadina", bg: "bg-sage-400" },
  { id: "pizzaiolo", label: "Pizzaiolo", bg: "bg-accent-500" },
  { id: "nonna", label: "Nonna ai fornelli", bg: "bg-primary-400" },
  { id: "barista", label: "Barista", bg: "bg-pop-sky-400" },
  { id: "pescivendolo", label: "Pescivendolo", bg: "bg-pop-sky-500" },
  { id: "macellaio", label: "Macellaio", bg: "bg-pop-berry-400" },
];

type AvatarGlyphProps = {
  id: AvatarId;
  size?: number;
  className?: string;
};

/** Icone piatte a tema cucina, stesso linguaggio visivo del pattern di sfondo. */
export function AvatarGlyph({ id, size = 24, className }: AvatarGlyphProps) {
  const props = { width: size, height: size, viewBox: "0 0 32 32", fill: "currentColor", className, "aria-hidden": true } as const;

  switch (id) {
    case "chef":
      return (
        <svg {...props}>
          <path d="M9 14 a7 6 0 0 1 14 0 a5 5 0 0 1 -1 10 h-12 a5 5 0 0 1 -1 -10 Z" />
          <rect x="8" y="23" width="16" height="4" rx="1.5" />
        </svg>
      );
    case "fornaio":
      return (
        <svg {...props}>
          <rect x="4" y="14" width="24" height="9" rx="4.5" />
          <path d="M9 16 L12 21 M14 15.5 L17 21.5 M19 16 L22 21" stroke="#fffbf3" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "contadina":
      return (
        <svg {...props}>
          <path d="M9 12 Q17 9 20 22 Q21 26 15 25 Q6 24 5 15 Q4 12 9 12 Z" />
          <path d="M11 12 L8 4 M14 10.5 L13 3 M18 11 L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "pizzaiolo":
      return (
        <svg {...props}>
          <path d="M16 6 L27 25 H5 Z" />
          <circle cx="16" cy="15" r="1.6" fill="#fffbf3" />
          <circle cx="12" cy="19" r="1.4" fill="#fffbf3" />
          <circle cx="20" cy="19" r="1.4" fill="#fffbf3" />
        </svg>
      );
    case "nonna":
      return (
        <svg {...props}>
          <path d="M8 13 Q8 25 16 25 Q24 25 24 13 Z" />
          <rect x="6" y="9" width="20" height="5" rx="2.5" />
          <rect x="0.5" y="10.5" width="6.5" height="4" rx="2" />
          <rect x="25" y="10.5" width="6.5" height="4" rx="2" />
        </svg>
      );
    case "barista":
      return (
        <svg {...props}>
          <path d="M22 12 Q26 12 26 16 Q26 20 22 20" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M6 12 H22 V19 Q22 25 14 25 Q6 25 6 19 Z" />
          <path d="M11 9 Q10 6 12 4 M16 9 Q15 6 17 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "pescivendolo":
      return (
        <svg {...props}>
          <path d="M4 16 Q13 6 24 16 Q13 26 4 16 Z" />
          <path d="M24 16 L29 11 V21 Z" />
          <circle cx="10" cy="14" r="1.4" fill="#fffbf3" />
        </svg>
      );
    case "macellaio":
    default:
      return (
        <svg {...props}>
          <rect x="4" y="18" width="20" height="4" rx="1" />
          <path d="M22 20 L29 12 L29 15 L24 20 Z" />
          <path d="M6 22 V25 M10 22 V25 M14 22 V25 M18 22 V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
