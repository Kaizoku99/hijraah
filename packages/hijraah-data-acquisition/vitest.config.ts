import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
  optimizeDeps: {
    exclude: ['postgres', 'ai', '@trigger.dev/sdk'],
  },
  ssr: {
    noExternal: ['postgres', 'ai', '@trigger.dev/sdk'],
  },
});