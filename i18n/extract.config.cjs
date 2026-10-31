const { SKIP_KEYS } = require("../lib/i18n/skip.ts");
module.exports = {
  dataModules: [
    "data/destinations.ts", "data/experiences.ts", "data/journeys.ts", "data/stays.ts", "data/faqs.ts", "data/foods.ts",
    "data/zones.ts", "data/seasons.ts", "data/countries.ts", "data/givesBack.ts", "data/legal.ts",
    "config/machuPicchu.ts", "config/pricing.ts", "lib/altitude.ts", "lib/nav.ts",
  ],
  skipExports: ["ratesAsOf"],
  skipKeys: SKIP_KEYS,
  extra: (req) => {
    const { site } = req("../config/site.ts");
    const photos = req("../data/photo-sources.json");
    const styles = ["boutique", "lodge", "hacienda", "eco-lodge", "homestay", "hotel"];
    return [...styles, ...styles.map((x) => x[0].toUpperCase() + x.slice(1)), "Gentle", "Moderate", "Demanding", site.description, site.promise, site.contact.hours, site.contact.timezoneLabel, site.address.full, ...photos.map((p) => p.alt)];
  },
};
