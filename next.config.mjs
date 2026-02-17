/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    qualities: [50, 75, 85, 90, 100],
  },
};

export default nextConfig;
