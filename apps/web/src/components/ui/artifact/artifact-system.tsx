"use client";

import { formatDistance } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  type Dispatch,
  memo,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useSWR, { useSWRConfig } from "swr";
import { useDebounceCallback, useWindowSize } from "usehooks-ts";
import {
  createTracedOperation,
  chatTracing,
} from "@/lib/observability/tracing";
import { fetcher } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { textArtifact } from "./artifacts/text-artifact";
import { codeArtifact } from "./artifacts/code-artifact";
import { imageArtifact } from "./artifacts/image-artifact";
import { sheetArtifact } from "./artifacts/sheet-artifact";
import { ArtifactActions } from "./artifact-actions";
import { ArtifactCloseButton } from "./artifact-close-button";
import { ArtifactMessages } from "./artifact-messages";
import { ArtifactToolbar } from "./artifact-toolbar";
import { VersionFooter } from "./version-footer";
import equal from "fast-deep-equal";

// Context7 - Data-as-Code: Artifact type definitions
export const artifactDefinitions = [
  textArtifact,
  codeArtifact,
  imageArtifact,
  sheetArtifact,
];

export type ArtifactKind = (typeof artifactDefinitions)[number]["kind"];

// Context7 - Data-as-Code: Structured artifact interface
export interface UIArtifact {
  title: string;
  documentId: string;
  kind: ArtifactKind;
  content: string;
  isVisible: boolean;
  status: "streaming" | "idle";
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

// Context7 - Data-as-Code: Document interface
export interface Document {
  id: string;
  content: string;
  title: string;
  kind: ArtifactKind;
  createdAt: Date;
  userId: string;
}

// Context7 - Data-as-Code: Vote interface
export interface Vote {
  id: string;
  messageId: string;
  userId: string;
  isUpvoted: boolean;
  createdAt: Date;
}

// Context7 - Provider Isolation: Artifact hook interface
export interface ArtifactHookResult {
  artifact: UIArtifact;
  setArtifact: Dispatch<SetStateAction<UIArtifact>>;
  metadata: any;
  setMetadata: Dispatch<SetStateAction<any>>;
}

// Context7 - Provider Isolation: Chat helpers interface
export interface ChatHelpers {
  status: "idle" | "loading" | "error";
  stop: () => void;
  sendMessage: (message: any) => void;
  regenerate: () => void;
  setMessages: Dispatch<SetStateAction<any[]>>;
}

// Context7 - Data-as-Code: Attachment interface
export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

// Context7 - Modularity: Main artifact component props
interface ArtifactSystemProps {
  chatId: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: ChatHelpers["status"];
  stop: ChatHelpers["stop"];
  attachments: Attachment[];
  setAttachments: Dispatch<SetStateAction<Attachment[]>>;
  messages: any[];
  setMessages: ChatHelpers["setMessages"];
  votes: Array<Vote> | undefined;
  sendMessage: ChatHelpers["sendMessage"];
  regenerate: ChatHelpers["regenerate"];
  isReadonly: boolean;
  selectedVisibilityType: string;
  artifact: UIArtifact;
  setArtifact: Dispatch<SetStateAction<UIArtifact>>;
  metadata: any;
  setMetadata: Dispatch<SetStateAction<any>>;
}

/**
 * Context7-compliant artifact system component
 * Observability: Enhanced tracing and metrics
 * Modularity: Clean separation of concerns
 * Provider Isolation: Abstracted data fetching
 */
function ArtifactSystemCore({
  chatId,
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  votes,
  sendMessage,
  regenerate,
  isReadonly,
  selectedVisibilityType,
  artifact,
  setArtifact,
  metadata,
  setMetadata,
}: ArtifactSystemProps) {
  // Context7 - Provider Isolation: Document fetching with tracing
  const {
    data: documents,
    isLoading: isDocumentsFetching,
    mutate: mutateDocuments,
  } = useSWR<Array<Document>>(
    artifact.documentId !== "init" && artifact.status !== "streaming"
      ? `/api/document?id=${artifact.documentId}`
      : null,
    async (url) => {
      return createTracedOperation(
        {
          name: "artifact.fetch_documents",
          chatId,
          attributes: {
            "artifact.document_id": artifact.documentId,
            "artifact.kind": artifact.kind,
          },
        },
        async (span) => {
          const result = await fetcher(url);
          span.setAttributes({
            "artifact.documents_count": result?.length || 0,
          });
          return result;
        },
      );
    },
  );

  const [mode, setMode] = useState<"edit" | "diff">("edit");
  const [document, setDocument] = useState<Document | null>(null);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);
  const [isContentDirty, setIsContentDirty] = useState(false);

  const { open: isSidebarOpen } = useSidebar();
  const { mutate } = useSWRConfig();

  // Context7 - Observability: Document state management with tracing
  useEffect(() => {
    if (documents && documents.length > 0) {
      createTracedOperation(
        {
          name: "artifact.update_document_state",
          chatId,
          attributes: {
            "artifact.documents_count": documents.length,
            "artifact.kind": artifact.kind,
          },
        },
        async (span) => {
          const mostRecentDocument = documents.at(-1);

          if (mostRecentDocument) {
            setDocument(mostRecentDocument);
            setCurrentVersionIndex(documents.length - 1);
            setArtifact((currentArtifact) => ({
              ...currentArtifact,
              content: mostRecentDocument.content ?? "",
            }));

            span.setAttributes({
              "artifact.current_version": documents.length - 1,
              "artifact.content_length":
                mostRecentDocument.content?.length || 0,
            });
          }
        },
      );
    }
  }, [documents, setArtifact, chatId, artifact.kind]);

  useEffect(() => {
    mutateDocuments();
  }, [artifact.status, mutateDocuments]);

  // Context7 - Provider Isolation: Content saving with observability
  const handleContentChange = useCallback(
    (updatedContent: string) => {
      if (!artifact) return;

      return createTracedOperation(
        {
          name: "artifact.save_content",
          chatId,
          attributes: {
            "artifact.document_id": artifact.documentId,
            "artifact.kind": artifact.kind,
            "artifact.content_length": updatedContent.length,
          },
        },
        async (span) => {
          mutate<Array<Document>>(
            `/api/document?id=${artifact.documentId}`,
            async (currentDocuments) => {
              if (!currentDocuments) return undefined;

              const currentDocument = currentDocuments.at(-1);

              if (!currentDocument || !currentDocument.content) {
                setIsContentDirty(false);
                return currentDocuments;
              }

              if (currentDocument.content !== updatedContent) {
                // Context7 - Tracing: External API call
                await createTracedOperation(
                  {
                    name: "artifact.api.save_document",
                    attributes: {
                      "http.method": "POST",
                      "artifact.document_id": artifact.documentId,
                    },
                  },
                  async (apiSpan) => {
                    const response = await fetch(
                      `/api/document?id=${artifact.documentId}`,
                      {
                        method: "POST",
                        body: JSON.stringify({
                          title: artifact.title,
                          content: updatedContent,
                          kind: artifact.kind,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      },
                    );

                    apiSpan.setAttributes({
                      "http.status_code": response.status,
                    });

                    if (!response.ok) {
                      throw new Error(`Save failed: ${response.status}`);
                    }
                  },
                );

                setIsContentDirty(false);

                const newDocument = {
                  ...currentDocument,
                  content: updatedContent,
                  createdAt: new Date(),
                };

                span.setAttributes({
                  "artifact.save_success": true,
                });

                return [...currentDocuments, newDocument];
              }
              return currentDocuments;
            },
            { revalidate: false },
          );
        },
      );
    },
    [artifact, mutate, chatId],
  );

  const debouncedHandleContentChange = useDebounceCallback(
    handleContentChange,
    2000,
  );

  // Context7 - Modularity: Content saving abstraction
  const saveContent = useCallback(
    (updatedContent: string, debounce: boolean) => {
      if (document && updatedContent !== document.content) {
        setIsContentDirty(true);

        if (debounce) {
          debouncedHandleContentChange(updatedContent);
        } else {
          handleContentChange(updatedContent);
        }
      }
    },
    [document, debouncedHandleContentChange, handleContentChange],
  );

  // Context7 - Data-as-Code: Version management
  function getDocumentContentById(index: number) {
    if (!documents) return "";
    if (!documents[index]) return "";
    return documents[index].content ?? "";
  }

  const handleVersionChange = (type: "next" | "prev" | "toggle" | "latest") => {
    createTracedOperation(
      {
        name: "artifact.version_change",
        chatId,
        attributes: {
          "artifact.version_action": type,
          "artifact.current_version": currentVersionIndex,
          "artifact.total_versions": documents?.length || 0,
        },
      },
      async (span) => {
        if (!documents) return;

        if (type === "latest") {
          setCurrentVersionIndex(documents.length - 1);
          setMode("edit");
        }

        if (type === "toggle") {
          setMode((mode) => (mode === "edit" ? "diff" : "edit"));
        }

        if (type === "prev") {
          if (currentVersionIndex > 0) {
            setCurrentVersionIndex((index) => index - 1);
          }
        } else if (type === "next") {
          if (currentVersionIndex < documents.length - 1) {
            setCurrentVersionIndex((index) => index + 1);
          }
        }

        span.setAttributes({
          "artifact.new_version": currentVersionIndex,
          "artifact.new_mode": mode,
        });
      },
    );
  };

  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  // Context7 - Data-as-Code: Version state computation
  const isCurrentVersion =
    documents && documents.length > 0
      ? currentVersionIndex === documents.length - 1
      : true;

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;

  // Context7 - Provider Isolation: Artifact definition lookup
  const artifactDefinition = artifactDefinitions.find(
    (definition) => definition.kind === artifact.kind,
  );

  if (!artifactDefinition) {
    throw new Error(`Artifact definition not found for kind: ${artifact.kind}`);
  }

  // Context7 - Observability: Artifact initialization with tracing
  useEffect(() => {
    if (artifact.documentId !== "init") {
      if (artifactDefinition.initialize) {
        createTracedOperation(
          {
            name: "artifact.initialize",
            chatId,
            attributes: {
              "artifact.kind": artifact.kind,
              "artifact.document_id": artifact.documentId,
            },
          },
          async (span) => {
            await artifactDefinition.initialize!({
              documentId: artifact.documentId,
              setMetadata,
            });
          },
        );
      }
    }
  }, [
    artifact.documentId,
    artifactDefinition,
    setMetadata,
    chatId,
    artifact.kind,
  ]);

  return (
    <AnimatePresence>
      {artifact.isVisible && (
        <motion.div
          data-testid="artifact-system"
          className="flex flex-row h-dvh w-dvw fixed top-0 left-0 z-50 bg-transparent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.4 } }}
        >
          {/* Context7 - Responsive Design: Desktop background */}
          {!isMobile && (
            <motion.div
              className="fixed bg-background h-dvh"
              initial={{
                width: isSidebarOpen ? windowWidth - 256 : windowWidth,
                right: 0,
              }}
              animate={{ width: windowWidth, right: 0 }}
              exit={{
                width: isSidebarOpen ? windowWidth - 256 : windowWidth,
                right: 0,
              }}
            />
          )}

          {/* Context7 - Modularity: Chat panel (desktop only) */}
          {!isMobile && (
            <motion.div
              className="relative w-[400px] bg-muted dark:bg-background h-dvh shrink-0"
              initial={{ opacity: 0, x: 10, scale: 1 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }}
              exit={{
                opacity: 0,
                x: 0,
                scale: 1,
                transition: { duration: 0 },
              }}
            >
              <AnimatePresence>
                {!isCurrentVersion && (
                  <motion.div
                    className="left-0 absolute h-dvh w-[400px] top-0 bg-zinc-900/50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              <div className="flex flex-col h-full justify-between items-center">
                <ArtifactMessages
                  chatId={chatId}
                  status={status}
                  votes={votes}
                  messages={messages}
                  setMessages={setMessages}
                  regenerate={regenerate}
                  isReadonly={isReadonly}
                  artifactStatus={artifact.status}
                />

                <form className="flex flex-row gap-2 relative items-end w-full px-4 pb-4">
                  {/* TODO: Import MultimodalInput component */}
                  <div className="w-full p-4 border rounded-lg bg-background">
                    <span className="text-muted-foreground">
                      Chat input placeholder - MultimodalInput component needed
                    </span>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Context7 - Modularity: Main artifact content panel */}
          <motion.div
            className="fixed dark:bg-muted bg-background h-dvh flex flex-col overflow-y-scroll md:border-l dark:border-zinc-700 border-zinc-200"
            initial={
              isMobile
                ? {
                    opacity: 1,
                    x: artifact.boundingBox.left,
                    y: artifact.boundingBox.top,
                    height: artifact.boundingBox.height,
                    width: artifact.boundingBox.width,
                    borderRadius: 50,
                  }
                : {
                    opacity: 1,
                    x: artifact.boundingBox.left,
                    y: artifact.boundingBox.top,
                    height: artifact.boundingBox.height,
                    width: artifact.boundingBox.width,
                    borderRadius: 50,
                  }
            }
            animate={
              isMobile
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    height: windowHeight,
                    width: windowWidth ? windowWidth : "calc(100dvw)",
                    borderRadius: 0,
                    transition: {
                      delay: 0,
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      duration: 5000,
                    },
                  }
                : {
                    opacity: 1,
                    x: 400,
                    y: 0,
                    height: windowHeight,
                    width: windowWidth
                      ? windowWidth - 400
                      : "calc(100dvw-400px)",
                    borderRadius: 0,
                    transition: {
                      delay: 0,
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      duration: 5000,
                    },
                  }
            }
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 600,
                damping: 30,
              },
            }}
          >
            {/* Context7 - Modularity: Artifact header */}
            <div className="p-2 flex flex-row justify-between items-start">
              <div className="flex flex-row gap-4 items-start">
                <ArtifactCloseButton />

                <div className="flex flex-col">
                  <div className="font-medium">{artifact.title}</div>

                  {isContentDirty ? (
                    <div className="text-sm text-muted-foreground">
                      Saving changes...
                    </div>
                  ) : document ? (
                    <div className="text-sm text-muted-foreground">
                      {`Updated ${formatDistance(
                        new Date(document.createdAt),
                        new Date(),
                        {
                          addSuffix: true,
                        },
                      )}`}
                    </div>
                  ) : (
                    <div className="w-32 h-3 mt-2 bg-muted-foreground/20 rounded-md animate-pulse" />
                  )}
                </div>
              </div>

              <ArtifactActions
                artifact={artifact}
                currentVersionIndex={currentVersionIndex}
                handleVersionChange={handleVersionChange}
                isCurrentVersion={isCurrentVersion}
                mode={mode}
                metadata={metadata}
                setMetadata={setMetadata}
              />
            </div>

            {/* Context7 - Provider Isolation: Dynamic artifact content */}
            <div className="dark:bg-muted bg-background h-full overflow-y-scroll !max-w-full items-center">
              <artifactDefinition.content
                title={artifact.title}
                content={
                  isCurrentVersion
                    ? artifact.content
                    : getDocumentContentById(currentVersionIndex)
                }
                mode={mode}
                status={artifact.status}
                currentVersionIndex={currentVersionIndex}
                suggestions={[]}
                onSaveContent={saveContent}
                isInline={false}
                isCurrentVersion={isCurrentVersion}
                getDocumentContentById={getDocumentContentById}
                isLoading={isDocumentsFetching && !artifact.content}
                metadata={metadata}
                setMetadata={setMetadata}
              />

              <AnimatePresence>
                {isCurrentVersion && (
                  <ArtifactToolbar
                    isToolbarVisible={isToolbarVisible}
                    setIsToolbarVisible={setIsToolbarVisible}
                    sendMessage={sendMessage}
                    status={status}
                    stop={stop}
                    setMessages={setMessages}
                    artifactKind={artifact.kind}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Context7 - Modularity: Version footer */}
            <AnimatePresence>
              {!isCurrentVersion && (
                <VersionFooter
                  currentVersionIndex={currentVersionIndex}
                  documents={documents}
                  handleVersionChange={handleVersionChange}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Context7 - Modularity: Memoized component for performance
export const ArtifactSystem = memo(
  ArtifactSystemCore,
  (prevProps, nextProps) => {
    return (
      equal(prevProps.artifact, nextProps.artifact) &&
      equal(prevProps.messages, nextProps.messages) &&
      equal(prevProps.votes, nextProps.votes) &&
      prevProps.status === nextProps.status &&
      prevProps.isReadonly === nextProps.isReadonly
    );
  },
);

ArtifactSystem.displayName = "ArtifactSystem";

// Context7 - Provider Isolation: Export types for external use
export type {
  ArtifactKind,
  UIArtifact,
  Document,
  Vote,
  ArtifactHookResult,
  ChatHelpers,
  Attachment,
};
