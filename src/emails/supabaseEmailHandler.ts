import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { 
  PasswordReset, 
  EmailConfirmation, 
  MagicLink, 
  EmailChange,
  UserInvitation 
} from './index';

export type SupabaseEmailType = 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change';

export interface SupabaseEmailMetadata {
  action_link: string;
  email: string;
  redirect_to?: string;
  user?: string; // JSON string containing user data
  [key: string]: any; // Allow for additional metadata
}

/**
 * Generates HTML for different email types using React components
 */
export function generateEmailHtml(type: SupabaseEmailType, metadata: SupabaseEmailMetadata): string {
  const actionUrl = metadata.action_link;
  const email = metadata.email;
  
  // Extract user info if available
  let name = '';
  let user = null;
  
  try {
    if (metadata.user) {
      user = JSON.parse(metadata.user);
      name = user?.user_metadata?.full_name || 
             user?.user_metadata?.name || 
             user?.user_metadata?.preferred_username || 
             '';
    }
  } catch (error) {
    console.error('Error parsing user data', error);
  }
  
  // Generate the appropriate email based on type
  let emailElement: React.ReactElement;
  
  switch (type) {
    case 'signup':
      emailElement = React.createElement(EmailConfirmation, { 
        actionUrl, 
        email,
        name 
      });
      break;
      
    case 'invite':
      // For invite emails, we need to extract information about the inviter
      // This is a simplified version - you may need to adapt based on your actual data structure
      emailElement = React.createElement(UserInvitation, {
        actionUrl,
        inviterName: metadata.inviter_name || 'A team member',
        inviterEmail: metadata.inviter_email || '',
        organizationName: metadata.organization_name || 'Hijraah',
        recipientEmail: email
      });
      break;
      
    case 'magiclink':
      emailElement = React.createElement(MagicLink, {
        actionUrl,
        email,
        name
      });
      break;
      
    case 'recovery':
      emailElement = React.createElement(PasswordReset, {
        actionUrl,
        email,
        name
      });
      break;
      
    case 'email_change':
      emailElement = React.createElement(EmailChange, {
        actionUrl,
        oldEmail: metadata.old_email || email,
        newEmail: metadata.new_email || email,
        name
      });
      break;
      
    default:
      throw new Error(`Unsupported email type: ${type}`);
  }
  
  // Convert React element to HTML string
  return renderToStaticMarkup(emailElement);
}

/**
 * Handler for Supabase email template requests
 * This can be used in a Supabase Edge Function or other server context
 */
export async function handleSupabaseEmails(request: Request): Promise<Response> {
  try {
    const { type, metadata } = await request.json();
    
    if (!type || !metadata) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: type or metadata' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate the email HTML
    const html = generateEmailHtml(type as SupabaseEmailType, metadata);
    
    return new Response(
      JSON.stringify({ html }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating email:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 