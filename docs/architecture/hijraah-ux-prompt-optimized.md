# Optimized UX Architecture Prompt for Hijraah Immigration Platform

## Prompt for Lead UX Architect

Hello! Please act as a Lead UX Architect specializing in enterprise workflow management systems. Your task is to create a detailed UX Structure Plan for Hijraah - an AI-powered immigration workflow management platform that combines document processing, RAG-enhanced chat, and Kanban-style case management.

**Application Context:**
Hijraah is a comprehensive immigration platform that helps users navigate complex immigration processes through:

- AI-powered document analysis and processing
- RAG-enhanced chat for immigration guidance
- Kanban workflow management for case tracking
- Multi-modal document upload and versioning
- Real-time collaboration and task monitoring

**Platform Architecture:**

- Turborepo monorepo with shared packages
- Supabase backend with PostgreSQL + Vector search
- Next.js frontend with real-time capabilities
- Trigger.dev for background job processing
- Multi-provider AI integration (OpenAI, Anthropic, etc.)
- Advanced RAG pipeline with knowledge graph

**Target Users:**

- Immigration applicants managing their cases
- Immigration lawyers and consultants
- Government officials processing applications
- Support staff assisting with documentation

**Brand Identity & Visual Design:**
Hijraah's visual identity is built around sophistication, trust, and guidance:

**Color Palette:**

- Primary Gold: Rich metallic gold (#D4AF37) for CTAs, highlights, and key elements
- Background Cream: Warm off-white (#F5F5DC) for main backgrounds and cards
- Secondary Gold: Darker gold/bronze (#B8860B) for text, borders, and secondary elements
- Supporting Colors: Warm grays (#8B7355) and browns (#A0522D) for tertiary elements
- Accent: Subtle gold gradients and metallic effects for premium feel

**Visual Design Principles:**

- Elegant, embossed/debossed effects on cards and interactive elements
- Sophisticated typography with serif fonts for headings and display text
- Generous white space and clean, uncluttered layouts
- Subtle textures reminiscent of high-quality paper
- Rounded corners with refined, professional aesthetic
- Thematic integration of wing/sun motifs as subtle decorative elements

**Brand Integration:**

- Prominent placement of the "H" logo in navigation and key touchpoints
- Theme of "guidance and new beginnings" reflected throughout user journeys
- Premium, trustworthy feel maintained across all interactions
- Immigration-specific iconography and visual metaphors

**Required Structure and Content:**

Create a comprehensive UX Structure Plan as a single Markdown file using hierarchical, indented lists with box-drawing characters (├── and └──). The structure must include these seven main sections:

### 1. Navigation Flow & User Journey

Outline the primary user paths through the platform, including:

- Initial onboarding and profile setup with brand-appropriate welcome experience
- Document upload and processing workflow with guided assistance
- AI chat interaction patterns emphasizing guidance and support
- Case management and tracking with clear progression indicators
- Collaboration and sharing flows with trust-building elements

### 2. Authentication & Dashboard Structure

Detail the layout for:

- Multi-factor authentication interface with premium security feel
- Role-based dashboard variations (applicant, lawyer, admin) with appropriate gold accents
- Quick action panels and navigation with elegant hover states
- Notification center and alerts using the gold/cream color scheme
- User profile and settings access with sophisticated styling

### 3. Document Management Interface

Break down the comprehensive document system:

- Batch upload interface with drag-and-drop and elegant progress indicators
- Document versioning and history tracking with timeline visualization
- AI-powered document analysis results with clear, trustworthy presentation
- Document categorization and tagging with intuitive gold-accented controls
- Search and filtering capabilities with sophisticated search results display

### 4. AI Chat Interface Structure

Describe the enhanced chat system:

- Multi-modal input (text, voice, document upload) with elegant input styling
- Streaming response display with citations and gold-highlighted key information
- RAG-enhanced context awareness with clear source attribution
- Conversation history and bookmarking with sophisticated organization
- Real-time collaboration features with trust indicators

### 5. Kanban Workflow Board

Detail the case management board with these immigration-specific stages:

- Initial Consultation (with guidance indicators)
- Document Collection (with progress tracking)
- Application Preparation (with checklist integration)
- Government Submission (with status monitoring)
- Processing & Follow-up (with timeline visualization)
- Interview Preparation (with resource access)
- Decision Received (with clear outcome presentation)
- Post-Decision Actions (with next steps guidance)
- Case Closed (with completion celebration)

### 6. Analytics & Monitoring Dashboard

Outline the comprehensive monitoring interface:

- Real-time performance metrics with elegant data visualization
- Document processing analytics with clear success indicators
- AI chat effectiveness tracking with improvement suggestions
- Case progression statistics with trend analysis
- System health monitoring with status indicators

### 7. Visual Design & Brand Integration

Specify the comprehensive design system:

- Component library with gold/cream color scheme
- Typography hierarchy using serif and sans-serif combinations
- Interactive states (hover, focus, active) with subtle animations
- Icon system incorporating wing/sun motifs where appropriate
- Responsive design patterns maintaining brand consistency
- Accessibility considerations for gold/cream color contrast
- Loading states and micro-interactions with premium feel

**Technical Considerations:**

- Responsive design for desktop and mobile with brand-consistent breakpoints
- Real-time updates using WebSocket/SSE with elegant loading states
- Accessibility compliance (WCAG 2.1 AA) with appropriate color contrast ratios
- Multi-language support for international users with cultural considerations
- Dark/light theme support while maintaining brand identity
- Progressive Web App capabilities with sophisticated offline experience
- Performance optimization for smooth, premium user experience

**Output Requirements:**

- Single Markdown file with hierarchical tree structure
- Use box-drawing characters (├── and └──) for visual hierarchy
- Include specific component details and interactions with brand styling
- Consider Context7 patterns for enterprise scalability
- Focus on immigration-specific workflow requirements with guidance themes
- Ensure integration points for AI and background processing
- Incorporate gold/cream color scheme and premium visual elements throughout

Your final output should be a comprehensive, production-ready UX structure plan that reflects Hijraah's sophisticated brand identity while guiding the development of a trustworthy and elegant immigration workflow platform.
