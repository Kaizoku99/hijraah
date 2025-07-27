"use client";

import { X } from "lucide-react";
import React from "react";

import { artifactDefinitions } from "@/artifacts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArtifact, useResetArtifact } from "@/hooks/use-artifact";
import { cn } from "@/lib/utils";

export function UnifiedArtifact() {
  const { artifact: artifactData } = useArtifact();
  const resetArtifact = useResetArtifact();

  const handleClose = () => {
    resetArtifact();
  };

  const definition = artifactDefinitions.find(
    (def) => def.kind === artifactData.kind
  );

  const ArtifactComponent = definition?.component;

  return (
    <div
      className={cn(
        "absolute right-0 top-0 bottom-0 z-10 w-full md:w-[30vw] bg-background border-l shadow-lg",
        "h-[calc(100vh-4rem)]",
        "mt-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="text-lg font-semibold">
            {artifactData.title || definition?.kind || "Artifact"}
            {artifactData.status === "streaming" && (
              <span className="text-sm text-muted-foreground ml-2">
                (Streaming...)
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              {ArtifactComponent ? (
                <ArtifactComponent artifact={artifactData} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    {artifactData.kind
                      ? `No renderer for ${artifactData.kind} artifact.`
                      : "No artifact selected."}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
