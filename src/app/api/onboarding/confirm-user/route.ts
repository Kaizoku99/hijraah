import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// This endpoint is designed to be called after a user confirms their email
// and gets redirected to the application
export async function POST(request: Request) {
  // Use the token in the request header if it exists
  const authHeader = request.headers.get('Authorization');
  
  // Create a Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // If authorization header exists, use it to set the session
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: '',
    });
  }
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    // Try to get the user from the JWT in the request
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  
  // Use user from session if user from getUser is null
  const userId = user?.id || (await supabase.auth.getSession()).data.session?.user.id;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unable to identify user' }, { status: 401 });
  }
  
  // Check for existing onboarding record
  const { data, error } = await supabase
    .from('user_onboarding')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error || !data) {
    console.log('Creating onboarding record for confirmed user:', userId);
    // Create new onboarding record
    const { error: insertError } = await supabase
      .from('user_onboarding')
      .insert({
        user_id: userId,
        current_step: 'welcome',
        progress: 0,
        is_completed: false,
        is_active: true,
      });
      
    if (insertError) {
      console.error('Error creating onboarding record for confirmed user:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    
    return NextResponse.json({ initialized: true, isNew: true });
  }
  
  // Reset onboarding if it exists but is completed or inactive
  if (data.is_completed || !data.is_active) {
    console.log('Resetting onboarding for returning user:', userId);
    const { error: updateError } = await supabase
      .from('user_onboarding')
      .update({
        current_step: 'welcome',
        progress: 0,
        is_completed: false,
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);
      
    if (updateError) {
      console.error('Error resetting onboarding:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    
    return NextResponse.json({ initialized: true, reset: true });
  }
  
  return NextResponse.json({ initialized: true, isNew: false, data });
} 