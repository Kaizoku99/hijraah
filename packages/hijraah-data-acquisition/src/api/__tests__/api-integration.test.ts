/**
 * API Integration Tests
 * 
 * Comprehensive tests for the RESTful API system with Firecrawl integration,
 * authentication, rate limiting, and webhook management.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createApiServer, HijraahApiServer } from "../index.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { RequestContext, ApiResponse } from "../types.js";

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({ 
          data: {
            id: "test-api-key-id",
            user_id: "test-user-id",
            key_hash: "test-hash",
            name: "Test API Key",
            permissions: ["read:data", "write:data"],
            rate_limit: {
              requestsPerMinute: 10,
              requestsPerHour: 100,
              requestsPerDay: 1000,
            },
            subscription_tier: "basic",
            is_active: true,
            expires_at: null,
            created_at: new Date().toISOString(),
            last_used_at: null,
          },
          error: null 
        })),
        order: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
      })),
      insert: vi.fn(() => Promise.resolve({ data: { id: "new-id" }, error: null })),
      update: vi.fn(() => Promise.resolve({ data: null, error: null })),
      delete: vi.fn(() => Promise.resolve({ data: null, error: null })),
      in: vi.fn(() => ({
        order: vi.fn(() => ({
          range: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
      })),
      gte: vi.fn(() => ({
        lte: vi.fn(() => ({
          order: vi.fn(() => ({
            range: vi.fn(() => Promise.resolve({ data: [], error: null })),
          })),
        })),
      })),
      or: vi.fn(() => ({
        order: vi.fn(() => ({
          range: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
      })),
    })),
    count: vi.fn(() => Promise.resolve({ count: 0, error: null })),
  })),
} as unknown as SupabaseClient;

// Mock Firecrawl API
global.fetch = vi.fn();

describe("API Integration", () => {
  let apiServer: HijraahApiServer;
  let mockRequest: any;
  let mockContext: RequestContext;

  beforeEach(() => {
    vi.clearAllMocks();
    
    apiServer = createApiServer(
      mockSupabase,
      "test-firecrawl-key",
      {
        baseUrl: "http://localhost:3000",
        version: "1.0.0-test",
      }
    );

    mockRequest = {
      method: "GET",
      path: "/api/v1/health",
      query: {},
      body: {},
      params: {},
      headers: {
        "authorization": "Bearer test-api-key",
        "user-agent": "Test Agent",
      },
      ip: "127.0.0.1",
    };

    mockContext = {
      requestId: "test-request-id",
      timestamp: new Date(),
      userAgent: "Test Agent",
      ipAddress: "127.0.0.1",
      auth: {} as any,
      metadata: {
        method: "GET",
        path: "/api/v1/health",
        query: {},
        body: {},
        headers: mockRequest.headers,
        endpoint: "GET:/api/v1/health",
      },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Server Initialization", () => {
    it("should create API server with default configuration", () => {
      expect(apiServer).toBeInstanceOf(HijraahApiServer);
      expect(apiServer.config.version).toBe("1.0.0-test");
      expect(apiServer.config.baseUrl).toBe("http://localhost:3000");
      expect(apiServer.endpoints.size).toBeGreaterThan(0);
      expect(apiServer.middleware.length).toBeGreaterThan(0);
    });

    it("should register all required endpoints", () => {
      const endpointKeys = Array.from(apiServer.endpoints.keys());
      
      // Health and info endpoints
      expect(endpointKeys).toContain("GET:/api/v1/health");
      expect(endpointKeys).toContain("GET:/api/v1/info");
      
      // Data extraction endpoints
      expect(endpointKeys).toContain("POST:/api/v1/extract/url");
      expect(endpointKeys).toContain("POST:/api/v1/extract/batch");
      expect(endpointKeys).toContain("POST:/api/v1/extract/crawl");
      expect(endpointKeys).toContain("GET:/api/v1/extract/status/:jobId");
      
      // Policy search endpoints
      expect(endpointKeys).toContain("POST:/api/v1/policies/search");
      expect(endpointKeys).toContain("GET:/api/v1/policies/:id");
      
      // Webhook endpoints
      expect(endpointKeys).toContain("POST:/api/v1/webhooks");
      expect(endpointKeys).toContain("GET:/api/v1/webhooks");
      expect(endpointKeys).toContain("PUT:/api/v1/webhooks/:id");
      expect(endpointKeys).toContain("DELETE:/api/v1/webhooks/:id");
    });

    it("should register middleware in correct priority order", () => {
      const middlewareNames = apiServer.middleware.map(m => m.name);
      
      expect(middlewareNames).toContain("authentication");
      expect(middlewareNames).toContain("rate-limiting");
      expect(middlewareNames).toContain("validation");
      
      // Authentication should have highest priority
      const authIndex = middlewareNames.indexOf("authentication");
      const rateLimitIndex = middlewareNames.indexOf("rate-limiting");
      expect(authIndex).toBeLessThan(rateLimitIndex);
    });
  });

  describe("Request Handling", () => {
    it("should handle health check request successfully", async () => {
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("status", "healthy");
      expect(response.data).toHaveProperty("version", "1.0.0-test");
      expect(response.metadata).toHaveProperty("requestId");
      expect(response.metadata).toHaveProperty("processingTime");
    });

    it("should handle API info request successfully", async () => {
      mockRequest.path = "/api/v1/info";
      mockRequest.metadata = { ...mockRequest.metadata, endpoint: "GET:/api/v1/info" };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("name", "Hijraah Data Acquisition API");
      expect(response.data).toHaveProperty("version", "1.0.0-test");
      expect(response.data).toHaveProperty("features");
      expect(response.data).toHaveProperty("endpoints");
    });

    it("should return 404 for unknown endpoints", async () => {
      mockRequest.path = "/api/v1/unknown";
      mockRequest.metadata = { ...mockRequest.metadata, endpoint: "GET:/api/v1/unknown" };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(false);
      expect(response.error).toContain("not found");
      expect(response.data.error.code).toBe("ENDPOINT_NOT_FOUND");
    });

    it("should handle internal errors gracefully", async () => {
      // Mock an endpoint that throws an error
      const errorEndpoint = {
        path: "/api/v1/error",
        method: "GET" as const,
        permissions: [],
        validation: {},
        handler: async () => {
          throw new Error("Test error");
        },
      };
      
      apiServer.registerEndpoint(errorEndpoint);
      
      mockRequest.path = "/api/v1/error";
      mockRequest.metadata = { ...mockRequest.metadata, endpoint: "GET:/api/v1/error" };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(false);
      expect(response.error).toBe("Internal server error");
      expect(response.data.error.code).toBe("INTERNAL_ERROR");
    });
  });

  describe("Authentication", () => {
    it("should authenticate valid API key", async () => {
      // Mock successful authentication
      vi.mocked(mockSupabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({
              data: {
                id: "test-api-key-id",
                user_id: "test-user-id",
                key_hash: "test-hash",
                name: "Test API Key",
                permissions: ["read:data"],
                rate_limit: {
                  requestsPerMinute: 10,
                  requestsPerHour: 100,
                  requestsPerDay: 1000,
                },
                subscription_tier: "basic",
                is_active: true,
                expires_at: null,
                created_at: new Date().toISOString(),
                last_used_at: null,
              },
              error: null,
            })),
          })),
        })),
        insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
        update: vi.fn(() => Promise.resolve({ data: null, error: null })),
      } as any);

      mockRequest.path = "/api/v1/policies/search";
      mockRequest.method = "POST";
      mockRequest.body = {
        query: "test query",
      };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      // Should not fail due to authentication (might fail due to other reasons)
      expect(response.data?.error?.code).not.toBe("MISSING_API_KEY");
      expect(response.data?.error?.code).not.toBe("INVALID_API_KEY");
    });

    it("should reject requests without API key", async () => {
      delete mockRequest.headers.authorization;
      mockRequest.path = "/api/v1/policies/search";
      mockRequest.method = "POST";
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(false);
      expect(response.data?.error?.code).toBe("MISSING_API_KEY");
    });

    it("should reject requests with invalid API key", async () => {
      // Mock authentication failure
      vi.mocked(mockSupabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({
              data: null,
              error: { message: "Not found" },
            })),
          })),
        })),
      } as any);

      mockRequest.path = "/api/v1/policies/search";
      mockRequest.method = "POST";
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(false);
      expect(response.data?.error?.code).toBe("INVALID_API_KEY");
    });
  });

  describe("Rate Limiting", () => {
    it("should track usage correctly", async () => {
      // Mock successful authentication and usage tracking
      const insertSpy = vi.fn(() => Promise.resolve({ data: null, error: null }));
      const selectSpy = vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: {
              id: "test-api-key-id",
              user_id: "test-user-id",
              key_hash: "test-hash",
              permissions: ["read:data"],
              subscription_tier: "basic",
              is_active: true,
            },
            error: null,
          })),
          count: vi.fn(() => Promise.resolve({ count: 5, error: null })),
        })),
      }));

      vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
        if (table === "api_keys") {
          return { select: selectSpy } as any;
        }
        if (table === "api_usage_records") {
          return { 
            insert: insertSpy,
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                gte: vi.fn(() => ({
                  lt: vi.fn(() => ({ count: vi.fn(() => Promise.resolve({ count: 5, error: null })) })),
                })),
              })),
            })),
          } as any;
        }
        return { select: vi.fn(() => ({})) } as any;
      });

      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.metadata).toHaveProperty("processingTime");
      expect(typeof response.metadata.processingTime).toBe("number");
    });

    it("should enforce rate limits", async () => {
      // Mock rate limit exceeded scenario
      vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
        if (table === "api_keys") {
          return {
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                single: vi.fn(() => Promise.resolve({
                  data: {
                    id: "test-api-key-id",
                    user_id: "test-user-id",
                    key_hash: "test-hash",
                    permissions: ["read:data"],
                    subscription_tier: "free",
                    is_active: true,
                  },
                  error: null,
                })),
              })),
            })),
          } as any;
        }
        if (table === "api_usage_records") {
          return {
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                gte: vi.fn(() => ({
                  lt: vi.fn(() => ({ 
                    count: vi.fn(() => Promise.resolve({ count: 100, error: null })) // Exceed limit
                  })),
                })),
              })),
            })),
            insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
          } as any;
        }
        return { select: vi.fn(() => ({})) } as any;
      });

      mockRequest.path = "/api/v1/policies/search";
      mockRequest.method = "POST";
      
      const response = await apiServer.handleRequest(mockRequest);
      
      // Should be rate limited
      expect(response.success).toBe(false);
      expect(response.data?.error?.code).toBe("RATE_LIMIT_EXCEEDED");
    });
  });

  describe("Data Extraction Endpoints", () => {
    beforeEach(() => {
      // Mock successful authentication
      vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
        if (table === "api_keys") {
          return {
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                single: vi.fn(() => Promise.resolve({
                  data: {
                    id: "test-api-key-id",
                    user_id: "test-user-id",
                    key_hash: "test-hash",
                    permissions: ["read:data", "write:data"],
                    subscription_tier: "premium",
                    is_active: true,
                  },
                  error: null,
                })),
              })),
            })),
            update: vi.fn(() => Promise.resolve({ data: null, error: null })),
          } as any;
        }
        return {
          select: vi.fn(() => ({ count: vi.fn(() => Promise.resolve({ count: 0, error: null })) })),
          insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
        } as any;
      });

      // Mock Firecrawl API
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          success: true,
          data: {
            markdown: "# Test Content",
            metadata: {
              title: "Test Page",
              statusCode: 200,
            },
          },
          creditsUsed: 1,
        }),
      } as Response);
    });

    it("should handle URL extraction request", async () => {
      mockRequest.path = "/api/v1/extract/url";
      mockRequest.method = "POST";
      mockRequest.body = {
        url: "https://example.com",
        options: {
          formats: ["markdown"],
          onlyMainContent: true,
        },
      };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("jobId");
      expect(response.data).toHaveProperty("status");
      expect(response.data.results).toBeDefined();
      expect(response.data.results[0]).toHaveProperty("sourceUrl", "https://example.com");
    });

    it("should handle batch extraction request", async () => {
      mockRequest.path = "/api/v1/extract/batch";
      mockRequest.method = "POST";
      mockRequest.body = {
        urls: ["https://example1.com", "https://example2.com"],
        options: {
          formats: ["markdown"],
        },
      };

      // Mock batch API response
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          jobId: "batch-job-123",
          status: "pending",
        }),
      } as Response);
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("jobId", "batch-job-123");
      expect(response.data).toHaveProperty("status", "pending");
    });

    it("should validate extraction request parameters", async () => {
      mockRequest.path = "/api/v1/extract/url";
      mockRequest.method = "POST";
      mockRequest.body = {
        url: "invalid-url", // Invalid URL
      };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(false);
      expect(response.data?.error?.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("Policy Search Endpoints", () => {
    beforeEach(() => {
      // Mock successful authentication
      vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
        if (table === "api_keys") {
          return {
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                single: vi.fn(() => Promise.resolve({
                  data: {
                    id: "test-api-key-id",
                    user_id: "test-user-id",
                    key_hash: "test-hash",
                    permissions: ["read:policies"],
                    subscription_tier: "basic",
                    is_active: true,
                  },
                  error: null,
                })),
              })),
            })),
            update: vi.fn(() => Promise.resolve({ data: null, error: null })),
          } as any;
        }
        if (table === "policy_changes") {
          return {
            select: vi.fn(() => ({
              or: vi.fn(() => ({
                order: vi.fn(() => ({
                  range: vi.fn(() => Promise.resolve({
                    data: [
                      {
                        id: "policy-1",
                        title: "Test Policy",
                        description: "Test policy description",
                        country: "US",
                        change_type: "update",
                        impact_level: "medium",
                        confidence: 0.9,
                        source_url: "https://example.com/policy",
                        effective_date: new Date().toISOString(),
                      },
                    ],
                    error: null,
                  })),
                })),
              })),
              eq: vi.fn(() => ({
                single: vi.fn(() => Promise.resolve({
                  data: {
                    id: "policy-1",
                    title: "Test Policy",
                    description: "Test policy description",
                    country: "US",
                    change_type: "update",
                    impact_level: "medium",
                    confidence: 0.9,
                    source_url: "https://example.com/policy",
                    effective_date: new Date().toISOString(),
                  },
                  error: null,
                })),
              })),
            })),
            count: vi.fn(() => Promise.resolve({ count: 1, error: null })),
          } as any;
        }
        return {
          select: vi.fn(() => ({ count: vi.fn(() => Promise.resolve({ count: 0, error: null })) })),
          insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
        } as any;
      });
    });

    it("should handle policy search request", async () => {
      mockRequest.path = "/api/v1/policies/search";
      mockRequest.method = "POST";
      mockRequest.body = {
        query: "immigration policy",
        options: {
          limit: 10,
          includeAnalysis: false,
        },
      };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("results");
      expect(response.data).toHaveProperty("pagination");
      expect(response.data.results).toHaveLength(1);
      expect(response.data.results[0]).toHaveProperty("title", "Test Policy");
    });

    it("should handle policy by ID request", async () => {
      mockRequest.path = "/api/v1/policies/policy-1";
      mockRequest.method = "GET";
      mockRequest.params = { id: "policy-1" };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("id", "policy-1");
      expect(response.data).toHaveProperty("title", "Test Policy");
    });
  });

  describe("Webhook Endpoints", () => {
    beforeEach(() => {
      // Mock successful authentication
      vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
        if (table === "api_keys") {
          return {
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                single: vi.fn(() => Promise.resolve({
                  data: {
                    id: "test-api-key-id",
                    user_id: "test-user-id",
                    key_hash: "test-hash",
                    permissions: ["webhook:receive"],
                    subscription_tier: "premium",
                    is_active: true,
                  },
                  error: null,
                })),
              })),
            })),
            update: vi.fn(() => Promise.resolve({ data: null, error: null })),
          } as any;
        }
        if (table === "webhooks") {
          return {
            insert: vi.fn(() => Promise.resolve({
              data: { id: "webhook-123" },
              error: null,
            })),
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                order: vi.fn(() => Promise.resolve({
                  data: [
                    {
                      id: "webhook-123",
                      user_id: "test-user-id",
                      url: "https://example.com/webhook",
                      events: ["policy.changed"],
                      is_active: true,
                      created_at: new Date().toISOString(),
                    },
                  ],
                  error: null,
                })),
              })),
            })),
            update: vi.fn(() => Promise.resolve({ data: null, error: null })),
            delete: vi.fn(() => Promise.resolve({ data: null, error: null })),
          } as any;
        }
        return {
          select: vi.fn(() => ({ count: vi.fn(() => Promise.resolve({ count: 0, error: null })) })),
          insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
        } as any;
      });

      // Mock webhook test request
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve("OK"),
      } as Response);
    });

    it("should handle webhook registration", async () => {
      mockRequest.path = "/api/v1/webhooks";
      mockRequest.method = "POST";
      mockRequest.body = {
        url: "https://example.com/webhook",
        events: ["policy.changed"],
        secret: "webhook-secret-123456",
      };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("id", "webhook-123");
      expect(response.data).toHaveProperty("message");
    });

    it("should list user webhooks", async () => {
      mockRequest.path = "/api/v1/webhooks";
      mockRequest.method = "GET";
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("webhooks");
      expect(response.data.webhooks).toHaveLength(1);
      expect(response.data.webhooks[0]).toHaveProperty("id", "webhook-123");
    });

    it("should validate webhook configuration", async () => {
      mockRequest.path = "/api/v1/webhooks";
      mockRequest.method = "POST";
      mockRequest.body = {
        url: "invalid-url", // Invalid URL
        events: [], // Empty events array
      };
      
      const response = await apiServer.handleRequest(mockRequest);
      
      expect(response.success).toBe(false);
      expect(response.data?.error?.code).toBe("VALIDATION_FAILED");
    });
  });
});

describe("Error Handling", () => {
  let apiServer: HijraahApiServer;

  beforeEach(() => {
    apiServer = createApiServer(mockSupabase, "test-firecrawl-key");
  });

  it("should handle database connection errors", async () => {
    // Mock database error
    vi.mocked(mockSupabase.from).mockReturnValue({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: null,
            error: { message: "Database connection failed" },
          })),
        })),
      })),
    } as any);

    const mockRequest = {
      method: "POST",
      path: "/api/v1/policies/search",
      headers: { authorization: "Bearer test-key" },
      body: { query: "test" },
    };

    const response = await apiServer.handleRequest(mockRequest);
    
    expect(response.success).toBe(false);
    expect(response.data?.error?.code).toBe("INVALID_API_KEY");
  });

  it("should handle Firecrawl API errors", async () => {
    // Mock successful authentication
    vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
      if (table === "api_keys") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({
                data: {
                  id: "test-api-key-id",
                  user_id: "test-user-id",
                  permissions: ["read:data", "write:data"],
                  subscription_tier: "premium",
                  is_active: true,
                },
                error: null,
              })),
            })),
          })),
          update: vi.fn(() => Promise.resolve({ data: null, error: null })),
        } as any;
      }
      return {
        select: vi.fn(() => ({ count: vi.fn(() => Promise.resolve({ count: 0, error: null })) })),
        insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
      } as any;
    });

    // Mock Firecrawl API error
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const mockRequest = {
      method: "POST",
      path: "/api/v1/extract/url",
      headers: { authorization: "Bearer test-key" },
      body: { url: "https://example.com" },
    };

    const response = await apiServer.handleRequest(mockRequest);
    
    expect(response.success).toBe(false);
    expect(response.error).toContain("Firecrawl API error");
  });
});