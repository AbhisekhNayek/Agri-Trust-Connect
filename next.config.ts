/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ good for Render or Node hosting
  reactStrictMode: true,
  images: {
    unoptimized: true, // optional; helps avoid build issues during SSR deploy
  },
};

export default nextConfig;
