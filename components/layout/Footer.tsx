import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { StoneDivider } from "@/components/ui/Stone";

const columns = [
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
      { label: "Our team", href: "/about/our-team" },
      { label: "Testimonials", href: "/about/testimonials" },
      { label: "Travel that gives back", href: "/travel-that-gives-back" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const c = site.contact;
  return (
    <footer className="on-dark relative bg-indigo-deep text-cream/85">
      <StoneDivider color="var(--color-indigo-deep)" className="absolute -top-6 left-0 sm:-top-10" />
      <div className="container-x grid gap-12 pb-10 pt-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm">Private, well-paced journeys through Peru: planned around altitude, distance and permits. {site.promise}</p>
          <ul className="mt-6 space-y-1.5 text-sm">
            <li><a href={c.phoneHref} className="hover:text-mustard">{c.phone}</a></li>
            <li><a href={`mailto:${c.email}`} className="hover:text-mustard">{c.email}</a></li>
            <li><a href={c.whatsappHref} className="hover:text-mustard" target="_blank" rel="noopener">WhatsApp {c.whatsapp}</a></li>
            <li>{c.hours} ({c.timezoneLabel})</li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="inline-block rounded-full border border-cream/30 px-3 py-1 text-xs font-semibold hover:border-mustard hover:text-mustard">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
      </div>
      <div className="container-x border-t border-cream/15 py-6 text-xs leading-relaxed text-cream/65">
        <p>{site.company.legalName} · {site.company.address}</p>
        <p>{site.company.tourismRegistration} · {site.company.incaTrailPartner}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex gap-4">
            <li><Link href="/legal/privacy" className="hover:text-mustard">Privacy policy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-mustard">Terms &amp; booking conditions</Link></li>
            <li><Link href="/legal/cookies" className="hover:text-mustard">Cookies</Link></li>
            <li><Link href="/credits" className="hover:text-mustard">Photo credits</Link></li>
          </ul>
        </div>
      </div>
      <div className="woven-stripe" aria-hidden />
    </footer>
  );
}
