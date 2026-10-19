"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mainNav, type NavGroup, type NavItem } from "@/lib/nav";
import { site } from "@/config/site";

type Level = { title: string; item?: NavItem; group?: NavGroup };

/** Mobile menu: a stack of levels with Back buttons, inside a native modal dialog. */
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [stack, setStack] = useState<Level[]>([{ title: "Menu" }]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setStack([{ title: "Menu" }]);
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("[data-level-heading]")?.focus();
  }, [stack]);

  const level = stack[stack.length - 1];
  const push = (l: Level) => setStack((s) => [...s, l]);
  const back = () => setStack((s) => s.slice(0, -1));

  const row = "flex w-full items-center justify-between border-b border-stone-light py-4 text-left font-display text-xl text-indigo";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label="Menu"
      className="ml-auto mr-0 h-dvh max-h-dvh w-full max-w-md bg-cream p-0 text-ink backdrop:bg-indigo-deep/60"
    >
      <div className="woven-stripe" aria-hidden />
      <div className="flex items-center justify-between px-5 py-3">
        {stack.length > 1 ? (
          <button type="button" onClick={back} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-[0.14em] text-cochineal">
            <span aria-hidden>←</span> Back
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center text-3xl text-indigo" aria-label="Close menu">
          ×
        </button>
      </div>
      <div className="px-5 pb-10">
        <h2 tabIndex={-1} data-level-heading className="eyebrow mb-2 text-stone-dark outline-none">
          {level.title}
        </h2>

        {!level.item && !level.group && (
          <ul>
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.groups ? (
                  <button type="button" className={row} onClick={() => push({ title: item.label, item })}>
                    {item.label} <span aria-hidden className="text-cochineal">→</span>
                  </button>
                ) : (
                  <Link href={item.href} className={row} onClick={onClose}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        {level.item && !level.group && (
          <ul>
            <li>
              <Link href={level.item.href} onClick={onClose} className={`${row} text-cochineal`}>
                All {level.item.label.toLowerCase()}
              </Link>
            </li>
            {level.item.groups!.map((g) =>
              level.item!.groups!.length === 1 ? (
                g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onClose} className={row}>
                      {l.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li key={g.label}>
                  <button type="button" className={row} onClick={() => push({ title: g.label, item: level.item, group: g })}>
                    {g.label} <span aria-hidden className="text-cochineal">→</span>
                  </button>
                </li>
              ),
            )}
          </ul>
        )}

        {level.group && (
          <ul>
            <li>
              <Link href={level.group.href} onClick={onClose} className={`${row} text-cochineal`}>
                Explore {level.group.label}
              </Link>
            </li>
            {level.group.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={onClose} className={row}>
                  <span>
                    {l.note && <span className="mr-2 text-xs font-bold uppercase text-stone">{l.note}</span>}
                    {l.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 space-y-2 text-sm text-stone-dark">
          <p>
            <a className="font-semibold text-indigo" href={site.contact.phoneHref}>{site.contact.phone}</a>
          </p>
          <p>
            <a className="font-semibold text-indigo" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
          <p>{site.contact.hours} ({site.contact.timezoneLabel})</p>
        </div>
      </div>
    </dialog>
  );
}
