const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "jest-extended/all"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  projects: [
    {
      displayName: "api",
      testMatch: ["<rootDir>/__tests__/api/**/*.js"],
      testEnvironment: "node",
    },
    {
      displayName: "core",
      testMatch: ["<rootDir>/__tests__/lib/**/*.ts"],
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
      testEnvironment: "node",
      moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          prefix: "<rootDir>/",
        }),
        "^openai$": "<rootDir>/__mocks__/openai.js",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      automock: false,
      resetMocks: true,
    },
    {
      displayName: "security",
      testMatch: ["<rootDir>/__tests__/security/**/*.js"],
      testEnvironment: "node",
    },
    {
      displayName: "load",
      testMatch: ["<rootDir>/__tests__/load/**/*.{js,json}"],
      testEnvironment: "node",
    },
    {
      displayName: "client",
      testMatch: ["<rootDir>/__tests__/client/**/*.{js,jsx,ts,tsx}"],
      testEnvironment: "jsdom",
    },
  ],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/_*.{js,jsx,ts,tsx}",
    "!app/**/*.stories.{js,jsx,ts,tsx}",
    "!**/*.config.js",
    "!.next/**/*",
  ],
};

module.exports = createJestConfig(customJestConfig);
