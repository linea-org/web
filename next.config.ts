import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://docs.getlinea.app",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
