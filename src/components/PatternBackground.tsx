/**
 * Fondale fisso dietro alla card principale: legno d'ulivo, la materia
 * dell'app. Puramente decorativo (aria-hidden) — il testo non vive mai
 * sopra di lui, solo le card crema/carta che ci stanno davanti.
 */
export function PatternBackground() {
  return <div className="fixed inset-0 -z-10 wood-backdrop" aria-hidden="true" />;
}
