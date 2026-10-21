"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import dynamic from "next/dynamic";

// The menu is only fetched and mounted the first time it opens
const SiteMenu = dynamic(() => import("./SiteMenu").then((m) => m.SiteMenu), { ssr: false });
import { useEnquire } from "@/components/enquire/EnquireProvider";

const leftLinks = [
  { label: "Journeys", href: "/journeys" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
];
const rightLinks = [
  { label: "Accommodation", href: "/accommodation" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/stories" },
];

/**
 * Centred logo with links split either side, an Enquire button and a Menu toggle that opens
 * the full-screen three-level menu. On the homepage it floats transparently over the hero.
 */
export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [menu, setMenu] = useState<{ open: boolean; initial?: string }>({ open: false });
  const [scrolled, setScrolled] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const { openEnquire } = useEnquire();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu on navigation
  useEffect(() => setMenu({ open: false }), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overlay && !scrolled;
  const linkCls = `relative py-2 text-[0.82rem] font-bold uppercase tracking-[0.16em] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 ${
    transparent ? "text-cream" : "text-indigo"
  }`;

  return (
    <header
      className={`${overlay ? "fixed inset-x-0 top-10" : "sticky top-0"} z-40 transition-[background-color,box-shadow,top] duration-300 ${
        transparent ? "bg-gradient-to-b from-indigo-deep/60 to-transparent" : "bg-cream/95 shadow-[0_6px_24px_-12px_rgba(24,28,66,.35)] backdrop-blur"
      } ${overlay && scrolled ? "!top-0" : ""}`}
    >
      <nav aria-label="Main" className={`container-x grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-4 xl:grid-cols-[1fr_auto_1fr] ${transparent ? "on-dark" : ""}`}>
        <ul className="hidden items-center gap-7 xl:flex">
          {leftLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="xl:justify-self-center">
          <Logo light={transparent} />
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-6">
          <ul className="hidden items-center gap-7 xl:flex">
            {rightLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openEnquire()}
            className="rounded-full bg-cochineal px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark sm:px-5"
          >
            Enquire
          </button>
          <button
            type="button"
            onClick={() => { setMenuLoaded(true); setMenu({ open: true }); }}
            aria-haspopup="dialog"
            aria-controls={menuLoaded ? "site-menu" : undefined}
            aria-expanded={menu.open}
            className={`flex h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] ${transparent ? "text-cream" : "text-indigo"}`}
          >
            <span className="hidden sm:inline">Menu</span>
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7h18M3 12h18M9 17h12" />
            </svg>
            <span className="sr-only sm:hidden">Open menu</span>
          </button>
        </div>
      </nav>
      {!transparent && <div className="woven-stripe-thin" aria-hidden />}
      {menuLoaded && <SiteMenu open={menu.open} initial={menu.initial} onClose={() => setMenu({ open: false })} />}
    </header>
  );
}
