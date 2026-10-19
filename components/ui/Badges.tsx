/** Clearly flags placeholder content until it's real. */
export function PlaceholderBadge({ label = "Placeholder", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border border-dashed border-cochineal/60 bg-cochineal/5 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-cochineal ${className}`}
    >
      {label}
    </span>
  );
}

/** Marks a fact that must be checked against official or local sources. */
export function Verify({ note, className = "" }: { note?: string; className?: string }) {
  return (
    <abbr
      title={note ?? "Approximate. Verify before travel."}
      className={`ml-1 inline-block rounded-sm bg-mustard/25 px-1.5 align-middle text-[0.65rem] font-bold uppercase tracking-wider text-stone-dark no-underline ${className}`}
    >
      verify
    </abbr>
  );
}

export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-stone-light bg-cream px-3 py-1 text-xs font-semibold text-stone-dark ${className}`}>
      {children}
    </span>
  );
}
