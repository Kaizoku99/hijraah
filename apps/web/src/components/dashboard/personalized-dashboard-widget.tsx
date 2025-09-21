"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  FileText,
  Target,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  useCompanyInfo,
  useImmigrationRecommendations,
} from "@/lib/hooks/use-personalized-onboarding";

export function PersonalizedDashboardWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { hasCompanyInfo, company } = useCompanyInfo();
  const { hasRecommendations, recommendedVisaTypes, priorityCountries } =
    useImmigrationRecommendations();

  // Don't render if no personalization data
  if (!hasCompanyInfo && !hasRecommendations) {
    return null;
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Personalized for {company?.name || "Your Company"}
          <Badge variant="secondary" className="ml-auto">
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {company?.industry && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">{company.industry}</div>
                  <div className="text-muted-foreground">Industry</div>
                </div>
              </div>
            )}

            {company?.size && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium capitalize">{company.size}</div>
                  <div className="text-muted-foreground">Company Size</div>
                </div>
              </div>
            )}

            {recommendedVisaTypes.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">
                    {recommendedVisaTypes.length} Options
                  </div>
                  <div className="text-muted-foreground">Visa Types</div>
                </div>
              </div>
            )}

            {priorityCountries.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Target className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">
                    {priorityCountries.length} Countries
                  </div>
                  <div className="text-muted-foreground">Top Matches</div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations preview */}
          <div className="space-y-3">
            {recommendedVisaTypes.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recommended for your industry
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendedVisaTypes
                    .slice(0, isExpanded ? undefined : 3)
                    .map((visa, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {visa}
                      </Badge>
                    ))}
                  {!isExpanded && recommendedVisaTypes.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs cursor-pointer"
                      onClick={() => setIsExpanded(true)}
                    >
                      +{recommendedVisaTypes.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {priorityCountries.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Priority destinations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {priorityCountries
                    .slice(0, isExpanded ? undefined : 3)
                    .map((country, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {country}
                      </Badge>
                    ))}
                  {!isExpanded && priorityCountries.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs cursor-pointer"
                      onClick={() => setIsExpanded(true)}
                    >
                      +{priorityCountries.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button asChild size="sm">
              <Link href="/onboarding/personalized">
                View Full Analysis
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/search">Start Your Journey</Link>
            </Button>
            {isExpanded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="ml-auto"
              >
                Show Less
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact version for smaller spaces
 */
export function PersonalizedSidebarWidget() {
  const { hasCompanyInfo, company } = useCompanyInfo();
  const { hasRecommendations, recommendedVisaTypes } =
    useImmigrationRecommendations();

  if (!hasCompanyInfo && !hasRecommendations) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Personalized</span>
        </div>

        {company?.industry && (
          <div className="text-xs text-muted-foreground">
            Optimized for{" "}
            <span className="font-medium">{company.industry}</span>
          </div>
        )}

        {recommendedVisaTypes.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs font-medium">Top recommendation:</div>
            <Badge variant="outline" className="text-xs">
              {recommendedVisaTypes[0]}
            </Badge>
          </div>
        )}

        <Button asChild size="sm" className="w-full">
          <Link href="/onboarding/personalized">View Analysis</Link>
        </Button>
      </div>
    </Card>
  );
}
