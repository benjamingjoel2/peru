import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SVG placeholders are served as-is (next/image skips optimisation for .svg).
    // Real photography (jpg/png/webp) is optimised to AVIF/WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
