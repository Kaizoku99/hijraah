"use client";

import {
  Paperclip,
  SendHorizonal,
  StopCircle,
  X,
  Mic,
  MicOff,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useI18n } from "@/i18n/hooks";
import { cn } from "@/lib/utils";

import { ExtendedAttachment } from "./types";

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
}: UnifiedMessageInputProps) {
  const { toast } = useToast();
  const { locale, t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const { session, user, isLoading: isSessionLoading } = useSession();

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
      let message = t("chat.speechRecognition.errors.general");
      if (error === "not-allowed" || error === "service-not-allowed") {
        message = t("chat.speechRecognition.errors.notAllowed");
      } else if (error === "no-speech") {
        message = t("chat.speechRecognition.errors.noSpeech");
      } else if (error === "network") {
        message = t("chat.speechRecognition.errors.network");
      } else if (error === "not-available") {
        message = t("chat.speechRecognition.errors.notAvailable");
      }
      setSpeechError(message);
      // Optionally show a toast as well
      toast({
        title: t("error"),
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

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-t bg-background", // Added bg-background
        isDraggingOver &&
          "after:absolute after:inset-0 after:bg-primary/10 after:border-2 after:border-dashed after:border-primary after:rounded-md after:z-10"
      )}
    >
      <form
        ref={formRef}
        onSubmit={(e) => {
          if (!isRecording) {
            handleSubmit(e);
          } else {
            e.preventDefault(); // Prevent form submission if recording
          }
        }}
        className="relative flex flex-col p-2" // Add padding
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
        <div className="relative flex items-end gap-2">
          {/* Attach Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isLoading || isRecording}
            className="text-muted-foreground flex-shrink-0"
            onClick={handleFileButtonClick}
            aria-label={t("chat.input.attachFile")}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Textarea */}
          <Textarea
            ref={inputRef}
            tabIndex={0}
            placeholder={
              isRecording
                ? t("chat.input.recordingPlaceholder")
                : t("chat.input.placeholder")
            }
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="flex-grow resize-none self-end max-h-36 min-h-[2.5rem] pr-20 py-2 leading-tight"
            rows={1}
            disabled={isLoading || isRecording}
          />
          {/* Absolute positioned buttons inside the relative container */}
          <div className="absolute right-2 bottom-1 flex items-center gap-1">
            {/* Mic Button - Conditionally Render based on availability */}
            {isSpeechAvailable ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isLoading} // Disable mic if AI is responding
                className={cn(
                  "text-muted-foreground",
                  isRecording && "text-red-500 animate-pulse"
                )}
                onClick={isRecording ? stopRecording : startRecording}
                aria-label={
                  isRecording
                    ? t("chat.input.stopRecording")
                    : t("chat.input.startRecording")
                }
              >
                {isRecording ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled
                title={t("chat.input.speechUnavailable")}
              >
                <MicOff className="h-5 w-5 text-muted-foreground/50" />
              </Button>
            )}

            {/* Send/Stop Button */}
            {isLoading ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={stop}
                aria-label={t("chat.input.stop")}
              >
                <StopCircle className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                disabled={
                  (!input.trim() && attachments.length === 0) || isRecording
                }
                aria-label={t("chat.input.send")}
              >
                <SendHorizonal className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
