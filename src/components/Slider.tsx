import { cn } from "../lib/cn";

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
};

export function Slider({ value, min, max, step = 1, onChange, className }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn("w-full h-2 rounded-full appearance-none cursor-pointer accent-primary-700", className)}
      style={{
        background: `linear-gradient(to right, var(--color-primary-600) ${pct}%, var(--color-paper-200) ${pct}%)`,
      }}
    />
  );
}
