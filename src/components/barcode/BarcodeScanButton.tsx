import { motion } from "framer-motion";
import { ScanBarcode } from "lucide-react";
import { WHEEL_CONTAINER_HEIGHT } from "../WheelNav";

const GAP_SOPRA_RUOTA = 16;
const DIMENSIONE = 56;

/** Quanto spazio extra (oltre alla ruota) deve riservare in fondo una pagina con questo bottone, così non copre l'ultima voce. */
export const SCAN_BUTTON_CLEARANCE = GAP_SOPRA_RUOTA + DIMENSIONE + 12;

type BarcodeScanButtonProps = {
  onClick: () => void;
};

/** Bottone flottante per lo scanner: solo in Dispensa e Lista della spesa, stessa posizione in entrambe, sempre sopra la ruota. */
export function BarcodeScanButton({ onClick }: BarcodeScanButtonProps) {
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
      className="absolute left-4 z-40 rounded-full bg-paper-0 text-primary-700 dark:text-primary-300 shadow-elevated border border-paper-200 flex items-center justify-center"
      style={{ bottom: WHEEL_CONTAINER_HEIGHT + GAP_SOPRA_RUOTA, height: DIMENSIONE, width: DIMENSIONE }}
    >
      <ScanBarcode size={25} strokeWidth={1.9} />
    </motion.button>
  );
}
