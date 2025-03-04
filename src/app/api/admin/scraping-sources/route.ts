import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { 
  getScrapingSources, 
  getScrapingSourceById, 
  createScrapingSource, 
  updateScrapingSource, 
  deleteScrapingSource,
  addSourceValidation 
} from '@/lib/supabase/scraping-sources';

// GET /api/admin/scraping-sources - Get all scraping sources
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get sources
    const sources = await getScrapingSources();
    return NextResponse.json(sources);
  } catch (error) {
    console.error('Error in GET /api/admin/scraping-sources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/scraping-sources - Create a new scraping source
export async function POST(req: NextRequest) {
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

    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    const { name, url, category, scrape_frequency } = body;
    if (!name || !url || !category || !scrape_frequency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new source
    const newSource = {
      ...body,
      created_by: userId,
    };

    const createdSource = await createScrapingSource(newSource);
    return NextResponse.json(createdSource, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/scraping-sources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Dynamic route handlers for specific source operations
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get ID from URL
  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    return NextResponse.json({ error: 'Source ID is required' }, { status: 400 });
  }

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    const { name, url, category, scrape_frequency } = body;
    if (!name || !url || !category || !scrape_frequency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update source
    const updatedSource = await updateScrapingSource(id, body);
    if (!updatedSource) {
      return NextResponse.json(
        { error: 'Source not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSource);
  } catch (error) {
    console.error(`Error in PUT /api/admin/scraping-sources/${id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/scraping-sources/[id] - Delete a scraping source
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get ID from URL
  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    return NextResponse.json({ error: 'Source ID is required' }, { status: 400 });
  }

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete source
    const result = await deleteScrapingSource(id);
    if (!result) {
      return NextResponse.json(
        { error: 'Source not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in DELETE /api/admin/scraping-sources/${id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 