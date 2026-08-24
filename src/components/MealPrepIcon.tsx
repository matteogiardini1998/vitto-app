type MealPrepIconProps = {
  size?: number;
  className?: string;
};

/** Piatto a cloche: il simbolo del pasto pronto, usato nel FAB e nell'onboarding. */
export function MealPrepIcon({ size = 24, className }: MealPrepIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M34 19 Q37 15 34 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
      <path d="M12 22 A12 12 0 0 1 36 22 Z" fill="currentColor" />
      <ellipse cx="24" cy="24" rx="16" ry="4.5" fill="currentColor" />
      <circle cx="24" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}
