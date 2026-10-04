/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/shop", destination: "/custom", permanent: true },
      { source: "/shop/:id", destination: "/custom", permanent: true },
      { source: "/signature-suit", destination: "/custom", permanent: true },
      { source: "/signature-suit/:path*", destination: "/custom", permanent: true },
    ];
  },
};

export default nextConfig;
