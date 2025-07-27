'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Artifact, ArtifactMessage, ArtifactType, ArtifactVisibility } from '@/types/artifact';


interface CreateArtifactParams {
  title: string;
  content: any;
  type: ArtifactType;
  visibility: ArtifactVisibility;
  user_id: string;
  chat_id?: string;
}

export async function createArtifact(params: CreateArtifactParams): Promise<Artifact> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('artifacts')
    .insert({
      title: params.title,
      content: params.content,
      type: params.type,
      visibility: params.visibility,
      user_id: params.user_id,
      chat_id: params.chat_id || null,
    })
    .select('*')
    .single();
  
  if (error) {
    console.error('Error creating artifact:', error);
    throw new Error(`Failed to create artifact: ${error.message}`);
  }
  
  revalidatePath('/artifacts');
  if (params.chat_id) {
    revalidatePath(`/chat/${params.chat_id}`);
  }
  
  return data as Artifact;
}

export async function getArtifact(id: string, userId: string): Promise<Artifact | null> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('artifacts')
    .select('*')
    .eq('id', id)
    .or(`user_id.eq.${userId},visibility.eq.public`)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found
      return null;
    }
    console.error('Error fetching artifact:', error);
    throw new Error(`Failed to fetch artifact: ${error.message}`);
  }
  
  return data as Artifact;
}

export async function getUserArtifacts(userId: string): Promise<Artifact[]> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('artifacts')
    .select('*')
    .or(`user_id.eq.${userId},visibility.eq.public`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching artifacts:', error);
    throw new Error(`Failed to fetch artifacts: ${error.message}`);
  }
  
  return data as Artifact[];
}

export async function updateArtifact(id: string, updates: Partial<Artifact>, userId: string): Promise<Artifact> {
  const supabase = await getSupabaseServerClient();
  
  // First check if the user owns this artifact
  const { data: existingArtifact, error: fetchError } = await supabase
    .from('artifacts')
    .select('user_id, chat_id')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    console.error('Error fetching artifact to update:', fetchError);
    throw new Error(`Failed to fetch artifact for update: ${fetchError.message}`);
  }
  
  if (existingArtifact.user_id !== userId) {
    throw new Error('You do not have permission to update this artifact');
  }
  
  const { data, error } = await supabase
    .from('artifacts')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) {
    console.error('Error updating artifact:', error);
    throw new Error(`Failed to update artifact: ${error.message}`);
  }
  
  revalidatePath('/artifacts');
  if (existingArtifact.chat_id) {
    revalidatePath(`/chat/${existingArtifact.chat_id}`);
  }
  revalidatePath(`/artifacts/${id}`);
  
  return data as Artifact;
}

export async function deleteArtifact(id: string, userId: string): Promise<void> {
  const supabase = await getSupabaseServerClient();
  
  // First check if the user owns this artifact
  const { data: existingArtifact, error: fetchError } = await supabase
    .from('artifacts')
    .select('user_id, chat_id')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    console.error('Error fetching artifact to delete:', fetchError);
    throw new Error(`Failed to fetch artifact for deletion: ${fetchError.message}`);
  }
  
  if (existingArtifact.user_id !== userId) {
    throw new Error('You do not have permission to delete this artifact');
  }
  
  // Delete all messages associated with this artifact first
  const { error: messagesError } = await supabase
    .from('artifact_messages')
    .delete()
    .eq('artifact_id', id);
  
  if (messagesError) {
    console.error('Error deleting artifact messages:', messagesError);
    throw new Error(`Failed to delete artifact messages: ${messagesError.message}`);
  }
  
  // Now delete the artifact
  const { error } = await supabase
    .from('artifacts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting artifact:', error);
    throw new Error(`Failed to delete artifact: ${error.message}`);
  }
  
  revalidatePath('/artifacts');
  if (existingArtifact.chat_id) {
    revalidatePath(`/chat/${existingArtifact.chat_id}`);
  }
}

export async function addArtifactMessage(
  artifactId: string,
  message: string,
  role: 'user' | 'assistant' | 'system',
  userId: string
): Promise<ArtifactMessage> {
  const supabase = await getSupabaseServerClient();
  
  // First check if the user has access to this artifact
  const { data: existingArtifact, error: fetchError } = await supabase
    .from('artifacts')
    .select('user_id, visibility')
    .eq('id', artifactId)
    .single();
  
  if (fetchError) {
    console.error('Error fetching artifact for message:', fetchError);
    throw new Error(`Failed to fetch artifact for message: ${fetchError.message}`);
  }
  
  const canAccessArtifact = 
    existingArtifact.user_id === userId || 
    existingArtifact.visibility === 'public';
  
  if (!canAccessArtifact) {
    throw new Error('You do not have permission to comment on this artifact');
  }
  
  const { data, error } = await supabase
    .from('artifact_messages')
    .insert({
      artifact_id: artifactId,
      message,
      role,
    })
    .select('*')
    .single();
  
  if (error) {
    console.error('Error adding artifact message:', error);
    throw new Error(`Failed to add artifact message: ${error.message}`);
  }
  
  revalidatePath(`/artifacts/${artifactId}`);
  
  return data as ArtifactMessage;
}

export async function getArtifactMessages(artifactId: string, userId: string): Promise<ArtifactMessage[]> {
  const supabase = await getSupabaseServerClient();
  
  // First check if the user has access to this artifact
  const { data: existingArtifact, error: fetchError } = await supabase
    .from('artifacts')
    .select('user_id, visibility')
    .eq('id', artifactId)
    .single();
  
  if (fetchError) {
    console.error('Error fetching artifact for messages:', fetchError);
    throw new Error(`Failed to fetch artifact for messages: ${fetchError.message}`);
  }
  
  const canAccessArtifact = 
    existingArtifact.user_id === userId || 
    existingArtifact.visibility === 'public';
  
  if (!canAccessArtifact) {
    throw new Error('You do not have permission to view messages for this artifact');
  }
  
  const { data, error } = await supabase
    .from('artifact_messages')
    .select('*')
    .eq('artifact_id', artifactId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching artifact messages:', error);
    throw new Error(`Failed to fetch artifact messages: ${error.message}`);
  }
  
  return data as ArtifactMessage[];
} 