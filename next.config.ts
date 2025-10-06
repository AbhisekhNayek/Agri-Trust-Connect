import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: "export",

  // Base path if deploying to a subfolder (optional)
  // basePath: "/my-app",

  // Image optimization is disabled for static export
  images: {
    unoptimized: true,
  },

  // Enable React strict mode (optional but recommended)
  reactStrictMode: true,

  // Other options
  swcMinify: true, // use SWC compiler for faster builds
};

export default nextConfig;
