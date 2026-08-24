/**
 * Texture fissa dietro alla card principale: icone da cucina tono su tono
 * sul verde bosco, a griglia sfalsata con leggere rotazioni. Puramente
 * decorativa (aria-hidden), niente immagini esterne.
 */
export function PatternBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-primary-900" aria-hidden="true">
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="mealprep-pattern" width="220" height="220" patternUnits="userSpaceOnUse">
            {/* pentola */}
            <g transform="translate(18,22) rotate(-8)" fill="#0b1a12" opacity="0.5">
              <path d="M16 22 Q14 17 16 12" stroke="#0b1a12" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M28 22 Q30 17 28 12" stroke="#0b1a12" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M9 27 Q9 39 22 39 Q35 39 35 27 Z" />
              <rect x="7" y="23" width="30" height="5.5" rx="2.75" />
              <rect x="1.5" y="24.5" width="6.5" height="4.5" rx="2.25" />
              <rect x="36" y="24.5" width="6.5" height="4.5" rx="2.25" />
            </g>

            {/* carota */}
            <g transform="translate(128,10) rotate(14)" fill="#0b1a12" opacity="0.45">
              <path d="M6 8 Q22 6 26 24 Q27 30 20 29 Q6 27 4 14 Q3 10 6 8 Z" />
              <path d="M9 8 L6 -2 M13 6 L12 -3 M17 7 L19 -2" stroke="#0b1a12" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* baguette */}
            <g transform="translate(58,88) rotate(-5)" fill="#0b1a12" opacity="0.45">
              <rect x="0" y="0" width="46" height="15" rx="7.5" />
              <path d="M9 3 L13 12 M18 2.5 L22 12.5 M27 3 L31 12 M36 3.5 L39 11.5" stroke="#fbf8f2" strokeOpacity="0.25" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* carrello */}
            <g transform="translate(168,96) rotate(7)" fill="none" stroke="#0b1a12" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
              <path d="M0 2 H5 L9 22 H29 L33 8 H8" />
              <circle cx="13" cy="28" r="3" fill="#0b1a12" stroke="none" />
              <circle cx="26" cy="28" r="3" fill="#0b1a12" stroke="none" />
            </g>

            {/* mestolo */}
            <g transform="translate(10,150) rotate(-16)" fill="#0b1a12" opacity="0.45">
              <circle cx="10" cy="10" r="9" />
              <rect x="15" y="15" width="26" height="5.5" rx="2.75" transform="rotate(34 15 15)" />
            </g>

            {/* uovo */}
            <g transform="translate(112,158) rotate(9)" fill="#0b1a12" opacity="0.5">
              <path d="M11 0 C17 0 22 10 22 17 C22 24 17 28 11 28 C5 28 0 24 0 17 C0 10 5 0 11 0 Z" />
            </g>

            {/* formaggio */}
            <g transform="translate(184,180) rotate(-10)" fill="#0b1a12" opacity="0.45">
              <path d="M0 30 L14 2 L34 30 Z" />
              <circle cx="14" cy="22" r="2" fill="#0b1a12" />
              <circle cx="20" cy="26" r="1.6" fill="#0b1a12" />
            </g>

            {/* cesto */}
            <g transform="translate(56,190) rotate(6)" fill="none" stroke="#0b1a12" strokeWidth="2.4" strokeLinecap="round" opacity="0.45">
              <path d="M2 12 A14 8 0 0 1 30 12" />
              <path d="M0 12 L5 30 H27 L32 12 Z" />
              <path d="M8 12 L11 30 M24 12 L21 30" strokeWidth="1.8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mealprep-pattern)" />
      </svg>
    </div>
  );
}
