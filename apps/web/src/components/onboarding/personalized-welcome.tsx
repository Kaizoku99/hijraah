"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Building2,
  Users,
  MapPin,
  FileText,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  Briefcase,
  Target,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { Alert, AlertDescription } from "@/ui/alert";
import { Progress } from "@/ui/progress";
import {
  usePersonalizedOnboarding,
  useCompanyInfo,
  useImmigrationRecommendations,
} from "@/lib/hooks/use-personalized-onboarding";

interface PersonalizedWelcomeProps {
  className?: string;
}

export function PersonalizedWelcome({ className }: PersonalizedWelcomeProps) {
  const t = useTranslations("onboarding");
  const [showDetails, setShowDetails] = useState(false);

  const {
    data,
    job,
    isLoading,
    isPending,
    hasPersonalization,
    isError,
    error,
  } = usePersonalizedOnboarding();

  const { hasCompanyInfo, company } = useCompanyInfo();
  const { recommendedVisaTypes, priorityCountries, suggestedDocuments } =
    useImmigrationRecommendations();

  // Loading state
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError && error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t("error.loadingPersonalization", {
            defaultValue: "Failed to load personalized content",
          })}
          : {error}
        </AlertDescription>
      </Alert>
    );
  }

  // Pending analysis state
  if (isPending && job) {
    const progress = (job.stepsCompleted.length / job.totalSteps) * 100;

    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("analysis.inProgress", {
              defaultValue: "Personalizing Your Experience",
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>
                {t("analysis.description", {
                  defaultValue:
                    "We're analyzing your company profile to create a personalized immigration experience for you.",
                  company: job.emailDomain,
                })}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>
                  {t("analysis.currentStep", { defaultValue: "Current step" })}:{" "}
                  {job.currentStep}
                </span>
                <span>
                  {job.stepsCompleted.length} / {job.totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="text-sm text-muted-foreground">
              {t("analysis.estimatedTime", {
                defaultValue: "This usually takes 1-2 minutes...",
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No personalization available
  if (!hasPersonalization || !data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {t("welcome.title", { defaultValue: "Welcome to Hijraah" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t("welcome.generic", {
              defaultValue:
                "Get started with your immigration journey. We'll help you navigate the process step by step.",
            })}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Personalized content
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main welcome card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("welcome.personalized.title", {
              defaultValue: "Welcome! We've personalized your experience",
              company: company?.name || company?.domain,
            })}
          </CardTitle>
          {hasCompanyInfo && company && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{company.name || company.domain}</span>
              </div>
              {company.industry && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{company.industry}</span>
                </div>
              )}
              {company.size && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="capitalize">{company.size} company</span>
                </div>
              )}
              {company.country && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.country}</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t("welcome.personalized.description", {
                defaultValue:
                  "Based on your company profile, we've customized your immigration experience with relevant visa types, priority countries, and industry-specific guidance.",
              })}
            </p>

            {data.confidenceScore && (
              <div className="flex items-center gap-2 text-sm">
                <Badge
                  variant={data.confidenceScore > 0.7 ? "default" : "secondary"}
                  className="gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  {Math.round(data.confidenceScore * 100)}% confidence
                </Badge>
                <span className="text-muted-foreground">
                  {t("analysis.generatedBy", { defaultValue: "Generated by" })}{" "}
                  {data.generationModel}
                </span>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails
                ? t("details.hide", { defaultValue: "Hide Details" })
                : t("details.show", {
                    defaultValue: "View Personalized Recommendations",
                  })}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed recommendations */}
      {showDetails && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Recommended Visa Types */}
          {recommendedVisaTypes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  {t("recommendations.visaTypes", {
                    defaultValue: "Recommended Visa Types",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recommendedVisaTypes.map((visa, index) => (
                    <Badge key={index} variant="outline">
                      {visa}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Priority Countries */}
          {priorityCountries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4" />
                  {t("recommendations.priorityCountries", {
                    defaultValue: "Priority Countries",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {priorityCountries.map((country, index) => (
                    <Badge key={index} variant="outline">
                      {country}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggested Documents */}
          {suggestedDocuments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  {t("recommendations.suggestedDocuments", {
                    defaultValue: "Suggested Documents",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {suggestedDocuments.map((doc, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {doc}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Industry insights */}
      {showDetails &&
        data.industryInsights &&
        Object.keys(data.industryInsights).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t("insights.title", {
                  defaultValue: "Industry-Specific Insights",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                {data.industryInsights.commonChallenges && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {t("insights.challenges", {
                        defaultValue: "Common Challenges",
                      })}
                    </h4>
                    <ul className="space-y-1 text-muted-foreground">
                      {(data.industryInsights.commonChallenges as string[]).map(
                        (challenge, index) => (
                          <li key={index}>• {challenge}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {data.industryInsights.typicalTimelines && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {t("insights.timelines", {
                        defaultValue: "Typical Timeline",
                      })}
                    </h4>
                    <p className="text-muted-foreground">
                      {data.industryInsights.typicalTimelines as string}
                    </p>
                  </div>
                )}

                {data.industryInsights.specialConsiderations && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {t("insights.considerations", {
                        defaultValue: "Special Considerations",
                      })}
                    </h4>
                    <p className="text-muted-foreground">
                      {data.industryInsights.specialConsiderations as string}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
