// Types for research data tracking

export interface SourceData {
    url: string;
    title: string;
    description: string;
    relevanceScore?: number;
}

export interface ActivityData {
    type: 'search' | 'extract' | 'analyze' | 'reasoning' | 'synthesis' | 'thought';
    message: string;
    status: 'pending' | 'complete' | 'error';
    depth: number;
    timestamp?: Date;
} 