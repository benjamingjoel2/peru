"use client";

import { pricing } from "@/config/pricing";
import { Price } from "@/components/ui/Price";

export function BudgetPoints() {
  return (
    <ul className="space-y-3">
      <li className="flex gap-3">
        <span aria-hidden className="mt-1.5 h-3 w-3 shrink-0 rotate-12 bg-cochineal" />
        <span>
          From <strong className="text-indigo"><Price usd={pricing.fromPerDayUSD} /></strong> per person per day,
          excluding {pricing.excludes}.
        </span>
      </li>
      <li className="flex gap-3">
        <span aria-hidden className="mt-1.5 h-3 w-3 shrink-0 -rotate-6 bg-mustard" />
        <span>A dedicated Peru Specialist plans every detail with you: altitude, trains, tickets and permits.</span>
      </li>
      <li className="flex gap-3">
        <span aria-hidden className="mt-1.5 h-3 w-3 shrink-0 rotate-3 bg-amazon" />
        <span>Private guides and drivers, and a local team on call while you travel.</span>
      </li>
    </ul>
  );
}
