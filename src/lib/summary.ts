/**
 * Summary Utilities
 * 
 * This file contains utilities for summarizing content using AI models.
 */

/**
 * Summarizes content using AI
 * 
 * @param content Content to summarize
 * @param options Options for summarization
 * @returns Generated summary
 */
export async function summarizeContent(
    content: string, 
    options?: SummarizeOptions
): Promise<string> {
    try {
        const response = await fetch('/api/ai/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                maxLength: options?.maxLength || 500,
                format: options?.format || 'paragraph',
                focus: options?.focus,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to summarize content');
        }

        const data = await response.json();
        return data.summary || '';
    } catch (error: any) {
        console.error('Error summarizing content:', error);
        // Return a simple fallback summary rather than fail
        return 'Summary unavailable due to processing error.';
    }
}

/**
 * Generates bullet points from content
 * 
 * @param content Content to extract bullet points from
 * @param options Options for bullet point extraction
 * @returns Array of bullet points
 */
export async function generateBulletPoints(
    content: string,
    options?: BulletPointOptions
): Promise<string[]> {
    try {
        const response = await fetch('/api/ai/generate-bullets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                maxPoints: options?.maxPoints || 7,
                focus: options?.focus,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate bullet points');
        }

        const data = await response.json();
        return data.bullets || [];
    } catch (error: any) {
        console.error('Error generating bullet points:', error);
        return ['Bullet points unavailable due to processing error.'];
    }
}

/**
 * Generates chapter-based summaries for long content
 * 
 * @param content Content to summarize by chapters
 * @param options Options for chapter-based summarization
 * @returns Object with chapter summaries
 */
export async function generateChapterSummaries(
    content: string,
    options?: ChapterSummaryOptions
): Promise<ChapterSummary[]> {
    try {
        const response = await fetch('/api/ai/chapter-summaries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                maxChapters: options?.maxChapters || 5,
                maxLengthPerChapter: options?.maxLengthPerChapter || 200,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate chapter summaries');
        }

        const data = await response.json();
        return data.chapters || [];
    } catch (error: any) {
        console.error('Error generating chapter summaries:', error);
        return [{ title: 'Error', summary: 'Chapter summaries unavailable due to processing error.' }];
    }
}

/**
 * Options for summarization
 */
export interface SummarizeOptions {
    maxLength?: number;
    format?: 'paragraph' | 'bullet' | 'tldr';
    focus?: 'legal' | 'technical' | 'process' | 'requirements';
}

/**
 * Options for bullet point generation
 */
export interface BulletPointOptions {
    maxPoints?: number;
    focus?: 'legal' | 'technical' | 'process' | 'requirements';
}

/**
 * Options for chapter-based summarization
 */
export interface ChapterSummaryOptions {
    maxChapters?: number;
    maxLengthPerChapter?: number;
}

/**
 * Chapter summary interface
 */
export interface ChapterSummary {
    title: string;
    summary: string;
} 