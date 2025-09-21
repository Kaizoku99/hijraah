import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { db } from "@hijraah/database/client";
import {
  companyAnalyses,
  personalizedOnboarding,
  onboardingJobs,
  profiles,
} from "@hijraah/database/schema";
import { eq, and } from "drizzle-orm";
import { withCircuitBreakerRoute } from "@/lib/circuit-breaker";
import OpenAI from "openai";

// Validation schemas
const analyzeRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
  userId: z.string().uuid("Invalid user ID"),
});

interface CompanyAnalysisResult {
  industry: string;
  companySize: "startup" | "small" | "medium" | "large" | "enterprise";
  description: string;
  country: string;
  businessModel: string;
  targetMarket: string;
  immigrationRelevance: "high" | "medium" | "low";
  recommendedVisaTypes: string[];
  priorityCountries: string[];
  suggestedDocuments: string[];
  keywords: string[];
  demoSettings: Record<string, any>;
  configuration: Record<string, any>;
  industryInsights: Record<string, any>;
  confidenceScore: number;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Extract domain from email address
 */
function extractEmailDomain(email: string): string {
  const domain = email.split("@")[1];
  if (!domain) throw new Error("Invalid email format");
  return domain.toLowerCase();
}

/**
 * Scrape company website using Firecrawl
 */
async function scrapeCompanyWebsite(domain: string) {
  try {
    const websiteUrl = `https://${domain}`;

    // Dynamically import Firecrawl
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new Error("FIRECRAWL_API_KEY environment variable is not set");
    }

    const firecrawlImport = await import("@mendable/firecrawl-js");
    const FirecrawlApp = firecrawlImport.default;

    const firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });

    const scrapeResult = await firecrawl.scrapeUrl(websiteUrl, {
      formats: ["markdown"],
      onlyMainContent: true,
      timeout: 30000, // 30 second timeout
    });

    if (!scrapeResult.success || !scrapeResult.data) {
      throw new Error(`Failed to scrape ${websiteUrl}: ${scrapeResult.error}`);
    }

    return {
      content: scrapeResult.data.markdown || "",
      metadata: scrapeResult.data.metadata || {},
      url: websiteUrl,
    };
  } catch (error) {
    console.error("Error scraping company website:", error);
    throw error;
  }
}

/**
 * Analyze company data using OpenAI
 */
async function analyzeCompanyWithAI(
  domain: string,
  websiteContent: string,
  metadata: any
): Promise<CompanyAnalysisResult> {
  const analysisPrompt = `You are an expert immigration consultant and business analyst. Analyze the following company website content and provide comprehensive insights for personalizing an immigration platform experience.

Company Domain: ${domain}
Website Content: ${websiteContent.substring(0, 8000)}
Website Metadata: ${JSON.stringify(metadata, null, 2)}

Please analyze this company and provide a detailed assessment in the following JSON format:

{
  "industry": "Primary industry/sector (e.g., Technology, Healthcare, Finance)",
  "companySize": "startup|small|medium|large|enterprise (based on content, team size mentions, etc.)",
  "description": "Brief 2-3 sentence description of what the company does",
  "country": "Primary country/region of operations (if mentioned)",
  "businessModel": "B2B, B2C, B2B2C, marketplace, etc.",
  "targetMarket": "Primary target market or customer base",
  "immigrationRelevance": "high|medium|low - likelihood employees need immigration services",
  "recommendedVisaTypes": ["List of relevant visa types like H1B, L1, O1, etc. based on industry"],
  "priorityCountries": ["Countries most relevant for this company's employees to immigrate to"],
  "suggestedDocuments": ["Documents this company's employees likely need for immigration"],
  "keywords": ["10-15 relevant keywords for personalizing content and searches"],
  "demoSettings": {
    "preferredCountry": "Most relevant destination country",
    "visaType": "Most likely visa type",
    "industry": "Industry code",
    "employmentType": "full-time|contract|startup-founder"
  },
  "configuration": {
    "notifications": {
      "policyUpdates": true/false,
      "visaDeadlines": true/false,
      "industryNews": true/false
    },
    "language": "preferred language if detectable",
    "timezone": "likely timezone if detectable"
  },
  "industryInsights": {
    "commonChallenges": ["Common immigration challenges for this industry"],
    "typicalTimelines": "Typical immigration timeline for this industry",
    "specialConsiderations": "Any special considerations for this industry"
  },
  "confidenceScore": 0.85 // 0-1 confidence in the analysis
}

Focus on:
1. Industry-specific immigration patterns
2. Company size implications for visa sponsorship
3. Geographic focus for immigration destinations
4. Relevant visa types based on industry and company profile
5. Practical keywords for content personalization
6. Realistic configuration defaults

Be specific and practical. If information is unclear, make reasonable inferences based on industry standards.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content:
            "You are an expert immigration consultant and business analyst. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    const analysis = JSON.parse(responseContent) as CompanyAnalysisResult;

    // Validate essential fields
    if (
      !analysis.industry ||
      !analysis.companySize ||
      !analysis.keywords?.length
    ) {
      throw new Error("Incomplete analysis from AI");
    }

    return analysis;
  } catch (error) {
    console.error("Error analyzing company with AI:", error);
    throw error;
  }
}

/**
 * Store analysis results in database
 */
async function storeAnalysisResults(
  userId: string,
  domain: string,
  websiteData: any,
  analysis: CompanyAnalysisResult
) {
  try {
    // Check if company analysis already exists
    let companyAnalysisId: string;

    const existingAnalysis = await db
      .select()
      .from(companyAnalyses)
      .where(eq(companyAnalyses.domain, domain))
      .limit(1);

    if (existingAnalysis.length > 0) {
      // Update existing analysis
      companyAnalysisId = existingAnalysis[0].id;
      await db
        .update(companyAnalyses)
        .set({
          companyName: analysis.description.split(".")[0], // Extract company name from description
          industry: analysis.industry,
          companySize: analysis.companySize,
          description: analysis.description,
          country: analysis.country,
          websiteContent: websiteData,
          analysisResult: analysis,
          status: "completed",
          processedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(companyAnalyses.id, companyAnalysisId));
    } else {
      // Create new analysis
      const newAnalysis = await db
        .insert(companyAnalyses)
        .values({
          domain,
          companyName: analysis.description.split(".")[0],
          industry: analysis.industry,
          companySize: analysis.companySize,
          description: analysis.description,
          country: analysis.country,
          websiteContent: websiteData,
          analysisResult: analysis,
          status: "completed",
          processedAt: new Date(),
        })
        .returning({ id: companyAnalyses.id });

      companyAnalysisId = newAnalysis[0].id;
    }

    // Store personalized onboarding
    await db
      .insert(personalizedOnboarding)
      .values({
        userId,
        companyAnalysisId,
        keywords: analysis.keywords,
        demoSettings: analysis.demoSettings,
        configuration: analysis.configuration,
        recommendedVisaTypes: analysis.recommendedVisaTypes,
        priorityCountries: analysis.priorityCountries,
        suggestedDocuments: analysis.suggestedDocuments,
        industryInsights: analysis.industryInsights,
        confidenceScore: analysis.confidenceScore.toString(),
        generationModel: "gpt-4-1106-preview",
        status: "completed",
        generatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: personalizedOnboarding.userId,
        set: {
          companyAnalysisId,
          keywords: analysis.keywords,
          demoSettings: analysis.demoSettings,
          configuration: analysis.configuration,
          recommendedVisaTypes: analysis.recommendedVisaTypes,
          priorityCountries: analysis.priorityCountries,
          suggestedDocuments: analysis.suggestedDocuments,
          industryInsights: analysis.industryInsights,
          confidenceScore: analysis.confidenceScore.toString(),
          status: "completed",
          generatedAt: new Date(),
          updatedAt: new Date(),
        },
      });

    // Update user profile
    await db
      .update(profiles)
      .set({
        emailDomain: domain,
        companyAnalysisId,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, userId));

    return companyAnalysisId;
  } catch (error) {
    console.error("Error storing analysis results:", error);
    throw error;
  }
}

/**
 * Main handler for intelligent onboarding analysis
 */
async function intelligentOnboardingHandler(
  req: NextRequest
): Promise<Response> {
  try {
    // Authentication check
    const userIdFromHeaders = req.headers.get("x-supabase-user-id");
    const isAuthenticated =
      req.headers.get("x-supabase-authenticated") === "true";

    if (!isAuthenticated || !userIdFromHeaders) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse and validate request
    const body = await req.json();
    const { email, userId } = analyzeRequestSchema.parse(body);

    // Ensure user matches authenticated user
    if (userId !== userIdFromHeaders) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
    }

    // Extract email domain
    const domain = extractEmailDomain(email);
    console.log(
      `Starting intelligent onboarding analysis for domain: ${domain}`
    );

    // Check for existing analysis
    const existingPersonalization = await db
      .select()
      .from(personalizedOnboarding)
      .where(eq(personalizedOnboarding.userId, userId))
      .limit(1);

    if (
      existingPersonalization.length > 0 &&
      existingPersonalization[0].status === "completed"
    ) {
      return NextResponse.json({
        success: true,
        cached: true,
        message: "Analysis already exists for this user",
        data: existingPersonalization[0],
      });
    }

    // Create onboarding job record
    const jobRecord = await db
      .insert(onboardingJobs)
      .values({
        userId,
        email,
        emailDomain: domain,
        status: "processing",
        currentStep: "domain_extraction",
        stepsCompleted: ["domain_extraction"],
        startedAt: new Date(),
      })
      .returning({ id: onboardingJobs.id });

    const jobId = jobRecord[0].id;

    try {
      // Step 1: Scrape company website
      console.log(`Scraping company website for domain: ${domain}`);
      await db
        .update(onboardingJobs)
        .set({
          currentStep: "company_scraping",
          stepsCompleted: ["domain_extraction", "company_scraping"],
          updatedAt: new Date(),
        })
        .where(eq(onboardingJobs.id, jobId));

      const websiteData = await scrapeCompanyWebsite(domain);

      // Step 2: Analyze with AI
      console.log(`Analyzing company data with AI for domain: ${domain}`);
      await db
        .update(onboardingJobs)
        .set({
          currentStep: "llm_analysis",
          stepsCompleted: [
            "domain_extraction",
            "company_scraping",
            "llm_analysis",
          ],
          updatedAt: new Date(),
        })
        .where(eq(onboardingJobs.id, jobId));

      const analysis = await analyzeCompanyWithAI(
        domain,
        websiteData.content,
        websiteData.metadata
      );

      // Step 3: Store results
      console.log(`Storing analysis results for domain: ${domain}`);
      await db
        .update(onboardingJobs)
        .set({
          currentStep: "settings_generation",
          stepsCompleted: [
            "domain_extraction",
            "company_scraping",
            "llm_analysis",
            "settings_generation",
          ],
          updatedAt: new Date(),
        })
        .where(eq(onboardingJobs.id, jobId));

      const companyAnalysisId = await storeAnalysisResults(
        userId,
        domain,
        websiteData,
        analysis
      );

      // Complete job
      await db
        .update(onboardingJobs)
        .set({
          status: "completed",
          companyAnalysisId,
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(onboardingJobs.id, jobId));

      console.log(
        `Intelligent onboarding analysis completed for domain: ${domain}`
      );

      return NextResponse.json({
        success: true,
        message: "Intelligent onboarding analysis completed successfully",
        data: {
          jobId,
          companyAnalysisId,
          domain,
          industry: analysis.industry,
          companySize: analysis.companySize,
          keywords: analysis.keywords,
          recommendedVisaTypes: analysis.recommendedVisaTypes,
          priorityCountries: analysis.priorityCountries,
          confidenceScore: analysis.confidenceScore,
        },
      });
    } catch (processingError) {
      // Update job with error
      await db
        .update(onboardingJobs)
        .set({
          status: "failed",
          errorMessage:
            processingError instanceof Error
              ? processingError.message
              : "Unknown error",
          updatedAt: new Date(),
        })
        .where(eq(onboardingJobs.id, jobId));

      throw processingError;
    }
  } catch (error) {
    console.error("Error in intelligent onboarding analysis:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Analysis failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Apply circuit breaker for reliability
const protectedHandler = withCircuitBreakerRoute(intelligentOnboardingHandler, {
  maxFailures: 3,
  resetTimeout: 60000, // 1 minute
});

export const POST = protectedHandler;
