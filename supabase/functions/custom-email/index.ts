// Follow this approach to create a Supabase Edge Function
// You'll need to deploy this to your Supabase project
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import React from 'https://esm.sh/react';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom/server';

// Email templates would need to be reimplemented in Deno
// This is a simplified example of how you could handle password reset emails

interface EmailTemplateProps {
  actionUrl: string;
  email: string;
  name?: string;
}

// Create a simplified version of your email templates for Deno
// In a real implementation, you might want to reimplement all your email templates for Deno
// or find a way to bundle them for use with Deno

function PasswordResetEmail({ actionUrl, email, name }: EmailTemplateProps) {
  const greeting = name ? `Hello, ${name}` : 'Hello';
  
  return React.createElement('div', null, [
    React.createElement('h2', { key: 'h2' }, 'Reset Your Password'),
    React.createElement('p', { key: 'p1' }, greeting),
    React.createElement('p', { key: 'p2' }, 
      `We received a request to reset the password for your Hijraah account (${email}).`
    ),
    React.createElement('div', { key: 'div', style: { textAlign: 'center', margin: '20px 0' } },
      React.createElement('a', { 
        href: actionUrl,
        style: {
          backgroundColor: '#134e4a',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }
      }, 'Reset Password')
    ),
    React.createElement('p', { key: 'p3' }, 
      'If you did not request a password reset, please ignore this email.'
    ),
    React.createElement('p', { key: 'p4' }, 
      'Best regards,\nThe Hijraah Team'
    )
  ]);
}

// Add more email templates as needed following the same pattern

serve(async (req) => {
  try {
    const { type, metadata } = await req.json();
    
    if (!type || !metadata) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const actionUrl = metadata?.action_link || '';
    const email = metadata?.email || '';
    
    // Extract user information if available
    let name = '';
    try {
      if (metadata.user) {
        const user = JSON.parse(metadata.user);
        name = user?.user_metadata?.full_name || 
               user?.user_metadata?.name || 
               user?.user_metadata?.preferred_username || 
               '';
      }
    } catch (error) {
      console.error('Error parsing user data', error);
    }
    
    let html = '';
    
    // Generate HTML for the appropriate email type
    switch (type) {
      case 'recovery':
        const emailElement = React.createElement(PasswordResetEmail, { 
          actionUrl, 
          email, 
          name 
        });
        html = renderToStaticMarkup(emailElement);
        break;
        
      // Implement other email types as needed
      
      default:
        // Return an error for unsupported email types
        return new Response(
          JSON.stringify({ error: `Unsupported email type: ${type}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    // Include a complete HTML document wrapper
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Hijraah</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              background-color: #f6f6f6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #134e4a;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 20px;
              border-radius: 0 0 5px 5px;
              box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Hijraah</h1>
            </div>
            <div class="content">
              ${html}
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Hijraah. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    return new Response(
      JSON.stringify({ html }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error generating email:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}); 