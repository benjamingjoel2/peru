import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-cochineal text-cream hover:bg-cochineal-dark",
  secondary: "bg-indigo text-cream hover:bg-indigo-deep",
  ghost: "border border-indigo text-indigo hover:bg-indigo hover:text-cream",
  light: "border border-cream text-cream hover:bg-cream hover:text-indigo",
};

export const buttonClass = (v: Variant = "primary", extra = "") => `${base} ${variants[v]} ${extra}`;

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />;
}

export function LinkButton({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Text link led by an outlined circle with an arrow; the arrow nudges on hover. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-indigo [.on-dark_&]:text-cream ${className}`}
    >
      <span aria-hidden className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-current transition-colors group-hover:bg-indigo group-hover:text-cream [.on-dark_&]:group-hover:bg-cream [.on-dark_&]:group-hover:text-indigo">
        <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 6h9M6.5 2.5 10 6l-3.5 3.5" />
        </svg>
      </span>
      <span>{children}</span>
    </Link>
  );
}
