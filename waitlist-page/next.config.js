/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    qualities: [75, 90, 100],
    formats: ['image/webp', 'image/avif'],
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}

module.exports = nextConfig