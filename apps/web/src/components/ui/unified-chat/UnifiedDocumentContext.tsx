"use client";

import { PlusCircle, X, FileText } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentUploadModal } from "@/components/ui/documents/DocumentUploadModal";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface UnifiedDocumentContextProps {
  documents: Document[];
  onAdd: (document: Document) => Promise<void>; // Placeholder type for added document
  onRemove: (documentId: string) => Promise<void>;
}

export function UnifiedDocumentContext({
  documents,
  onAdd,
  onRemove,
}: UnifiedDocumentContextProps) {
  // State to control modal visibility
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Update handleAddClick to open the modal
  const handleAddClick = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Document Context
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleAddClick}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="text-xs text-muted-foreground pt-2">
              No documents added to this session.
            </p>
          ) : (
            <ScrollArea className="h-[150px]">
              <div className="space-y-2 pt-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between text-sm hover:bg-muted/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate" title={doc.name}>
                        {doc.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onRemove(doc.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Render the modal, controlled by state */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </>
  );
}
