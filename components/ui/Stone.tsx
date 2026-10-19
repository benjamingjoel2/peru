/** Section divider: a course of fitted stones along the top edge of a section. */
export function StoneDivider({ color = "var(--color-cream)", flip = false, className = "" }: { color?: string; flip?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`block h-6 w-full sm:h-10 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        fill={color}
        d="M0 48V22l64-6 58 9 41-14 77 4 34 12 66-8 52 4 39-13 88 2 31 14 57-7 72 3 44-12 63 6 29 10 81-9 47 3 36-11 70 6 40 12 54-8 79 2 33-10 62 8 42 9 58-11 54 4V48Z"
      />
    </svg>
  );
}

/** Three fitted stones: the brand mark. */
export function StoneMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M3 27 5 8l17-4 3 10-2 15-12 1Z" fill="var(--color-cochineal)" />
      <path d="M27 4 44 6l1 16-12 3-8-3 1-9Z" fill="var(--color-mustard)" />
      <path d="M12 34 24 32l2-8 9 2 10-2 0 19-19 2-15-2Z" fill="var(--color-indigo)" />
    </svg>
  );
}
