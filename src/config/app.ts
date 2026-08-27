/**
 * Identità dell'app in un solo posto: nome, claim e icone. Nome e claim sono
 * ora DEFINITIVI (brand VITTO v1.0) — non toccarli senza aggiornare anche il
 * documento di brand identity.
 */
export const APP_NAME = "Vitto";
export const APP_SHORT_NAME = "Vitto";
export const APP_DESCRIPTION = "Pianifica la settimana, scopri ricette italiane e genera la lista della spesa.";
/**
 * Claim ufficiale: SOLO nell'hero della landing (sotto nome/logo) e nei meta
 * description/og della landing. Non va in microcopy interna né notifiche —
 * lì il tono resta breve e situazionale.
 */
export const APP_TAGLINE = "Non pensarci troppo. C'è Vitto.";

/** Percorsi delle icone PWA: cambiano i file, non serve toccare altro codice. */
export const APP_ICONS = {
  favicon: "/favicon.svg",
  appleTouch: "/apple-touch-icon.png",
  icon192: "icons/icon-192.png",
  icon512: "icons/icon-512.png",
  iconMaskable192: "icons/icon-maskable-192.png",
  iconMaskable512: "icons/icon-maskable-512.png",
} as const;
