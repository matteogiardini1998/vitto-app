import { Search, X } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = "Cerca..." }: SearchInputProps) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 rounded-full border border-paper-200 bg-paper-0 pl-10 pr-10 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Cancella ricerca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-400"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
