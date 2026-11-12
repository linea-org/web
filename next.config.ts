import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [70, 75],
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://docs.getlinea.app",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
