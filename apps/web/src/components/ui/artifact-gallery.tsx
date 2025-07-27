"use client";

import {
  BadgeCheck,
  Code,
  FileText,
  Grid3X3,
  Image,
  Lock,
  Plus,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Artifact as ArtifactComponent } from "@/components/ui/artifact";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useArtifact } from "@/lib/contexts/artifact-context";
import { cn } from "@/lib/utils";
import {
  Artifact,
  ArtifactType,
  ArtifactVisibility,
} from "@/types/artifact";



export function ArtifactGallery() {
  const { artifacts, deleteArtifact, updateArtifactVisibility, isLoading } =
    useArtifact();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const router = useRouter();

  const filteredArtifacts = artifacts.filter((artifact) => {
    const matchesSearch = artifact.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || artifact.type === typeFilter;
    const matchesVisibility =
      visibilityFilter === "all" || artifact.visibility === visibilityFilter;
    return matchesSearch && matchesType && matchesVisibility;
  });

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this artifact?")) {
      await deleteArtifact(id);
    }
  };

  const handleUpdateVisibility = async (
    id: string,
    visibility: ArtifactVisibility,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await updateArtifactVisibility(id, visibility);
  };

  const handleOpenArtifact = (id: string) => {
    setSelectedArtifact(id);
  };

  const handleCloseDialog = () => {
    setSelectedArtifact(null);
  };

  const getTypeIcon = (type: ArtifactType) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />;
      case "code":
        return <Code className="h-4 w-4" />;
      case "spreadsheet":
        return <Grid3X3 className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getVisibilityIcon = (visibility: ArtifactVisibility) => {
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
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Artifacts</h1>
        <Button onClick={() => router.push("/create-artifact")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artifacts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="code">Code</SelectItem>
            <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="mindmap">Mind Maps</SelectItem>
          </SelectContent>
        </Select>

        <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Visibility</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="w-full h-48 animate-pulse">
              <CardContent className="p-6 flex items-center justify-center">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredArtifacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No artifacts found</p>
          <Button
            variant="outline"
            onClick={() => router.push("/create-artifact")}
          >
            Create your first artifact
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArtifacts.map((artifact) => (
            <Card
              key={artifact.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleOpenArtifact(artifact.id)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(artifact.type)}
                    <span className="font-medium truncate">
                      {artifact.title}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        const nextVisibility =
                          artifact.visibility === "private"
                            ? "team"
                            : artifact.visibility === "team"
                              ? "public"
                              : "private";
                        handleUpdateVisibility(artifact.id, nextVisibility, e);
                      }}
                    >
                      {getVisibilityIcon(
                        artifact.visibility as ArtifactVisibility
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={(e) => handleDelete(artifact.id, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="h-24 overflow-hidden text-sm text-muted-foreground">
                  {artifact.type === "document" && (
                    <p className="line-clamp-4">
                      {artifact.content?.text || ""}
                    </p>
                  )}
                  {artifact.type === "code" && (
                    <pre className="line-clamp-4 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <code>{artifact.content?.code || ""}</code>
                    </pre>
                  )}
                  {/* Add other type previews as needed */}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-2 text-xs text-muted-foreground">
                <div className="flex justify-between w-full">
                  <span>
                    Created:{" "}
                    {new Date(artifact.created_at).toLocaleDateString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/artifacts/${artifact.id}`);
                    }}
                  >
                    View Full
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={!!selectedArtifact}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <DialogContent className="sm:max-w-[900px] h-[80vh] p-0">
          {selectedArtifact && (
            <ArtifactComponent
              id={selectedArtifact}
              onClose={handleCloseDialog}
              className="border-0 shadow-none"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
