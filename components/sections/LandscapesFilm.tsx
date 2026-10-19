"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { media } from "@/config/media";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { StoneDivider } from "@/components/ui/Stone";

const frames = [
  { src: "/images/placeholders/film-coast.svg", label: "The Coast", note: "Sea level" },
  { src: "/images/placeholders/film-andes.svg", label: "The Andes", note: "Up to ~5,000 m" },
  { src: "/images/placeholders/film-amazon.svg", label: "The Amazon", note: "~200 m" },
];

/** Full-width landscapes film. Uses config.media.filmSrc when set; otherwise animated placeholder stills. */
export function LandscapesFilm() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [i, setI] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const active = playing && !reduce;

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

  return (
    <section aria-label="Landscapes film: from the coast to the Andes to the Amazon" className="relative bg-indigo-deep">
      <StoneDivider color="var(--color-indigo-deep)" className="absolute -top-6 left-0 z-10 sm:-top-10" />
      <div className="relative h-[60vh] min-h-[380px] overflow-hidden lg:h-[78vh]">
        {media.filmSrc ? (
          <video ref={video} className="absolute inset-0 h-full w-full object-cover" src={media.filmSrc} poster={media.filmPoster} muted loop playsInline autoPlay={active} aria-hidden />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.01 : 1.4 }}
            >
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
        <div className="on-dark container-x absolute inset-x-0 bottom-0 pb-10">
          <p className="eyebrow text-mustard-soft">Three countries in one</p>
          <p className="mt-2 max-w-3xl font-display text-3xl text-cream sm:text-5xl">
            From the Pacific to the peaks <em className="text-mustard">to the jungle</em>.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ol className="flex gap-2" aria-label="Film chapters">
              {frames.map((f, n) => (
                <li key={f.label}>
                  <button
                    type="button"
                    onClick={() => { setI(n); }}
                    aria-current={!media.filmSrc && i === n}
                    className={`rounded-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${!media.filmSrc && i === n ? "bg-mustard text-indigo" : "bg-cream/15 text-cream hover:bg-cream/25"}`}
                  >
                    {f.label} <span className="font-normal normal-case">{f.note}</span>
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="rounded-full border-2 border-cream/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-cream hover:text-indigo"
            >
              {playing && !reduce ? "Pause film" : "Play film"}
            </button>
            {media.filmIsPlaceholder && <PlaceholderBadge label="Placeholder footage" className="border-mustard-soft text-mustard-soft" />}
          </div>
        </div>
      </div>
    </section>
  );
}
