import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import createNextIntlPlugin from 'next-intl/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['pdf-parse'],
  experimental: {
    optimizeCss: false,
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
    optimizePackageImports: ['lucide-react'],
    instrumentationHook: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.CI !== 'true',
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src', 'app', 'config', 'scripts', '__tests__'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': resolve(__dirname, './src'),
        'punycode': resolve(__dirname, './node_modules/punycode/'),
      },
      extensionAlias: {
        '.js': ['.js', '.ts', '.tsx'],
        '.mjs': ['.mjs', '.mts'],
      },
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        'detect-libc': false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        os: require.resolve('os-browserify'),
        buffer: require.resolve('buffer/'),
      },
    };

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Handle critical dependency warnings
    config.module.exprContextCritical = false;

    // Ignore specific warnings
    config.ignoreWarnings = [
      { module: /@prisma\/instrumentation/ },
      { module: /@opentelemetry\/instrumentation/ },
      { module: /whatwg-node\/fetch/ },
      { message: /DEP0040/ },
    ];

    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  assetPrefix: '',
  distDir: '.next',
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/signup',
        permanent: true,
      },
    ];
  },
};

