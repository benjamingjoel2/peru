import { allWidths } from "./imageWidths.mjs";

/**
 * next/image loader for pre-built photos. /photos/name.jpg maps to the static /img/name-<width>.webp
 * made at build time, so images come straight from the CDN with no on-demand resizing.
 * Anything else (SVG placeholders) is served as-is.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = /^\/photos\/([\w-]+)\.jpg$/.exec(src);
  if (!m) return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  const w = allWidths.find((x) => x >= width) ?? allWidths[allWidths.length - 1];
  return `/img/${m[1]}-${w}.webp`;
}
