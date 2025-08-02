import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/orchestrators/index.ts',
    'src/teams/index.ts',
    'src/tools/index.ts'
  ],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: [
    'ai',
    '@ai-sdk/openai',
    '@ai-sdk/anthropic',
    '@supabase/supabase-js',
    'zod',
    'drizzle-orm',
    '@trigger.dev/sdk'
  ]
})