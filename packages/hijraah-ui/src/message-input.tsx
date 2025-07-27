"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Paperclip,
  SendHorizontal,
  StopCircle,
  X,
  FileText,
  Image,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "./styles";

// Context7 Architecture - 7 Pillars Implementation
// 1. Observability - Input analytics and file upload tracking
// 2. Modularity - Factory patterns and composition helpers
// 3. Resumability - Input state preservation and attachment recovery
// 4. Tracing - Development-mode debugging and interaction tracking
// 5. Data-as-Code - Type-safe input interfaces and configuration
// 6. Provider Isolation - Dedicated style providers and theme management
// 7. Resource Pooling - Performance optimization and singleton managers

// Core Interfaces - Data-as-Code Pattern
export interface MessageInputAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  uploadProgress?: number;
  error?: string;
}

export interface MessageInputData {
  value: string;
  attachments: MessageInputAttachment[];
  isLoading?: boolean;
  error?: string | null;
  placeholder?: string;
  maxLength?: number;
  chatId?: string;
}

export interface MessageInputConfig {
  enableFileUploads?: boolean;
  enableSpeechRecognition?: boolean;
  enableDragDrop?: boolean;
  enableAutoResize?: boolean;
  enableAnalytics?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
  autoSubmitOnEnter?: boolean;
  enableDebugMode?: boolean;
  enablePerformanceTracking?: boolean;
}

export interface MessageInputStyleConfig {
  variant?: "default" | "compact" | "expanded";
  size?: "sm" | "md" | "lg";
  theme?: "default" | "minimal" | "rounded";
  showAttachmentPreviews?: boolean;
  showCharacterCount?: boolean;
  showFileIcons?: boolean;
  animateTransitions?: boolean;
}

export interface MessageInputObservability {
  onSubmit?: (data: MessageInputSubmitData) => void;
  onFileUpload?: (
    file: MessageInputAttachment,
    context: MessageInputUploadContext,
  ) => void;
  onSpeechStart?: (context: MessageInputSpeechContext) => void;
  onSpeechEnd?: (context: MessageInputSpeechContext) => void;
  onInputChange?: (value: string, context: MessageInputChangeContext) => void;
  onAttachmentRemove?: (attachment: MessageInputAttachment) => void;
  onError?: (error: MessageInputError) => void;
}

export interface MessageInputSubmitData {
  text: string;
  attachments: MessageInputAttachment[];
  timestamp: number;
  chatId?: string;
}

export interface MessageInputUploadContext {
  totalFiles: number;
  uploadedFiles: number;
  totalSize: number;
  uploadTime: number;
}

export interface MessageInputSpeechContext {
  isAvailable: boolean;
  language: string;
  duration: number;
  accuracy?: number;
}

export interface MessageInputChangeContext {
  characterCount: number;
  wordCount: number;
  lineCount: number;
  changeVelocity: number;
  lastChangeTime: number;
}

export interface MessageInputError {
  type: "upload" | "speech" | "validation" | "network";
  message: string;
  details?: any;
}

export interface MessageInputPerformanceMetrics {
  renderTime: number;
  inputResponseTime: number;
  fileUploadTime: number;
  speechRecognitionTime: number;
  totalInteractions: number;
  keystrokes: number;
}

// Context7 Pattern: Resource Pooling - Performance Management
class MessageInputPerformanceManager {
  private static instance: MessageInputPerformanceManager;
  private metrics: Map<string, MessageInputPerformanceMetrics> = new Map();

  static getInstance(): MessageInputPerformanceManager {
    if (!MessageInputPerformanceManager.instance) {
      MessageInputPerformanceManager.instance =
        new MessageInputPerformanceManager();
    }
    return MessageInputPerformanceManager.instance;
  }

  recordRenderTime(inputId: string, renderTime: number): void {
    const existing = this.metrics.get(inputId) || this.createDefaultMetrics();
    this.metrics.set(inputId, { ...existing, renderTime });
  }

  recordInputResponse(inputId: string, responseTime: number): void {
    const existing = this.metrics.get(inputId) || this.createDefaultMetrics();
    this.metrics.set(inputId, {
      ...existing,
      inputResponseTime: responseTime,
      keystrokes: existing.keystrokes + 1,
    });
  }

  recordFileUpload(inputId: string, uploadTime: number): void {
    const existing = this.metrics.get(inputId) || this.createDefaultMetrics();
    this.metrics.set(inputId, { ...existing, fileUploadTime: uploadTime });
  }

  recordInteraction(inputId: string): void {
    const existing = this.metrics.get(inputId) || this.createDefaultMetrics();
    this.metrics.set(inputId, {
      ...existing,
      totalInteractions: existing.totalInteractions + 1,
    });
  }

  getMetrics(inputId: string): MessageInputPerformanceMetrics | null {
    return this.metrics.get(inputId) || null;
  }

  private createDefaultMetrics(): MessageInputPerformanceMetrics {
    return {
      renderTime: 0,
      inputResponseTime: 0,
      fileUploadTime: 0,
      speechRecognitionTime: 0,
      totalInteractions: 0,
      keystrokes: 0,
    };
  }
}

// Context7 Pattern: Resource Pooling - Upload Management
class MessageInputUploadManager {
  private static instance: MessageInputUploadManager;
  private activeUploads: Map<string, Promise<MessageInputAttachment>> =
    new Map();

  static getInstance(): MessageInputUploadManager {
    if (!MessageInputUploadManager.instance) {
      MessageInputUploadManager.instance = new MessageInputUploadManager();
    }
    return MessageInputUploadManager.instance;
  }

  async uploadFile(
    file: File,
    chatId?: string,
  ): Promise<MessageInputAttachment> {
    const uploadId = `${file.name}-${file.size}-${Date.now()}`;

    if (this.activeUploads.has(uploadId)) {
      return this.activeUploads.get(uploadId)!;
    }

    const uploadPromise = this.performUpload(file, chatId);
    this.activeUploads.set(uploadId, uploadPromise);

    try {
      const result = await uploadPromise;
      return result;
    } finally {
      this.activeUploads.delete(uploadId);
    }
  }

  private async performUpload(
    file: File,
    _chatId?: string,
  ): Promise<MessageInputAttachment> {
    // Simulated upload - in real implementation this would call an actual API
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve({
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file), // Temporary URL for preview
          });
        },
        1000 + Math.random() * 2000,
      ); // Simulate upload time
    });
  }
}

// Core Component Props
export interface MessageInputProps {
  data?: MessageInputData;
  config?: MessageInputConfig;
  styleConfig?: MessageInputStyleConfig;
  observability?: MessageInputObservability;
  onSubmit?: (data: MessageInputSubmitData) => Promise<void>;
  onInputChange?: (value: string) => void;
  onAttachmentsChange?: (attachments: MessageInputAttachment[]) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

// Style Variants
const messageInputVariants = cva(
  "relative flex flex-col border-t bg-background transition-colors",
  {
    variants: {
      variant: {
        default: "border-border",
        compact: "border-border/50 bg-muted/30",
        expanded: "border-border shadow-sm rounded-lg border-2",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
      theme: {
        default: "",
        minimal: "border-none bg-transparent",
        rounded: "rounded-xl border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      theme: "default",
    },
  },
);

const textareaVariants = cva(
  "flex-grow resize-none bg-transparent leading-tight transition-all",
  {
    variants: {
      size: {
        sm: "min-h-[2rem] py-1 px-3 text-sm",
        md: "min-h-[2.5rem] py-2 px-4 text-base",
        lg: "min-h-[3rem] py-3 px-5 text-lg",
      },
      variant: {
        default: "border border-input rounded-md focus:ring-2 focus:ring-ring",
        compact: "border-none focus:ring-1 focus:ring-ring/50",
        expanded:
          "border-2 border-input rounded-lg focus:ring-2 focus:ring-ring",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

// Core MessageInput Component
export const MessageInput = forwardRef<HTMLDivElement, MessageInputProps>(
  (
    {
      data = {
        value: "",
        attachments: [],
        placeholder: "Type your message...",
      },
      config = {},
      styleConfig = {},
      observability = {},
      onSubmit,
      onInputChange,
      onAttachmentsChange,
      disabled = false,
      className,
      id = crypto.randomUUID(),
      ...props
    },
    ref,
  ) => {
    // Configuration with defaults
    const finalConfig: MessageInputConfig = useMemo(
      () => ({
        enableFileUploads: true,
        enableSpeechRecognition: false, // Disabled by default for simplicity
        enableDragDrop: true,
        enableAutoResize: true,
        enableAnalytics: true,
        maxFiles: 10,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        acceptedFileTypes: [
          "image/*",
          "application/pdf",
          "text/plain",
          "text/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        autoSubmitOnEnter: true,
        enableDebugMode: process.env.NODE_ENV === "development",
        enablePerformanceTracking: true,
        ...config,
      }),
      [config],
    );

    const finalStyleConfig: MessageInputStyleConfig = useMemo(
      () => ({
        variant: "default",
        size: "md",
        theme: "default",
        showAttachmentPreviews: true,
        showCharacterCount: false,
        showFileIcons: true,
        animateTransitions: true,
        ...styleConfig,
      }),
      [styleConfig],
    );

    // State Management - Resumability Pattern
    const [inputValue, setInputValue] = useState(data.value || "");
    const [attachments, setAttachments] = useState<MessageInputAttachment[]>(
      data.attachments || [],
    );
    const [isUploading, setIsUploading] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    const [error, setError] = useState<string | null>(data.error || null);
    const [performanceMetrics, setPerformanceMetrics] =
      useState<MessageInputPerformanceMetrics | null>(null);

    // Refs
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Resource Pooling - Singleton Managers
    const performanceManager = useMemo(
      () => MessageInputPerformanceManager.getInstance(),
      [],
    );
    const uploadManager = useMemo(
      () => MessageInputUploadManager.getInstance(),
      [],
    );

    // Context7 - Tracing: Component render tracking
    const renderStartTime = useRef(Date.now());
    useEffect(() => {
      if (finalConfig.enablePerformanceTracking) {
        const renderTime = Date.now() - renderStartTime.current;
        performanceManager.recordRenderTime(id, renderTime);
        setPerformanceMetrics(performanceManager.getMetrics(id));

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[MessageInput Context7] Rendered in ${renderTime}ms`, {
            id,
            config: finalConfig,
            styleConfig: finalStyleConfig,
          });
        }
      }
    }, [id, finalConfig, finalStyleConfig, performanceManager]);

    // Context7 - Resumability: Auto-resize functionality
    useEffect(() => {
      if (finalConfig.enableAutoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        const scrollHeight = textarea.scrollHeight;
        const maxHeight = 144; // max-h-36 equivalent
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      }
    }, [inputValue, finalConfig.enableAutoResize]);

    // Context7 - Observability: Input change tracking
    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        const changeTime = Date.now();

        setInputValue(newValue);
        onInputChange?.(newValue);

        if (finalConfig.enableAnalytics) {
          const responseTime = changeTime - renderStartTime.current;
          performanceManager.recordInputResponse(id, responseTime);
          performanceManager.recordInteraction(id);

          // Context7 - Observability: Detailed change context
          const changeContext: MessageInputChangeContext = {
            characterCount: newValue.length,
            wordCount: newValue.trim().split(/\s+/).filter(Boolean).length,
            lineCount: newValue.split("\n").length,
            changeVelocity:
              newValue.length / (changeTime - renderStartTime.current),
            lastChangeTime: changeTime,
          };

          observability.onInputChange?.(newValue, changeContext);

          // Context7 - Tracing: Development debugging
          if (finalConfig.enableDebugMode) {
            console.log(
              `[MessageInput Context7] Input changed:`,
              changeContext,
            );
          }
        }

        setError(null); // Clear errors on input
      },
      [id, finalConfig, observability, onInputChange, performanceManager],
    );

    // Context7 - Modularity: File upload handling
    const handleFileUpload = useCallback(
      async (files: File[]) => {
        if (!finalConfig.enableFileUploads || disabled) return;

        setIsUploading(true);
        const uploadStartTime = Date.now();

        try {
          const validFiles = files.filter((file) => {
            // Size validation
            if (file.size > finalConfig.maxFileSize!) {
              setError(
                `File "${file.name}" is too large. Maximum size is ${finalConfig.maxFileSize! / (1024 * 1024)}MB.`,
              );
              return false;
            }
            return true;
          });

          if (attachments.length + validFiles.length > finalConfig.maxFiles!) {
            setError(`Cannot upload more than ${finalConfig.maxFiles} files.`);
            return;
          }

          const uploadPromises = validFiles.map((file) =>
            uploadManager.uploadFile(file, data.chatId),
          );

          const newAttachments = await Promise.all(uploadPromises);
          const updatedAttachments = [...attachments, ...newAttachments];

          setAttachments(updatedAttachments);
          onAttachmentsChange?.(updatedAttachments);

          // Context7 - Observability: Upload tracking
          const uploadTime = Date.now() - uploadStartTime;
          performanceManager.recordFileUpload(id, uploadTime);

          const uploadContext: MessageInputUploadContext = {
            totalFiles: updatedAttachments.length,
            uploadedFiles: newAttachments.length,
            totalSize: updatedAttachments.reduce(
              (sum, att) => sum + att.size,
              0,
            ),
            uploadTime,
          };

          newAttachments.forEach((attachment) => {
            observability.onFileUpload?.(attachment, uploadContext);
          });

          // Context7 - Tracing: Development debugging
          if (finalConfig.enableDebugMode) {
            console.log(
              `[MessageInput Context7] Files uploaded:`,
              uploadContext,
            );
          }
        } catch (error) {
          const errorObj: MessageInputError = {
            type: "upload",
            message: "Failed to upload files. Please try again.",
            details: error,
          };
          setError(errorObj.message);
          observability.onError?.(errorObj);

          // Context7 - Tracing: Error debugging
          if (finalConfig.enableDebugMode) {
            console.error(`[MessageInput Context7] Upload error:`, errorObj);
          }
        } finally {
          setIsUploading(false);
        }
      },
      [
        finalConfig,
        disabled,
        attachments,
        data.chatId,
        uploadManager,
        onAttachmentsChange,
        id,
        performanceManager,
        observability,
      ],
    );

    // Context7 - Modularity: Attachment removal
    const handleRemoveAttachment = useCallback(
      (attachmentId: string) => {
        const attachment = attachments.find((att) => att.id === attachmentId);
        if (!attachment) return;

        const updatedAttachments = attachments.filter(
          (att) => att.id !== attachmentId,
        );
        setAttachments(updatedAttachments);
        onAttachmentsChange?.(updatedAttachments);
        observability.onAttachmentRemove?.(attachment);

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(
            `[MessageInput Context7] Attachment removed:`,
            attachment,
          );
        }
      },
      [attachments, onAttachmentsChange, observability, finalConfig],
    );

    // Context7 - Modularity: Form submission
    const handleSubmit = useCallback(
      async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (disabled || isUploading) return;
        if (!inputValue.trim() && attachments.length === 0) return;

        const submitData: MessageInputSubmitData = {
          text: inputValue.trim(),
          attachments,
          timestamp: Date.now(),
          chatId: data.chatId,
        };

        try {
          await onSubmit?.(submitData);
          observability.onSubmit?.(submitData);

          // Clear form on successful submission
          setInputValue("");
          setAttachments([]);
          setError(null);

          // Context7 - Tracing: Development debugging
          if (finalConfig.enableDebugMode) {
            console.log(
              `[MessageInput Context7] Message submitted:`,
              submitData,
            );
          }
        } catch (error) {
          const errorObj: MessageInputError = {
            type: "network",
            message: "Failed to send message. Please try again.",
            details: error,
          };
          setError(errorObj.message);
          observability.onError?.(errorObj);
        }
      },
      [
        disabled,
        isUploading,
        inputValue,
        attachments,
        data.chatId,
        onSubmit,
        observability,
        finalConfig,
      ],
    );

    // Context7 - Modularity: Keyboard handling
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && finalConfig.autoSubmitOnEnter) {
          e.preventDefault();
          formRef.current?.requestSubmit();
        }
      },
      [finalConfig.autoSubmitOnEnter],
    );

    // Context7 - Modularity: Drag and drop handling
    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        if (!finalConfig.enableDragDrop || disabled) return;
        e.preventDefault();
        setIsDragActive(true);
      },
      [finalConfig.enableDragDrop, disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);

        if (!finalConfig.enableDragDrop || disabled) return;

        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
      },
      [finalConfig.enableDragDrop, disabled, handleFileUpload],
    );

    // Context7 - Modularity: File input handling
    const handleFileInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        handleFileUpload(Array.from(files));

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [handleFileUpload],
    );

    const handleFileButtonClick = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    // Context7 - Modularity: File type icon
    const getFileIcon = useCallback((fileType: string) => {
      if (fileType.startsWith("image/")) return <Image className="h-3 w-3" />;
      if (fileType.includes("spreadsheet") || fileType.includes("csv"))
        return <FileSpreadsheet className="h-3 w-3" />;
      return <FileText className="h-3 w-3" />;
    }, []);

    // Style classes
    const containerClasses = messageInputVariants({
      variant: finalStyleConfig.variant,
      size: finalStyleConfig.size,
      theme: finalStyleConfig.theme,
    });

    const textareaClasses = textareaVariants({
      variant: finalStyleConfig.variant,
      size: finalStyleConfig.size,
    });

    return (
      <div
        ref={ref}
        className={cn(
          containerClasses,
          isDragActive && "bg-primary/5 border-primary",
          className,
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...props}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={finalConfig.acceptedFileTypes?.join(",")}
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Error display */}
          {error && (
            <div className="p-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md">
              {error}
            </div>
          )}

          {/* Attachments display */}
          {attachments.length > 0 &&
            finalStyleConfig.showAttachmentPreviews && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-1.5 text-xs bg-muted rounded-md px-2 py-1"
                  >
                    {finalStyleConfig.showFileIcons &&
                      getFileIcon(attachment.type)}
                    <span className="max-w-[150px] truncate">
                      {attachment.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          {/* Input area */}
          <div className="relative flex items-end gap-2">
            {/* Attach button */}
            {finalConfig.enableFileUploads && (
              <button
                type="button"
                onClick={handleFileButtonClick}
                disabled={disabled || isUploading}
                className="text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors p-1"
              >
                <Paperclip className="h-4 w-4" />
              </button>
            )}

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={data.placeholder}
              disabled={disabled || isUploading}
              className={cn(textareaClasses, "pr-12")}
              rows={1}
            />

            {/* Send button */}
            <div className="absolute right-1 bottom-1">
              <button
                type="submit"
                disabled={
                  disabled ||
                  isUploading ||
                  (!inputValue.trim() && attachments.length === 0)
                }
                className="text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors p-1"
              >
                {data.isLoading ? (
                  <StopCircle className="h-4 w-4" />
                ) : (
                  <SendHorizontal className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Character count */}
          {finalStyleConfig.showCharacterCount && data.maxLength && (
            <div className="text-xs text-muted-foreground text-right">
              {inputValue.length}/{data.maxLength}
            </div>
          )}
        </form>

        {/* Performance metrics in development */}
        {finalConfig.enableDebugMode && performanceMetrics && (
          <div className="mt-2 p-2 text-xs bg-muted/50 rounded border text-muted-foreground">
            <div>Render: {performanceMetrics.renderTime}ms</div>
            <div>Input Response: {performanceMetrics.inputResponseTime}ms</div>
            <div>Interactions: {performanceMetrics.totalInteractions}</div>
            <div>Keystrokes: {performanceMetrics.keystrokes}</div>
          </div>
        )}
      </div>
    );
  },
);

MessageInput.displayName = "MessageInput";

// Context7 Pattern: Modularity - Factory Functions
export const createMessageInput = {
  simple: (placeholder?: string): MessageInputProps => ({
    data: {
      value: "",
      attachments: [],
      placeholder: placeholder || "Type a message...",
    },
    config: {
      enableFileUploads: false,
      enableSpeechRecognition: false,
      enableDragDrop: false,
    },
    styleConfig: { variant: "compact", theme: "minimal" },
  }),

  chat: (chatId?: string): MessageInputProps => ({
    data: {
      value: "",
      attachments: [],
      chatId,
      placeholder: "Type your message...",
    },
    config: {
      enableFileUploads: true,
      enableDragDrop: true,
      maxFiles: 5,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    },
    styleConfig: { variant: "default", showAttachmentPreviews: true },
  }),

  advanced: (chatId?: string): MessageInputProps => ({
    data: {
      value: "",
      attachments: [],
      chatId,
      placeholder: "Type your message...",
    },
    config: {
      enableFileUploads: true,
      enableSpeechRecognition: true,
      enableDragDrop: true,
      enableAnalytics: true,
      maxFiles: 10,
    },
    styleConfig: {
      variant: "expanded",
      showAttachmentPreviews: true,
      showCharacterCount: true,
      showFileIcons: true,
    },
  }),

  compact: (): MessageInputProps => ({
    data: { value: "", attachments: [], placeholder: "Message..." },
    config: {
      enableFileUploads: false,
      enableAutoResize: false,
    },
    styleConfig: { variant: "compact", size: "sm" },
  }),
};

// Context7 Pattern: Modularity - Composition Helpers
export const MessageInputComposed = {
  ChatInput: createMessageInput.chat(),
  SimpleInput: createMessageInput.simple(),
  AdvancedInput: createMessageInput.advanced(),
  CompactInput: createMessageInput.compact(),
};

export type MessageInputVariantProps = VariantProps<
  typeof messageInputVariants
>;
export type MessageInputRef = HTMLDivElement;
