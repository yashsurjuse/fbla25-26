import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: '/api/gallery-image',
      },
    ],
  },
};

export default nextConfig;
