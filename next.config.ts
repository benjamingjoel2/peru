import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./lib/imageWidths.mjs";

const nextConfig: NextConfig = {
  images: {
    // Photos are pre-built at these widths (scripts/build-images.mjs) and served as static files
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    deviceSizes,
    imageSizes,
  },
  async redirects() {
    const gone = [
      { source: "/about/our-team", destination: "/about" },
      { source: "/about/testimonials", destination: "/about" },
      { source: "/credits", destination: "/" },
      { source: "/legal/terms", destination: "/legal/booking-terms" },
    ];
    return [
      // English lives at the root: /en/... is the same page
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      ...gone.map((r) => ({ ...r, permanent: true })),
      ...gone.map((r) => ({ source: `/:locale(fr|de|es)${r.source}`, destination: `/:locale${r.destination === "/" ? "" : r.destination}`, permanent: true })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // Unprefixed URLs are the English pages (app/[locale] with locale "en")
      afterFiles: [
        { source: "/", destination: "/en" },
        { source: "/:path((?!fr(?:/|$)|de(?:/|$)|es(?:/|$)|en(?:/|$)|api/|_next/).+)", destination: "/en/:path" },
      ],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/img/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
      {
        source: "/photos/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
};

export default nextConfig;
