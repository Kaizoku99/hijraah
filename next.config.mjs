import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Initialize bundle analyzer
const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Initialize next-intl
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['pdf-parse'],
  experimental: {
    optimizeCss: true, // Enable CSS optimization for production
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'lodash',
    ],
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

    // Add optimization for production
    if (!dev && !isServer) {
      // Enable tree shaking 
      config.optimization.usedExports = true;
      
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
            priority: 40,
            chunks: 'all',
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
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
  // Optimize output for production
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
};

// Apply plugins
export default withBundleAnalyzerConfig(withNextIntl(nextConfig));

