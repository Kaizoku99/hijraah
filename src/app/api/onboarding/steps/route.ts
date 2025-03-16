import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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
  
  // Get onboarding state
  const { data, error } = await supabase
    .from('user_onboarding')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) {
    if (error.code === 'PGRST116') {
      // No record found
      return NextResponse.json({ 
        initialized: false,
        shouldStartOnboarding: true
      });
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({
    initialized: true,
    currentStep: data.current_step,
    progress: data.progress,
    isCompleted: data.is_completed,
    shouldStartOnboarding: !data.is_completed
  });
} 