"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemporaryDocumentForm } from "@/components/ui/dashboard/TemporaryDocumentForm";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { useAuth } from "@/lib/auth/hooks"; // Import useAuth to get user ID
import { cn } from "@/lib/utils";
import { DocumentUpload } from "@/types/documents"; // Assuming type location

// Mock API function (Replace with actual API call)
const uploadDocumentAPI = async (
  data: Partial<DocumentUpload>,
  file: File,
): Promise<{ success: boolean; error?: string }> => {
  console.log("Uploading document data:", data, "File:", file.name);
  // Simulate API delay for upload
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Simulate success/failure
  if (Math.random() > 0.1) {
    // 90% success rate
    return { success: true };
  } else {
    return {
      success: false,
      error: "Failed to upload document due to a simulated network error.",
    };
  }
};

export default function UploadDocumentsPage() {
  const t = useTranslations("uploadDocumentForm");
  const router = useRouter();
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  const { user, isLoading: authLoading } = useAuth(); // Get user from auth context

  const handleFormSubmit = async (data: Partial<DocumentUpload>) => {
    if (!data.file) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    // Ensure user_id is included
    const uploadData = {
      ...data,
      user_id: user.id,
    };

    try {
      const result = await uploadDocumentAPI(uploadData, data.file);

      if (result.success) {
        toast.success("Document uploaded successfully!");
        router.push(`/${locale}/documents`); // Redirect to documents list
      } else {
        toast.error(
          `Error uploading document: ${result.error || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred during upload.");
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}/documents`); // Navigate back to documents list
  };

  // Show loading state if auth is still loading
  if (authLoading) {
    return <div className="p-4">Loading user...</div>; // Or a proper skeleton
  }

  // Show error or redirect if user is not loaded/authenticated
  if (!user) {
    // Optionally redirect to login or show an error message
    // router.push(`/${locale}/login`);
    return (
      <div className="p-4 text-red-600">
        Authentication required to upload documents.
      </div>
    );
  }

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8 max-w-2xl mx-auto", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          {/* Optional: <CardDescription>...</CardDescription> */}
        </CardHeader>
        <CardContent>
          <TemporaryDocumentForm
            userId={user.id} // Pass user ID to the form
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
