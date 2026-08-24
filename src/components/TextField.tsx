import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextField({ label, className, id, ...props }: TextFieldProps) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-body-sm font-medium text-paper-600">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "h-[52px] rounded-lg border border-paper-200 bg-paper-0 px-4 text-body-lg text-paper-900",
          "placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
          className,
        )}
        {...props}
      />
    </div>
  );
}
