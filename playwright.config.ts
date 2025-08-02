import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

/**
 * Playwright Configuration for Hijraah Platform E2E Tests
 * 
 * This configuration is optimized for comprehensive testing of the
 * Hijraah immigration platform across multiple browsers and devices.
 */
export default defineConfig({
  // Test directory
  testDir: '__tests__/e2e',
  
  // Global test timeout
  timeout: 60 * 1000, // 60 seconds
  
  // Expect timeout for assertions
  expect: {
    timeout: 10 * 1000, // 10 seconds
  },
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    process.env.CI ? ['github'] : ['list']
  ],
  
  // Global setup and teardown
  globalSetup: require.resolve('./playwright.global-setup.ts'),
  globalTeardown: require.resolve('./playwright.global-teardown.ts'),
  
  // Shared settings for all tests
  use: {
    // Base URL for tests
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Record video on failure
    video: 'retain-on-failure',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Browser context options
    contextOptions: {
      // Ignore HTTPS errors
      ignoreHTTPSErrors: true,
      
      // Set permissions
      permissions: ['clipboard-read', 'clipboard-write'],
    },
    
    // Action timeout
    actionTimeout: 15 * 1000, // 15 seconds
    
    // Navigation timeout
    navigationTimeout: 30 * 1000, // 30 seconds
  },

  // Test projects for different browsers and scenarios
  projects: [
    // Setup project for authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      teardown: 'cleanup',
    },
    
    // Cleanup project
    {
      name: 'cleanup',
      testMatch: /.*\.teardown\.ts/,
    },

    // Desktop browsers
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Use authenticated state
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Tablet
    {
      name: 'iPad',
      use: { 
        ...devices['iPad Pro'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Accessibility testing
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        // Enable accessibility tree
        contextOptions: {
          reducedMotion: 'reduce',
          forcedColors: 'active',
        },
      },
      dependencies: ['setup'],
      testMatch: /.*\.a11y\.spec\.ts/,
    },

    // Performance testing
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        // Throttle network for performance testing
        contextOptions: {
          offline: false,
        },
      },
      dependencies: ['setup'],
      testMatch: /.*\.perf\.spec\.ts/,
    },

    // API testing
    {
      name: 'api',
      use: {
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
      testMatch: /.*\.api\.spec\.ts/,
    },

    // Visual regression testing
    {
      name: 'visual',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: /.*\.visual\.spec\.ts/,
    },

    // Cross-browser compatibility
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],

  // Web server configuration for local development
  webServer: process.env.CI ? undefined : {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
    env: {
      NODE_ENV: 'test',
    },
  },

  // Output directory for test artifacts
  outputDir: 'test-results/',
  
  // Test metadata
  metadata: {
    platform: process.platform,
    node: process.version,
    timestamp: new Date().toISOString(),
  },
});