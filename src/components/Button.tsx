import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "lg" | "icon";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
  fullWidth?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-700 text-paper-50 shadow-card active:bg-primary-800 disabled:bg-paper-300 disabled:text-paper-500",
  secondary:
    "bg-sage-100 text-sage-800 border border-sage-200 active:bg-sage-200 disabled:bg-paper-100 disabled:text-paper-400 disabled:border-paper-200 dark:bg-sage-900/40 dark:text-sage-200 dark:border-sage-800 dark:active:bg-sage-900/60",
  ghost: "bg-transparent text-primary-700 active:bg-primary-50 disabled:text-paper-400 dark:text-primary-300 dark:active:bg-primary-900/40",
  danger: "bg-transparent text-danger-500 active:bg-danger-500/10",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-4 text-body-md rounded-lg gap-2",
  lg: "h-[52px] px-6 text-body-lg rounded-xl gap-2",
  icon: "h-11 w-11 rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95, scaleY: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className={cn(
        "inline-flex items-center justify-center font-sans font-semibold select-none transition-colors",
        "disabled:pointer-events-none disabled:opacity-70",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
