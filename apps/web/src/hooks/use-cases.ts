import { useState, useEffect, useCallback } from "react";

import { CaseStatus } from "@/_core/immigration/entities/case";

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  status: CaseStatus;
  clientId: string;
  clientName?: string;
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  offset: number;
  limit: number;
  total?: number;
}

interface FetchCasesParams {
  status?: CaseStatus[];
  userId?: string;
  search?: string;
  onlyAssigned?: boolean;
  pagination: Pagination;
}

interface UseCasesResult {
  cases: Case[];
  isLoading: boolean;
  error: Error | null;
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  refetch: () => void;
}

export function useCases({
  status,
  userId,
  search,
  onlyAssigned = false,
  pagination: initialPagination,
}: FetchCasesParams): UseCasesResult {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const fetchCases = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();

      if (status && status.length > 0) {
        status.forEach((s) => params.append("status", s));
      }

      if (userId) {
        params.append("userId", userId);
      }

      if (search) {
        params.append("search", search);
      }

      params.append("onlyAssigned", String(onlyAssigned));
      params.append("offset", String(pagination.offset));
      params.append("limit", String(pagination.limit));

      // Fetch cases from API
      const response = await fetch(`/api/cases?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Error fetching cases: ${response.statusText}`);
      }

      const data = await response.json();

      setCases(data.cases);
      setPagination((prev) => ({
        ...prev,
        total: data.total,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
      setCases([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    status,
    userId,
    search,
    onlyAssigned,
    pagination.offset,
    pagination.limit,
  ]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return {
    cases,
    isLoading,
    error,
    pagination,
    setPagination,
    refetch: fetchCases,
  };
}
