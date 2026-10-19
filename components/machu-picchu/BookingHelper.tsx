"use client";

import { useId, useMemo, useState } from "react";
import { MONTHS, type Month, type MPRouteId } from "@/data/types";
import { monthNames, seasonByMonth } from "@/data/seasons";
import { mpRoutes, mpRulesNote } from "@/config/machuPicchu";
import { bookingAdvice } from "@/lib/booking";

const statusStyles = {
  closed: "border-cochineal bg-cochineal/10",
  urgent: "border-cochineal bg-cochineal/5",
  soon: "border-mustard bg-mustard/15",
  comfortable: "border-amazon bg-amazon/10",
};

export function BookingHelper({ dark = false }: { dark?: boolean }) {
  const id = useId();
  const now = new Date();
  const nextMonth = MONTHS[(now.getMonth() + 4) % 12];
  const [month, setMonth] = useState<Month>(nextMonth);
  const [year, setYear] = useState(now.getMonth() + 4 >= 12 ? now.getFullYear() + 1 : now.getFullYear());
  const [route, setRoute] = useState<MPRouteId>("classic-inca-trail");
  const advice = useMemo(() => bookingAdvice(route, month, year), [route, month, year]);

  const label = `mb-1 block text-sm font-bold ${dark ? "text-cream/85" : "text-stone-dark"}`;
  const input = "min-h-11 w-full rounded-[3px] border-2 border-stone-light bg-cream px-3 text-ink";

  return (
    <div className={`rounded-sm p-5 sm:p-6 ${dark ? "bg-indigo-deep/60 ring-1 ring-cream/15" : "bg-cream ring-1 ring-stone-light"}`}>
      <h3 className={`font-display text-2xl ${dark ? "text-cream" : "text-indigo"}`}>
        How far ahead should I <em className={dark ? "text-mustard" : "text-cochineal"}>book</em>?
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor={`${id}-m`} className={label}>Travel month</label>
          <select id={`${id}-m`} className={input} value={month} onChange={(e) => setMonth(e.target.value as Month)}>
            {MONTHS.map((m) => <option key={m} value={m}>{monthNames[m]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-y`} className={label}>Year</label>
          <select id={`${id}-y`} className={input} value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[0, 1, 2].map((d) => <option key={d}>{now.getFullYear() + d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-r`} className={label}>Route</label>
          <select id={`${id}-r`} className={input} value={route} onChange={(e) => setRoute(e.target.value as MPRouteId)}>
            {mpRoutes.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      </div>
      <div aria-live="polite" className={`mt-4 rounded-sm border-l-4 p-4 text-ink ${statusStyles[advice.status]} ${dark ? "bg-cream!" : ""}`}>
        <p className="font-display text-xl font-semibold text-indigo">{advice.headline}</p>
        <p className="mt-1 text-sm text-stone-dark">{advice.detail}</p>
        <p className="mt-2 text-xs text-stone-dark">
          {monthNames[month]} in the Andes: {seasonByMonth[month].note} (verify)
        </p>
      </div>
      <p className={`mt-3 text-xs ${dark ? "text-cream/75" : "text-stone-dark"}`}>
        <strong>Rules change, we&apos;ll confirm the latest.</strong> {mpRulesNote} This is general guidance only.
      </p>
    </div>
  );
}
