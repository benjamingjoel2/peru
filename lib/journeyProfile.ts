import { t } from "@/lib/i18n";
import type { Journey } from "@/data/types";
import type { ProfilePoint } from "./altitude";

export const journeyPoints = (j: Journey): ProfilePoint[] =>
  j.itinerary.map((d) => ({
    label: t("Day {n}", { n: d.day }),
    sublabel: d.sleepLabel,
    sleepM: d.sleepAltitudeM,
    maxM: d.maxAltitudeM,
    maxLabel: d.maxLabel,
    tip: d.tip,
  }));
