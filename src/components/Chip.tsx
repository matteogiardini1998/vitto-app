import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type ChipProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  onRemove?: () => void;
  variant?: "default" | "accent";
  className?: string;
};

export function Chip({
  children,
  selected,
  onClick,
  icon,
  onRemove,
  variant = "default",
  className,
}: ChipProps) {
  const selectedClasses =
    variant === "accent"
      ? "bg-accent-500 border-accent-500 text-paper-0"
      : "bg-primary-700 border-primary-700 text-paper-50";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "inline-flex items-center gap-1.5 h-10 px-4 rounded-full border text-body-sm font-medium whitespace-nowrap transition-colors",
        selected
          ? selectedClasses
          : "bg-paper-0 border-paper-200 text-paper-700 active:bg-paper-100",
        className,
      )}
    >
      {icon}
      {children}
      {onRemove && (
        <span
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 opacity-70"
        >
          ×
        </span>
      )}
    </motion.button>
  );
}
