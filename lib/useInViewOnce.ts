"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view. A plain IntersectionObserver, no animation library. */
export function useInViewOnce<T extends Element>(amount = 0.3, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, rootMargin, inView]);
  return [ref, inView] as const;
}

/** Tracks whether the element is currently on screen (for pausing off-screen motion). */
export function useOnScreen(ref: React.RefObject<Element | null>, rootMargin = "0px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return on;
}
