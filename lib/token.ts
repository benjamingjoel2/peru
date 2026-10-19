import { createHmac, timingSafeEqual } from "node:crypto";

// Signs itinerary download links so the PDF is only served after the lead form.
// Set ITINERARY_TOKEN_SECRET in production.
const secret = () => process.env.ITINERARY_TOKEN_SECRET ?? "dev-only-secret-change-me";

const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export function signDownload(slug: string, now = Date.now()) {
  const exp = now + TTL_MS;
  const sig = createHmac("sha256", secret()).update(`${slug}.${exp}`).digest("base64url");
  return `${exp}.${sig}`;
}

export function verifyDownload(slug: string, token: string | null, now = Date.now()) {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || exp < now) return false;
  const expected = createHmac("sha256", secret()).update(`${slug}.${exp}`).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
