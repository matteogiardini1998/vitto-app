import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type SettingsRowProps = {
  label: string;
  value?: string;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
};

export function SettingsRow({ label, value, onClick, icon, danger }: SettingsRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-paper-100 transition-colors",
        !onClick && "active:bg-transparent",
      )}
    >
      {icon}
      <div className="flex-1 min-w-0">
        <div className={cn("text-body-lg font-medium", danger ? "text-danger-500" : "text-paper-900")}>
          {label}
        </div>
        {value && <div className="text-body-sm text-paper-500 truncate mt-0.5">{value}</div>}
      </div>
      {onClick && <ChevronRight size={18} className="text-paper-300 shrink-0" />}
    </button>
  );
}
