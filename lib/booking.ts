import { MONTHS, type Month, type MPRouteId } from "@/data/types";
import { mpPeakMonths, mpRoutes } from "@/config/machuPicchu";
import { monthNames } from "@/data/seasons";

export interface BookingAdvice {
  status: "closed" | "urgent" | "soon" | "comfortable";
  headline: string;
  detail: string;
  secureBy?: { month: Month; year: number };
  monthsAhead: number;
}

/** Suggests when to secure Machu Picchu tickets / Inca Trail permits for a travel month. Guidance only. */
export function bookingAdvice(route: MPRouteId, month: Month, year: number, today = new Date()): BookingAdvice {
  const r = mpRoutes.find((x) => x.id === route)!;
  const peak = mpPeakMonths.includes(month);
  const monthsAhead = peak ? r.bookAheadMonths[1] : r.bookAheadMonths[0];

  if (r.closedMonths.includes(month)) {
    return {
      status: "closed",
      monthsAhead,
      headline: `${r.name} is closed in ${monthNames[month]}.`,
      detail: "The Inca Trail closes every February for maintenance. Machu Picchu itself stays open: consider the train or the Salkantay trek, or choose another month.",
    };
  }

  const travelIdx = year * 12 + MONTHS.indexOf(month);
  const secureIdx = travelIdx - monthsAhead;
  const nowIdx = today.getFullYear() * 12 + today.getMonth();
  const secureBy = { month: MONTHS[((secureIdx % 12) + 12) % 12], year: Math.floor(secureIdx / 12) };
  const label = `${monthNames[secureBy.month]} ${secureBy.year}`;
  const kind = peak ? "peak season" : "a quieter month";

  if (travelIdx < nowIdx) {
    return { status: "urgent", monthsAhead, headline: "That month has already passed.", detail: "Choose a future month to see when to book." };
  }
  if (secureIdx <= nowIdx) {
    return {
      status: "urgent",
      monthsAhead,
      secureBy,
      headline: "Book as soon as you can.",
      detail: `For ${kind}, we'd normally secure ${route === "classic-inca-trail" || route === "short-inca-trail" ? "permits" : "tickets"} about ${monthsAhead} month${monthsAhead === 1 ? "" : "s"} ahead. Availability may already be limited, so let us check today.`,
    };
  }
  const gap = secureIdx - nowIdx;
  return {
    status: gap <= 2 ? "soon" : "comfortable",
    monthsAhead,
    secureBy,
    headline: `Aim to secure them by ${label}.`,
    detail: `${monthNames[month]} is ${kind}. For ${r.name.toLowerCase()}, we suggest booking about ${monthsAhead} month${monthsAhead === 1 ? "" : "s"} ahead${r.permit.includes("permit") && !r.permit.startsWith("No") ? ". Permits are limited and sold only through licensed operators" : ""}.`,
  };
}
