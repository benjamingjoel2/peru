"use client";

import Image from "next/image";
import { useInViewOnce } from "@/lib/useInViewOnce";

/** Image that wipes in horizontally when scrolled into view (CSS clip-path transition). */
export function WipeImage({ src, alt, className = "", sizes = "(min-width:1024px) 50vw, 100vw", from = "left" }: { src: string; alt: string; shape?: number; className?: string; sizes?: string; from?: "left" | "right" }) {
  // Observe the unclipped wrapper: an element hidden by its own clip-path never counts as "in view"
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} data-in={inView ? "" : undefined} className={`reveal-wipe reveal-wipe-${from} relative overflow-hidden bg-stone-light ${className}`}>
      <div className="reveal-inner absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
