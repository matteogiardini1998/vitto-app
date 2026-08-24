/**
 * Controparte JS dei token CSS in src/index.css.
 * Usare questi valori solo dove Tailwind non arriva (Framer Motion, canvas, inline SVG).
 */

export const motion = {
  duration: {
    fast: 0.16,
    base: 0.24,
    slow: 0.38,
  },
  ease: {
    standard: [0.16, 1, 0.3, 1] as const,
    enter: [0.34, 1.56, 0.64, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
};

export const colors = {
  primary500: "#3d7657",
  primary700: "#234a36",
  accent500: "#cf6127",
  paper50: "#fbf8f2",
  paper900: "#221c16",
};

export const tabBarHeight = 64;
