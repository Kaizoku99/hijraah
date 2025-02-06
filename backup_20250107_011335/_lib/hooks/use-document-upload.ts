"use client";

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_DOCUMENT = gql`
  mutation CreateDocument($input: DocumentInput!) {
    createDocument(input: $input) {
      id
      filename
      fileUrl
    }
  }
`;

interface UseDocumentUploadProps {
  onSuccess?: (fileUrl: string, fileName: string) => void;
  maxSize?: number;
}

export function useDocumentUpload({ onSuccess, maxSize = 10 * 1024 * 1024 }: UseDocumentUploadProps = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [createDocument] = useMutation(CREATE_DOCUMENT);

  const uploadDocument = async (file: File) => {
    try {
      setIsUploading(true);

      if (file.size > maxSize) {
        throw new Error(`File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Create document record in database
      const { data } = await createDocument({
        variables: {
          input: {
            documentType: file.type,
            filename: file.name,
            fileUrl: publicUrl,
            verificationStatus: 'pending',
          },
        },
      });

      toast({
        title: "Document uploaded successfully",
        description: "Your document has been uploaded and processed.",
      });

      if (onSuccess) {
        onSuccess(publicUrl, file.name);
      }

      return data.createDocument;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong while uploading the document.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadDocument,
    isUploading,
  };
}