"use client";

import Link from "@/components/i18n/Link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NavItem, NavLink } from "@/lib/nav";
import { t } from "@/lib/i18n";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { site } from "@/config/site";
import { Logo } from "./Logo";

/** A menu node: either a link, or a label with children (and an "explore all" href). */
type Node = { label: string; href: string; note?: string; children?: Node[] };

const toNode = (l: NavLink): Node => ({ label: l.label, href: l.href, note: l.note });

// Normalise the nav into up to three levels: section → group → link
const toTree = (nav: NavItem[]): Node[] =>
  nav.map((item) => {
    if (!item.groups) return { label: item.label, href: item.href };
    if (item.groups.length === 1) return { label: item.label, href: item.href, children: item.groups[0].links.map(toNode) };
    return { label: item.label, href: item.href, children: item.groups.map((g) => ({ label: g.label, href: g.href, children: g.links.map(toNode) })) };
  });

/**
 * Full-screen, three-level menu in a native modal dialog (focus trap + Esc for free).
 * Desktop: columns open on hover/focus. Mobile: one level at a time with Back.
 */
export function SiteMenu({ nav, open, onClose, initial }: { nav: NavItem[]; open: boolean; onClose: () => void; initial?: string }) {
  const tree = useMemo(() => toTree(nav), [nav]);
  const ref = useRef<HTMLDialogElement>(null);
  const [a1, setA1] = useState<number | null>(null);
  const [a2, setA2] = useState<number | null>(null);
  const [depth, setDepth] = useState(0); // mobile level

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      const i = initial ? tree.findIndex((n) => n.label === initial) : -1;
      setA1(i >= 0 ? i : null);
      setA2(null);
      setDepth(i >= 0 ? 1 : 0);
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
  }, [open, initial, tree]);

  const l1 = a1 !== null ? tree[a1] : null;
  const l2 = l1?.children && a2 !== null ? l1.children[a2] : null;

  const itemCls = (active: boolean) =>
    `group flex w-full items-center justify-between gap-4 py-2.5 text-left transition-colors ${active ? "text-cochineal" : "text-indigo hover:text-cochineal"}`;

  const col = (nodes: Node[], level: 1 | 2 | 3, active: number | null, onPick?: (i: number) => void) => (
    <ul className={level === 1 ? "space-y-1" : "space-y-0.5"}>
      {nodes.map((n, i) => (
        <li key={n.href + n.label}>
          {n.children && onPick ? (
            <button
              type="button"
              className={`${itemCls(active === i)} ${level === 1 ? "font-display text-3xl" : "font-display text-xl"}`}
              aria-expanded={active === i}
              onMouseEnter={() => onPick(i)}
              onFocus={() => onPick(i)}
              onClick={() => {
                onPick(i);
                setDepth(level);
              }}
            >
              {n.label}
              <span aria-hidden className="text-base text-cochineal transition-transform group-hover:translate-x-1">→</span>
            </button>
          ) : (
            <Link href={n.href} onClick={onClose} className={`${itemCls(false)} ${level === 1 ? "font-display text-3xl" : level === 2 ? "font-display text-xl" : "text-[1.05rem] font-light"}`}>
              <span>
                {n.note && <span className="mr-3 text-xs font-bold uppercase tracking-wider text-stone">{n.note}</span>}
                {n.label}
              </span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  const exploreAll = (n: Node) => (
    <Link href={n.href} onClick={onClose} className="eyebrow mb-4 inline-flex items-center gap-2 text-cochineal underline underline-offset-4">
      {t("All: {name}", { name: n.label })}
    </Link>
  );

  return (
    <dialog
      ref={ref}
      id="site-menu"
      aria-label={t("Menu")}
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-cream p-0 text-ink backdrop:bg-indigo-deep/70"
    >
      <div className="flex h-full">
        {/* Left panel: brand + contact */}
        <aside className="on-dark hidden w-[260px] shrink-0 flex-col justify-between bg-indigo-deep p-8 text-cream/85 lg:flex">
          <Logo light />
          <div className="space-y-2 text-sm">
            <p className="eyebrow text-mustard">{t("Talk to a Peru Specialist")}</p>
            <p><a href={`mailto:${site.contact.email}`} className="text-[0.8rem] [overflow-wrap:anywhere] hover:text-mustard">{site.contact.email}</a></p>
            <p>{t(site.contact.hours)}<br />({t(site.contact.timezoneLabel)})</p>
          </div>
          <div className="woven-stripe -mx-8 -mb-8" aria-hidden />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-stone-light px-5 py-4 lg:px-10">
            {depth > 0 ? (
              <button type="button" onClick={() => setDepth((d) => d - 1)} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-[0.14em] text-cochineal lg:hidden">
                <span aria-hidden>←</span> {t("Back")}
              </button>
            ) : (
              <span className="lg:hidden"><Logo /></span>
            )}
            <span className="eyebrow hidden text-stone-dark lg:block">{t("Explore Peru")}</span>
            <button type="button" onClick={onClose} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-[0.14em] text-indigo" aria-label={t("Close menu")}>
              {t("Close")} <span aria-hidden className="text-2xl leading-none">×</span>
            </button>
          </div>

          {/* Desktop: three columns */}
          <div className="hidden flex-1 grid-cols-[1.1fr_1fr_1fr] gap-10 overflow-y-auto px-10 py-12 lg:grid">
            <nav aria-label={t("Sections")}>
              {col(tree, 1, a1, (i) => { setA1(i); setA2(null); })}
            </nav>
            <div className="border-l border-stone-light pl-10">
              {l1?.children && (
                <>
                  {exploreAll(l1)}
                  {col(l1.children, 2, a2, (i) => setA2(i))}
                </>
              )}
            </div>
            <div className="border-l border-stone-light pl-10">
              {l2?.children && (
                <>
                  {exploreAll(l2)}
                  {col(l2.children, 3, null)}
                </>
              )}
            </div>
          </div>

          {/* Mobile: one level at a time */}
          <div className="flex-1 overflow-y-auto px-5 py-6 lg:hidden">
            {depth === 0 && col(tree, 1, null, (i) => { setA1(i); setA2(null); })}
            {depth === 1 && l1?.children && (
              <>
                {exploreAll(l1)}
                {col(l1.children, 2, null, (i) => setA2(i))}
              </>
            )}
            {depth === 2 && l2?.children && (
              <>
                {exploreAll(l2)}
                {col(l2.children, 3, null)}
              </>
            )}
            <LanguageSelector className="mt-10 text-sm font-semibold text-indigo lg:hidden" linkClassName="hover:text-cochineal" />
            <div className="mt-6 space-y-1 text-sm text-stone-dark">
              <p><a className="font-semibold text-indigo" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
              <p>{t(site.contact.hours)} ({t(site.contact.timezoneLabel)})</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
