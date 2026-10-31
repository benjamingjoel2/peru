import { createElement } from "react";
import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Faq, Journey } from "@/data/types";
import { plain } from "@/components/ui/Heading";
import { currentLocale, localizePath, locales, ogLocale, t } from "@/lib/i18n";
import "@/lib/i18n/server";

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const locale = currentLocale();
  return {
    title,
    description,
    alternates: {
      canonical: localizePath(path, locale),
      languages: { ...Object.fromEntries(locales.map((l) => [l, localizePath(path, l)])), "x-default": path },
    },
    openGraph: {
      title,
      description,
      url: localizePath(path, locale),
      locale: ogLocale[locale],
      // SVG placeholders are not valid social images, so fall back to the generated site image
      images: [image && !image.endsWith(".svg") ? { url: image } : { url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
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
  slogan: t(site.promise),
  description: t(site.description),
  email: site.contact.email,
  areaServed: { "@type": "Country", name: "Peru" },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.venue}, ${site.address.street}`,
    addressLocality: `${site.address.locality}, ${site.address.city}`,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
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
  name: t("{n} days: {title}", { n: j.days, title: plain(j.title) }),
  description: j.summary,
  url: `${site.url}${localizePath(`/journeys/${j.slug}`, currentLocale())}`,
  inLanguage: currentLocale(),
  touristType: j.tags,
  provider: { "@type": "TravelAgency", name: site.name, url: site.url },
  offers: { "@type": "Offer", priceCurrency: "USD", price: j.fromPriceUSD, description: t("From price per person") },
  itinerary: {
    "@type": "ItemList",
    itemListElement: j.itinerary.map((d) => ({ "@type": "ListItem", position: d.day, name: `${t("Day {n}", { n: d.day })}: ${d.title}`, description: d.summary })),
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${localizePath(it.path, currentLocale())}` })),
});
