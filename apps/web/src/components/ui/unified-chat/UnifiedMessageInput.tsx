"use client";

import {
  Paperclip,
  SendHorizonal,
  StopCircle,
  X,
  Mic,
  MicOff,
  Play,
} from "lucide-react";
import { useSession } from "@/lib/auth/hooks";
import {
  useState,
  useRef,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useChatContext } from "@/hooks/useChatContext";
import { useModelManager } from "@/hooks/useModelManager";
import { useI18n } from "@/i18n/hooks";
import { cn } from "@/lib/utils";

import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
} from "./ai-elements";

// Import the correct type from the types file
import { ExtendedAttachment } from "@/types/components";

interface UnifiedMessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  stop: () => void;
  attachments: ExtendedAttachment[];
  setAttachments: (attachments: ExtendedAttachment[]) => void;
  chatId: string;
  chatError: string | null;
  selectedModel?: string; // Optional - for external control, but auto-selected if not provided
  onModelChange?: (model: string) => void; // Optional - for external model change notifications
  chatContext?: "general" | "visa" | "documents" | "eligibility" | "timeline" | "legal" | "family" | "work" | "study" | "business";
  resumeStream?: () => void; // Add resume function
}

export function UnifiedMessageInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  stop,
  attachments,
  setAttachments,
  chatId,
  chatError,
  selectedModel: externalSelectedModel,
  onModelChange: externalOnModelChange,
  chatContext,
  resumeStream,
}: UnifiedMessageInputProps) {
  const { toast } = useToast();
  const { locale, t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const { session, user, isLoading: isSessionLoading } = useSession();
  const modelChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Context7 - Smart context and model management
  const contextInfo = useChatContext(chatContext);
  const {
    selectedModel: internalSelectedModel,
    setSelectedModel: setInternalSelectedModel,
    availableModels,
    currentModel,
    suggestOptimalModel,
  } = useModelManager(externalSelectedModel || contextInfo.suggestedModel);

  // Use external model if provided, otherwise use internal management
  const selectedModel = externalSelectedModel || internalSelectedModel;
  const handleModelChange = (model: string) => {
    if (externalOnModelChange) {
      externalOnModelChange(model);
    } else {
      setInternalSelectedModel(model);
    }
  };

  // Context7 - Dynamic placeholder based on context and auto-selected model
  const getContextualPlaceholder = () => {
    if (isRecording) {
      return t("chat.input.recordingPlaceholder") || "Listening... Speak now";
    }
    
    // Smart placeholder based on current context and selected model
    const basePlaceholder = contextInfo.placeholder || t("chat.input.placeholder") || "Ask me anything about immigration...";
    
    // Add subtle model indicator to placeholder for complex contexts
    if (contextInfo.context === 'legal' || contextInfo.context === 'eligibility') {
      return basePlaceholder + " (AI will analyze deeply)";
    } else if (contextInfo.context === 'documents') {
      return basePlaceholder + " (AI will examine thoroughly)";
    }
    
    return basePlaceholder;
  };

  // --- Integrate Speech Recognition Hook with locale support ---
  const {
    isRecording,
    startRecording,
    stopRecording,
    isAvailable: isSpeechAvailable,
  } = useSpeechRecognition({
    locale,
    onResult: (transcript) => {
      setInput(transcript); // Directly set input, assuming continuous results update
      setSpeechError(null);
    },
    onError: (error) => {
      console.error("Speech recognition error in component:", error);
      let message = t("chat.speechRecognition.errors.general") || "Speech recognition error occurred";
      if (error === "not-allowed" || error === "service-not-allowed") {
        message = t("chat.speechRecognition.errors.notAllowed") || "Microphone access denied";
      } else if (error === "no-speech") {
        message = t("chat.speechRecognition.errors.noSpeech") || "No speech detected";
      } else if (error === "network") {
        message = t("chat.speechRecognition.errors.network") || "Network error during speech recognition";
      } else if (error === "not-available") {
        message = t("chat.speechRecognition.errors.notAvailable") || "Speech recognition not available";
      }
      setSpeechError(message);
      // Optionally show a toast as well
      toast({
        title: t("error") || "Error",
        description: message,
        variant: "destructive",
      });
    },
    onEnd: () => {
      // Recording ended (manually or automatically)
      inputRef.current?.focus(); // Focus input when recording stops
    },
  });
  // -----------------------------------------

  const { getRootProps, getInputProps: getDropzoneInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB max file size
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDragEnter: () => setIsDraggingOver(true),
    onDragLeave: () => setIsDraggingOver(false),
    onDrop: async (acceptedFiles, rejectedFiles) => {
      setIsDraggingOver(false);

      // Handle rejected files (too large or wrong type)
      if (rejectedFiles.length > 0) {
        toast({
          title: "File upload failed",
          description:
            "Some files were rejected due to size or type restrictions",
          variant: "destructive",
        });
      }

      if (acceptedFiles.length === 0) return;

      try {
        // Process each file
        const newAttachments = await Promise.all(
          acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("chatId", chatId);

            const response = await fetch("/api/files/upload", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`Failed to upload file: ${file.name}`);
            }

            const data = await response.json();

            return {
              id: data.id,
              name: file.name,
              type: file.type,
              size: file.size,
              url: data.url,
              status: "uploaded" as const,
            } as ExtendedAttachment;
          })
        );

        setAttachments([...attachments, ...newAttachments]);
        toast({
          title: "Files uploaded",
          description: `Successfully uploaded ${acceptedFiles.length} file(s)`,
        });
      } catch (error) {
        console.error("Error uploading files:", error);
        toast({
          title: "Upload failed",
          description: "Failed to upload files. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  // Auto-resize textarea (Added from AIMessageInput logic)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const scrollHeight = inputRef.current.scrollHeight;
      // Set a max height (e.g., 144px corresponding to max-h-36)
      const maxHeight = 144;
      inputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isRecording) {
        // Prevent submission while recording
        formRef.current?.requestSubmit();
      }
    }
  };

  // File handling via button click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Reuse the dropzone's upload logic for consistency
    // NOTE: This assumes the onDrop logic handles the actual upload
    // We need to adapt the `onDrop` logic slightly or duplicate parts of it.
    // For simplicity here, we'll call a simulated upload function.
    await handleFileUpload(Array.from(files));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Extracted file upload logic (adapt from onDrop)
  const handleFileUpload = async (filesToUpload: File[]) => {
    try {
      // Log session status before making the request
      console.log("Session status before upload:", isSessionLoading);
      console.log("Session data before upload:", session);

      const newAttachments = await Promise.all(
        filesToUpload.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("chatId", chatId);
          const response = await fetch("/api/files/upload", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            throw new Error(`Failed to upload file: ${file.name}`);
          }
          const data = await response.json();
          return {
            id: data.id,
            name: file.name,
            type: file.type,
            size: file.size,
            url: data.url,
            status: "uploaded" as const,
          } as ExtendedAttachment;
        })
      );
      setAttachments([...attachments, ...newAttachments]);
      toast({
        title: "Files uploaded",
        description: `Uploaded ${filesToUpload.length} file(s)`,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((file) => file.id !== id));
  };

  // Clear speech error when user types
  useEffect(() => {
    if (input && speechError) {
      setSpeechError(null);
    }
  }, [input, speechError]);

  // Context7 - Automatic model selection based on input analysis and context
  const selectOptimalModel = (input: string, context: string, attachments: ExtendedAttachment[]) => {
    // Analyze input complexity and requirements
    const isComplexQuery = input.length > 200 || 
                          input.includes('analyze') || 
                          input.includes('compare') || 
                          input.includes('explain') ||
                          input.includes('requirements') ||
                          input.includes('eligibility');
                          
    const hasDocuments = attachments.some(att => 
      att.type === 'application/pdf' || 
      att.type === 'document'
    );
    
    const hasImages = attachments.some(att => att.type.startsWith('image/'));
    
    // Context-based model selection
    let optimalModel: string;
    
    if (hasDocuments || hasImages) {
      // Use vision-capable models for documents and images
      optimalModel = "gateway:reasoning-large";
    } else if (context === 'legal' || context === 'eligibility' || isComplexQuery) {
      // Use reasoning models for complex analysis
      optimalModel = "gateway:reasoning-claude";
    } else if (context === 'documents' || context === 'visa') {
      // Use balanced models for document and visa queries
      optimalModel = "gateway:reasoning-large";
    } else if (input.length < 50 && !isComplexQuery) {
      // Use fast models for simple, short queries
      optimalModel = "gateway:chat-fast";
    } else {
      // Default to balanced model
      optimalModel = "gateway:chat-balanced";
    }
    
    console.log('🤖 Auto-selected model:', optimalModel, {
      inputLength: input.length,
      context,
      isComplex: isComplexQuery,
      hasDocuments,
      hasImages
    });
    
    return optimalModel;
  };

  // Context7 - Auto-select optimal model based on context and input changes (with debouncing)
  useEffect(() => {
    // Clear existing timeout
    if (modelChangeTimeoutRef.current) {
      clearTimeout(modelChangeTimeoutRef.current);
    }

    // Debounce model changes to prevent excessive switching while typing
    const timeout = setTimeout(() => {
      if (input.trim() || attachments.length > 0) {
        const optimalModel = selectOptimalModel(input, contextInfo.context, attachments);
        
        // Only change model if it's different and beneficial
        if (optimalModel !== selectedModel) {
          if (externalOnModelChange) {
            externalOnModelChange(optimalModel);
          } else {
            setInternalSelectedModel(optimalModel);
          }
        }
      } else {
        // Default to context suggestion when no input
        const contextModel = contextInfo.suggestedModel;
        if (contextModel && contextModel !== selectedModel) {
          if (externalOnModelChange) {
            externalOnModelChange(contextModel);
          } else {
            setInternalSelectedModel(contextModel);
          }
        }
      }
    }, 1000); // 1 second debounce

    modelChangeTimeoutRef.current = timeout;

    // Cleanup on unmount
    return () => {
      if (modelChangeTimeoutRef.current) {
        clearTimeout(modelChangeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, attachments, contextInfo.context, contextInfo.suggestedModel, selectedModel, externalOnModelChange]);

  // Context7 - Ensure a model is always selected with debug logging
  useEffect(() => {
    console.log('Model Manager State:', {
      selectedModel,
      availableModels: availableModels.map(m => ({ value: m.value, label: m.label, isAvailable: m.isAvailable })),
      contextSuggestion: contextInfo.suggestedModel,
      externalModel: externalSelectedModel
    });

    if (!selectedModel && availableModels.length > 0) {
      // If no model is selected, use the first available or context suggestion
      const defaultModel = contextInfo.suggestedModel || availableModels[0].value;
      console.log('Setting default model:', defaultModel);
      
      if (externalOnModelChange) {
        externalOnModelChange(defaultModel);
      } else {
        setInternalSelectedModel(defaultModel);
      }
    }
  }, [selectedModel, availableModels, contextInfo.suggestedModel, externalOnModelChange, setInternalSelectedModel, externalSelectedModel]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-t bg-background",
        isDraggingOver &&
          "after:absolute after:inset-0 after:bg-primary/10 after:border-2 after:border-dashed after:border-primary after:rounded-md after:z-10"
      )}
    >
      <PromptInput
        onSubmit={(e) => {
          if (!isRecording) {
            handleSubmit(e);
          } else {
            e.preventDefault();
          }
        }}
      >
        {/* Hidden inputs */}
        <input {...getDropzoneInputProps()} />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*,.pdf,.txt,.csv,.xlsx,.docx"
          onChange={handleFileChange}
        />

        {/* Combined Error Display Area */}
        {(chatError || speechError) && (
          <div className="mb-2 p-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md">
            {chatError && <div>{chatError}</div>}
            {speechError && <div>{speechError}</div>}
          </div>
        )}

        {/* Model Selection Indicator - Shows current model in subtle way */}
        {selectedModel && currentModel && (
          <div className="mb-1 text-xs text-muted-foreground flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {t("chat.model.using") || "Using"} {currentModel.label}
            {currentModel.tier === 'advanced' && <span className="text-purple-500">⚡</span>}
            {currentModel.tier === 'fast' && <span className="text-yellow-500">🚀</span>}
          </div>
        )}

        {/* Attachments display */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-1.5 text-xs bg-muted rounded-md px-2 py-1"
              >
                <span className="max-w-[150px] truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4"
                  onClick={() => removeAttachment(file.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <PromptInputTextarea
          ref={inputRef}
          placeholder={getContextualPlaceholder()}
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          disabled={isLoading || isRecording}
          minHeight={40}
          maxHeight={144}
        />

        <PromptInputToolbar>
          <PromptInputTools>
            {/* Attach Button */}
            <PromptInputButton
              disabled={isLoading || isRecording}
              onClick={handleFileButtonClick}
            >
              <Paperclip className="h-4 w-4" />
            </PromptInputButton>

            {/* Resume Button - Shows when there might be interrupted streams */}
            {resumeStream && !isLoading && (
              <PromptInputButton
                onClick={resumeStream}
                title={t("chat.resume.tooltip") || "Resume interrupted stream"}
                className="text-blue-500 hover:text-blue-700"
              >
                <Play className="h-4 w-4" />
              </PromptInputButton>
            )}

            {/* Mic Button */}
            {isSpeechAvailable ? (
              <PromptInputButton
                disabled={isLoading}
                onClick={isRecording ? stopRecording : startRecording}
                className={cn(isRecording && "text-red-500 animate-pulse")}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </PromptInputButton>
            ) : (
              <PromptInputButton
                disabled
                title={t("chat.input.speechUnavailable") || "Speech recognition not available"}
              >
                <MicOff className="h-4 w-4 text-muted-foreground/50" />
              </PromptInputButton>
            )}
          </PromptInputTools>

          {/* Send/Stop Button */}
          <PromptInputSubmit
            status={isLoading ? "streaming" : "idle"}
            disabled={
              (!input.trim() && attachments.length === 0) || isRecording
            }
            onClick={isLoading ? stop : undefined}
          >
            {isLoading ? (
              <StopCircle className="h-4 w-4" />
            ) : (
              <SendHorizonal className="h-4 w-4" />
            )}
          </PromptInputSubmit>
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}
