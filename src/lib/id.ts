/**
 * crypto.randomUUID() requires a secure context (HTTPS or localhost) and is
 * unavailable on plain HTTP LAN addresses (e.g. testing from a phone via
 * http://192.168.x.x), where it throws instead of returning undefined.
 */
export function generaId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // fall through to the manual fallback below
    }
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
