"use client";

import { Loader2, Upload, FileText } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseBrowser } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";

type UploadStatus =
  | "idle"
  | "getting_user"
  | "creating_record"
  | "uploading"
  | "updating_record"
  | "triggering"
  | "success"
  | "error";

interface ProcessStatus {
  status: UploadStatus;
  message: string;
  error?: string;
}

// Define the specific Insert type for documents for clarity
type DocumentInsert = Database["public"]["Tables"]["documents"]["Insert"];

export function MistralOcrUploader() {
  const supabase = useSupabaseBrowser();
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<ProcessStatus>({
    status: "idle",
    message: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus({ status: "idle", message: "" });
    }
  };

  const processFileUpload = async () => {
    if (!file) return;

    setUploadStatus({ status: "getting_user", message: "Starting upload..." });

    let documentId: string | null = null; // Keep track of created ID for cleanup

    try {
      // 1. Get User
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error(userError?.message || "User not authenticated.");
      }
      setUploadStatus({
        status: "creating_record",
        message: "Creating document record...",
      });

      // 2. Create initial DB record - Corrected fields based on types
      // Ensure required fields `owner_id` and `name` are provided.
      const initialDocData: DocumentInsert = {
        owner_id: user.id, // Correct field
        name: file.name, // Correct field (required)
        file_size: file.size, // Correct field
        mime_type: file.type, // Correct field
        status: "uploading", // Initial status
        // Optional fields can be added if needed and present in type
        // description: null,
        // type: null, // Or set based on logic
      };

      const { data: docRecord, error: insertError } = await supabase
        .from("documents")
        .insert(initialDocData)
        .select("id")
        .single();

      if (insertError || !docRecord?.id) {
        console.error("DB Insert Error Details:", insertError);
        throw new Error(
          insertError?.message || "Failed to create document record.",
        );
      }
      documentId = docRecord.id; // Store the ID
      setUploadStatus({
        status: "uploading",
        message: "Uploading file to secure storage...",
      });

      // 3. Upload to Supabase Storage
      const storagePath = `${user.id}/${documentId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(storagePath, file);

      if (uploadError) {
        // Attempt to clean up the DB record if upload fails
        console.warn(
          `Upload failed for doc ${documentId}, attempting DB cleanup.`,
        );
        await supabase.from("documents").delete().eq("id", documentId);
        documentId = null; // Clear ID after delete attempt
        throw new Error(uploadError.message || "Failed to upload file.");
      }
      setUploadStatus({
        status: "updating_record",
        message: "Finalizing document record...",
      });

      // 4. Update DB record with file_path and status - Corrected field
      const { error: updateError } = await supabase
        .from("documents")
        .update({ file_path: storagePath, status: "uploaded" })
        .eq("id", documentId);

      if (updateError) {
        // DB record exists, but upload succeeded. Status is inconsistent.
        console.error(
          `Failed to update doc ${documentId} status after successful upload:`,
          updateError,
        );
        // Don't necessarily delete the record here, maybe just report error
        // Consider a background job for reconciliation or manual check
        throw new Error(
          updateError.message ||
            "Failed to update document record after upload.",
        );
      }
      setUploadStatus({
        status: "triggering",
        message: "Initiating processing workflow...",
      });

      // 5. Call Triggering Endpoint
      const response = await fetch("/api/documents/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId, // Pass the confirmed document ID
          filePath: storagePath,
          fileType: file.type, // Keep original file type for the trigger payload
        }),
      });

      const processResult = await response.json();

      if (!response.ok || !processResult.success) {
        console.error(
          `Failed to trigger processing via API for doc ${documentId}:`,
          processResult.error,
        );
        // Update status to 'processing_failed' in DB
        await supabase
          .from("documents")
          .update({
            status: "processing_failed",
            status_message:
              processResult.error || "Failed to trigger processing",
          })
          .eq("id", documentId);
        throw new Error(
          processResult.error || "Failed to trigger document processing.",
        );
      }

      // 6. Update UI State (Success)
      const successMessage = processResult.eventId
        ? `Upload complete! Processing started (Event ID: ${processResult.eventId}).`
        : "Upload complete! Document verified, processing trigger temporarily disabled."; // Handle case where trigger is commented out
      setUploadStatus({ status: "success", message: successMessage });
      toast({
        title: "Upload Successful",
        description: "Document processing has started.",
      });
      // setFile(null); // Optionally clear file input
    } catch (error) {
      console.error("Error during document upload process:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setUploadStatus({
        status: "error",
        message: "Upload failed",
        error: errorMessage,
      });
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });

      // Optional: Attempt cleanup if a DB record was created but process failed later
      // Be cautious with cleanup logic, might depend on where the error occurred
      // if (documentId) { ... maybe update status to 'upload_failed' ... }
    } finally {
      // No finally needed, status state handles loading indication
    }
  };

  const isLoading = [
    "getting_user",
    "creating_record",
    "uploading",
    "updating_record",
    "triggering",
  ].includes(uploadStatus.status);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Upload Document for Processing</CardTitle>
        <CardDescription>
          Select a document (PDF, PNG, JPG, TIFF) to upload and start the
          processing pipeline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid w-full gap-2">
          <Label htmlFor="file">Select Document</Label>
          <Input
            id="file"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected: {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>

        {(uploadStatus.status !== "idle" || uploadStatus.message) && (
          <div className="mt-4 p-3 rounded-md bg-muted/50 border">
            <h3 className="font-medium mb-1 text-sm">Upload Status</h3>
            <p
              className={`text-sm ${
                uploadStatus.status === "error"
                  ? "text-red-600"
                  : "text-muted-foreground"
              }`}
            >
              {uploadStatus.message}
            </p>
            {uploadStatus.error && (
              <p className="text-xs text-red-700 mt-1">
                Error details: {uploadStatus.error}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setFile(null);
            setUploadStatus({ status: "idle", message: "" });
          }}
          disabled={isLoading}
        >
          Clear
        </Button>
        <Button onClick={processFileUpload} disabled={isLoading || !file}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {uploadStatus.message || "Processing..."}
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload and Process
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
