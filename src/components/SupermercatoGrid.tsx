import { motion } from "framer-motion";
import { Store } from "lucide-react";
import { cn } from "../lib/cn";

const SUPERMERCATI = ["Esselunga", "Coop", "Conad", "Carrefour", "Lidl", "Eurospin", "Pam", "MD", "Altro"];

type SupermercatoGridProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function SupermercatoGrid({ value, onChange }: SupermercatoGridProps) {
  const toggle = (nome: string) => {
    const has = value.includes(nome);
    onChange(has ? value.filter((v) => v !== nome) : [...value, nome]);
  };

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {SUPERMERCATI.map((nome) => {
        const selected = value.includes(nome);
        return (
          <motion.button
            key={nome}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => toggle(nome)}
            className={cn(
              "aspect-square rounded-md border-2 flex flex-col items-center justify-center gap-1.5 px-1.5 text-center transition-colors",
              selected
                ? "border-primary-600 bg-primary-50 dark:bg-primary-900/40"
                : "border-paper-200 bg-paper-0 active:bg-paper-100",
            )}
          >
            <Store
              size={20}
              className={selected ? "text-primary-700 dark:text-primary-300" : "text-paper-400"}
              strokeWidth={1.8}
            />
            <span
              className={cn(
                "text-body-sm font-medium leading-tight",
                selected ? "text-primary-800 dark:text-primary-200" : "text-paper-700",
              )}
            >
              {nome}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
