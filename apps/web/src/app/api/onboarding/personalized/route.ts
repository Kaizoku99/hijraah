import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { db } from "@hijraah/database/client";
import {
  personalizedOnboarding,
  companyAnalyses,
  onboardingJobs,
} from "@hijraah/database/schema";
import { eq } from "drizzle-orm";

// Initialize Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/onboarding/personalized
 * Fetch personalized onboarding data for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const userIdFromHeaders = request.headers.get("x-supabase-user-id");
    const isAuthenticated =
      request.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = userIdFromHeaders;

    // Get personalized onboarding data with company analysis
    const personalizedData = await db
      .select({
        // Personalized onboarding fields
        id: personalizedOnboarding.id,
        userId: personalizedOnboarding.userId,
        keywords: personalizedOnboarding.keywords,
        demoSettings: personalizedOnboarding.demoSettings,
        configuration: personalizedOnboarding.configuration,
        recommendedVisaTypes: personalizedOnboarding.recommendedVisaTypes,
        priorityCountries: personalizedOnboarding.priorityCountries,
        suggestedDocuments: personalizedOnboarding.suggestedDocuments,
        industryInsights: personalizedOnboarding.industryInsights,
        confidenceScore: personalizedOnboarding.confidenceScore,
        generationModel: personalizedOnboarding.generationModel,
        status: personalizedOnboarding.status,
        generatedAt: personalizedOnboarding.generatedAt,

        // Company analysis fields
        companyDomain: companyAnalyses.domain,
        companyName: companyAnalyses.companyName,
        industry: companyAnalyses.industry,
        companySize: companyAnalyses.companySize,
        companyDescription: companyAnalyses.description,
        companyCountry: companyAnalyses.country,
        analysisResult: companyAnalyses.analysisResult,
      })
      .from(personalizedOnboarding)
      .leftJoin(
        companyAnalyses,
        eq(personalizedOnboarding.companyAnalysisId, companyAnalyses.id)
      )
      .where(eq(personalizedOnboarding.userId, userId))
      .limit(1);

    if (personalizedData.length === 0) {
      // Check if there's a pending onboarding job
      const pendingJob = await db
        .select({
          id: onboardingJobs.id,
          status: onboardingJobs.status,
          currentStep: onboardingJobs.currentStep,
          stepsCompleted: onboardingJobs.stepsCompleted,
          totalSteps: onboardingJobs.totalSteps,
          emailDomain: onboardingJobs.emailDomain,
          errorMessage: onboardingJobs.errorMessage,
          createdAt: onboardingJobs.createdAt,
        })
        .from(onboardingJobs)
        .where(eq(onboardingJobs.userId, userId))
        .orderBy(onboardingJobs.createdAt)
        .limit(1);

      if (pendingJob.length > 0) {
        return NextResponse.json({
          hasPersonalization: false,
          isPending: true,
          job: pendingJob[0],
          message: "Intelligent onboarding analysis is in progress",
        });
      }

      return NextResponse.json({
        hasPersonalization: false,
        isPending: false,
        message: "No personalized onboarding data found",
      });
    }

    const data = personalizedData[0];

    // Parse confidence score as number
    const confidenceScore = data.confidenceScore
      ? parseFloat(data.confidenceScore)
      : 0;

    return NextResponse.json({
      hasPersonalization: true,
      isPending: false,
      data: {
        // User-specific personalization
        id: data.id,
        userId: data.userId,
        keywords: data.keywords || [],
        demoSettings: data.demoSettings || {},
        configuration: data.configuration || {},
        recommendedVisaTypes: data.recommendedVisaTypes || [],
        priorityCountries: data.priorityCountries || [],
        suggestedDocuments: data.suggestedDocuments || [],
        industryInsights: data.industryInsights || {},
        confidenceScore,
        generationModel: data.generationModel,
        status: data.status,
        generatedAt: data.generatedAt,

        // Company information
        company: {
          domain: data.companyDomain,
          name: data.companyName,
          industry: data.industry,
          size: data.companySize,
          description: data.companyDescription,
          country: data.companyCountry,
          analysisResult: data.analysisResult,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching personalized onboarding data:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch personalized data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/onboarding/personalized
 * Update user preferences based on personalized recommendations
 */
export async function PUT(request: NextRequest) {
  try {
    // Authentication check
    const userIdFromHeaders = request.headers.get("x-supabase-user-id");
    const isAuthenticated =
      request.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = userIdFromHeaders;
    const body = await request.json();

    const { preferences } = body;
    if (!preferences) {
      return NextResponse.json(
        { error: "Preferences are required" },
        { status: 400 }
      );
    }

    // Update user configuration preferences
    await db
      .update(personalizedOnboarding)
      .set({
        configuration: preferences,
        updatedAt: new Date(),
      })
      .where(eq(personalizedOnboarding.userId, userId));

    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
    });
  } catch (error) {
    console.error("Error updating preferences:", error);

    return NextResponse.json(
      {
        error: "Failed to update preferences",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
