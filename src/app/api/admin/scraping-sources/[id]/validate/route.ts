import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { addSourceValidation, getScrapingSourceById } from '@/lib/supabase/scraping-sources';

// POST /api/admin/scraping-sources/[id]/validate - Validate a scraping source
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user ID
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in session' },
        { status: 400 }
      );
    }

    // Get source ID from params
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'Source ID is required' },
        { status: 400 }
      );
    }

    // Check if source exists
    const source = await getScrapingSourceById(id);
    if (!source) {
      return NextResponse.json(
        { error: 'Source not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    const { score } = body;
    if (score === undefined || score < 0 || score > 100) {
      return NextResponse.json(
        { error: 'Valid score between 0-100 is required' },
        { status: 400 }
      );
    }

    // Add validation
    const { notes } = body;
    await addSourceValidation(id, score, userId, notes);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/admin/scraping-sources/[id]/validate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 