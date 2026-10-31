/**
 * Data keys whose string values are identifiers, paths or codes, never visible copy.
 * Translation skips them (and everything beneath them).
 */
export const SKIP_KEYS = new Set([
  "slug", "id", "src", "href", "url", "image", "zone", "zones", "group", "destination", "destinations",
  "journey", "journeys", "experience", "experiences", "stay", "sleepAt", "bestMonths", "tags", "eat", "where",
  "kind", "band", "effort", "hikingLevel", "category", "tip", "transport", "route", "style", "flag", "code",
  "locale", "symbol", "color", "icon", "related", "file", "poster", "filmSrc", "filmPoster", "timezone",
  "domain", "email", "countryCode", "postalCode", "photographer", "page", "date", "verifiedAsOf",
  "officialUrl", "officialUrls", "imageSrc", "video",
]);
/** Keys under "image" that are copy (alt text) still get translated. */
export const COPY_UNDER_SKIP = new Set(["alt", "imageAlt"]);
