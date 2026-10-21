"use client";

import { useId, useState } from "react";

export type AccordionItem = { id: string; title: React.ReactNode; content: React.ReactNode };

export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const base = useId();

  return (
    <div className="divide-y divide-stone-light border-y border-stone-light">
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <div key={item.id} id={item.id}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-light text-indigo sm:text-xl"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-indigo text-indigo transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={btnId} className="fade-down">
                <div className="pb-6 pr-12 text-stone-dark">{item.content}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
