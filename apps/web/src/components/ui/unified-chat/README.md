# Unified Chat System

The Unified Chat System is a comprehensive chat solution that integrates multiple AI models and supports various features like file attachments, chat history persistence, and sharing capabilities. **Now enhanced with professional ai-elements components for superior UX.**

## ✨ Enhanced Features with AI-Elements

### 🧠 Advanced AI Features
- **Reasoning Display**: Real-time streaming of AI thinking process with visual indicators
- **Tool Call Visualization**: Professional display of AI tool usage with status tracking
- **Enhanced Message Types**: Support for complex message structures with metadata
- **Smart Citation System**: Inline citations with hover cards and source carousels
- **Advanced Streaming**: Support for reasoning, tool calls, and artifact streaming

### 🎨 Visual Improvements
- **Modern Message Design**: Uses `Message`, `MessageContent`, and `MessageAvatar` components for consistent styling
- **Professional Input Interface**: Enhanced with `PromptInput`, `PromptInputTextarea`, and related components
- **Smooth Animations**: Added slide-in animations for side panels with proper transitions
- **Enhanced Loading States**: Beautiful `Loader` component with animated indicators
- **Responsive Layout**: Improved `Conversation` component with sticky-to-bottom behavior

### 💬 Enhanced Message Components
- **Smart Message Rendering**: Integrated `Response` component for markdown content
- **Action Buttons**: Clean `Actions` and `Action` components for message interactions (like, dislike, copy)
- **Code Blocks**: Professional `CodeBlock` with syntax highlighting and copy functionality
- **Typing Indicator**: Beautiful animated typing indicator using ai-elements
- **Reasoning Panels**: Collapsible reasoning display with streaming support
- **Tool Execution Display**: Visual representation of AI tool usage with parameters and results

### 🎯 Input Enhancements
- **Modern Prompt Input**: Professional input design with toolbar and tools
- **Smart Suggestions**: Enhanced `Suggestions` and `Suggestion` components with smooth scrolling
- **File Attachments**: Integrated file upload with drag-and-drop support
- **Speech Recognition**: Voice input with visual feedback

### 🎭 User Experience
- **Welcome Screen**: Enhanced empty state with professional design
- **Smooth Transitions**: All panel toggles now have smooth slide animations
- **Visual Feedback**: Better loading states and error handling
- **Responsive Design**: Optimized for all screen sizes
- **Advanced Markdown**: Comprehensive markdown rendering with tables, lists, and styling
- **Citation System**: Interactive inline citations with source previews
- **Real-time Reasoning**: Watch AI think in real-time with reasoning streams
- **Tool Transparency**: See exactly which tools AI is using and their results

## 🚀 Technical Enhancements

### Enhanced State Management
- **Reasoning State**: Track real-time AI reasoning with streaming support
- **Tool State**: Monitor active tool calls and their execution status
- **Enhanced Messages**: Support for complex message structures with reasoning and tool data
- **Stream Processing**: Advanced data stream processing for multiple content types

### Advanced Rendering
- **Citation Processing**: Intelligent citation parsing and rendering
- **Tool Visualization**: Professional display of tool parameters and results
- **Reasoning Display**: Collapsible reasoning panels with streaming indicators
- **Enhanced Markdown**: Comprehensive markdown with syntax highlighting and citations

### Professional UI Components
- All components now use the professional ai-elements library
- Consistent design language throughout the interface
- Smooth animations and transitions
- Advanced accessibility features
- Mobile-responsive design patterns

## Features

- Support for multiple AI models (OpenAI, Anthropic, Google AI)
- File attachments with drag-and-drop support
- Chat history persistence
- Chat sharing with visibility options (private, public, team)
- Responsive UI with mobile support
- **Enhanced Markdown rendering with professional code blocks**
- **Smart contextual suggestions with smooth scrolling**
- **Professional message actions and feedback system**
- Artifact generation and management
- Deep research capabilities with source tracking
- OCR document processing with AI-powered Q&A
- Web scraping integration for immigration resources
- **Smooth animations and transitions throughout the UI**
- **Modern prompt input with advanced controls**

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
