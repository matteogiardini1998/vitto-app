/**
 * Identità dell'app in un solo posto: nome e icone. Quando arriveranno nome e
 * icona definitivi, si cambia qui (e i file delle icone in public/icons/ e
 * public/favicon.svg) — non a caccia di stringhe sparse nei componenti.
 */
export const APP_NAME = "MealPrep";
export const APP_SHORT_NAME = "MealPrep";
export const APP_DESCRIPTION = "Pianifica la settimana, scopri ricette italiane e genera la lista della spesa.";
export const APP_TAGLINE = "La tua settimana in cucina, senza pensieri.";

/** Percorsi delle icone PWA: cambiano i file, non serve toccare altro codice. */
export const APP_ICONS = {
  favicon: "/favicon.svg",
  appleTouch: "/apple-touch-icon.png",
  icon192: "icons/icon-192.png",
  icon512: "icons/icon-512.png",
  iconMaskable192: "icons/icon-maskable-192.png",
  iconMaskable512: "icons/icon-maskable-512.png",
} as const;
