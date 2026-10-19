import type { Journey } from "@/data/types";
import type { ProfilePoint } from "./altitude";

export const journeyPoints = (j: Journey): ProfilePoint[] =>
  j.itinerary.map((d) => ({
    label: `Day ${d.day}`,
    sublabel: d.sleepLabel,
    sleepM: d.sleepAltitudeM,
    maxM: d.maxAltitudeM,
    maxLabel: d.maxLabel,
    tip: d.tip,
  }));
