import { Fragment, type ElementType } from "react";

/** Renders text where *words* in asterisks become the italic emphasis style. */
export function Emph({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className="font-display font-medium italic text-cochineal [.on-dark_&]:text-mustard">
            {p.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export const plain = (text: string) => text.replace(/\*/g, "");

type Props = {
  as?: ElementType;
  text: string;
  eyebrow?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
  size?: "xl" | "lg" | "md" | "sm";
};

const sizes = {
  xl: "text-4xl sm:text-5xl lg:text-6xl",
  lg: "text-3xl sm:text-4xl lg:text-5xl",
  md: "text-2xl sm:text-3xl",
  sm: "text-xl sm:text-2xl",
};

export function Heading({ as: Tag = "h2", text, eyebrow, className = "", align = "left", id, size = "lg" }: Props) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 text-stone-dark [.on-dark_&]:text-mustard-soft flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span aria-hidden className="inline-block h-[3px] w-8 woven-stripe-thin" />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={`${sizes[size]} text-indigo [.on-dark_&]:text-cream`}>
        <Emph text={text} />
      </Tag>
    </div>
  );
}
