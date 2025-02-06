#!/bin/bash

# Ensure we're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Run tests
npm test

# Build the application
npm run build

# Deploy to Vercel
vercel --prod

echo "Deployment complete!"