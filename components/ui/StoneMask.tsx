"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Irregular polygons that read like fitted Inca stonework.
 * Coordinates are percentages; each shape keeps roughly the box's footprint.
 */
export const stoneShapes = [
  "polygon(3% 6%, 38% 0%, 71% 3%, 97% 0%, 100% 34%, 97% 72%, 100% 97%, 62% 100%, 28% 97%, 0% 100%, 2% 61%, 0% 28%)",
  "polygon(0% 3%, 46% 0%, 100% 5%, 98% 41%, 100% 100%, 54% 97%, 4% 100%, 0% 56%)",
  "polygon(6% 0%, 64% 4%, 100% 0%, 96% 48%, 100% 93%, 70% 100%, 22% 96%, 0% 100%, 3% 40%)",
  "polygon(0% 8%, 24% 0%, 77% 2%, 100% 9%, 99% 63%, 94% 100%, 38% 98%, 0% 92%, 2% 47%)",
  "polygon(4% 2%, 52% 0%, 96% 4%, 100% 52%, 97% 98%, 48% 100%, 0% 96%, 1% 48%)",
  "polygon(0% 0%, 33% 3%, 100% 0%, 100% 38%, 96% 70%, 100% 100%, 41% 96%, 0% 100%, 4% 64%, 0% 30%)",
];

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
