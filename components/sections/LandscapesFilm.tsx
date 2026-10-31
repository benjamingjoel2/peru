"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useOnScreen } from "@/lib/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { media } from "@/config/media";
import { photo } from "@/data/photos";
import { t, L } from "@/lib/i18n";

const frames = L([
  { src: "/photos/coast-cliffs.jpg", label: "The Coast", note: "Sea level" },
  { src: "/photos/rainbow-mountain-wide.jpg", label: "The Andes", note: "Up to ~5,000 m" },
  { src: "/photos/amazon-river.jpg", label: "The Amazon", note: "~200 m" },
]);

const tiles = [photo("huacachina"), photo("kuelap"), photo("llanganuco"), photo("weaving-hands")];

function Tile({ img, className }: { img: { src: string; alt: string }; className: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={img.src} alt={t(img.alt)} fill sizes="27vw" className="object-cover" />
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
  const [prev, setPrev] = useState(-1);
  const go = (n: number) => { setPrev(i); setI(n); };
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  // Only animate while the film is on screen
  const onScreen = useOnScreen(section, "200px");
  const active = playing && !reduce && onScreen;

  // Scroll-linked mosaic: written straight to the DOM in a rAF, so scrolling never re-renders React
  const filmBox = useRef<HTMLDivElement>(null);
  const tilesL = useRef<HTMLDivElement>(null);
  const tilesR = useRef<HTMLDivElement>(null);
  const ctrlBox = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = section.current;
    if (!el || reduce || !onScreen) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / Math.max(r.height - window.innerHeight, 1), 0), 1);
      const grow = 1 - Math.min(p / 0.55, 1);
      const fade = 1 - Math.min(p / 0.45, 1);
      if (filmBox.current) filmBox.current.style.clipPath = `inset(${6 * grow}% ${27 * grow}%)`;
      // The caption sits inside the visible window (a small absolutely positioned box, so layout stays cheap)
      if (ctrlBox.current) Object.assign(ctrlBox.current.style, { left: `${27 * grow}%`, right: `${27 * grow}%`, bottom: `${6 * grow}%` });
      if (tilesL.current) Object.assign(tilesL.current.style, { opacity: `${fade}`, transform: `translateX(${-30 * (1 - grow)}%)` });
      if (tilesR.current) Object.assign(tilesR.current.style, { opacity: `${fade}`, transform: `translateX(${30 * (1 - grow)}%)` });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce, onScreen]);

  useEffect(() => {
    if (media.filmSrc) {
      if (active) video.current?.play().catch(() => {});
      else video.current?.pause();
      return;
    }
    if (!active) return;
    const t = setInterval(() => setI((n) => { setPrev(n); return (n + 1) % frames.length; }), 4500);
    return () => clearInterval(t);
  }, [active]);

  const film = (
    <>
      {media.filmSrc ? (
        <video ref={video} className="absolute inset-0 h-full w-full object-cover" src={media.filmSrc} poster={media.filmPoster} muted loop playsInline autoPlay={active} aria-hidden />
      ) : (
        // Stills stacked and cross-faded with CSS; the drift is a compositor-only keyframe animation
        <div className="absolute inset-0" data-paused={active ? undefined : ""}>
          {frames.map((f, n) => (
            <div key={f.src} className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === n ? "opacity-100" : "opacity-0"}`}>
              <div className={`absolute inset-[-4%] ${i === n || prev === n ? "ken-burns" : ""}`}>
                <Image src={f.src} alt="" fill sizes="100vw" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/10 to-transparent" />
    </>
  );

  const controls = (
    <div className="on-dark container-x absolute inset-x-0 bottom-0 pb-8 sm:pb-10">
      <p className="eyebrow text-mustard-soft">{t("Three countries in one")}</p>
      <p className="mt-2 max-w-3xl font-display text-3xl text-cream sm:text-5xl">
        {t("From the Pacific to the peaks")} <em>{t("to the jungle")}</em>.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ol className="flex flex-wrap gap-2" aria-label={t("Film chapters")}>
          {frames.map((f, n) => (
            <li key={f.label}>
              <button
                type="button"
                onClick={() => go(n)}
                aria-current={!media.filmSrc && i === n}
                className={`rounded-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${!media.filmSrc && i === n ? "bg-mustard text-indigo" : "bg-cream/15 text-cream hover:bg-cream/25"}`}
              >
                {f.label} <span className="font-normal normal-case">{f.note}</span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing} className="rounded-full border-2 border-cream/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-cream hover:text-indigo">
          {playing && !reduce ? t("Pause film") : t("Play film")}
        </button>
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
      <section aria-label={t("Landscapes film: from the coast to the Andes to the Amazon")} className="bg-indigo-deep">
        {staticFilm}
      </section>
    );
  }

  return (
    <section ref={section} aria-label={t("Landscapes film: from the coast to the Andes to the Amazon")} className="relative bg-cream md:h-[220vh]">
      <div className="md:hidden">{staticFilm}</div>
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div ref={tilesL} className="absolute inset-y-[6%] left-[2%] flex w-[23%] flex-col gap-4">
          <Tile img={tiles[0]} className="flex-1" />
          <Tile img={tiles[1]} className="flex-[1.3]" />
        </div>
        <div ref={tilesR} className="absolute inset-y-[6%] right-[2%] flex w-[23%] flex-col gap-4">
          <Tile img={tiles[2]} className="flex-[1.3]" />
          <Tile img={tiles[3]} className="flex-1" />
        </div>
        <div ref={filmBox} className="absolute inset-0 overflow-hidden bg-indigo-deep [clip-path:inset(6%_27%)]">
          {film}
          <div ref={ctrlBox} className="absolute inset-x-[27%] bottom-[6%] top-0">{controls}</div>
        </div>
      </div>
    </section>
  );
}
