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
  async headers() {
    return [
      {
        source: "/img/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
};

export default nextConfig;
