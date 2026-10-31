// Brand settings.

// Brand sites live on subdomains of tourground.com (DNS on Vercel)
const domain = "discoverperutravel.tourground.com";

export const site = {
  name: "Discover Peru Travel",
  shortName: "Discover Peru",
  promise: "Peru, done right.",
  domain,
  // Canonical URL: the brand domain on Vercel, localhost in development (override with NEXT_PUBLIC_SITE_URL)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL ? `https://${domain}` : "http://localhost:3000"),
  description:
    "Private, well-paced Peru journeys planned around altitude, distance and permits. Machu Picchu, the Andes, the Amazon and the coast, done right.",
  contact: {
    email: "discoverperutravel@tourground.com",
    hours: "Mon–Fri, 09:00–18:00",
    timezone: "America/Lima",
    timezoneLabel: "Lima time",
  },
  /** Business address: WeWork Basadre, a premium coworking space in San Isidro, Lima's business district. */
  address: {
    venue: "WeWork Basadre",
    street: "Av. Jorge Basadre 349",
    locality: "San Isidro",
    city: "Lima",
    postalCode: "15073",
    country: "Peru",
    countryCode: "PE",
    full: "WeWork Basadre, Av. Jorge Basadre 349, San Isidro, Lima 15073, Peru",
  },
} as const;

export type Site = typeof site;
