import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "md" | "lg";
};

export function Stepper({ value, onChange, min = 1, max = 20, label, size = "md" }: StepperProps) {
  const grande = size === "lg";
  return (
    <div className={cn("flex items-center", grande ? "gap-6" : "gap-5")}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          "rounded-full bg-paper-100 text-primary-800 dark:text-primary-300 flex items-center justify-center active:bg-paper-200 disabled:opacity-40",
          grande ? "h-14 w-14" : "h-12 w-12",
        )}
        aria-label="Diminuisci"
      >
        <Minus size={grande ? 24 : 20} />
      </button>
      <div className={cn("flex flex-col items-center", grande ? "min-w-[72px]" : "min-w-[56px]")}>
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className={cn(
            "font-display font-semibold text-paper-900 tabular-nums",
            grande ? "text-display-lg" : "text-display-sm",
          )}
        >
          {value}
        </motion.span>
        {label && <span className="text-caption text-paper-500">{label}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          "rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40",
          grande ? "h-14 w-14" : "h-12 w-12",
        )}
        aria-label="Aumenta"
      >
        <Plus size={grande ? 24 : 20} />
      </button>
    </div>
  );
}
