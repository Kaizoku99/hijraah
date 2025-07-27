import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

import { auth } from '@/lib/auth';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Represents an artifact in the system
 */
export interface Artifact {
  id: string;
  name: string;
  description: string;
  type: string;
  url: string;
  metadata: Record<string, any>;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get an artifact by ID
 * If the artifact does not exist or the user does not have access, throw notFound()
 */
export async function getArtifact(id: string): Promise<Artifact> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw notFound();
  }
  
  const { data, error } = await supabase
    .from('artifacts')
    .select('*')
    .eq('id', id)
    .eq('user_id', session.user.id)
    .single();
  
  if (error || !data) {
    console.error('Error fetching artifact:', error);
    throw notFound();
  }
  
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type,
    url: data.url,
    metadata: data.metadata,
    status: data.status,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

/**
 * Get all artifacts for the current user
 */
export async function getUserArtifacts(): Promise<Artifact[]> {
  const session = await auth();
  
  if (!session?.user?.id) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('artifacts')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching artifacts:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    type: item.type,
    url: item.url,
    metadata: item.metadata,
    status: item.status,
    userId: item.user_id,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  }));
}

/**
 * Create a new artifact
 */
export async function createArtifact(artifact: Omit<Artifact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Artifact> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  
  const { data, error } = await supabase
    .from('artifacts')
    .insert({
      name: artifact.name,
      description: artifact.description,
      type: artifact.type,
      url: artifact.url,
      metadata: artifact.metadata,
      status: artifact.status,
      user_id: session.user.id,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating artifact:', error);
    throw new Error(`Failed to create artifact: ${error.message}`);
  }
  
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type,
    url: data.url,
    metadata: data.metadata,
    status: data.status,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
} 