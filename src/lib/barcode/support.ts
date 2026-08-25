/** Vero se il browser espone la Barcode Detection API nativa (Chrome/Android e derivati). */
export function supportoNativo(): boolean {
  return typeof window !== "undefined" && "BarcodeDetector" in window;
}
