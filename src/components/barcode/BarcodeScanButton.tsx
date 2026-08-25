import { motion } from "framer-motion";
import { ScanBarcode } from "lucide-react";
import { WHEEL_CONTAINER_HEIGHT } from "../WheelNav";

type BarcodeScanButtonProps = {
  onClick: () => void;
};

/** Bottone flottante per lo scanner: solo in Dispensa e Lista della spesa, stessa posizione in entrambe. */
export function BarcodeScanButton({ onClick }: BarcodeScanButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Scansiona codice a barre"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="absolute left-4 z-40 h-12 w-12 rounded-full bg-paper-0 text-primary-700 shadow-elevated border border-paper-200 flex items-center justify-center"
      style={{ bottom: WHEEL_CONTAINER_HEIGHT + 16 }}
    >
      <ScanBarcode size={22} strokeWidth={1.9} />
    </motion.button>
  );
}
