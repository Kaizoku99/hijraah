"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Upload, File, Loader2 } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { logger } from '@/lib/logger';
import { Document } from '@/types/database';

export default function DocumentsPage() {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setUploading(true);
      
      for (const file of acceptedFiles) {
        // Start OCR processing
        setProcessing(true);
        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();
        setProcessing(false);

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Create document record
        const { error: dbError } = await supabase
          .from('documents')
          .insert({
            name: file.name,
            file_type: file.type,
            file_path: data?.path,
            file_size: file.size,
            status: 'processing' as const,
            description: null,
            user_id: 'user_id_here',
            metadata: { ocr_text: text }
          } satisfies Partial<Document>);

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: "Document uploaded successfully",
        });
      }
    } catch (error) {
      logger.error('Error uploading document:', error as Record<string, unknown>);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Documents</h1>
        <Button>Upload Document</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragActive ? 'border-primary' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Supports PDF, PNG, JPG up to 10MB
            </p>
          </div>

          {(uploading || processing) && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{processing ? 'Processing document...' : 'Uploading...'}</span>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Document Information</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Document Name</Label>
              <Input id="name" placeholder="Enter document name" />
            </div>

            <div>
              <Label htmlFor="type">Document Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" type="date" />
            </div>

            <Button type="submit" disabled={uploading || processing}>
              Save Information
            </Button>
          </form>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start gap-3">
                <File className="w-8 h-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.type}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded on {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}