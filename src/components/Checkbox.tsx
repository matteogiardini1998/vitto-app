import { Check } from "lucide-react";
import { cn } from "../lib/cn";

type CheckboxProps = {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
};

export function Checkbox({ checked, onChange, disabled }: CheckboxProps) {
  return (
    <span
      role="checkbox"
      aria-checked={checked}
      onClick={disabled ? undefined : onChange}
      className={cn(
        "h-6 w-6 shrink-0 rounded-sm border-2 flex items-center justify-center transition-colors",
        disabled
          ? "border-paper-200 bg-paper-100"
          : checked
            ? "border-primary-700 bg-primary-700"
            : "border-paper-300 bg-paper-0",
      )}
    >
      {checked && !disabled && <Check size={14} className="text-paper-50" strokeWidth={3} />}
    </span>
  );
}
