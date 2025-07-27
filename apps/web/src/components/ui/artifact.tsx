"use client";

import {
  BadgeCheck,
  Code,
  FileText,
  Grid3X3,
  Image,
  Lock,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useArtifact } from "@/lib/contexts/artifact-context";
import { cn } from "@/lib/utils";
import {
  Artifact as ArtifactType,
  ArtifactVisibility,
  DocumentContent,
  CodeContent,
} from "@/types/artifact";

// Temporarily define a simple markdown viewer component while the actual component is being created
interface SimpleMarkdownViewerProps {
  content: string;
}

function SimpleMarkdownViewer({ content }: SimpleMarkdownViewerProps) {
  return <div className="whitespace-pre-wrap">{content}</div>;
}

interface ArtifactProps {
  id: string;
  viewOnly?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Artifact({
  id,
  viewOnly = false,
  onClose,
  className,
}: ArtifactProps) {
  const {
    currentArtifact,
    artifactMessages,
    getArtifact,
    updateArtifact,
    deleteArtifact,
    updateArtifactVisibility,
    isLoading,
  } = useArtifact();
  const [activeTab, setActiveTab] = useState("document");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [documentContent, setDocumentContent] = useState<DocumentContent>({
    text: "",
  });
  const [codeContent, setCodeContent] = useState<CodeContent>({
    code: "",
    language: "",
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getArtifact(id);
  }, [id, getArtifact]);

  useEffect(() => {
    if (currentArtifact) {
      setEditedTitle(currentArtifact.title);

      // Initialize content based on artifact type
      if (currentArtifact.type === "document" && currentArtifact.content) {
        setDocumentContent(currentArtifact.content);
      } else if (currentArtifact.type === "code" && currentArtifact.content) {
        setCodeContent(currentArtifact.content);
      }
    }
  }, [currentArtifact]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this artifact?")) {
      await deleteArtifact(id);
      if (onClose) {
        onClose();
      } else {
        router.push("/artifacts");
      }
    }
  };

  const handleUpdateVisibility = async (visibility: ArtifactVisibility) => {
    await updateArtifactVisibility(id, visibility);
  };

  const handleSaveChanges = async () => {
    if (!currentArtifact) return;

    const updatedContent =
      currentArtifact.type === "document"
        ? documentContent
        : currentArtifact.type === "code"
          ? codeContent
          : currentArtifact.content;

    await updateArtifact(id, {
      title: editedTitle,
      content: updatedContent,
    });

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    if (currentArtifact) {
      setEditedTitle(currentArtifact.title);

      if (currentArtifact.type === "document" && currentArtifact.content) {
        setDocumentContent(currentArtifact.content);
      } else if (currentArtifact.type === "code" && currentArtifact.content) {
        setCodeContent(currentArtifact.content);
      }
    }
    setIsEditing(false);
  };

  if (isLoading || !currentArtifact) {
    return (
      <Card
        className={cn(
          "w-full h-full min-h-[300px] flex items-center justify-center",
          className,
        )}
      >
        <div className="animate-pulse text-muted-foreground">
          Loading artifact...
        </div>
      </Card>
    );
  }

  const getTypeIcon = (type: string): ReactNode => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />;
      case "code":
        return <Code className="h-5 w-5" />;
      case "spreadsheet":
        return <Grid3X3 className="h-5 w-5" />;
      case "image":
        return <Image className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getVisibilityIcon = (visibility: ArtifactVisibility): ReactNode => {
    switch (visibility) {
      case "public":
        return <Share2 className="h-4 w-4" />;
      case "team":
        return <BadgeCheck className="h-4 w-4" />;
      case "private":
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn("w-full h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          {getTypeIcon(currentArtifact.type)}

          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="h-7 text-lg font-semibold"
            />
          ) : (
            <CardTitle>{currentArtifact.title}</CardTitle>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {!viewOnly && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {getVisibilityIcon(
                      currentArtifact.visibility as ArtifactVisibility,
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleUpdateVisibility("private")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Private
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleUpdateVisibility("team")}
                  >
                    <BadgeCheck className="h-4 w-4 mr-2" />
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleUpdateVisibility("public")}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Public
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveChanges}
                  >
                    Save
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <TabsList className="mx-4">
            <TabsTrigger
              value="document"
              onClick={() => setActiveTab("document")}
            >
              Document
            </TabsTrigger>
            {artifactMessages.length > 0 && (
              <TabsTrigger value="chat" onClick={() => setActiveTab("chat")}>
                Chat ({artifactMessages.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="document" className="flex-1 p-4 overflow-auto">
            {currentArtifact.type === "document" &&
              (isEditing ? (
                <div className="min-h-[300px] font-mono">
                  <textarea
                    value={documentContent?.text || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDocumentContent({
                        ...documentContent,
                        text: e.target.value,
                      })
                    }
                    className="w-full h-full min-h-[300px] p-2 border rounded-md"
                  />
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <SimpleMarkdownViewer
                    content={currentArtifact.content?.text || ""}
                  />
                </div>
              ))}

            {currentArtifact.type === "code" &&
              (isEditing ? (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={codeContent?.fileName || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCodeContent({
                          ...codeContent,
                          fileName: e.target.value,
                        })
                      }
                      placeholder="Filename"
                      className="w-1/3"
                    />
                    <Input
                      value={codeContent?.language || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCodeContent({
                          ...codeContent,
                          language: e.target.value,
                        })
                      }
                      placeholder="Language"
                      className="w-1/3"
                    />
                  </div>
                  <div className="min-h-[300px] font-mono">
                    <textarea
                      value={codeContent?.code || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setCodeContent({ ...codeContent, code: e.target.value })
                      }
                      className="w-full h-full min-h-[300px] p-2 border rounded-md font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <h3>{currentArtifact.content?.fileName || "Code"}</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
                    <code>{currentArtifact.content?.code || ""}</code>
                  </pre>
                </div>
              ))}

            {/* Other artifact types can be added here */}
          </TabsContent>

          <TabsContent value="chat" className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              {artifactMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "p-3 rounded-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-muted mr-12",
                  )}
                >
                  <div className="text-xs font-medium mb-1">
                    {message.role === "user" ? "You" : "AI Assistant"}
                  </div>
                  <div>{message.message}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground pt-2 pb-2">
        <div className="flex items-center space-x-1">
          <span>
            Created: {new Date(currentArtifact.created_at).toLocaleString()}
          </span>
          <span>•</span>
          <span>
            Updated: {new Date(currentArtifact.updated_at).toLocaleString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
