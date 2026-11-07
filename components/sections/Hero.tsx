"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { StoneMark } from "@/components/ui/Stone";
import { t, L } from "@/lib/i18n";

const slides = L([
  { src: "/photos/machu-picchu.jpg", alt: "Machu Picchu among misty mountains", caption: "Machu Picchu · ~2,430 m" },
  { src: "/photos/uros-boat.jpg", alt: "A reed boat at the Uros floating islands on Lake Titicaca", caption: "Lake Titicaca · ~3,800 m" },
  { src: "/photos/rainbow-mountain.jpg", alt: "The striped slopes of Vinicunca, Rainbow Mountain", caption: "Vinicunca · ~5,000 m" },
  { src: "/photos/macaws-flock.jpg", alt: "Scarlet macaws in the Amazon canopy", caption: "Tambopata · ~200 m" },
]);

/** Full-screen photo slider under a transparent header, with the brand line split along the bottom. */
export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // Slides mount the first time they're shown, so only the first photo loads up front
  const [seen, setSeen] = useState<number[]>([0]);
  const show = (n: number) => { setI(n); setSeen((s) => (s.includes(n) ? s : [...s, n])); };

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => { const next = (n + 1) % slides.length; setSeen((s) => (s.includes(next) ? s : [...s, next])); return next; }), 6500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <section aria-label={t("Peru, done right")} aria-roledescription={t("carousel")} className="on-dark relative h-[calc(100svh-2.5rem)] min-h-[560px] overflow-hidden bg-indigo-deep">
      {slides.map((s, n) => seen.includes(n) && (
        <div
          key={s.src}
          className={`absolute inset-0 ${i === n ? "z-[1]" : "z-0"} ${i === n && seen.length > 1 ? "hero-in" : ""}`}
          aria-hidden={i !== n}
          aria-roledescription={t("slide")}
          aria-label={`${t("{n} of {total}", { n: n + 1, total: slides.length })}: ${s.caption}`}
        >
          <Image src={s.src} alt={s.alt} fill {...(n === 0 ? ({ loading: "eager", fetchPriority: "high" } as const) : {})} sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 z-[2] bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/10 to-indigo-deep/30" />

      {/* Brand line split around a centre mark, like a wordmark along the bottom edge */}
      <div className="container-x absolute inset-x-0 bottom-0 z-[3] pb-8 sm:pb-12">
        <div aria-hidden className="woven-stripe-thin mb-5 w-1/2 opacity-90 sm:mb-8" />
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[auto_1fr_auto]">
          <p className="font-display text-[clamp(3rem,11vw,9.5rem)] font-light leading-[0.85] text-cream">{t("Peru,")}</p>
          <div className="hidden flex-col items-center gap-2 pb-4 text-center md:flex">
            <StoneMark className="h-10 w-10" />
            <p className="eyebrow max-w-[14rem] text-cream/90">{t("Private journeys, paced for altitude")}</p>
          </div>
          <p className="font-display text-[clamp(3rem,11vw,9.5rem)] font-light italic leading-[0.85] text-cream md:text-right">{t("done right.")}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-cream/85">
          <p aria-live="polite">{slides[i].caption} <span className="text-xs">{t("(verify)")}</span></p>
          <div className="flex items-center gap-1">
            {slides.map((s, n) => (
              <button key={s.src} type="button" onClick={() => show(n)} aria-label={t("Show slide {n}: {caption}", { n: n + 1, caption: s.caption })} aria-current={i === n} className="grid h-6 min-w-6 place-items-center">
                <span aria-hidden className={`block h-0.5 transition-all ${i === n ? "w-10 bg-cream" : "w-5 bg-cream/50"}`} />
              </button>
            ))}
            {!reduce && (
              <button type="button" onClick={() => setPaused((p) => !p)} className="ml-3 rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wider text-cream underline" aria-pressed={paused}>
                {paused ? t("Play") : t("Pause")}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
