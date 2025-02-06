'use client';

import React, { useState } from 'react';
import { Avatar } from './avatar';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabase/client';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onUploadComplete: (url: string) => Promise<void>;
}

async function uploadFile(file: File): Promise<string> {
  const supabase = getSupabaseClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file);
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);
    
  return publicUrl;
}

export const AvatarUpload = ({ currentAvatarUrl, onUploadComplete }: AvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Implement your file upload logic here
      const uploadedUrl = await uploadFile(file);
      await onUploadComplete(uploadedUrl);
      
      toast({
        title: 'Success',
        description: 'Avatar updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload avatar',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <img src={currentAvatarUrl} alt="Avatar" />
      </Avatar>
      <div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="avatar-upload"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('avatar-upload')?.click()}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Change Avatar'}
        </Button>
      </div>
    </div>
  );
}; 