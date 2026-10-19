import type { MPRouteId, Month } from "@/data/types";

/**
 * Machu Picchu and Inca Trail rules. These change often.
 * Each rule carries a verifiedAsOf date and official sources. Re-check before every season.
 * PLACEHOLDER: verifiedAsOf dates must be updated by the team after checking the official sources.
 */
export const officialSources = {
  tickets: { label: "Official Machu Picchu ticket site (Ministerio de Cultura)", url: "https://tuboleto.cultura.pe/" },
  ministry: { label: "Ministerio de Cultura del Perú", url: "https://www.gob.pe/cultura" },
  sernanp: { label: "SERNANP (protected areas)", url: "https://www.gob.pe/sernanp" },
  promperu: { label: "PromPerú – Peru.travel", url: "https://www.peru.travel/" },
  migraciones: { label: "Superintendencia Nacional de Migraciones", url: "https://www.gob.pe/migraciones" },
};

export interface MPRule {
  id: string;
  title: string;
  body: string;
  verifiedAsOf: string;
  sources: { label: string; url: string }[];
}

export const mpRules: MPRule[] = [
  {
    id: "timed-entry",
    title: "Tickets are timed and named",
    body: "Every Machu Picchu ticket has an entry time slot and a passenger name and passport number. Arrive within your slot; you can't swap slots on the day.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.tickets],
  },
  {
    id: "circuits",
    title: "You visit by circuit",
    body: "Visits follow set one-way circuits. Some take you to the upper terraces for the classic postcard view; others focus on the lower temples. Your ticket type decides which circuit you walk, so choose it when you book.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.tickets, officialSources.ministry],
  },
  {
    id: "mountains",
    title: "Huayna Picchu and Machu Picchu Mountain are extra",
    body: "The two mountain climbs each need their own ticket, have very limited daily numbers and usually sell out first.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.tickets],
  },
  {
    id: "daily-limits",
    title: "Daily numbers are capped",
    body: "The total number of visitors per day is capped and the cap can be changed by the authorities, sometimes at short notice.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.ministry],
  },
  {
    id: "inca-trail-permits",
    title: "Inca Trail permits: limited, licensed operators only",
    body: "Permits for the Classic and Short Inca Trail are limited per day (including porters and guides) and can only be bought through licensed tour operators. They're named and can't be transferred.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.ministry, officialSources.sernanp],
  },
  {
    id: "february-closure",
    title: "The Inca Trail closes in February",
    body: "The Classic Inca Trail closes every February for maintenance. Machu Picchu itself stays open, as do the train and Salkantay routes.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.ministry],
  },
  {
    id: "passports",
    title: "Bring the passport you booked with",
    body: "You'll need the same passport (or ID for Peruvians and residents) that's on your ticket at the entrance. Children need their own tickets.",
    verifiedAsOf: "2026-09-01",
    sources: [officialSources.tickets],
  },
];

export interface MPRoute {
  id: MPRouteId;
  name: string;
  days: string;
  maxAltitudeM: number;
  fitness: string;
  permit: string;
  /** Months ahead to secure tickets/permits: [low season, peak season] */
  bookAheadMonths: [number, number];
  closedMonths: Month[];
  summary: string;
  pros: string[];
  cons: string[];
}

export const mpRoutes: MPRoute[] = [
  {
    id: "train",
    name: "By train",
    days: "Day trip or 1 night",
    maxAltitudeM: 2900,
    fitness: "Easy. There are many uneven steps inside the site.",
    permit: "Entry ticket only",
    bookAheadMonths: [1, 4],
    closedMonths: [],
    summary: "A scenic train from Ollantaytambo or Cusco (Poroy) down the gorge to Aguas Calientes, then a 25-minute bus up to the citadel.",
    pros: ["Suits almost everyone", "Flexible dates", "Panoramic carriages available"],
    cons: ["Busier arrival", "Train seats sell out in peak season too"],
  },
  {
    id: "classic-inca-trail",
    name: "The Classic Inca Trail",
    days: "4 days, 3 nights camping",
    maxAltitudeM: 4215,
    fitness: "Challenging. Long days and thousands of stone steps.",
    permit: "Inca Trail permit, through a licensed operator",
    bookAheadMonths: [3, 6],
    closedMonths: ["Feb"],
    summary: "Original Inca paths from Km 82, over Dead Woman's Pass, past cloud-forest ruins, arriving at the Sun Gate.",
    pros: ["Arrive on foot through the Sun Gate", "Inca sites only reachable on the trail", "Porters carry the camp"],
    cons: ["Permits sell out months ahead", "Closed in February", "Permits can't be changed"],
  },
  {
    id: "short-inca-trail",
    name: "The Short Inca Trail",
    days: "1 day (often with a night in Aguas Calientes)",
    maxAltitudeM: 2750,
    fitness: "Moderate. A full day of walking with steep sections.",
    permit: "Inca Trail permit, through a licensed operator",
    bookAheadMonths: [2, 4],
    closedMonths: ["Feb"],
    summary: "Start at Km 104, climb to Wiñay Wayna and reach the Sun Gate in the afternoon.",
    pros: ["The Sun Gate arrival without camping", "Good for families with older children"],
    cons: ["Permits still limited", "Closed in February"],
  },
  {
    id: "salkantay",
    name: "The Salkantay trek",
    days: "4–5 days, camps or lodges",
    maxAltitudeM: 4600,
    fitness: "Challenging. A very high pass and a long descent.",
    permit: "No Inca Trail permit needed; Machu Picchu entry ticket required",
    bookAheadMonths: [2, 4],
    closedMonths: [],
    summary: "A wilder route past Humantay Lake and over the Salkantay Pass, down into coffee country to Aguas Calientes.",
    pros: ["No Inca Trail permit", "Glaciers to cloud forest in two days", "Lodge options"],
    cons: ["Higher than the Inca Trail", "Wet-season mud"],
  },
];

/** Peak months for Machu Picchu demand (verify) */
export const mpPeakMonths: Month[] = ["May", "Jun", "Jul", "Aug", "Sep"];

export const mpRulesNote =
  "Rules change often, sometimes at short notice. We'll confirm the latest rules, ticket types and circuits when you book.";
