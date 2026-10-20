"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Emph } from "@/components/ui/Heading";
import { stoneShapes } from "@/components/ui/StoneMask";
import { LinkButton } from "@/components/ui/Button";

const slides = [
  { src: "/photos/machu-picchu.jpg", alt: "Machu Picchu among misty mountains", caption: "Machu Picchu · ~2,430 m" },
  { src: "/photos/uros-boat.jpg", alt: "A reed boat at the Uros floating islands on Lake Titicaca", caption: "Lake Titicaca · ~3,800 m" },
  { src: "/photos/macaws-flock.jpg", alt: "Scarlet macaws in the Amazon canopy", caption: "Tambopata · ~200 m" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1fr_1.15fr] lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow flex items-center gap-3 text-stone-dark">
            <span aria-hidden className="inline-block h-[3px] w-10 woven-stripe-thin" />
            Private journeys, paced for altitude
          </p>
          <h1 id="hero-title" className="mt-4 text-5xl text-indigo sm:text-6xl lg:text-7xl">
            <Emph text="Peru, *done right*." />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-dark">
            A desert coast, the high Andes and the Amazon. Machu Picchu, Titicaca, the Nazca Lines and some of the best food on Earth. We plan the altitude, the distances and the permits, so you spend your time amazed, not out of breath or out of tickets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/journeys">Explore journeys</LinkButton>
            <LinkButton href="/start-planning" variant="ghost">Start planning</LinkButton>
          </div>
        </div>
        <div>
          <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden bg-stone-light" style={{ clipPath: stoneShapes[0] }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 1.06 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={slides[i].src} alt={slides[i].alt} fill priority={i === 0} sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Fitted stones around the main image */}
          <div aria-hidden className="absolute -bottom-5 -left-4 h-16 w-24 bg-mustard sm:h-20 sm:w-32" style={{ clipPath: stoneShapes[3] }} />
          <div aria-hidden className="absolute -right-3 -top-4 h-14 w-20 bg-cochineal sm:h-16 sm:w-24" style={{ clipPath: stoneShapes[1] }} />
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-stone-dark" aria-live="polite">{slides[i].caption} <span className="text-xs font-normal">(verify)</span></p>
            <div className="flex items-center gap-1">
              {slides.map((s, n) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show slide ${n + 1}: ${s.caption}`}
                  aria-current={i === n}
                  className="grid h-6 min-w-6 place-items-center"
                >
                  <span aria-hidden className={`block h-2.5 rounded-full transition-all ${i === n ? "w-8 bg-cochineal" : "w-2.5 bg-stone"}`} />
                </button>
              ))}
              {!reduce && (
                <button type="button" onClick={() => setPaused((p) => !p)} className="ml-2 rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wider text-indigo underline" aria-pressed={paused}>
                  {paused ? "Play" : "Pause"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
