"use client";

import {
  FileText,
  Upload,
  AlertTriangle,
  Check,
  X,
  FilePlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

import { uploadFile, getPublicUrl } from "@/lib/supabase/storage";
import { DocumentType, DocumentAnalysis } from "@/types/domain/documents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Progress } from "@/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useToast } from "@/ui/use-toast";

interface DocumentAnalyzerProps {
  onAnalysisComplete?: (result: DocumentAnalysis) => void;
  allowedDocumentTypes?: DocumentType[];
  defaultDocumentType?: DocumentType;
  targetCountry?: string;
  userId?: string;
  className?: string;
}

export function DocumentAnalyzer({
  onAnalysisComplete,
  allowedDocumentTypes,
  defaultDocumentType = DocumentType.PASSPORT,
  targetCountry,
  userId,
  className,
}: DocumentAnalyzerProps) {
  const router = useRouter();
  const { toast } = useToast();

  // State for file upload and document type
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] =
    useState<DocumentType>(defaultDocumentType);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysis | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("upload");

  // List of document types
  const documentTypes = allowedDocumentTypes || Object.values(DocumentType);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Reset states
      setUploadProgress(0);
      setAnalysisResult(null);
    }
  };

  // Handle document type selection
  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value as DocumentType);
    setAnalysisResult(null);
  };

  // Handle file upload and analysis
  const handleAnalyzeDocument = useCallback(async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a document file to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Set upload state
      setIsUploading(true);
      setUploadProgress(10);

      // Upload file to Supabase
      const bucket = "documents";
      const folderPath = userId ? `users/${userId}` : "public";

      // Add metadata
      const metadata = {
        documentType,
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
      };

      // Upload the file
      const filePath = await uploadFile(bucket, file, folderPath, metadata);
      setUploadProgress(50);

      // Get the public URL
      const fileUrl = getPublicUrl(bucket, filePath);

      // Begin analysis
      setIsUploading(false);
      setIsAnalyzing(true);
      setUploadProgress(70);

      // Call the document analysis API
      const response = await fetch("/api/ai/document-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentType,
          fileUrl,
          userId,
          targetCountry,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      setUploadProgress(100);

      if (!result.success) {
        throw new Error(result.error || "Analysis failed");
      }

      // Set the analysis result
      setAnalysisResult(result.data);

      // Call the onAnalysisComplete callback if provided
      if (onAnalysisComplete) {
        onAnalysisComplete(result.data);
      }

      // Switch to the results tab
      setActiveTab("results");

      toast({
        title: "Document analysis complete",
        description: result.data.isValid
          ? "The document has been successfully analyzed."
          : "The document has been analyzed with some issues.",
      });
    } catch (error) {
      console.error("Document analysis error:", error);

      toast({
        title: "Analysis failed",
        description:
          error instanceof Error ? error.message : "Failed to analyze document",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  }, [file, documentType, userId, targetCountry, toast, onAnalysisComplete]);

  // Reset the form
  const handleReset = () => {
    setFile(null);
    setDocumentType(defaultDocumentType);
    setUploadProgress(0);
    setAnalysisResult(null);
    setActiveTab("upload");
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus className="h-5 w-5" />
          Document Analyzer
        </CardTitle>
        <CardDescription>
          Upload and analyze immigration documents for validation and
          information extraction
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="upload">
        <TabsList className="mx-6">
          <TabsTrigger value="upload" onClick={() => setActiveTab("upload")}>
            Upload
          </TabsTrigger>
          <TabsTrigger
            value="results"
            onClick={() => setActiveTab("results")}
            disabled={!analysisResult}
          >
            Results
          </TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          {activeTab === "upload" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select
                  value={documentType}
                  onValueChange={handleDocumentTypeChange}
                  disabled={isUploading || isAnalyzing}
                >
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select a document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Document File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    disabled={isUploading || isAnalyzing}
                    className="flex-1"
                  />
                </div>
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name} (
                    {(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {(isUploading || isAnalyzing) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      {isUploading ? "Uploading..." : "Analyzing..."}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {uploadProgress}%
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          )}

          {activeTab === "results" && analysisResult && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={analysisResult.isValid ? "default" : "destructive"}
                  >
                    {analysisResult.isValid ? "Valid" : "Invalid"}
                  </Badge>
                  <span className="text-sm font-medium">
                    Completeness:{" "}
                    {Math.round(analysisResult.completeness * 100)}%
                  </span>
                </div>

                <Badge variant="outline">
                  {analysisResult.languageDetection.primary.toUpperCase()}
                  {analysisResult.languageDetection.secondary &&
                    ` / ${analysisResult.languageDetection.secondary.toUpperCase()}`}
                </Badge>
              </div>

              <div className="space-y-4">
                <Alert
                  variant={
                    analysisResult.formatErrors.length > 0
                      ? "destructive"
                      : "default"
                  }
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="ml-2">Format Issues</AlertTitle>
                  <AlertDescription>
                    {analysisResult.formatErrors.length === 0
                      ? "No format issues detected"
                      : `${analysisResult.formatErrors.length} format ${
                          analysisResult.formatErrors.length === 1
                            ? "issue"
                            : "issues"
                        } detected`}
                  </AlertDescription>
                </Alert>

                {analysisResult.formatErrors.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    {analysisResult.formatErrors.map((error, index) => (
                      <AccordionItem
                        key={index}
                        value={`format-error-${index}`}
                      >
                        <AccordionTrigger className="flex items-center gap-2">
                          <Badge
                            variant={
                              error.type === "critical"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {error.type}
                          </Badge>
                          <span>{error.message}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          {error.suggestion && (
                            <div className="mt-2 rounded-md bg-muted p-3">
                              <p className="text-sm font-medium">Suggestion:</p>
                              <p className="text-sm">{error.suggestion}</p>
                            </div>
                          )}
                          {error.position && (
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground">
                                Position: x: {error.position.x}, y:{" "}
                                {error.position.y}
                              </p>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>

              <div className="space-y-4">
                <Alert
                  variant={
                    analysisResult.contentErrors.length > 0
                      ? "destructive"
                      : "default"
                  }
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="ml-2">Content Issues</AlertTitle>
                  <AlertDescription>
                    {analysisResult.contentErrors.length === 0
                      ? "No content issues detected"
                      : `${analysisResult.contentErrors.length} content ${
                          analysisResult.contentErrors.length === 1
                            ? "issue"
                            : "issues"
                        } detected`}
                  </AlertDescription>
                </Alert>

                {analysisResult.contentErrors.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    {analysisResult.contentErrors.map((error, index) => (
                      <AccordionItem
                        key={index}
                        value={`content-error-${index}`}
                      >
                        <AccordionTrigger className="flex items-center gap-2">
                          <Badge
                            variant={
                              error.type === "critical"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {error.type}
                          </Badge>
                          <span className="ml-2">{error.message}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium">Section:</p>
                              <p className="text-sm">{error.section}</p>
                            </div>
                            {error.suggestion && (
                              <div className="rounded-md bg-muted p-3">
                                <p className="text-sm font-medium">
                                  Suggestion:
                                </p>
                                <p className="text-sm">{error.suggestion}</p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Extracted Data</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {Object.entries(analysisResult.extractedData).map(
                      ([key, value]) => (
                        <div key={key} className="space-y-1">
                          <p className="text-sm font-medium">{key}:</p>
                          <p className="text-sm">{value as string}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Tabs>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>

        <Button
          onClick={handleAnalyzeDocument}
          disabled={!file || isUploading || isAnalyzing}
        >
          {isUploading ? (
            <Upload className="mr-2 h-4 w-4 animate-spin" />
          ) : isAnalyzing ? (
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analyze Document
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
