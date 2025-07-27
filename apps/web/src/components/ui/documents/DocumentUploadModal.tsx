"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Assuming shadcn dialog is available

import { DocumentUploader } from "./DocumentUploader"; // Import the uploader

interface DocumentUploadModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DocumentUploadModal({
  isOpen,
  onOpenChange,
}: DocumentUploadModalProps) {
  const handleUploadComplete = () => {
    // Close the modal automatically on successful upload completion
    onOpenChange(false);
    // Optionally add a delay or keep it open with a success message
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
          <DialogDescription>
            Select a document file to upload. It will be processed and made
            available for analysis and chat context.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <DocumentUploader onUploadComplete={handleUploadComplete} />
        </div>
        {/* Footer might not be needed if uploader has its own controls */}
        {/* <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
