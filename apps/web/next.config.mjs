import {withSentryConfig} from '@sentry/nextjs';
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

// Initialize next-intl with skipDetection for specific paths
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts', {
  // Skip localization detection for static files and Next.js internals
  // This prevents them from being prefixed with the locale
  skipExtensions: [
    'jpg', 'jpeg', 'png', 'svg', 'gif', 'ico', 'webp',   // Images
    'js', 'css', 'scss', 'sass', 'less',                 // Stylesheets and scripts
    'woff', 'woff2', 'ttf', 'otf', 'eot',                // Fonts
    'mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac',          // Media
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'   // Documents
  ],
  // Skip detection for these path patterns
  skipPaths: [
    '/_next',          // Next.js internal paths
    '/api/',           // API routes
    '/favicon.ico',    // Favicon
    '/robots.txt',     // Robots.txt
    '/sitemap',        // Sitemaps
    '/manifest.json',  // Web manifest
  ],
});

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
  // Use the recommended config.turbopack structure instead of experimental.turbo
  turbopack: {
    resolveAlias: {
      '@': resolve(__dirname, './src'),
      '@/app': resolve(__dirname, './src/app'),
      '@/core': resolve(__dirname, './src/_core'),
      '@/infrastructure': resolve(__dirname, './src/_infrastructure'),
      '@/shared': resolve(__dirname, './src/_shared'),
      '@/ui': resolve(__dirname, './src/components/ui'),
      '@/atoms': resolve(__dirname, './src/components/ui'),
      '@/molecules': resolve(__dirname, './src/components/ui'),
      '@/organisms': resolve(__dirname, './src/components/ui'),
      '@/templates': resolve(__dirname, './src/components/ui'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/utils': resolve(__dirname, './src/lib/utils'),
      '@/api': resolve(__dirname, './src/_infrastructure/api'),
      '@/auth': resolve(__dirname, './src/_core/auth'),
      '@/chat': resolve(__dirname, './src/_core/chat'),
      '@/documents': resolve(__dirname, './src/_core/documents'),
      '@/immigration': resolve(__dirname, './src/_core/immigration'),
      '@/presentation': resolve(__dirname, './src/presentation'),
    }
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
              // Skip processing if module or context is invalid
              if (!module || typeof module.context !== 'string') {
                return 'npm.unknown';
              }
              
              // Only try to extract package names for node_modules
              if (module.context.includes('node_modules')) {
                const matchResult = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                );
                
                if (matchResult && matchResult[1]) { 
                  const packageName = matchResult[1];
                  const sanitizedName = packageName.replace(/[^a-zA-Z0-9_.-]/g, ''); 
                  return `npm.${sanitizedName.replace('@', '')}`;
                }
              }
              
              // For project files and other non-node_modules, use a simple naming strategy
              // Get the last part of the path to use as an identifier
              const pathParts = module.context.split(/[\\/]/);
              const lastMeaningfulPart = pathParts.filter(Boolean).slice(-2)[0] || 'app';
              return `app.${lastMeaningfulPart}`;
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
  // output: 'standalone', // Temporarily comment out for testing
  poweredByHeader: false,
  compress: true,
};

// Apply plugins
export default withSentryConfig(withBundleAnalyzerConfig(withNextIntl(nextConfig)), {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "hijraah-5e",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});