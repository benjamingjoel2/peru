"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stoneShapes } from "./StoneMask";

/** Image that wipes in horizontally when scrolled into view, inside a fitted-stone mask. */
export function WipeImage({ src, alt, shape = 0, className = "", sizes = "(min-width:1024px) 50vw, 100vw", from = "left" }: { src: string; alt: string; shape?: number; className?: string; sizes?: string; from?: "left" | "right" }) {
  const reduce = useReducedMotion();
  // Observe the unclipped wrapper: an element hidden by its own clip-path never counts as "in view"
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ clipPath: stoneShapes[shape % stoneShapes.length] }}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: hidden, scale: 1.08 }}
        animate={reduce || inView ? { clipPath: "inset(0 0% 0 0%)", scale: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} loading="eager" className="object-cover" />
      </motion.div>
    </div>
  );
}
