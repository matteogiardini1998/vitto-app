import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors shrink-0",
        checked ? "bg-primary-700" : "bg-paper-300",
      )}
    >
      <motion.span
        className="absolute top-1 left-1 h-5 w-5 rounded-full bg-paper-0 shadow-card"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}
