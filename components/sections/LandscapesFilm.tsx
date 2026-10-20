"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/config/media";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { photo } from "@/data/photos";

const frames = [
  { src: "/photos/coast-cliffs.jpg", label: "The Coast", note: "Sea level" },
  { src: "/photos/rainbow-mountain-wide.jpg", label: "The Andes", note: "Up to ~5,000 m" },
  { src: "/photos/amazon-river.jpg", label: "The Amazon", note: "~200 m" },
];

const tiles = [photo("huacachina"), photo("kuelap"), photo("llanganuco"), photo("weaving-hands")];

function Tile({ img, className }: { img: { src: string; alt: string }; className: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes="27vw" className="object-cover" />
    </div>
  );
}

/**
 * Landscapes film inside a photo mosaic. As you scroll, the side tiles step away and the film
 * grows to fill the screen. Uses config.media.filmSrc when set; otherwise cross-fading stills.
 * Reduced motion: a static full-width film with no scroll effect.
 */
export function LandscapesFilm() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [i, setI] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const active = playing && !reduce;

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const inset = useTransform(scrollYProgress, [0, 0.55], ["27%", "0%"]);
  const insetY = useTransform(scrollYProgress, [0, 0.55], ["6%", "0%"]);
  const tilesOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const tilesShiftL = useTransform(scrollYProgress, [0, 0.55], ["0%", "-30%"]);
  const tilesShiftR = useTransform(scrollYProgress, [0, 0.55], ["0%", "30%"]);

  useEffect(() => {
    if (media.filmSrc) {
      if (active) video.current?.play().catch(() => {});
      else video.current?.pause();
      return;
    }
    if (!active) return;
    const t = setInterval(() => setI((n) => (n + 1) % frames.length), 4500);
    return () => clearInterval(t);
  }, [active]);

  const film = (
    <>
      {media.filmSrc ? (
        <video ref={video} className="absolute inset-0 h-full w-full object-cover" src={media.filmSrc} poster={media.filmPoster} muted loop playsInline autoPlay={active} aria-hidden />
      ) : (
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0.01 : 1.4 }}>
            <motion.div
              className="absolute inset-[-4%]"
              initial={{ scale: 1.08, x: "-2%" }}
              animate={active ? { scale: 1, x: "2%" } : { scale: 1.04, x: 0 }}
              transition={{ duration: 6, ease: "linear" }}
            >
              <Image src={frames[i].src} alt="" fill sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/10 to-transparent" />
    </>
  );

  const controls = (
    <div className="on-dark container-x absolute inset-x-0 bottom-0 pb-8 sm:pb-10">
      <p className="eyebrow text-mustard-soft">Three countries in one</p>
      <p className="mt-2 max-w-3xl font-display text-3xl text-cream sm:text-5xl">
        From the Pacific to the peaks <em>to the jungle</em>.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ol className="flex flex-wrap gap-2" aria-label="Film chapters">
          {frames.map((f, n) => (
            <li key={f.label}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-current={!media.filmSrc && i === n}
                className={`rounded-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${!media.filmSrc && i === n ? "bg-mustard text-indigo" : "bg-cream/15 text-cream hover:bg-cream/25"}`}
              >
                {f.label} <span className="font-normal normal-case">{f.note}</span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing} className="rounded-full border-2 border-cream/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-cream hover:text-indigo">
          {playing && !reduce ? "Pause film" : "Play film"}
        </button>
        {media.filmIsPlaceholder && <PlaceholderBadge label="Placeholder footage" className="border-mustard-soft text-mustard-soft" />}
      </div>
    </div>
  );

  // Static version: reduced motion, and phones (no sticky scroll effect)
  const staticFilm = (
    <div className="relative h-[70vh] min-h-[420px] overflow-hidden">
      {film}
      {controls}
    </div>
  );

  if (reduce) {
    return (
      <section aria-label="Landscapes film: from the coast to the Andes to the Amazon" className="bg-indigo-deep">
        {staticFilm}
      </section>
    );
  }

  return (
    <section ref={section} aria-label="Landscapes film: from the coast to the Andes to the Amazon" className="relative bg-cream md:h-[220vh]">
      <div className="md:hidden">{staticFilm}</div>
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <motion.div style={{ opacity: tilesOpacity, x: tilesShiftL }} className="absolute inset-y-[6%] left-[2%] flex w-[23%] flex-col gap-4">
          <Tile img={tiles[0]} className="flex-1" />
          <Tile img={tiles[1]} className="flex-[1.3]" />
        </motion.div>
        <motion.div style={{ opacity: tilesOpacity, x: tilesShiftR }} className="absolute inset-y-[6%] right-[2%] flex w-[23%] flex-col gap-4">
          <Tile img={tiles[2]} className="flex-[1.3]" />
          <Tile img={tiles[3]} className="flex-1" />
        </motion.div>
        <motion.div style={{ left: inset, right: inset, top: insetY, bottom: insetY }} className="absolute overflow-hidden bg-indigo-deep">
          {film}
          {controls}
        </motion.div>
      </div>
    </section>
  );
}
