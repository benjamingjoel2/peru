import Link from "@/components/i18n/Link";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { StoneDivider } from "@/components/ui/Stone";
import { Newsletter } from "./Newsletter";
import { t, L } from "@/lib/i18n";

const columns = L([
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Experiences", href: "/experiences" },
      { label: "Journeys", href: "/journeys" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Stories", href: "/stories" },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Altitude, explained", href: "/altitude" },
      { label: "Machu Picchu planner", href: "/machu-picchu" },
      { label: "Peru by altitude", href: "/peru-by-altitude" },
      { label: "Questions travellers ask", href: "/faq" },
      { label: "Start planning", href: "/start-planning" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our process", href: "/about/our-process" },
      { label: "Travel that gives back", href: "/travel-that-gives-back" },
      { label: "Contact", href: "/contact" },
    ],
  },
]);

export function Footer() {
  const c = site.contact;
  return (
    <footer className="on-dark relative bg-indigo-deep text-cream/85">
      <StoneDivider color="var(--color-indigo-deep)" className="absolute -top-6 left-0 sm:-top-10" />
      <div className="container-x grid gap-14 pb-12 pt-20 lg:grid-cols-[1.2fr_2fr]">
        <Newsletter />
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow mb-4 text-mustard">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-mustard">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="sm:col-span-3 flex flex-wrap items-end justify-between gap-6 border-t border-cream/15 pt-8">
            <div>
              <Logo light />
              <ul className="mt-4 space-y-1 text-sm">
                <li><a href={`mailto:${c.email}`} className="hover:text-mustard">{c.email}</a></li>
                <li>{t(c.hours)} ({t(c.timezoneLabel)})</li>
                <li>{t(site.address.full)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-x border-t border-cream/15 py-6 text-xs leading-relaxed text-cream/65">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {site.name}. {t("All rights reserved.")}</p>
          <ul className="flex gap-4">
            <li><Link href="/legal/privacy" className="hover:text-mustard">{t("Privacy policy")}</Link></li>
            <li><Link href="/legal/booking-terms" className="hover:text-mustard">{t("Booking terms")}</Link></li>
            <li><Link href="/legal/cookies" className="hover:text-mustard">{t("Cookie policy")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="woven-stripe" aria-hidden />
    </footer>
  );
}
