import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { zones } from "@/data/zones";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { journeys } from "@/data/journeys";
import { stays } from "@/data/stays";
import { getStories } from "@/lib/stories";
import { locales, localizePath } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/", "/destinations", "/experiences", "/journeys", "/accommodation", "/altitude", "/machu-picchu", "/peru-by-altitude",
    "/travel-that-gives-back", "/about", "/about/our-process", "/stories", "/contact",
    "/start-planning", "/faq", "/legal/privacy", "/legal/booking-terms", "/legal/cookies",
    ...zones.map((z) => `/destinations/${z.id}`),
    ...destinations.map((d) => `/destinations/${d.zone}/${d.slug}`),
    ...experiences.map((e) => `/experiences/${e.slug}`),
    ...journeys.map((j) => `/journeys/${j.slug}`),
    ...stays.map((s) => `/accommodation/${s.slug}`),
    ...getStories().map((s) => `/stories/${s.slug}`),
  ];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}${localizePath(p, l)}`,
      lastModified: now,
      changeFrequency: p.startsWith("/journeys") || p === "/machu-picchu" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "/" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6,
      alternates: { languages: { ...Object.fromEntries(locales.map((x) => [x, `${site.url}${localizePath(p, x)}`])), "x-default": `${site.url}${p}` } },
    })),
  );
}
