import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
      },
      {
        protocol: "https",
        hostname: "store.metmuseum.org",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
