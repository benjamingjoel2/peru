// Brand settings. Everything marked PLACEHOLDER must be replaced before launch.
export const site = {
  name: "Discover Peru Travel",
  shortName: "Discover Peru",
  promise: "Peru, done right.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://discoverperutravel.example",
  description:
    "Private, well-paced Peru journeys planned around altitude, distance and permits. Machu Picchu, the Andes, the Amazon and the coast, done right.",
  contact: {
    phone: "+51 1 000 0000", // PLACEHOLDER
    phoneHref: "tel:+5110000000",
    whatsapp: "+51 900 000 000", // PLACEHOLDER
    whatsappHref: "https://wa.me/51900000000",
    email: "hello@discoverperutravel.example", // PLACEHOLDER
    hours: "Mon–Fri, 09:00–18:00",
    timezone: "America/Lima",
    timezoneLabel: "Lima time",
  },
  company: {
    legalName: "[Company legal name S.A.C.] (placeholder)",
    address: "[Street address], Miraflores, Lima, Peru (placeholder)",
    tourismRegistration: "MINCETUR tourism registration no. [00000] (placeholder)",
    incaTrailPartner: "Licensed Inca Trail operator partner: [Operator name], licence [0000] (placeholder)",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
} as const;

export type Site = typeof site;
