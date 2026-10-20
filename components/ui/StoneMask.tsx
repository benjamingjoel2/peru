"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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

export function StoneMask({ src, alt, shape = 0, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority, settle = true }: Props) {
  const reduce = useReducedMotion();
  const animate = settle && !reduce;
  return (
    <div className={`relative overflow-hidden bg-stone-light ${className}`} style={{ clipPath: stoneShapes[shape % stoneShapes.length] }}>
      <motion.div
        className="absolute inset-0"
        initial={animate ? { y: -16, scale: 1.08 } : false}
        whileInView={animate ? { y: 0, scale: 1 } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
