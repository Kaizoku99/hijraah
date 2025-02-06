import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { getSupabaseClient } from '@/lib/supabase/client';
import { nanoid } from 'nanoid';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface DocumentContextProps {
  documents: Document[];
  onDocumentAdd: (document: Document) => void;
  onDocumentRemove: (documentId: string) => void;
}

export function DocumentContext({ documents, onDocumentAdd, onDocumentRemove }: DocumentContextProps) {
  const supabase = getSupabaseClient();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        const fileId = nanoid();
        const fileExt = file.name.split('.').pop();
        const fileName = `${fileId}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        // Add document to database
        const { data, error } = await supabase
          .from('documents')
          .insert({
            id: fileId,
            name: file.name,
            file_type: file.type,
            file_path: publicUrl,
            size: file.size,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;

        onDocumentAdd({
          id: data.id,
          name: data.name,
          type: data.file_type,
          url: data.file_path
        });

        toast.success(`Added ${file.name}`);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  }, [supabase, onDocumentAdd]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    }
  });

  return (
    <div className="p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag & drop files here, or click to select</p>
        )}
        <p className="text-sm text-gray-500 mt-1">Supports PDF, TXT, and MD files</p>
      </div>

      {documents.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Attached Documents</h3>
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between">
                <span className="truncate flex-1">{doc.name}</span>
                <button
                  onClick={() => onDocumentRemove(doc.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 