import sources from "./photo-sources.json";
import type { ImageRef } from "./types";

// Free Unsplash License photos, downloaded to public/photos by scripts/fetch-photos.mjs.
// Credits are shown on /credits.
export interface PhotoSource {
  slot: string;
  alt: string;
  image: string;
  page: string;
  photographer: string;
}

export const photoSources = sources as PhotoSource[];

export function photo(slot: string): ImageRef {
  const s = photoSources.find((p) => p.slot === slot);
  if (!s) throw new Error(`Unknown photo slot: ${slot}`);
  return { src: `/photos/${slot}.jpg`, alt: s.alt };
}
