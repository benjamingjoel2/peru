"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";

type Props = {
  label: string;
  children: React.ReactNode;
  /** Tailwind width classes for each slide */
  itemClassName?: string;
  className?: string;
  dark?: boolean;
  /** "top": arrows above the track (default). "sides": arrows either side of the track. */
  arrows?: "top" | "sides";
};

/** Scroll-snap carousel: swipe or drag on touch, arrow buttons, and ←/→ keys when focused. */
export function Carousel({ label, children, itemClassName = "w-[82%] sm:w-[46%] lg:w-[31%]", className = "", dark, arrows = "top" }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const items = Children.toArray(children);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.querySelector("li");
    const step = first ? first.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const btn = `grid h-11 w-11 place-items-center rounded-full border-2 transition disabled:opacity-30 ${
    dark ? "border-cream/70 text-cream hover:bg-cream hover:text-indigo" : "border-indigo text-indigo hover:bg-indigo hover:text-cream"
  }`;

  return (
    <section aria-roledescription={t("carousel")} aria-label={label} className={className}>
      {arrows === "top" && (
        <div className="mb-5 flex justify-end gap-3">
          <button type="button" className={btn} onClick={() => scroll(-1)} disabled={atStart} aria-label={t("Previous: {name}", { name: label })}>
            <span aria-hidden>←</span>
          </button>
          <button type="button" className={btn} onClick={() => scroll(1)} disabled={atEnd} aria-label={t("Next: {name}", { name: label })}>
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
      <div className={arrows === "sides" ? "relative md:px-16" : ""}>
      {arrows === "sides" && (
        <>
          <button type="button" className={`${btn} absolute left-0 top-1/3 z-10 hidden md:grid`} onClick={() => scroll(-1)} disabled={atStart} aria-label={t("Previous: {name}", { name: label })}>
            <span aria-hidden>←</span>
          </button>
          <button type="button" className={`${btn} absolute right-0 top-1/3 z-10 hidden md:grid`} onClick={() => scroll(1)} disabled={atEnd} aria-label={t("Next: {name}", { name: label })}>
            <span aria-hidden>→</span>
          </button>
        </>
      )}
      <ul
        ref={track}
        tabIndex={0}
        aria-label={t("{name}: use arrow keys to scroll", { name: label })}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); scroll(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); scroll(-1); }
        }}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <li key={i} className={`shrink-0 snap-start ${itemClassName}`} aria-roledescription={t("slide")} aria-label={t("{n} of {total}", { n: i + 1, total: items.length })}>
            {child}
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
