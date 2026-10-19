import { createElement } from "react";
import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Faq, Journey } from "@/data/types";
import { plain } from "@/components/ui/Heading";

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, ...(image ? { images: [{ url: image }] } : {}) },
  };
}

export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  slogan: site.promise,
  email: site.contact.email,
  telephone: site.contact.phone,
  areaServed: { "@type": "Country", name: "Peru" },
  address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
  openingHours: "Mo-Fr 09:00-18:00",
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
});

export const tripLd = (j: Journey) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: `${j.days} days: ${plain(j.title)}`,
  description: j.summary,
  url: `${site.url}/journeys/${j.slug}`,
  touristType: j.tags,
  provider: { "@type": "TravelAgency", name: site.name, url: site.url },
  offers: { "@type": "Offer", priceCurrency: "USD", price: j.fromPriceUSD, description: "From price per person (placeholder)" },
  itinerary: {
    "@type": "ItemList",
    itemListElement: j.itinerary.map((d) => ({ "@type": "ListItem", position: d.day, name: `Day ${d.day}: ${d.title}`, description: d.summary })),
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});
