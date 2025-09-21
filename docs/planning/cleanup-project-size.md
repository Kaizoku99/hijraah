# Project Size Cleanup Guide

## Immediate Actions (Will reduce ~4-5GB):

### 1. Clean Next.js Cache
```bash
# Remove Next.js build cache
rm -rf apps/web/.next
# Or keep only essential files
rm -rf apps/web/.next/cache
```

### 2. Clean PNPM Store
```bash
# Clean unused packages from pnpm store
pnpm store prune

# Or completely reset pnpm store
rm -rf node_modules/.pnpm
pnpm install
```

### 3. Clean All node_modules and Reinstall
```bash
# Use your existing script
pnpm run clean-install
```

## Long-term Optimizations:

### 4. Configure Next.js Cache Limits
Add to `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Limit webpack cache size
    webpackBuildWorker: true,
  },
  // Add cache size limits
  webpack: (config) => {
    config.cache = {
      type: 'filesystem',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      maxMemoryGenerations: 1,
    };
    return config;
  },
};
```

### 5. Add .gitignore Entries
```gitignore
# Build outputs
apps/web/.next/
.turbo/
**/dist/
**/build/

# Cache directories
**/.next/cache/
**/node_modules/.cache/
.pnpm-store/

# Large files
**/*.log
**/*.tgz
```

### 6. Optimize Package Dependencies
Review and remove unused dependencies:
```bash
# Check for unused dependencies
npx depcheck

# Remove unused packages
pnpm remove [unused-package]
```

### 7. Configure PNPM for Better Space Management
Add to `.npmrc`:
```
# Reduce store size
store-dir=~/.pnpm-store
# Enable hoisting to reduce duplication
hoist-pattern[]=*
# Limit concurrent downloads
network-concurrency=3
```

## Expected Results:
- **Before**: ~8GB
- **After cleanup**: ~2-3GB
- **With optimizations**: ~1-2GB

## Monitoring:
```bash
# Check sizes regularly
pnpm run check-size  # Add this script to package.json
```