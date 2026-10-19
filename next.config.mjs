/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      // CJ Dropshipping ke images allow karne ke liye
      {
        protocol: "https",
        hostname: "cf.cjdropshipping.com",
      },
      {
        protocol: "https",
        hostname: "oss-cf.cjdropshipping.com",
      },
      {
        protocol: "https",
        hostname: "cbu01.alicdn.com", // 1688 ke images ke liye (future proofing)
      }
    ],
  },
};

export default nextConfig;
