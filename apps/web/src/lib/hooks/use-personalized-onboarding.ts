/**
 * Hook for accessing personalized onboarding data
 *
 * This hook fetches and provides access to AI-generated personalized
 * onboarding data based on the user's company domain analysis.
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth/hooks";

export interface PersonalizedOnboardingData {
  id: string;
  userId: string;
  keywords: string[];
  demoSettings: Record<string, any>;
  configuration: Record<string, any>;
  recommendedVisaTypes: string[];
  priorityCountries: string[];
  suggestedDocuments: string[];
  industryInsights: Record<string, any>;
  confidenceScore: number;
  generationModel: string;
  status: "pending" | "processing" | "completed" | "failed";
  generatedAt: string | null;
  company: {
    domain: string | null;
    name: string | null;
    industry: string | null;
    size: string | null;
    description: string | null;
    country: string | null;
    analysisResult: Record<string, any> | null;
  };
}

export interface OnboardingJob {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  currentStep: string | null;
  stepsCompleted: string[];
  totalSteps: number;
  emailDomain: string;
  errorMessage: string | null;
  createdAt: string;
}

export interface PersonalizedOnboardingResponse {
  hasPersonalization: boolean;
  isPending: boolean;
  data?: PersonalizedOnboardingData;
  job?: OnboardingJob;
  message?: string;
}

export interface UsePersonalizedOnboardingReturn {
  data: PersonalizedOnboardingData | null;
  job: OnboardingJob | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  hasPersonalization: boolean;
  isPending: boolean;
  refetch: () => Promise<void>;
  updatePreferences: (preferences: Record<string, any>) => Promise<boolean>;
}

/**
 * Custom hook to fetch and manage personalized onboarding data
 */
export function usePersonalizedOnboarding(): UsePersonalizedOnboardingReturn {
  const { user, isLoading: userLoading } = useAuth();
  const [data, setData] = useState<PersonalizedOnboardingData | null>(null);
  const [job, setJob] = useState<OnboardingJob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPersonalization, setHasPersonalization] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const fetchPersonalizedData = useCallback(async () => {
    if (!user || userLoading) return;

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await fetch("/api/onboarding/personalized", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PersonalizedOnboardingResponse = await response.json();

      setHasPersonalization(result.hasPersonalization);
      setIsPending(result.isPending);
      setData(result.data || null);
      setJob(result.job || null);

      console.log("Personalized onboarding data loaded:", {
        hasPersonalization: result.hasPersonalization,
        isPending: result.isPending,
        companyDomain: result.data?.company?.domain,
        industry: result.data?.company?.industry,
        keywordsCount: result.data?.keywords?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching personalized onboarding data:", err);
      setIsError(true);
      setError(err instanceof Error ? err.message : "Unknown error");
      setData(null);
      setJob(null);
      setHasPersonalization(false);
      setIsPending(false);
    } finally {
      setIsLoading(false);
    }
  }, [user, userLoading]);

  const updatePreferences = useCallback(
    async (preferences: Record<string, any>): Promise<boolean> => {
      if (!user) return false;

      try {
        const response = await fetch("/api/onboarding/personalized", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preferences }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update local state
        if (data) {
          setData({
            ...data,
            configuration: preferences,
          });
        }

        return true;
      } catch (err) {
        console.error("Error updating preferences:", err);
        return false;
      }
    },
    [user, data]
  );

  // Fetch data when user becomes available
  useEffect(() => {
    if (user && !userLoading) {
      fetchPersonalizedData();
    }
  }, [user, userLoading, fetchPersonalizedData]);

  // Poll for updates if job is pending
  useEffect(() => {
    if (
      isPending &&
      job &&
      (job.status === "pending" || job.status === "processing")
    ) {
      const pollInterval = setInterval(() => {
        fetchPersonalizedData();
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(pollInterval);
    }
  }, [isPending, job, fetchPersonalizedData]);

  return {
    data,
    job,
    isLoading,
    isError,
    error,
    hasPersonalization,
    isPending,
    refetch: fetchPersonalizedData,
    updatePreferences,
  };
}

/**
 * Utility hook to get specific personalization values with fallbacks
 */
export function usePersonalizationValue<T>(
  key: keyof PersonalizedOnboardingData,
  fallback: T
): T {
  const { data } = usePersonalizedOnboarding();

  if (!data || !data[key]) return fallback;

  return (data[key] as unknown as T) || fallback;
}

/**
 * Hook to get company-specific information
 */
export function useCompanyInfo() {
  const { data, hasPersonalization } = usePersonalizedOnboarding();

  return {
    hasCompanyInfo: hasPersonalization && !!data?.company?.domain,
    company: data?.company || null,
    industry: data?.company?.industry || null,
    companySize: data?.company?.size || null,
    companyCountry: data?.company?.country || null,
  };
}

/**
 * Hook to get immigration-specific recommendations
 */
export function useImmigrationRecommendations() {
  const { data, hasPersonalization } = usePersonalizedOnboarding();

  return {
    hasRecommendations: hasPersonalization && !!data,
    recommendedVisaTypes: data?.recommendedVisaTypes || [],
    priorityCountries: data?.priorityCountries || [],
    suggestedDocuments: data?.suggestedDocuments || [],
    industryInsights: data?.industryInsights || {},
    keywords: data?.keywords || [],
  };
}
