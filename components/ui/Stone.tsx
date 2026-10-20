/** Section divider: not used in this look. Kept so existing sections compile. */
export function StoneDivider(props: { color?: string; flip?: boolean; className?: string }) {
  void props;
  return null;
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
