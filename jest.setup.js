// Add custom jest matchers for better assertions
require("@testing-library/jest-dom");

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return "";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Set up environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:54321";
process.env.SUPABASE_SERVICE_KEY = "test-supabase-service-key";
process.env.OPENAI_API_KEY = "test-openai-api-key";
