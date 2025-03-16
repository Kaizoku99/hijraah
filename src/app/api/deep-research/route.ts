import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { extractWebContent } from '@/lib/firecrawl';
import { extractImportantInfo } from '@/lib/extraction';
import { summarizeContent } from '@/lib/summary';

// Set the maximum duration for this function
export const maxDuration = 60;

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const { query, maxDepth = 3, sessionId } = await request.json();
        
        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // Create a new research session
        const session = await createResearchSession(query, maxDepth, sessionId);
        
        // Start the research asynchronously (will continue after response is sent)
        void performDeepResearch(query, maxDepth, session.id);
        
        return NextResponse.json({ 
            success: true, 
            sessionId: session.id,
            message: 'Research started successfully' 
        });
    } catch (error: any) {
        console.error('Error starting research:', error);
        return NextResponse.json({ error: error.message || 'Failed to start research' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const sessionId = searchParams.get('sessionId');
        
        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }
        
        // Get the research session data
        const session = await getResearchSession(sessionId);
        
        if (!session) {
            return NextResponse.json({ error: 'Research session not found' }, { status: 404 });
        }
        
        return NextResponse.json({ 
            success: true, 
            session,
            sources: session.sources || [],
            findings: session.findings || [],
        });
    } catch (error: any) {
        console.error('Error fetching research session:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch research session' }, { status: 500 });
    }
}

// Helper function to create a new research session
async function createResearchSession(query: string, maxDepth: number, sessionId?: string) {
    const { data, error } = await supabase
        .from('research_sessions')
        .insert({
            id: sessionId, // Will generate a UUID if not provided
            query,
            status: 'in_progress',
            metadata: {
                max_depth: maxDepth,
                current_depth: 1,
                progress: 0
            }
        })
        .select()
        .single();
    
    if (error) {
        throw new Error(`Failed to create research session: ${error.message}`);
    }
    
    return data;
}

// Helper function to get a research session
async function getResearchSession(sessionId: string) {
    // Get the session
    const { data: session, error: sessionError } = await supabase
        .from('research_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();
    
    if (sessionError) {
        throw new Error(`Failed to fetch research session: ${sessionError.message}`);
    }
    
    // Get the sources for this session
    const { data: sources, error: sourcesError } = await supabase
        .from('research_sources')
        .select('*')
        .eq('session_id', sessionId);
    
    if (sourcesError) {
        console.error('Error fetching sources:', sourcesError);
    }
    
    // Get the findings for this session
    const { data: findings, error: findingsError } = await supabase
        .from('research_findings')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
    
    if (findingsError) {
        console.error('Error fetching findings:', findingsError);
    }
    
    return {
        ...session,
        sources: sources || [],
        findings: findings || []
    };
}

// The main function that performs the deep research
async function performDeepResearch(query: string, maxDepth: number, sessionId: string) {
    try {
        // Step 1: Generate initial search queries based on the main query
        const searchQueries = await generateSearchQueries(query);
        
        // Record the search queries as a finding
        await recordFinding(sessionId, 'search_queries', `Generated search queries: ${searchQueries.join(', ')}`, 1);
        
        // Update progress
        await updateSessionProgress(sessionId, 10, 1);
        
        // Step 2: Search and extract content from initial sources
        const initialSources = [];
        for (const searchQuery of searchQueries) {
            // Use Firecrawl to search and extract content
            const searchResults = await searchWeb(searchQuery, 3); // Get top 3 results per query
            initialSources.push(...searchResults);
            
            // Add a short delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Filter out duplicate sources
        const uniqueSources = removeDuplicateSources(initialSources);
        
        // Record sources
        for (const source of uniqueSources) {
            await recordSource(sessionId, source);
        }
        
        // Update progress
        await updateSessionProgress(sessionId, 30, 1);
        
        // Record finding about sources
        await recordFinding(
            sessionId, 
            'initial_sources', 
            `Found ${uniqueSources.length} initial sources`, 
            1
        );
        
        // Step 3: Extract and analyze content from each source
        const sourcesWithContent = [];
        for (const source of uniqueSources) {
            try {
                // Extract the full content using Firecrawl
                const content = await extractWebContent(source.url);
                
                // Summarize the content
                const summary = await summarizeContent(content);
                
                // Extract immigration-specific information
                const extractedInfo = await extractImportantInfo(content);
                
                sourcesWithContent.push({
                    ...source,
                    content,
                    summary,
                    extractedInfo
                });
                
                // Record finding
                await recordFinding(
                    sessionId,
                    'content_extraction',
                    `Extracted and analyzed content from ${source.title}`,
                    1
                );
            } catch (error: any) {
                console.error(`Error processing source ${source.url}:`, error);
                // Record the error
                await recordFinding(
                    sessionId,
                    'error',
                    `Failed to process source ${source.url}: ${error.message}`,
                    1
                );
            }
        }
        
        // Update progress
        await updateSessionProgress(sessionId, 60, 1);
        
        // Step 4: Synthesize information across sources
        const synthesis = await synthesizeInformation(query, sourcesWithContent);
        
        // Record the synthesis
        await recordFinding(sessionId, 'synthesis', synthesis, 1);
        
        // Update progress
        await updateSessionProgress(sessionId, 90, 1);
        
        // Step 5: Generate final answer
        const finalAnswer = await generateFinalAnswer(query, synthesis, sourcesWithContent);
        
        // Record the final answer
        await recordFinding(sessionId, 'final_answer', finalAnswer, 1);
        
        // Mark session as complete
        await updateSessionStatus(sessionId, 'completed', 100, 1);
        
    } catch (error: any) {
        console.error('Error performing deep research:', error);
        
        // Record the error
        await recordFinding(
            sessionId,
            'error',
            `Research process failed: ${error.message}`,
            1
        );
        
        // Mark session as failed
        await updateSessionStatus(sessionId, 'failed');
    }
}

// Helper function to update a session's progress
async function updateSessionProgress(sessionId: string, progress: number, currentDepth: number) {
    const { error } = await supabase
        .from('research_sessions')
        .update({
            metadata: {
                progress,
                current_depth: currentDepth
            },
            updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);
    
    if (error) {
        console.error('Error updating session progress:', error);
    }
}

// Helper function to update a session's status
async function updateSessionStatus(sessionId: string, status: 'in_progress' | 'completed' | 'failed', progress?: number, currentDepth?: number) {
    const updates: any = { status };
    
    if (progress !== undefined || currentDepth !== undefined) {
        const { data } = await supabase
            .from('research_sessions')
            .select('metadata')
            .eq('id', sessionId)
            .single();
        
        const metadata = data?.metadata || {};
        
        if (progress !== undefined) {
            metadata.progress = progress;
        }
        
        if (currentDepth !== undefined) {
            metadata.current_depth = currentDepth;
        }
        
        updates.metadata = metadata;
    }
    
    updates.updated_at = new Date().toISOString();
    
    const { error } = await supabase
        .from('research_sessions')
        .update(updates)
        .eq('id', sessionId);
    
    if (error) {
        console.error('Error updating session status:', error);
    }
}

// Helper function to record a source
async function recordSource(sessionId: string, source: any) {
    const { error } = await supabase
        .from('research_sources')
        .insert({
            session_id: sessionId,
            url: source.url,
            title: source.title,
            relevance: source.relevance,
            metadata: source.metadata || {}
        });
    
    if (error) {
        console.error('Error recording source:', error);
    }
}

// Helper function to record a finding
async function recordFinding(sessionId: string, type: string, content: string, depth: number) {
    const { error } = await supabase
        .from('research_findings')
        .insert({
            session_id: sessionId,
            type,
            content,
            depth
        });
    
    if (error) {
        console.error('Error recording finding:', error);
    }
}

// Helper function to generate search queries
async function generateSearchQueries(query: string): Promise<string[]> {
    // This would typically use an AI model to generate multiple search queries
    // For now, we'll use a simple approach to generate variations
    return [
        query,
        `${query} immigration process`,
        `${query} legal requirements`,
        `${query} official government information`
    ];
}

// Helper function to search the web
async function searchWeb(query: string, limit: number = 5) {
    // Use Firecrawl to search the web and get results
    // This is a placeholder implementation
    const results = [
        // Sample results - in a real implementation, this would use actual search results
        {
            url: `https://example.com/search?q=${encodeURIComponent(query)}-1`,
            title: `Search Result 1 for ${query}`,
            relevance: 0.95,
            metadata: { source: 'search' }
        },
        {
            url: `https://example.com/search?q=${encodeURIComponent(query)}-2`,
            title: `Search Result 2 for ${query}`,
            relevance: 0.85,
            metadata: { source: 'search' }
        },
        {
            url: `https://example.com/search?q=${encodeURIComponent(query)}-3`,
            title: `Search Result 3 for ${query}`,
            relevance: 0.75,
            metadata: { source: 'search' }
        }
    ];
    
    return results.slice(0, limit);
}

// Helper function to remove duplicate sources
function removeDuplicateSources(sources: any[]) {
    const uniqueUrls = new Set();
    return sources.filter(source => {
        if (uniqueUrls.has(source.url)) {
            return false;
        }
        uniqueUrls.add(source.url);
        return true;
    });
}

// Helper function to synthesize information
async function synthesizeInformation(query: string, sources: any[]) {
    // This would typically use an AI model to synthesize information
    // For now, return a placeholder
    return `Synthesized information for query: "${query}" based on ${sources.length} sources.`;
}

// Helper function to generate a final answer
async function generateFinalAnswer(query: string, synthesis: string, sources: any[]) {
    // This would typically use an AI model to generate a final answer
    // For now, return a placeholder
    return `Final answer for query: "${query}" based on the synthesized information.`;
} 