import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function Stepper({ value, onChange, min = 1, max = 20, label }: StepperProps) {
  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="h-12 w-12 rounded-full bg-paper-100 text-primary-800 flex items-center justify-center active:bg-paper-200 disabled:opacity-40"
        aria-label="Diminuisci"
      >
        <Minus size={20} />
      </button>
      <div className="flex flex-col items-center min-w-[56px]">
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="text-display-sm font-display font-semibold text-paper-900 tabular-nums"
        >
          {value}
        </motion.span>
        {label && <span className="text-caption text-paper-500">{label}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-12 w-12 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
        aria-label="Aumenta"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
