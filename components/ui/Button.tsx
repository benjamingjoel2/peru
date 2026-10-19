import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-cochineal text-cream hover:bg-cochineal-dark",
  secondary: "bg-indigo text-cream hover:bg-indigo-deep",
  ghost: "border-2 border-indigo text-indigo hover:bg-indigo hover:text-cream",
  light: "border-2 border-cream text-cream hover:bg-cream hover:text-indigo",
};

export const buttonClass = (v: Variant = "primary", extra = "") => `${base} ${variants[v]} ${extra}`;

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />;
}

export function LinkButton({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-cochineal [.on-dark_&]:text-mustard ${className}`}
    >
      <span className="border-b-2 border-current pb-0.5">{children}</span>
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Link>
  );
}
