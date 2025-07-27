# Unified Chat System

The Unified Chat System is a comprehensive chat solution that integrates multiple AI models and supports various features like file attachments, chat history persistence, and sharing capabilities.

## Features

- Support for multiple AI models (OpenAI, Anthropic, Google AI)
- File attachments with drag-and-drop support
- Chat history persistence
- Chat sharing with visibility options (private, public, team)
- Responsive UI with mobile support
- Markdown rendering for chat messages
- Suggestions based on chat context
- Artifact generation and management
- Deep research capabilities with source tracking
- OCR document processing with AI-powered Q&A
- Web scraping integration for immigration resources

## Components

### Core Components

- `UnifiedChatContainer`: The main container component that orchestrates all chat functionality
- `UnifiedChatHeader`: Header component with chat controls and sharing options
- `UnifiedMessageList`: Displays chat messages with support for various message types
- `UnifiedMessageInput`: Input component with file attachment support
- `UnifiedSuggestions`: Provides contextual suggestions based on chat history
- `UnifiedArtifact`: Handles artifact generation and management
- `UnifiedResearchContainer`: Provides deep research capabilities with source tracking
- `UnifiedDocumentProcessor`: Processes documents with OCR and enables AI-powered Q&A
- `UnifiedWebScraper`: Scrapes web content for immigration-specific data

### API Routes

- `/api/ai/chat`: Handles AI chat requests
- `/api/chat/history`: Fetches user's chat history
- `/api/chat/[id]`: Fetches, updates, and deletes specific chats
- `/api/chat/[id]/share`: Updates chat visibility settings
- `/api/files/upload`: Handles file uploads for chat attachments
- `/api/research`: Handles deep research requests
- `/api/research/:sessionId/update`: Updates research progress
- `/api/research/:sessionId/sources`: Fetches sources for research
- `/api/documents/ocr`: Processes documents with OCR
- `/api/documents/ocr/question`: Answers questions about processed documents
- `/api/documents/ocr/:fileId/history`: Fetches document Q&A history
- `/api/scraper`: Handles web scraping requests for immigration content

### Database Schema

The chat system uses the following database tables:

- `chats`: Stores chat metadata
- `chat_messages`: Stores individual chat messages
- `chat_attachments`: Stores file attachment metadata
- `research_sessions`: Stores research session metadata
- `research_data`: Stores research data (sources, activities, findings)
- `document_ocr_results`: Stores OCR results for processed documents
- `document_qa_history`: Stores document Q&A history

## Usage

```tsx
import { UnifiedChatContainer } from "@/components/unified-chat/UnifiedChatContainer";

export default function ChatPage() {
  return (
    <div className="h-screen">
      <UnifiedChatContainer />
    </div>
  );
}
```

## Advanced Features

### Deep Research

The chat system includes powerful deep research capabilities:

- Web search integration via Firecrawl
- Source tracking and credibility assessment
- Depth-based research approach
- Research findings synthesis

### Document Processing

The chat system includes OCR document processing:

- Extract text from documents (PDF, images, etc.)
- Ask questions about document content
- Document content caching for performance
- Document Q&A history tracking

### Web Scraping

The chat system includes web scraping capabilities:

- Extract content from immigration-related websites
- Process both single URLs and bulk URL lists
- Extract structured immigration data (document types, requirements, etc.)
- Credibility assessment of scraped content
- Integration with chat for real-time information retrieval

## Configuration

The chat system requires the following environment variables:

```
# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Anthropic (optional)
ANTHROPIC_API_KEY=your-anthropic-api-key

# Google AI (optional)
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Firecrawl (for research)
FIRECRAWL_API_KEY=your-firecrawl-api-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

## Database Migration

Run the following migration to set up the necessary database tables:

```bash
npx supabase migration up
```

This will create the necessary tables with the appropriate schema and permissions.

## Technology Stack

- Next.js 15 with App Router
- Hono.js for API routes
- Supabase for backend (auth, database, storage)
- Vercel AI SDK for AI chat
- Tailwind CSS and Shadcn UI for styling
- Firecrawl for web scraping and search
