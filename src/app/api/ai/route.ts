import { streamText } from 'ai';
import { ImmigrationAIProcessor } from '@/lib/ai/processor';
import { NextResponse } from 'next/server';
import { z } from 'zod';


const querySchema = z.object({
  query: z.string(),
  country: z.string().optional(),
  category: z.string().optional(),
  language: z.string().optional(),
});

const compareSchema = z.object({
  countries: z.array(z.string()),
  category: z.string(),
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { query, filters } = await req.json();
  
  const processor = new ImmigrationAIProcessor(
    process.env.OPENAI_API_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const stream = await processor.processQuery(query, filters);
  return streamText(stream);

}


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { countries, category } = compareSchema.parse(body);

    const processor = new ImmigrationAIProcessor(
      process.env.OPENAI_API_KEY!,
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const comparison = await processor.compareCountries(countries, category);
    return NextResponse.json({ success: true, data: comparison });
  } catch (error) {
    console.error('Comparison error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to compare countries' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}; 