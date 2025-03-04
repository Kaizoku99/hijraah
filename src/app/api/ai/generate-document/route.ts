import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { openai } from '@/lib/openai';

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define document templates and their prompts
const documentTemplates = {
  'cover-letter': {
    system: `You are a professional immigration document writer specializing in cover letters. 
    Create a formal, detailed immigration cover letter following this structure:
    1. Professional header with date and recipient information
    2. Formal greeting
    3. Clear introduction stating purpose of application
    4. 2-3 paragraphs explaining qualifications and reasons for immigration
    5. Conclusion with contact details and appreciation
    6. Formal closing

    Use formal, precise language with proper legal terminology. Be detailed but concise.`,
  },
  'personal-statement': {
    system: `You are a professional immigration document writer specializing in personal statements. 
    Create a compelling personal statement following this structure:
    1. Introduction with clear purpose for immigration
    2. Background information relevant to application
    3. Educational/professional qualifications
    4. Explanation of ties to destination country
    5. Long-term plans if visa/immigration is approved
    6. Closing statement reaffirming commitment

    Use personal, persuasive language that communicates authenticity. Keep tone formal but warm.`,
  },
  'legal-brief': {
    system: `You are a professional immigration legal expert specializing in legal briefs.
    Create a detailed legal brief following this structure:
    1. Case caption/header with reference numbers
    2. Introduction summarizing legal argument
    3. Facts section with relevant background
    4. Legal argument with citations to relevant laws
    5. Application of law to client's situation
    6. Conclusion with specific relief requested
    
    Use precise legal terminology and formal structure. Include references to relevant immigration statutes and cases.`,
  },
  'affidavit': {
    system: `You are a professional immigration document writer specializing in affidavits.
    Create a formal affidavit following this structure:
    1. Title and declaration statement
    2. Personal details of deponent (person making statement)
    3. Numbered paragraphs with clear, factual statements
    4. Explanation of relationship to applicant (if relevant)
    5. Verification statement confirming truth of statements
    6. Space for signature and date
    
    Use clear, factual language without opinions. Be specific about dates, places, and events.`,
  }
};

type DocumentTemplate = keyof typeof documentTemplates;

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { prompt, template, additionalContext, userId } = await req.json();
    
    // Validate inputs
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    
    if (!template || !documentTemplates[template as DocumentTemplate]) {
      return NextResponse.json({ error: 'Valid template is required' }, { status: 400 });
    }

    // Get selected template
    const selectedTemplate = documentTemplates[template as DocumentTemplate];
    
    // Create full prompt with template instructions
    const messages = [
      { 
        role: 'system' as const, 
        content: selectedTemplate.system
      },
      { 
        role: 'user' as const, 
        content: `Generate a ${template} with the following details:\n\n${prompt}${additionalContext ? `\n\nAdditional context: ${additionalContext}` : ''}`
      }
    ];

    // For streaming, we'll use a non-streaming request to save the result to the database
    // and then return it to the client
    if (userId) {
      // Create the document non-streaming first to save to database
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
      });

      const generatedText = completion.choices[0].message.content;
      
      if (generatedText) {
        // Save the document to the database
        await supabaseAdmin.from('artifacts').insert({
          user_id: userId,
          title: `AI-Generated ${(template as string).replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}`,
          description: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
          content: {
            text: generatedText,
            format: 'markdown'
          },
          type: 'document',
          visibility: 'private',
          needs_embedding: true, // Flag for embedding generation
          metadata: {
            template,
            generated_at: new Date().toISOString(),
            prompt
          }
        });
      }
      
      // Return the generated text as a regular JSON response
      return NextResponse.json({ 
        text: generatedText,
        saved: true
      });
    } else {
      // If no userId, just generate the document without saving
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
      });
      
      return NextResponse.json({ 
        text: completion.choices[0].message.content,
        saved: false
      });
    }
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Error generating document' }, { status: 500 });
  }
} 