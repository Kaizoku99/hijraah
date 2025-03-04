import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

// Maximum number of logs to return per page
const PAGE_SIZE = 20;

// GET /api/admin/scraping-logs - Get scraping job logs
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

    // Initialize Supabase client
    const supabase = createClient();

    // Get total count for pagination
    const { count, error: countError } = await supabase
      .from('scraping_logs')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error getting logs count:', countError);
      return NextResponse.json(
        { error: 'Error fetching logs count' },
        { status: 500 }
      );
    }

    // Fetch logs with pagination
    const { data: logs, error } = await supabase
      .from('scraping_logs')
      .select('*')
      .order('triggered_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      console.error('Error fetching scraping logs:', error);
      return NextResponse.json(
        { error: 'Error fetching scraping logs' },
        { status: 500 }
      );
    }

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));

    return NextResponse.json({
      logs,
      page,
      totalPages,
      totalCount: count
    });
  } catch (error) {
    console.error('Error in GET /api/admin/scraping-logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 