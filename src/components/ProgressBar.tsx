import { motion } from "framer-motion";
import { motion as motionTokens } from "../theme/tokens";

type ProgressBarProps = {
  value: number;
  max: number;
  className?: string;
};

export function ProgressBar({ value, max, className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`h-1.5 w-full rounded-full bg-paper-200 overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="h-full rounded-full bg-primary-600"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.standard }}
      />
    </div>
  );
}
