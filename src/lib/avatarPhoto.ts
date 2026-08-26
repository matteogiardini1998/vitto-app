const LATO = 256;

/** Ritaglia al centro in un quadrato e ridimensiona a ~256px: la foto resta leggera e non serve altro editor. */
export function elaboraFotoAvatar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const lato = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - lato) / 2;
      const sy = (img.naturalHeight - lato) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = LATO;
      canvas.height = LATO;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas non disponibile"));
        return;
      }
      ctx.drawImage(img, sx, sy, lato, lato, 0, 0, LATO, LATO);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Immagine non leggibile"));
    };
    img.src = url;
  });
}
