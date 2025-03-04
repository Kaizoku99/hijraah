import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

// Maximum number of history records to return per page
const PAGE_SIZE = 20;

// GET /api/admin/scrape-history - Get individual scraping attempts history
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse page parameter
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * PAGE_SIZE;
    
    // Get source ID filter if provided
    const sourceId = searchParams.get('sourceId');

    // Initialize Supabase client
    const supabase = createClient();

    // Create base query
    let query = supabase
      .from('scrape_history')
      .select(`
        *,
        scraping_sources:source_id (
          name,
          url
        )
      `);
    
    // Apply source filter if provided
    if (sourceId) {
      query = query.eq('source_id', sourceId);
    }
    
    // Get total count for pagination
    const countQuery = query.clone();
    const { count, error: countError } = await countQuery.count().single();

    if (countError) {
      console.error('Error getting history count:', countError);
      return NextResponse.json(
        { error: 'Error fetching history count' },
        { status: 500 }
      );
    }

    // Fetch history records with pagination
    const { data, error } = await query
      .order('scraped_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      console.error('Error fetching scrape history:', error);
      return NextResponse.json(
        { error: 'Error fetching scrape history' },
        { status: 500 }
      );
    }

    // Transform the data to include source name and URL
    const history = data.map((item) => ({
      id: item.id,
      source_id: item.source_id,
      source_name: item.scraping_sources?.name,
      source_url: item.scraping_sources?.url,
      artifact_id: item.artifact_id,
      status: item.status,
      error_message: item.error_message,
      has_changes: item.has_changes,
      change_summary: item.change_summary,
      scraped_at: item.scraped_at,
    }));

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));

    return NextResponse.json({
      history,
      page,
      totalPages,
      totalCount: count,
      sourceId
    });
  } catch (error) {
    console.error('Error in GET /api/admin/scrape-history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 