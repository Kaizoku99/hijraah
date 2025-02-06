'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface DocumentContextProps {
  documents: Document[];
  onAdd: (document: Document) => Promise<void>;
  onRemove: (documentId: string) => Promise<void>;
  className?: string;
}

export function DocumentContext({ 
  documents, 
  onAdd, 
  onRemove,
  className 
}: DocumentContextProps) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // TODO: Implement file upload logic
      const document: Document = {
        id: Math.random().toString(36).slice(2),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      };
      await onAdd(document);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Documents</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={isUploading}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Plus className="h-4 w-4" />
          Add Document
        </Button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileUpload}
        />
      </div>
      <ScrollArea className="h-[200px]">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">No documents added</p>
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate text-sm">{doc.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(doc.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove document</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
} 