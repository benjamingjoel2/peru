import { destinations } from "@/data/destinations";
import { experienceGroups, experiences } from "@/data/experiences";
import { journeys } from "@/data/journeys";
import { zones } from "@/data/zones";
import { plain } from "@/components/ui/Heading";
import { L } from "@/lib/i18n";

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { label: string; href: string; links: NavLink[]; intro?: string };
export type NavItem = { label: string; href: string; groups?: NavGroup[]; feature?: NavLink[] };

export const destinationHref = (zone: string, slug?: string) => (slug ? `/destinations/${zone}/${slug}` : `/destinations/${zone}`);

export const mainNav: NavItem[] = L([
  {
    label: "Journeys",
    href: "/journeys",
    groups: [
      {
        label: "Our journeys",
        href: "/journeys",
        links: journeys.map((j) => ({ label: plain(j.title), href: `/journeys/${j.slug}`, note: `${j.days} days` })),
      },
      {
        label: "Plan your own",
        href: "/start-planning",
        links: [
          { label: "Start planning", href: "/start-planning" },
          { label: "Build your altitude route", href: "/altitude#route-builder" },
          { label: "Machu Picchu planner", href: "/machu-picchu" },
          { label: "Browse all journeys", href: "/journeys" },
        ],
      },
    ],
  },
  {
    label: "Destinations",
    href: "/destinations",
    groups: zones.map((z) => ({
      label: z.name,
      href: destinationHref(z.id),
      intro: z.intro,
      links: destinations.filter((d) => d.zone === z.id).map((d) => ({ label: d.name, href: destinationHref(z.id, d.slug) })),
    })),
  },
  {
    label: "Experiences",
    href: "/experiences",
    groups: experienceGroups.map((g) => ({
      label: g.name,
      href: `/experiences#${g.id}`,
      links: experiences.filter((e) => e.group === g.id).map((e) => ({ label: e.name, href: `/experiences/${e.slug}` })),
    })),
  },
  {
    label: "Plan",
    href: "/altitude",
    groups: [
      {
        label: "Plan it right",
        href: "/altitude",
        links: [
          { label: "Altitude, explained", href: "/altitude" },
          { label: "Machu Picchu planner", href: "/machu-picchu" },
          { label: "Peru by altitude: a food map", href: "/peru-by-altitude" },
          { label: "Travel that gives back", href: "/travel-that-gives-back" },
          { label: "Questions travellers ask", href: "/faq" },
        ],
      },
    ],
  },
  { label: "Accommodation", href: "/accommodation" },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        label: "About us",
        href: "/about",
        links: [
          { label: "Why travel with us", href: "/about" },
          { label: "Our process", href: "/about/our-process" },
          { label: "Travel that gives back", href: "/travel-that-gives-back" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
  { label: "Stories", href: "/stories" },
]);
