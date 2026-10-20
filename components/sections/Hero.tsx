"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StoneMark } from "@/components/ui/Stone";

const slides = [
  { src: "/photos/machu-picchu.jpg", alt: "Machu Picchu among misty mountains", caption: "Machu Picchu · ~2,430 m" },
  { src: "/photos/uros-boat.jpg", alt: "A reed boat at the Uros floating islands on Lake Titicaca", caption: "Lake Titicaca · ~3,800 m" },
  { src: "/photos/rainbow-mountain.jpg", alt: "The striped slopes of Vinicunca, Rainbow Mountain", caption: "Vinicunca · ~5,000 m" },
  { src: "/photos/macaws-flock.jpg", alt: "Scarlet macaws in the Amazon canopy", caption: "Tambopata · ~200 m" },
];

/** Full-screen photo slider under a transparent header, with the brand line split along the bottom. */
export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <section aria-label="Peru, done right" aria-roledescription="carousel" className="on-dark relative h-[calc(100svh-2.5rem)] min-h-[560px] overflow-hidden bg-indigo-deep">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}: ${slides[i].caption}`}
        >
          <Image src={slides[i].src} alt={slides[i].alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/10 to-indigo-deep/30" />

      {/* Brand line split around a centre mark, like a wordmark along the bottom edge */}
      <div className="container-x absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
        <div aria-hidden className="woven-stripe-thin mb-5 w-1/2 opacity-90 sm:mb-8" />
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[auto_1fr_auto]">
          <p className="font-display text-[clamp(3rem,11vw,9.5rem)] font-bold leading-[0.85] text-cream">Peru,</p>
          <div className="hidden flex-col items-center gap-2 pb-4 text-center md:flex">
            <StoneMark className="h-10 w-10" />
            <p className="eyebrow max-w-[14rem] text-cream/90">Private journeys, paced for altitude</p>
          </div>
          <p className="font-display text-[clamp(3rem,11vw,9.5rem)] font-medium italic leading-[0.85] text-mustard md:text-right">done right.</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-cream/85">
          <p aria-live="polite">{slides[i].caption} <span className="text-xs">(verify)</span></p>
          <div className="flex items-center gap-1">
            {slides.map((s, n) => (
              <button key={s.src} type="button" onClick={() => setI(n)} aria-label={`Show slide ${n + 1}: ${s.caption}`} aria-current={i === n} className="grid h-6 min-w-6 place-items-center">
                <span aria-hidden className={`block h-1 rounded-full transition-all ${i === n ? "w-10 bg-mustard" : "w-5 bg-cream/60"}`} />
              </button>
            ))}
            {!reduce && (
              <button type="button" onClick={() => setPaused((p) => !p)} className="ml-3 rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wider text-cream underline" aria-pressed={paused}>
                {paused ? "Play" : "Pause"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
