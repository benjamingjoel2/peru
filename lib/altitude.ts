import type { AltitudeTip } from "@/data/types";

export type BandId = "low" | "mid" | "high" | "veryhigh";

export const altitudeBands: { id: BandId; label: string; min: number; max: number; color: string; advice: string }[] = [
  { id: "low", label: "Low", min: 0, max: 1500, color: "var(--color-band-low)", advice: "No altitude effects expected." },
  { id: "mid", label: "Moderate", min: 1500, max: 2500, color: "var(--color-band-mid)", advice: "Few people notice it. A good place to sleep while you adjust." },
  { id: "high", label: "High", min: 2500, max: 3500, color: "var(--color-band-high)", advice: "Most people notice it at first. Take the first day easy and drink plenty of water." },
  { id: "veryhigh", label: "Very high", min: 3500, max: 9000, color: "var(--color-band-veryhigh)", advice: "Sleep here only after acclimatising lower down. Go slowly." },
];

/** Hex equivalents for contexts without CSS variables (PDF). */
export const bandHex: Record<BandId, string> = {
  low: "#3a8fb7",
  mid: "#1f7d45",
  high: "#e0a526",
  veryhigh: "#b3283c",
};

export function bandFor(m: number) {
  return altitudeBands.find((b) => m >= b.min && m < b.max) ?? altitudeBands[altitudeBands.length - 1];
}

export const tipText: Record<AltitudeTip, string> = {
  "sleep-lower": "Sleep lower first",
  "take-it-easy": "Take it easy today",
  hydrate: "Drink plenty of water",
  "big-day": "Big day: start slow, go steady",
  descend: "Heading lower: easier breathing",
};

export const formatM = (m: number) => `${m.toLocaleString("en-GB")} m`;
export const formatFt = (m: number) => `${Math.round(m * 3.28084).toLocaleString("en-GB")} ft`;

export interface ProfilePoint {
  label: string;
  sublabel?: string;
  sleepM: number;
  maxM?: number;
  maxLabel?: string;
  tip?: AltitudeTip;
}

/** Simple, plain-language warnings for a sequence of nights. */
export function routeWarnings(points: ProfilePoint[]): string[] {
  const warnings: string[] = [];
  const firstHigh = points.findIndex((p) => p.sleepM >= 3000);
  if (firstHigh !== -1) {
    const before = points.slice(0, firstHigh);
    const hadMid = before.some((p) => p.sleepM >= 2000);
    if (!hadMid) warnings.push(`Night ${firstHigh + 1} jumps straight to ${formatM(points[firstHigh].sleepM)}. Sleep lower first, e.g. in the Sacred Valley or Arequipa.`);
  }
  for (let i = 1; i < points.length; i++) {
    const rise = points[i].sleepM - points[i - 1].sleepM;
    if (points[i].sleepM >= 3000 && rise > 600 && points[i - 1].sleepM >= 2000)
      warnings.push(`Night ${i + 1} climbs about ${formatM(rise)} in one go. Consider an extra night in between.`);
  }
  points.forEach((p, i) => {
    if ((p.maxM ?? p.sleepM) >= 4500) {
      const nightsAbove2500 = points.slice(0, i).filter((q) => q.sleepM >= 2500).length;
      if (nightsAbove2500 < 3) warnings.push(`Day ${i + 1} reaches about ${formatM(p.maxM ?? p.sleepM)}. Plan at least three nights above 2,500 m first.`);
    }
  });
  return warnings;
}
