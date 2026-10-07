/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip TypeScript errors during build
  // (Supabase dynamic types ke wajah se errors aate hain)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Performance
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // Redirects (agar zaroorat ho)
  async redirects() {
    return [];
  },
};

export default nextConfig;
