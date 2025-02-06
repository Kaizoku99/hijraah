const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  projects: [
    {
      displayName: 'api',
      testMatch: ['<rootDir>/__tests__/api/**/*.js'],
      testEnvironment: 'node',
    },
    {
      displayName: 'security',
      testMatch: ['<rootDir>/__tests__/security/**/*.js'],
      testEnvironment: 'node',
    },
    {
      displayName: 'load',
      testMatch: ['<rootDir>/__tests__/load/**/*.{js,json}'],
      testEnvironment: 'node',
    },
    {
      displayName: 'client',
      testMatch: ['<rootDir>/__tests__/client/**/*.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
    },
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/_*.{js,jsx,ts,tsx}',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.config.js',
    '!.next/**/*',
  ],
}

module.exports = createJestConfig(customJestConfig) 