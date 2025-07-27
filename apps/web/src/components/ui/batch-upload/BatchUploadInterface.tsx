"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Settings,
  Download,
  RefreshCw,
  Play,
  Pause,
  FileType,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  BatchUploadService,
  BatchUploadFile,
  BatchUploadResult,
  BatchUploadConfig,
} from "@/lib/services/batch-upload";

interface BatchUploadInterfaceProps {
  className?: string;
  onBatchComplete?: (result: BatchUploadResult) => void;
  config?: Partial<BatchUploadConfig>;
  enableAdvancedMode?: boolean;
}

// Context7 Pattern: Type-safe state management
interface BatchUploadState {
  isDragging: boolean;
  selectedFiles: File[];
  activeBatches: BatchUploadResult[];
  currentBatch: BatchUploadResult | null;
  isUploading: boolean;
  stats: {
    totalBatches: number;
    totalFiles: number;
    successfulFiles: number;
    failedFiles: number;
  };
}

export function BatchUploadInterface({
  className,
  onBatchComplete,
  config,
  enableAdvancedMode = false,
}: BatchUploadInterfaceProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const uploadServiceRef = useRef<BatchUploadService | null>(null);

  const [state, setState] = useState<BatchUploadState>({
    isDragging: false,
    selectedFiles: [],
    activeBatches: [],
    currentBatch: null,
    isUploading: false,
    stats: {
      totalBatches: 0,
      totalFiles: 0,
      successfulFiles: 0,
      failedFiles: 0,
    },
  });

  const [activeTab, setActiveTab] = useState("upload");

  // Context7 Pattern: Service initialization with cleanup
  useEffect(() => {
    uploadServiceRef.current = BatchUploadService.getInstance(config);
    const service = uploadServiceRef.current;

    // Event listeners for real-time updates
    service.on("batch:started", handleBatchStarted);
    service.on("batch:progress", handleBatchProgress);
    service.on("batch:completed", handleBatchCompleted);
    service.on("file:started", handleFileStarted);
    service.on("file:completed", handleFileCompleted);
    service.on("file:failed", handleFileFailed);

    return () => {
      service.off("batch:started", handleBatchStarted);
      service.off("batch:progress", handleBatchProgress);
      service.off("batch:completed", handleBatchCompleted);
      service.off("file:started", handleFileStarted);
      service.off("file:completed", handleFileCompleted);
      service.off("file:failed", handleFileFailed);
    };
  }, [config]);

  // Context7 Pattern: Event handlers with state updates
  const handleBatchStarted = useCallback(
    (batchId: string, totalFiles: number) => {
      setState((prev) => ({
        ...prev,
        isUploading: true,
        stats: {
          ...prev.stats,
          totalBatches: prev.stats.totalBatches + 1,
          totalFiles: prev.stats.totalFiles + totalFiles,
        },
      }));

      toast({
        title: "Batch Upload Started",
        description: `Processing ${totalFiles} files...`,
      });
    },
    [toast]
  );

  const handleBatchProgress = useCallback(
    (batchId: string, progress: number) => {
      setState((prev) => {
        const updatedBatches = prev.activeBatches.map((batch) =>
          batch.batchId === batchId
            ? { ...batch, files: batch.files.map((f) => ({ ...f, progress })) }
            : batch
        );

        const currentBatch =
          prev.currentBatch?.batchId === batchId
            ? {
                ...prev.currentBatch,
                files: prev.currentBatch.files.map((f) => ({ ...f, progress })),
              }
            : prev.currentBatch;

        return {
          ...prev,
          activeBatches: updatedBatches,
          currentBatch,
        };
      });
    },
    []
  );

  const handleBatchCompleted = useCallback(
    (result: BatchUploadResult) => {
      setState((prev) => ({
        ...prev,
        isUploading: false,
        currentBatch: result,
        stats: {
          ...prev.stats,
          successfulFiles: prev.stats.successfulFiles + result.successful,
          failedFiles: prev.stats.failedFiles + result.failed,
        },
      }));

      toast({
        title: "Batch Upload Completed",
        description: `✅ ${result.successful} successful, ❌ ${result.failed} failed`,
        variant: result.failed > 0 ? "destructive" : "default",
      });

      onBatchComplete?.(result);
      setActiveTab("results");
    },
    [toast, onBatchComplete]
  );

  const handleFileStarted = useCallback((fileId: string, fileName: string) => {
    console.log(`File started: ${fileName}`);
  }, []);

  const handleFileCompleted = useCallback(
    (fileId: string, documentId: string) => {
      console.log(`File completed: ${fileId} -> ${documentId}`);
    },
    []
  );

  const handleFileFailed = useCallback((fileId: string, error: string) => {
    console.error(`File failed: ${fileId} - ${error}`);
  }, []);

  // Context7 Pattern: Drag and drop with event handling
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isDragging: false }));

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      addFiles(selectedFiles);
    },
    []
  );

  const addFiles = useCallback((newFiles: File[]) => {
    setState((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...newFiles],
    }));
  }, []);

  const removeFile = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      selectedFiles: prev.selectedFiles.filter((_, i) => i !== index),
    }));
  }, []);

  const clearFiles = useCallback(() => {
    setState((prev) => ({ ...prev, selectedFiles: [] }));
  }, []);

  const startUpload = useCallback(async () => {
    if (state.selectedFiles.length === 0 || !uploadServiceRef.current) return;

    try {
      const batchId = await uploadServiceRef.current.createBatch(
        state.selectedFiles,
        config
      );

      setState((prev) => ({
        ...prev,
        selectedFiles: [],
        isUploading: true,
      }));
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }, [state.selectedFiles, config, toast]);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type === "application/pdf") return "📄";
    if (type.includes("word")) return "📝";
    return "📄";
  };

  const getStatusIcon = (status: BatchUploadFile["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "uploading":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case "processing":
        return <Zap className="h-4 w-4 text-purple-500 animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: BatchUploadFile["status"]) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
      uploading:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
      processing:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400"
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Batch Upload</h2>
          <p className="text-muted-foreground">
            Upload multiple documents for bulk processing with RAG integration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <FileText className="h-3 w-3" />
            {state.stats.totalFiles} files
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Upload Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="progress">
            Progress{" "}
            {state.isUploading && (
              <Loader2 className="h-3 w-3 ml-1 animate-spin" />
            )}
          </TabsTrigger>
          <TabsTrigger value="results">
            Results ({state.stats.totalBatches})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {/* Drop Zone */}
          <Card>
            <CardContent className="pt-6">
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                  state.isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Drop files here or click to select
                </h3>
                <p className="text-muted-foreground mb-4">
                  Supports PDF, Word documents, images, and text files
                </p>
                <Button variant="outline">Select Files</Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Selected Files */}
          {state.selectedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Selected Files ({state.selectedFiles.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={clearFiles}>
                      Clear All
                    </Button>
                    <Button onClick={startUpload} disabled={state.isUploading}>
                      {state.isUploading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      Start Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {state.selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <span className="text-2xl">
                          {getFileIcon(file.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} • {file.type}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {state.currentBatch ? (
            <Card>
              <CardHeader>
                <CardTitle>Current Batch Progress</CardTitle>
                <CardDescription>
                  Processing {state.currentBatch.totalFiles} files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>
                      {Math.round(
                        ((state.currentBatch.successful +
                          state.currentBatch.failed) /
                          state.currentBatch.totalFiles) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      ((state.currentBatch.successful +
                        state.currentBatch.failed) /
                        state.currentBatch.totalFiles) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {state.currentBatch.successful}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {
                        state.currentBatch.files.filter(
                          (f) =>
                            f.status === "uploading" ||
                            f.status === "processing"
                        ).length
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">Processing</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">
                      {state.currentBatch.failed}
                    </p>
                    <p className="text-sm text-muted-foreground">Failed</p>
                  </div>
                </div>

                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {state.currentBatch.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <span className="text-xl">
                          {getFileIcon(file.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress
                              value={file.progress}
                              className="h-1 flex-1"
                            />
                            <span className="text-xs text-muted-foreground">
                              {file.progress}%
                            </span>
                          </div>
                          {file.error && (
                            <p className="text-xs text-red-600 mt-1">
                              {file.error}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "text-xs",
                              getStatusColor(file.status)
                            )}
                          >
                            {getStatusIcon(file.status)}
                            {file.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Upload</h3>
                <p className="text-muted-foreground">
                  Start a batch upload to see progress here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {state.stats.totalBatches}
                </div>
                <p className="text-xs text-muted-foreground">Total Batches</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {state.stats.totalFiles}
                </div>
                <p className="text-xs text-muted-foreground">Total Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">
                  {state.stats.successfulFiles}
                </div>
                <p className="text-xs text-muted-foreground">Successful</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">
                  {state.stats.failedFiles}
                </div>
                <p className="text-xs text-muted-foreground">Failed</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Batch Results */}
          {state.currentBatch && (
            <Card>
              <CardHeader>
                <CardTitle>Latest Batch Results</CardTitle>
                <CardDescription>
                  Completed{" "}
                  {state.currentBatch.endTime &&
                    formatDuration(state.currentBatch.duration || 0)}{" "}
                  ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {state.currentBatch.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <span className="text-xl">
                          {getFileIcon(file.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                            {file.documentId &&
                              ` • Doc ID: ${file.documentId.slice(0, 8)}...`}
                          </p>
                          {file.error && (
                            <p className="text-xs text-red-600 mt-1">
                              {file.error}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "text-xs",
                              getStatusColor(file.status)
                            )}
                          >
                            {getStatusIcon(file.status)}
                            {file.status}
                          </Badge>
                          {file.processingTaskId && (
                            <Badge variant="outline" className="text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              RAG
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
