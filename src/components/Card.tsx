import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  padded?: boolean;
};

export function Card({ className, children, padded = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-paper-0 rounded-lg shadow-card border border-paper-100",
        padded && "p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
