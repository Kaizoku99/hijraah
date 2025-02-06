/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'hijraah.vercel.app'],
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  images: {
    domains: ['wlhnmeblyjbdjucwqqtv.supabase.co'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig 