import { NextRequest, NextResponse } from 'next/server';
import { 
  sendPasswordResetEmail, 
  sendMagicLinkEmail, 
  PasswordResetEmailParams, 
  MagicLinkEmailParams
} from '@/lib/supabase/email';
import { Locale } from '@/emails/i18n/translations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email, redirectTo, locale, captchaToken } = body;
    
    if (!type || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters: type or email' },
        { status: 400 }
      );
    }
    
    // Validate locale
    const validLocale = ['en', 'es', 'fr', 'ar'].includes(locale) ? locale as Locale : 'en';
    
    switch (type) {
      case 'passwordReset': {
        const params: PasswordResetEmailParams = {
          email,
          redirectTo,
          locale: validLocale,
        };
        
        const result = await sendPasswordResetEmail(params, captchaToken);
        return NextResponse.json({ success: true, result });
      }
      
      case 'magicLink': {
        const params: MagicLinkEmailParams = {
          email,
          redirectTo,
          locale: validLocale,
        };
        
        const result = await sendMagicLinkEmail(params, captchaToken);
        return NextResponse.json({ success: true, result });
      }
      
      default:
        return NextResponse.json(
          { error: `Unsupported email type: ${type}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 