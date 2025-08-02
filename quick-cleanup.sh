#!/bin/bash

echo "🧹 Starting project cleanup..."

# 1. Remove Next.js cache (saves ~2.5GB)
echo "Removing Next.js cache..."
rm -rf apps/web/.next/cache
rm -rf .next/cache

# 2. Clean pnpm store (saves ~1GB)
echo "Cleaning pnpm store..."
pnpm store prune

# 3. Remove turbo cache
echo "Cleaning Turbo cache..."
rm -rf .turbo

# 4. Clean all node_modules and reinstall
echo "Clean reinstall..."
pnpm run clean-install

echo "✅ Cleanup complete! Project should be much smaller now."