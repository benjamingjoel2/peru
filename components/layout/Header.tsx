"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mainNav, type NavItem } from "@/lib/nav";
import { Logo } from "./Logo";
import { MobileDrawer } from "./MobileDrawer";
import { useEnquire } from "@/components/enquire/EnquireProvider";

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { openEnquire } = useEnquire();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close menus on navigation
  useEffect(() => { setOpen(null); setDrawer(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`);
        setOpen(null);
        btn?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  return (
    <header className={`sticky top-0 z-40 bg-cream/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_6px_24px_-12px_rgba(24,28,66,.35)]" : ""}`}>
      <nav ref={navRef} aria-label="Main" className="container-x relative flex h-[72px] items-center justify-between gap-6" onMouseLeave={hoverClose}>
        <Logo />
        <ul className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => (
            <li key={item.label} onMouseEnter={() => (item.groups ? hoverOpen(item.label) : setOpen(null))}>
              {item.groups ? (
                <button
                  type="button"
                  data-menu={item.label}
                  aria-expanded={open === item.label}
                  aria-controls={`menu-${item.label}`}
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                  className={`flex items-center gap-1 rounded-sm px-3 py-2 text-[0.95rem] font-semibold text-indigo hover:text-cochineal ${open === item.label ? "text-cochineal" : ""}`}
                >
                  {item.label}
                  <svg aria-hidden viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform ${open === item.label ? "rotate-180" : ""}`}>
                    <path d="M1 4l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="block rounded-sm px-3 py-2 text-[0.95rem] font-semibold text-indigo hover:text-cochineal aria-[current=page]:text-cochineal"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openEnquire()}
            className="rounded-[3px] bg-cochineal px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark sm:px-5"
          >
            Enquire
          </button>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="grid h-11 w-11 place-items-center rounded-sm text-indigo xl:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18M3 12h18M3 18h12" />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <MegaPanel key={open} item={mainNav.find((n) => n.label === open)!} onEnter={() => hoverOpen(open)} />
          )}
        </AnimatePresence>
      </nav>
      <div className="woven-stripe-thin" aria-hidden />
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  );
}

function MegaPanel({ item, onEnter }: { item: NavItem; onEnter: () => void }) {
  const reduce = useReducedMotion();
  const groups = item.groups ?? [];
  const isDestinations = item.label === "Destinations";
  const [active, setActive] = useState(0);

  return (
    <motion.div
      id={`menu-${item.label}`}
      onMouseEnter={onEnter}
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-4 top-full z-50 hidden overflow-hidden rounded-b-sm border-t-4 border-mustard bg-cream shadow-[0_24px_48px_-16px_rgba(24,28,66,.4)] md:inset-x-8 xl:block"
    >
      {isDestinations ? (
        <div className="grid grid-cols-[280px_1fr]">
          <ul className="bg-indigo py-6 on-dark">
            {groups.map((g, i) => (
              <li key={g.label}>
                <Link
                  href={g.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={`flex items-center justify-between px-7 py-3 font-display text-lg ${active === i ? "bg-indigo-deep text-mustard" : "text-cream hover:text-mustard"}`}
                >
                  {g.label}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
            <li className="mt-4 px-7">
              <Link href="/destinations" className="text-sm font-bold uppercase tracking-[0.12em] text-mustard-soft underline underline-offset-4">
                All destinations
              </Link>
            </li>
          </ul>
          <div className="p-8">
            <p className="eyebrow text-stone-dark">{groups[active].label}</p>
            <p className="mt-2 max-w-2xl text-stone-dark">{groups[active].intro}</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1">
              {groups[active].links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-1.5 font-semibold text-indigo hover:text-cochineal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={groups[active].href} className="mt-6 inline-block text-sm font-bold uppercase tracking-[0.12em] text-cochineal underline underline-offset-4">
              Explore {groups[active].label}
            </Link>
          </div>
        </div>
      ) : (
        <div className={`grid gap-10 p-8 ${groups.length >= 3 ? "grid-cols-3" : groups.length === 2 ? "grid-cols-[2fr_1fr]" : "grid-cols-1"}`}>
          {groups.map((g) => (
            <div key={g.label}>
              <Link href={g.href} className="eyebrow mb-3 block text-cochineal hover:underline">
                {g.label}
              </Link>
              <ul className={g.links.length > 6 ? "grid grid-cols-2 gap-x-8" : ""}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex items-baseline gap-2 py-1.5 font-semibold text-indigo hover:text-cochineal">
                      {l.note && <span className="w-14 shrink-0 text-xs font-bold uppercase tracking-wide text-stone">{l.note}</span>}
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
