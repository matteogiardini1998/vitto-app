import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type StarRatingProps = {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  onChange?: (value: 0 | 1 | 2 | 3 | 4 | 5) => void;
  size?: number;
  readOnly?: boolean;
};

export function StarRating({ value, onChange, size = 20, readOnly }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" role={readOnly ? undefined : "radiogroup"}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        return (
          <motion.button
            key={n}
            type="button"
            disabled={readOnly}
            whileTap={readOnly ? undefined : { scale: 0.8 }}
            onClick={() => onChange?.(n === value ? 0 : (n as 0 | 1 | 2 | 3 | 4 | 5))}
            className={cn("p-0.5", readOnly && "pointer-events-none")}
            aria-label={`${n} stelle`}
          >
            <Star
              size={size}
              className={filled ? "text-accent-500" : "text-paper-300"}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={1.8}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
