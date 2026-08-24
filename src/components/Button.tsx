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
    "bg-paper-100 text-primary-800 border border-paper-200 active:bg-paper-200 disabled:text-paper-400",
  ghost: "bg-transparent text-primary-700 active:bg-primary-50 disabled:text-paper-400",
  danger: "bg-transparent text-danger-500 active:bg-danger-500/10",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-4 text-body-md rounded-md gap-2",
  lg: "h-[52px] px-6 text-body-lg rounded-lg gap-2",
  icon: "h-11 w-11 rounded-md",
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
