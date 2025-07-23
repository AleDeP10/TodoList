import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,        // tempo cache per pagine in ms
    pagesBufferLength: 5,            // max pagine da tenere pronte
  },
  eslint: {
    ignoreDuringBuilds: true,        // ignora errori in build
  },
};

export default nextConfig;