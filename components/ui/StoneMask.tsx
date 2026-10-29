"use client";

import Image from "next/image";
import { useInViewOnce } from "@/lib/useInViewOnce";

// Plain rectangular frames (kept as an array so callers can still pass a shape index)
export const stoneShapes = ["none", "none", "none", "none", "none", "none"];

type Props = {
  src: string;
  alt: string;
  shape?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Settle animation when scrolled into view */
  settle?: boolean;
};

export function StoneMask({ src, alt, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority, settle = true }: Props) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0, "0px 0px -60px 0px");
  return (
    <div ref={ref} data-in={inView || !settle ? "" : undefined} className={`reveal-settle relative overflow-hidden bg-stone-light ${className}`}>
      <div className="reveal-inner absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
