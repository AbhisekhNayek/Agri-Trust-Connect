/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ good for Render or Node hosting
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 🚀 Skip lint errors in production build
  },
  images: {
    unoptimized: true, // optional; helps avoid build issues during SSR deploy
  },
};

export default nextConfig;
