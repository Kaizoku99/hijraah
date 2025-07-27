"use client";

import { SupabaseClient } from "@supabase/supabase-js"; // Import type
import {
  Upload,
  FilePlus,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";

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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseBrowser } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/supabase/storage"; // Assuming this handles Buffer upload correctly


// Define the structure of the document record
interface DocumentRecord {
  id: string;
  user_id: string;
  file_name: string;
  file_path?: string;
  file_type: string;
  status: "uploading" | "uploaded" | "processing" | "failed" | "complete";
}

// Define more granular upload states
type UploadState =
  | "idle" // Initial state
  | "validating" // Checking auth, file
  | "creatingRecord" // Inserting initial DB record
  | "converting" // Converting file to buffer
  | "uploading" // Uploading to storage
  | "updatingRecord" // Updating DB record with path
  | "success" // Upload complete, ready for background processing
  | "error"; // An error occurred

// Add onUploadComplete prop to the component props
interface DocumentUploaderProps {
  className?: string;
  onUploadComplete?: () => void; // Optional callback
}

export function DocumentUploader({
  className,
  onUploadComplete,
}: DocumentUploaderProps) {
  const { toast } = useToast();
  const supabase = useSupabaseBrowser();

  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0); // 0-100 scale
  const [lastError, setLastError] = useState<string | null>(null);

  // --- Helper Functions ---

  const createInitialDocumentRecord = async (
    supabaseClient: SupabaseClient,
    userId: string,
    file: File
  ): Promise<string> => {
    const { data: initialDoc, error: insertError } = await supabaseClient
      .from("documents")
      .insert({
        user_id: userId,
        file_name: file.name,
        file_type: file.type || "application/octet-stream",
        status: "uploading", // Initial status
      })
      .select("id")
      .single();

    if (insertError || !initialDoc?.id) {
      throw new Error(
        `Failed to create database record: ${
          insertError?.message || "No ID returned"
        }`
      );
    }
    return initialDoc.id;
  };

  const uploadFileToStorage = async (
    fileBuffer: Buffer,
    referenceFileName: string,
    bucket: string
  ): Promise<string> => {
    // Assuming uploadFile from storage.ts handles Buffer and returns path
    const uploadedPath = await uploadFile(
      fileBuffer,
      referenceFileName,
      bucket,
      {
        contentType: file?.type || "application/octet-stream", // Use state 'file' here
        cacheControl: "3600",
      }
    );
    if (!uploadedPath) {
      throw new Error("File upload succeeded but no path was returned.");
    }
    return uploadedPath;
  };

  const updateDocumentRecord = async (
    supabaseClient: SupabaseClient,
    documentId: string,
    filePath: string
  ): Promise<void> => {
    const { error: updateError } = await supabaseClient
      .from("documents")
      .update({
        file_path: filePath,
        status: "uploaded", // Mark as uploaded, ready for background processing
      })
      .eq("id", documentId);

    if (updateError) {
      throw new Error(
        `Failed to update database record with file path: ${updateError.message}`
      );
    }
  };

  const cleanupFailedUpload = async (
    supabaseClient: SupabaseClient,
    documentId: string | null,
    uploadedFilePath: string | null,
    bucket: string
  ) => {
    console.warn(
      `Upload failed. Attempting cleanup for doc: ${documentId}, path: ${uploadedFilePath}`
    );
    if (uploadedFilePath) {
      try {
        await supabaseClient.storage.from(bucket).remove([uploadedFilePath]);
        console.log(
          `Successfully deleted orphaned storage file: ${uploadedFilePath}`
        );
      } catch (storageError: any) {
        console.error(
          `Failed to delete orphaned storage file ${uploadedFilePath}: ${storageError.message}`
        );
      }
    }
    if (documentId) {
      try {
        await supabaseClient
          .from("documents")
          .update({ status: "failed", file_path: null }) // Ensure path is nullified
          .eq("id", documentId);
        console.log(`Successfully marked document ${documentId} as failed.`);
      } catch (dbError: any) {
        console.error(
          `Failed to mark document ${documentId} as failed: ${dbError.message}`
        );
      }
    }
  };

  // --- Main Handler ---

  const handleUpload = useCallback(async () => {
    setLastError(null); // Clear previous errors
    setUploadState("validating");
    setUploadProgress(5);

    if (!file) {
      setLastError("No file selected.");
      setUploadState("error");
      toast({
        title: "Error",
        description: "Please select a document file.",
        variant: "destructive",
      });
      return;
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setLastError(authError?.message || "Authentication failed.");
      setUploadState("error");
      toast({
        title: "Authentication Error",
        description: lastError || "Please log in.",
        variant: "destructive",
      });
      return;
    }

    let documentId: string | null = null;
    let uploadedFilePath: string | null = null;
    const bucket = "documents";

    try {
      // 1. Create initial DB record
      setUploadState("creatingRecord");
      setUploadProgress(10);
      documentId = await createInitialDocumentRecord(supabase, user.id, file);
      setUploadProgress(20);

      // 2. Convert file to Buffer
      setUploadState("converting");
      setUploadProgress(25);
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      setUploadProgress(30);

      // 3. Upload file to Storage
      setUploadState("uploading");
      // Construct a reference filename (actual path determined by uploadFile)
      const fileExtension = file.name.split(".").pop() || "bin";
      const referenceFileName = `${documentId}.${fileExtension}`;
      uploadedFilePath = await uploadFileToStorage(
        fileBuffer,
        referenceFileName,
        bucket
      );
      setUploadProgress(70); // Assuming upload takes bulk of time

      // 4. Update DB record with file path
      setUploadState("updatingRecord");
      setUploadProgress(90);
      await updateDocumentRecord(supabase, documentId, uploadedFilePath);
      setUploadProgress(100);

      // 5. Trigger Background Processing via API
      console.log(
        `Triggering processing for doc: ${documentId}, path: ${uploadedFilePath}, type: ${file.type}`
      );
      try {
        const processResponse = await fetch("/api/documents/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId: documentId,
            filePath: uploadedFilePath, // Send the actual storage path
            fileType: file.type || "application/octet-stream",
          }),
        });

        if (!processResponse.ok) {
          const errorData = await processResponse.json();
          throw new Error(
            `Failed to trigger processing: ${
              errorData.error || processResponse.statusText
            }`
          );
        }
        console.log(
          `Successfully triggered processing for document ${documentId}`
        );
        // *** Call the completion callback here ***
        onUploadComplete?.();
      } catch (processError: any) {
        // Log this error, but don't necessarily fail the whole upload
        // The file is uploaded, processing can perhaps be retried later.
        console.error(
          `Error triggering background processing for ${documentId}: ${processError.message}`
        );
        toast({
          title: "Processing Trigger Failed",
          description:
            "Document uploaded, but could not start background processing. Please contact support if issue persists.",
          variant: "default",
        });
        // Optionally call onUploadComplete even if trigger fails, as file is uploaded
        // onUploadComplete?.();
      }

      // 6. Success state update and UI feedback
      setUploadState("success");
      toast({
        title: "Upload Successful",
        description: `"${file.name}" uploaded. Processing will begin shortly.`,
      });
      handleReset(); // Reset form on success
    } catch (error: any) {
      console.error("Document upload process error:", error);
      setLastError(error.message || "An unknown error occurred.");
      setUploadState("error");
      toast({
        title: "Upload Failed",
        description: lastError,
        variant: "destructive",
      });
      // Attempt cleanup
      await cleanupFailedUpload(supabase, documentId, uploadedFilePath, bucket);
      setUploadProgress(0); // Reset progress on error
    }
  }, [
    file,
    supabase,
    toast,
    lastError,
    onUploadComplete,
    uploadFileToStorage,
    createInitialDocumentRecord,
    updateDocumentRecord,
    cleanupFailedUpload,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadState("idle"); // Reset state on new file selection
      setUploadProgress(0);
      setLastError(null);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadState("idle");
    setUploadProgress(0);
    setLastError(null);
    // Reset the file input visually (optional but good UX)
    const fileInput = document.getElementById(
      "file"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // --- UI Logic ---

  const isUploading = useMemo(
    () =>
      [
        "validating",
        "creatingRecord",
        "converting",
        "uploading",
        "updatingRecord",
      ].includes(uploadState),
    [uploadState]
  );

  const uploadButtonText = useMemo(() => {
    switch (uploadState) {
      case "idle":
        return "Upload Document";
      case "validating":
        return "Validating...";
      case "creatingRecord":
        return "Creating Record...";
      case "converting":
        return "Preparing File...";
      case "uploading":
        return "Uploading...";
      case "updatingRecord":
        return "Finalizing...";
      case "success":
        return "Uploaded";
      case "error":
        return "Upload Failed";
      default:
        return "Upload Document";
    }
  }, [uploadState]);

  const UploadIcon = useMemo(() => {
    if (isUploading) return Loader2;
    switch (uploadState) {
      case "success":
        return CheckCircle;
      case "error":
        return XCircle;
      default:
        return Upload;
    }
  }, [uploadState, isUploading]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus className="h-5 w-5" />
          Upload New Document
        </CardTitle>
        <CardDescription>
          Select a document file. It will be uploaded and processed in the
          background.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Document File</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.docx,.txt" // Adjust as needed
            disabled={isUploading}
          />
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {(isUploading ||
          uploadState === "success" ||
          uploadState === "error") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                {uploadState === "success"
                  ? "Upload Complete"
                  : uploadState === "error"
                    ? "Error"
                    : "Progress"}
              </Label>
              <span className="text-sm text-muted-foreground">
                {uploadState === "success"
                  ? "100%"
                  : uploadState === "error"
                    ? ""
                    : `${uploadProgress}%`}
              </span>
            </div>
            <Progress
              value={uploadProgress}
              className={`h-2 ${
                uploadState === "error" ? "bg-destructive" : ""
              }`}
            />
            {uploadState === "error" && lastError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {lastError}
              </p>
            )}
            {uploadState === "success" && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> Ready for background
                processing.
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset} disabled={isUploading}>
          Reset
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading || uploadState === "success"} // Disable after success until reset
          className={
            uploadState === "error"
              ? "bg-destructive hover:bg-destructive/90"
              : ""
          }
        >
          <UploadIcon
            className={`mr-2 h-4 w-4 ${isUploading ? "animate-spin" : ""}`}
          />
          {uploadButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Removed export default as it's likely handled by the file structure conventions
