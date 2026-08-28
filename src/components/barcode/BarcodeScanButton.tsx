import { motion } from "framer-motion";
import { ScanBarcode } from "lucide-react";
import { cn } from "../../lib/cn";
import { WHEEL_CONTAINER_HEIGHT } from "../WheelNav";
import { useTutorialStore } from "../../store/tutorialStore";

const GAP_SOPRA_RUOTA = 16;
const DIMENSIONE = 56;

/** Quanto spazio extra (oltre alla ruota) deve riservare in fondo una pagina con questo bottone, così non copre l'ultima voce. */
export const SCAN_BUTTON_CLEARANCE = GAP_SOPRA_RUOTA + DIMENSIONE + 12;

type BarcodeScanButtonProps = {
  onClick: () => void;
};

/**
 * Bottone flottante per lo scanner: solo in Dispensa e Lista della spesa,
 * stessa posizione in entrambe, sempre sopra la ruota.
 *
 * TODO(brand): icona da definire nel brand — Scanner è una funzione
 * trasversale senza colore di sezione. In attesa della decisione definitiva,
 * trattamento neutro in tono legno/bruno (non una macchia di sezione).
 */
export function BarcodeScanButton({ onClick }: BarcodeScanButtonProps) {
  const attivo = useTutorialStore((s) => s.attivo);
  const passoCorrente = useTutorialStore((s) => s.passoCorrente);
  // Il tutorial punta a questo stesso bottone sia in Spesa (spesa-2) sia in
  // Dispensa (dispensa-2): è un unico componente condiviso, non serve altro.
  const inEvidenza = attivo && (passoCorrente === "spesa-2" || passoCorrente === "dispensa-2");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Scansiona codice a barre"
      data-tutorial="scanner-btn"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "absolute left-4 z-40 rounded-full bg-paper-0 text-wood-solid dark:text-[#e0a679] shadow-elevated border border-wood-solid/25 flex items-center justify-center",
        inEvidenza && "tutorial-glow",
      )}
      style={{ bottom: WHEEL_CONTAINER_HEIGHT + GAP_SOPRA_RUOTA, height: DIMENSIONE, width: DIMENSIONE }}
    >
      <ScanBarcode size={25} strokeWidth={1.9} />
    </motion.button>
  );
}
