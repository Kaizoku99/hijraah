"use client";

import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

// Define available routes as a simple string array
const VALID_ROUTES = [
  "/",
  "/documents",
  "/chat",
  "/requirements",
  "/calculator",
  "/notifications",
  "/profile",
  "/settings",
] as const;

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
  suggestions: string[];
  aiSuggestions: string[];
  handleSearch: (e: React.FormEvent) => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/search",
    onResponse: (response) => {
      // Handle streaming response
      console.log("AI response:", response);
    },
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentQuery = query.trim(); // Use a stable value of query for this function invocation
    if (!currentQuery) return;

    try {
      // Attempt to get AI suggestions or command interpretation
      const aiResponse = await complete(currentQuery);

      if (
        aiResponse &&
        VALID_ROUTES.includes(aiResponse as (typeof VALID_ROUTES)[number])
      ) {
        // If AI provides a valid internal route, navigate directly
        router.push(aiResponse); // Use Next.js router for client-side navigation
      } else {
        // Otherwise, navigate to the general search page with the original query
        router.push(`/search?q=${encodeURIComponent(currentQuery)}`);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
  };

  const value = {
    query,
    setQuery,
    isLoading,
    suggestions,
    aiSuggestions: completion ? [completion] : [],
    handleSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
