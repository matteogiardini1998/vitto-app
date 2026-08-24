import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";

type SelectableCardProps = {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
};

export function SelectableCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
}: SelectableCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "w-full flex items-center gap-3.5 rounded-xl border-2 p-4 text-left transition-colors",
        selected
          ? "border-primary-600 bg-primary-50"
          : "border-paper-200 bg-paper-0 active:bg-paper-100",
      )}
    >
      {Icon && (
        <div
          className={cn(
            "h-11 w-11 shrink-0 rounded-lg flex items-center justify-center",
            selected ? "bg-primary-700 text-paper-50" : "bg-paper-100 text-paper-600",
          )}
        >
          <Icon size={20} strokeWidth={1.9} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-body-lg font-semibold text-paper-900">{label}</div>
        {description && <div className="text-body-sm text-paper-500 mt-0.5">{description}</div>}
      </div>
      <div
        className={cn(
          "h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center",
          selected ? "border-primary-700 bg-primary-700" : "border-paper-300",
        )}
      >
        {selected && <Check size={14} className="text-paper-50" strokeWidth={3} />}
      </div>
    </motion.button>
  );
}
