"use client";

import { format } from "date-fns";
import {
  Briefcase,
  MoreHorizontal,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import { Case, CaseStatus } from "@/types/cases";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

interface CasesListProps {
  cases: Case[];
  onCaseUpdated: () => Promise<void>;
}

export function CasesList({ cases, onCaseUpdated }: CasesListProps) {
  const router = useRouter();
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const t = useTranslations("casesList");
  const locale = useClientLocale();
  const rtl = isRTL(locale);

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300";
      case "pending":
      case "pending_review":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "in_progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300";
      case "completed":
      case "approved":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300";
      case "archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTranslatedStatus = (status: CaseStatus): string => {
    switch (status) {
      case "active":
        return t("statusActive");
      case "pending":
        return t("statusPending");
      case "in_progress":
        return t("statusInProgress");
      case "pending_review":
        return t("statusPendingReview");
      case "completed":
        return t("statusCompleted");
      case "approved":
        return t("statusApproved");
      case "rejected":
        return t("statusRejected");
      case "archived":
        return t("statusArchived");
      default:
        return status;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t("notAvailable");
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return t("invalidDate");
    }
  };

  const toggleExpand = (caseId: string) => {
    setExpandedCaseId(expandedCaseId === caseId ? null : caseId);
  };

  if (cases.length === 0) {
    return (
      <div className="text-center p-12 border rounded-lg">
        <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{t("emptyTitle")}</h3>
        <p className="text-muted-foreground mb-4">{t("emptyDescription")}</p>
        <Button onClick={() => router.push("/dashboard/cases/new")}>
          {t("emptyButton")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <Card
          key={caseItem.id}
          className={cn(
            "transition-all",
            expandedCaseId === caseItem.id
              ? "border-primary shadow-md"
              : "hover:shadow-sm"
          )}
        >
          <CardHeader className="p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">
                  {caseItem.title || t("untitledCase")}
                </CardTitle>
                {caseItem.description && (
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {caseItem.description.substring(0, 100)}
                    {caseItem.description.length > 100 ? "..." : ""}
                  </CardDescription>
                )}
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Badge className={getStatusColor(caseItem.status)}>
                  {getTranslatedStatus(caseItem.status)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t("actionsLabel")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/dashboard/cases/${caseItem.id}`)
                      }
                    >
                      {t("viewDetailsAction")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/dashboard/cases/${caseItem.id}/edit`)
                      }
                    >
                      {t("editCaseAction")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/dashboard/cases/${caseItem.id}/documents`)
                      }
                    >
                      {t("viewDocumentsAction")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-100 focus:text-red-700 dark:focus:bg-red-900/50 dark:focus:text-red-300"
                      onClick={async () => {
                        console.log("Archive clicked for:", caseItem.id);
                        await onCaseUpdated();
                      }}
                    >
                      {t("archiveCaseAction")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap text-sm text-muted-foreground gap-x-4 gap-y-1">
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4 flex-shrink-0" />
                <span>
                  {t("typePrefix")}:{" "}
                  {caseItem.case_type?.replace("_", " ") || t("notAvailable")}
                </span>
              </div>
              {caseItem.target_date && (
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4 flex-shrink-0" />
                  <span>
                    {t("targetPrefix")}: {formatDate(caseItem.target_date)}
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4 flex-shrink-0" />
                <span>
                  {t("createdPrefix")}: {formatDate(caseItem.created_at)}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpand(caseItem.id)}
            >
              {expandedCaseId === caseItem.id ? t("showLess") : t("showMore")}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}
            >
              {t("viewDetailsAction")}
              <ChevronRight className={cn("h-4 w-4", rtl ? "mr-1" : "ml-1")} />
            </Button>
          </CardFooter>

          {expandedCaseId === caseItem.id && (
            <div className="px-4 pb-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">{t("detailsHeader")}</h4>
                  <p className="text-muted-foreground mb-1">
                    <strong>{t("idLabel")}:</strong> {caseItem.id}
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <strong>{t("destinationLabel")}:</strong>{" "}
                    {caseItem.destination_country || t("notAvailable")}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>{t("lastUpdatedLabel")}:</strong>{" "}
                    {formatDate(caseItem.updated_at)}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    {t("requirementsHeader")}
                  </h4>
                  {caseItem.requirements &&
                  Object.keys(caseItem.requirements).length > 0 ? (
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {Object.entries(caseItem.requirements)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <li key={key}>
                            {key}: {String(value)}
                          </li>
                        ))}
                      {Object.keys(caseItem.requirements).length > 3 && (
                        <li>
                          {t("andMoreItems", {
                            count:
                              Object.keys(caseItem.requirements).length - 3,
                          })}
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      {t("noRequirements")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
