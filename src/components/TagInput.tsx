import { useState } from "react";
import { Plus } from "lucide-react";
import { Chip } from "./Chip";

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function TagInput({ value, onChange, placeholder = "Aggiungi..." }: TagInputProps) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (value.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, trimmed]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 h-11 rounded-md border border-paper-200 bg-paper-0 px-4 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
        <button
          type="button"
          onClick={add}
          disabled={!draft.trim()}
          aria-label="Aggiungi"
          className="h-11 w-11 rounded-md bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
        >
          <Plus size={20} />
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((v) => (
            <Chip key={v} selected onRemove={() => onChange(value.filter((x) => x !== v))}>
              {v}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}
