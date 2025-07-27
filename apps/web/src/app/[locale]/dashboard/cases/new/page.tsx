"use client";

import { useRouter } from "next/navigation"; // Use next/navigation for basic redirect
import { useTranslations } from "next-intl";
import { toast } from "sonner"; // For showing success/error messages

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TemporaryCaseForm } from "@/components/ui/dashboard/TemporaryCaseForm";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import { Case, CaseStatus } from "@/types/cases"; // Assuming type location

// Mock API function (Replace with actual API call)
const createNewCaseAPI = async (
  data: Partial<Case>,
): Promise<{ success: boolean; error?: string }> => {
  console.log("Submitting new case data:", data);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate success/failure
  if (Math.random() > 0.1) {
    // 90% success rate
    return { success: true };
  } else {
    return {
      success: false,
      error: "Failed to create case due to a simulated network error.",
    };
  }
};

export default function NewCasePage() {
  const t = useTranslations("newCaseForm");
  const router = useRouter();
  const locale = useClientLocale();
  const rtl = isRTL(locale);

  const handleFormSubmit = async (data: Partial<Case>) => {
    // Add user_id or other necessary defaults before sending to API
    const caseData: Partial<Case> = {
      ...data,
      status: "pending" as CaseStatus,
      // user_id: 'get_current_user_id()' // Add user ID logic here
    };

    const result = await createNewCaseAPI(caseData);

    if (result.success) {
      toast.success("Case created successfully!"); // Provide feedback
      // Redirect to the main cases page after successful creation
      router.push(`/${locale}/dashboard/cases`);
    } else {
      toast.error(`Error creating case: ${result.error || "Unknown error"}`);
    }
  };

  const handleCancel = () => {
    // Navigate back to the cases list page
    router.push(`/${locale}/dashboard/cases`);
  };

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8 max-w-2xl mx-auto", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          {/* Optional: Add a description if needed */}
          {/* <CardDescription>Fill in the details below to create a new immigration case.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <TemporaryCaseForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
