import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { zones } from "@/data/zones";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { journeys } from "@/data/journeys";
import { stays } from "@/data/stays";
import { getStories } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/", "/destinations", "/experiences", "/journeys", "/accommodation", "/altitude", "/machu-picchu", "/peru-by-altitude",
    "/travel-that-gives-back", "/about", "/about/our-process", "/about/our-team", "/about/testimonials", "/stories", "/contact",
    "/start-planning", "/faq", "/credits",
    ...zones.map((z) => `/destinations/${z.id}`),
    ...destinations.map((d) => `/destinations/${d.zone}/${d.slug}`),
    ...experiences.map((e) => `/experiences/${e.slug}`),
    ...journeys.map((j) => `/journeys/${j.slug}`),
    ...stays.map((s) => `/accommodation/${s.slug}`),
    ...getStories().map((s) => `/stories/${s.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p.startsWith("/journeys") || p === "/machu-picchu" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
