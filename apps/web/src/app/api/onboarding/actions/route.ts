import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

const OnboardingActionSchema = z.object({
  actionKey: z.string().min(1),
  isCompleted: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    // Get request body
    const body = await request.json();
    
    // Validate request body
    const validatedData = OnboardingActionSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validatedData.error },
        { status: 400 }
      );
    }
    
    const { actionKey, isCompleted } = validatedData.data;
    
    // Initialize Supabase client
    const supabase = await createClient();
    
    // Check if the action already exists
    const { data: existingAction, error: fetchError } = await supabase
      .from('onboarding_actions')
      .select('*')
      .eq('user_id', userId)
      .eq('action_key', actionKey)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
      return NextResponse.json(
        { error: 'Failed to check existing action', details: fetchError },
        { status: 500 }
      );
    }
    
    // Update or insert the action
    const { error: upsertError } = await supabase
      .from('onboarding_actions')
      .upsert({
        id: existingAction?.id,
        user_id: userId,
        action_key: actionKey,
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : existingAction?.completed_at,
      });
    
    if (upsertError) {
      return NextResponse.json(
        { error: 'Failed to update action', details: upsertError },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error marking onboarding action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    
    // Initialize Supabase client
    const supabase = await createClient();
    
    // Get all completed actions for the user
    const { data, error } = await supabase
      .from('onboarding_actions')
      .select('action_key, is_completed, completed_at')
      .eq('user_id', userId)
      .eq('is_completed', true);
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch actions', details: error },
        { status: 500 }
      );
    }
    
    // Transform to match the expected format from the frontend
    const transformedData = data.map(action => ({
      actionKey: action.action_key,
      isCompleted: action.is_completed,
      completedAt: action.completed_at,
    }));
    
    return NextResponse.json(transformedData);
    
  } catch (error) {
    console.error('Error fetching onboarding actions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 