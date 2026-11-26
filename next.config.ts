import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [70, 75],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "getlinea.app" }],
        destination: "https://www.getlinea.app/:path*",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "https://docs.getlinea.app",
        permanent: true,
      },
      {
        source: "/getting-started",
        destination: "https://docs.getlinea.app/docs/getting-started",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
