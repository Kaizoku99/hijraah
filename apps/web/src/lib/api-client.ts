import { getSupabaseClient } from "./supabase/client";

interface ApiClientOptions {
  baseUrl?: string;
}

interface QueryFilters {
  country?: string;
  category?: string;
  language?: string;
}

export class ApiClient {
  private baseUrl: string;
  private supabase = getSupabaseClient();

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || "/api";
  }

  private async getAuthHeader(): Promise<HeadersInit> {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();
    if (error || !session) {
      throw new Error("Not authenticated");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const headers = await this.getAuthHeader();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  }

  async processQuery(query: string, filters?: QueryFilters) {
    return this.fetchWithAuth("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ query, filters }),
    });
  }

  async compareCountries(countries: string[], category: string) {
    return this.fetchWithAuth("/ai/compare", {
      method: "POST",
      body: JSON.stringify({ countries, category }),
    });
  }

  // Add more API methods as needed...
}
