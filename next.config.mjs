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
      {
        protocol: "https",
        hostname: "**.cjdropshipping.com", // CJ ke saare subdomains allow karega
      },
      {
        protocol: "https",
        hostname: "**.alicdn.com", // 1688 aur Alibaba ke images ke liye
      },
      {
        protocol: "https",
        hostname: "**.alicdn.com",
      }
    ],
  },
};

export default nextConfig;
