"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** The user's reduced-motion preference (false during server render). */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
