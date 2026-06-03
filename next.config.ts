import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Serve modern, smaller image formats (AVIF first, then WebP) via next/image.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Gzip/brotli responses and drop the framework header.
  compress: true,
  poweredByHeader: false,

  // Strip console.* (except errors/warnings) from production bundles.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Long-cache immutable static assets.
  async headers() {
    return [
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|svg|ico|pdf|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
