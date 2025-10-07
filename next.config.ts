/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // ✅ required for static export
  images: {
    unoptimized: true,     // ✅ needed if using next/image
  },
  typescript: {
    ignoreBuildErrors: true, // optional if you want to skip type checks
  },
  eslint: {
    ignoreDuringBuilds: true, // optional to skip linting
  },
};

export default nextConfig;
