# @hijraah/ui

Enterprise-grade UI component library built with **Context7 Architecture** patterns for the Hijraah immigration platform. All components implement the 7 pillars of Context7: Observability, Modularity, Resumability, Tracing, Data-as-Code, Infrastructure-as-Code, and Provider Isolation.

## 🏗️ **Architecture Overview**

This package follows **Context7 patterns** throughout every component:

- **🔍 Observability**: Built-in metrics, tracing, and performance monitoring
- **🧩 Modularity**: Composition helpers and clean separation of concerns
- **🔄 Resumability**: State preservation and event continuity
- **📍 Tracing**: Development-mode debugging with component lifecycle tracking
- **📊 Data-as-Code**: Type-safe configuration and variant management
- **🔗 Provider Isolation**: Style system abstractions and resource pooling
- **⚡ Resource Pooling**: Performance optimizations and singleton managers

## 📦 **Components (22 Total)**

### **Foundation Components**

| Component | Status      | Context7 Features                      | Size  |
| --------- | ----------- | -------------------------------------- | ----- |
| `Button`  | ✅ Complete | Basic styling foundation               | 1.2KB |
| `Card`    | ✅ Complete | Composition patterns                   | 1.4KB |
| `Input`   | ✅ Complete | Form foundation                        | 0.7KB |
| `Dialog`  | ✅ Complete | Modal state management                 | 4.8KB |
| `Toast`   | ✅ Complete | Context management, Provider isolation | 11KB  |

### **Enhanced Context7 Components**

| Component    | Status      | Context7 Features                          | Size  |
| ------------ | ----------- | ------------------------------------------ | ----- |
| `Alert`      | ✅ Complete | Observability, Factory patterns            | 3.2KB |
| `Badge`      | ✅ Complete | StyleProvider isolation, Composition       | 4.6KB |
| `Progress`   | ✅ Complete | Resumability, Real-time monitoring         | 7.2KB |
| `ScrollArea` | ✅ Complete | Resource pooling, Performance optimization | 9.7KB |

### **Form Components with Context7**

| Component  | Status      | Context7 Features                              | Size   |
| ---------- | ----------- | ---------------------------------------------- | ------ |
| `Label`    | ✅ Complete | Accessibility, Form integration                | 4.9KB  |
| `Textarea` | ✅ Complete | Auto-resize, Character tracking, Observability | 11.8KB |
| `Select`   | ✅ Complete | Keyboard navigation, Search, Multi-select      | 17.7KB |
| `Checkbox` | ✅ Complete | Group management, Indeterminate state          | 15.6KB |

### **Layout Components with Context7**

| Component    | Status      | Context7 Features                                  | Size |
| ------------ | ----------- | -------------------------------------------------- | ---- |
| `Header`     | ✅ Complete | Responsive breakpoints, Scroll tracking, Analytics | 15KB |
| `Footer`     | ✅ Complete | Visibility tracking, Engagement monitoring         | 15KB |
| `Sidebar`    | ✅ Complete | Navigation state, Chat history, Collapsible UI     | 21KB |
| `Navigation` | ✅ Complete | Interaction analytics, Keyboard navigation         | 16KB |

### **Chat Components with Context7** ⭐ **NEW**

| Component         | Status      | Context7 Features                                             | Size   |
| ----------------- | ----------- | ------------------------------------------------------------- | ------ |
| `Markdown`        | ✅ Complete | Content analytics, Link tracking, Copy functionality          | 16.5KB |
| `CodeBlock`       | ✅ Complete | Syntax highlighting, Copy/Download, Performance monitoring    | 21KB   |
| `TypingIndicator` | ✅ Complete | Animation performance tracking, FPS monitoring                | 19.5KB |
| `Message`         | ✅ Complete | Role-based styling, Performance tracking, Status indicators   | 27KB   |
| `MessageList`     | ✅ Complete | Virtual scrolling, 60fps monitoring, Auto-scroll              | 28KB   |
| `Suggestions`     | ✅ Complete | Immigration-focused, Animation support, Interaction analytics | 16KB   |

**Total Package Size**: ~320KB compiled output with TypeScript definitions

## 🎯 **Context7 Pattern Examples**

### **Factory Pattern Usage**

```typescript
// Quick component creation with Context7 patterns
import {
  createAlert,
  createProgress,
  createSelect,
  createCheckbox,
} from "@hijraah/ui";

// Alert factory with built-in observability
const successAlert = createAlert.success("User saved successfully!");
const errorAlert = createAlert.error(
  "Validation failed",
  "Please check required fields",
);

// Progress factory with real-time monitoring
const uploadProgress = createProgress.upload("Uploading documents...");
const loadingProgress = createProgress.loading("Processing application...");

// Select factory with domain-specific options
const countrySelect = createSelect.countries(); // Pre-populated with countries
const visaSelect = createSelect.visaTypes(); // Immigration-specific options

// Checkbox factory for common patterns
const agreementCheckbox = createCheckbox.agreement(
  "I agree to the terms and conditions",
);
const permissionCheckbox = createCheckbox.permission(
  "Send notifications",
  "We'll email you about updates",
);

// Layout factory patterns
const stickyHeader = createHeader.navbar(); // Responsive header with scroll behavior
const dashboardSidebar = createSidebar.dashboard(
  navigationSections,
  chatHistory,
);
const tabNavigation = createNavigation.tabNavigation(menuItems);
const detailedFooter = createFooter.detailed(footerSections);

// Chat factory patterns ⭐ NEW
const chatMarkdown = createMarkdown.chat(); // Chat-optimized markdown rendering
const codeDocumentation = createCodeBlock.documentation(); // Enhanced code blocks
const terminalCode = createCodeBlock.terminal(); // Terminal-style code display
const enhancedTyping = createTypingIndicator.enhanced(); // AI thinking indicator
const pulseTyping = createTypingIndicator.pulse(); // Minimalist typing animation

// Message factory patterns ⭐ NEW
const userMessage = createMessage.user(
  "Hello, I need help with my visa application",
);
const assistantMessage = createMessage.assistant(
  "I'd be happy to help you with your visa application.",
);
const systemMessage = createMessage.system(
  "Connection established with immigration expert",
);
const codeMessage = createMessage.code(
  "console.log('visa status: approved');",
  "javascript",
);

// MessageList factory patterns ⭐ NEW
const chatList = createMessageList.chat(); // Chat-optimized message list
const compactList = createMessageList.compact(); // Compact view for mobile
const comfortableList = createMessageList.comfortable(); // Spacious desktop view

// Suggestions factory patterns ⭐ NEW
const immigrationSuggestions = createSuggestions.immigration(); // Immigration-focused suggestions
const generalSuggestions = createSuggestions.general(); // General help suggestions
```

### **Advanced Context7 Composition**

```typescript
import {
  ProgressComposed,
  ScrollAreaComposed,
  CheckboxComposed,
  TextareaComposed,
  HeaderComposed,
  FooterComposed,
  SidebarComposed,
  NavigationComposed,
  MarkdownComposed,
  CodeBlockComposed,
  TypingIndicatorComposed,
  MessageComposed,
  MessageListComposed,
  SuggestionsComposed
} from '@hijraah/ui';

// Multi-step process with Context7 resumability
<ProgressComposed.SteppedProgress
  steps={["Upload", "Review", "Submit"]}
  currentStep={1}
  onStepChange={(step) => console.log("Step:", step)}
  variant="success"
/>

// Performance-optimized scrolling with resource pooling
<ScrollAreaComposed.ChatScrollArea
  messages={messages}
  autoScroll={true}
  virtualizeItems={true}
/>

// Group checkbox management with Context7 state
<CheckboxComposed.CheckboxGroup
  groupLabel="Document Types"
  options={[
    { value: "passport", label: "Passport", description: "Required for all applications" },
    { value: "diploma", label: "Education Certificate", description: "For skilled migration" },
    { value: "experience", label: "Work Experience", description: "Employment history" }
  ]}
  value={selectedDocs}
  onChange={setSelectedDocs}
/>

// Auto-expanding textarea with Context7 observability
<TextareaComposed.AutoExpandingTextarea
  placeholder="Describe your immigration goals..."
  maxLength={2000}
  showCharCount={true}
  onChange={(value, context) => {
    console.log("Characters:", context.valueLength);
    console.log("Typing velocity:", context.changeVelocity);
  }}
/>

// Layout composition with Context7 patterns
<HeaderComposed.NavbarHeader
  logo={<Logo />}
  navigation={<NavigationComposed.ResponsiveNavigation items={navItems} />}
  actions={<UserActions />}
  isAuthenticated={true}
  onBreakpointChange={(breakpoint, context) => {
    console.log("Responsive breakpoint:", breakpoint);
    console.log("Navigation clicks:", context.navigationClicks);
  }}
/>

<SidebarComposed.AppSidebar
  user={currentUser}
  navigationSections={appNavigation}
  chatHistory={recentChats}
  onNavigationClick={(item, context) => {
    analytics.track("sidebar_navigation", {
      itemId: item.id,
      sessionDuration: context.sessionDuration,
      navigationDepth: context.totalNavigationItems
    });
  }}
/>

<FooterComposed.ImmigrationFooter
  showNewsletter={true}
  onLinkClick={(link, context) => {
    console.log("Footer engagement:", context.linkClicks);
    console.log("Social engagement:", context.socialEngagement);
  }}
/>

// Chat composition with Context7 patterns ⭐ NEW
<MarkdownComposed.ChatMessage
  content={messageContent}
  onLinkClick={(url, text, context) => {
    console.log("Markdown engagement:", context.linkClicks);
    console.log("Reading time:", context.readingTime);
  }}
/>

<CodeBlockComposed.EnhancedCode
  code={codeSnippet}
  language="typescript"
  onCopy={(code, language, context) => {
    analytics.track("code_copied", {
      language,
      codeLength: code.length,
      copyActions: context.copyActions
    });
  }}
/>

<TypingIndicatorComposed.EnhancedIndicator
  isVisible={isAiThinking}
  onAnimationCycle={(cycle, context) => {
    console.log("Animation performance:", context.performanceMetrics);
    console.log("FPS:", context.performanceMetrics.averageFps);
  }}
/>

// Message composition with Context7 patterns ⭐ NEW
<MessageComposed.UserMessage
  content="I need help with my visa application"
  timestamp={new Date()}
  onInteraction={(interactionType, context) => {
    console.log("Message interaction:", interactionType);
    console.log("Read time:", context.readTime);
  }}
/>

<MessageComposed.AssistantMessage
  content="I'd be happy to help you with your visa application. What specific information do you need?"
  isLoading={false}
  onContentRender={(contentType, context) => {
    analytics.track("assistant_message_rendered", {
      contentType,
      renderTime: context.renderTime,
      messageLength: context.contentLength
    });
  }}
/>

// MessageList composition with Context7 patterns ⭐ NEW
<MessageListComposed.ChatMessageList
  messages={chatMessages}
  onScroll={(scrollMetrics) => {
    console.log("Chat scroll position:", scrollMetrics.scrollTop);
    console.log("Scroll velocity:", scrollMetrics.scrollVelocity);
  }}
  enableVirtualScrolling={true}
  enablePerformanceMonitoring={true}
/>

<MessageListComposed.CompactMessageList
  messages={compactMessages}
  variant="compact"
  onMessageClick={(message, context) => {
    analytics.track("message_clicked", {
      messageId: message.id,
      index: context.messageIndex,
      totalMessages: context.totalMessages
    });
  }}
/>

// Suggestions composition with Context7 patterns ⭐ NEW
<SuggestionsComposed.ImmigrationSuggestions
  chatId={currentChatId}
  append={appendMessage}
  onSuggestionClick={(suggestion, context) => {
    analytics.track("suggestion_clicked", {
      suggestionId: suggestion.id,
      category: suggestion.category,
      interactionCount: context.totalInteractions
    });
  }}
/>

<SuggestionsComposed.CompactSuggestions
  chatId={currentChatId}
  append={appendMessage}
  config={{ variant: "compact", gridCols: 4 }}
  onSuggestionClick={(suggestion, context) => {
    console.log("Compact suggestion clicked:", suggestion.title);
    console.log("Suggestion analytics:", context.suggestionAnalytics);
  }}
/>
```

### **Observability & Tracing**

```typescript
import { Label, Select, Checkbox } from '@hijraah/ui';

// Form with comprehensive Context7 observability
<form>
  <Label
    variant="required"
    onLabelClick={(context) => {
      console.log("Label clicked:", context.labelId);
      console.log("Associated field:", context.fieldId);
    }}
  >
    Preferred Country
  </Label>

  <Select
    options={countries}
    searchable={true}
    onChange={(value, context) => {
      console.log("Selection rate:", context.selectedCount / context.optionsCount);
      console.log("Keyboard navigation usage:", context.keyboardNavigationCount);
    }}
    onOpen={(context) => analytics.track("select_opened", context)}
  />

  <Checkbox
    label="Express Entry Eligible"
    groupId="eligibility-checks"
    onChange={(checked, context) => {
      console.log("Group selection:", `${context.groupSelectedCount}/${context.groupTotalCount}`);
      analytics.track("checkbox_changed", { checked, ...context });
    }}
  />
</form>
```

### **Resource Pooling & Performance**

```typescript
import { ScrollArea, Textarea, Select } from '@hijraah/ui';

// ScrollArea with optimized event handling
<ScrollArea
  className="h-96"
  onScroll={(scrollContext) => {
    // Throttled to 60fps via Context7 resource pooling
    console.log("Scroll position:", scrollContext.scrollTop);
    console.log("Performance metrics:", scrollContext.performanceMetrics);
  }}
/>

// Textarea with auto-resize resource management
<Textarea
  autoResize={true}
  onChange={(value, context) => {
    // Auto-resize handled by singleton TextareaResizeManager
    console.log("Rows:", context.rowCount);
    console.log("Character velocity:", context.changeVelocity);
  }}
/>

// Select with keyboard navigation pooling
<Select
  options={largeOptionsList}
  searchable={true}
  // Keyboard events managed by SelectKeyboardManager singleton
  onClose={(context) => {
    console.log("Navigation efficiency:", context.keyboardNavigationCount);
  }}
/>
```

## 🎨 **Styling System**

All components use **Provider Isolation** pattern with dedicated style providers:

- `ButtonStyleProvider` - Button variants and sizes
- `AlertStyleProvider` - Alert states and animations
- `ProgressStyleProvider` - Progress variants and animations
- `SelectStyleProvider` - Dropdown states and interactions
- `CheckboxStyleProvider` - Checkbox variants and states
- `MarkdownStyleProvider` - Markdown themes and content styling ⭐ NEW
- `CodeBlockStyleProvider` - Code syntax themes and variants ⭐ NEW
- `TypingIndicatorStyleProvider` - Animation variants and performance ⭐ NEW
- `MessageStyleProvider` - Message role styling and status indicators ⭐ NEW
- `MessageListStyleProvider` - List variants and virtual scrolling styles ⭐ NEW
- `SuggestionsStyleProvider` - Suggestion layouts and animation variants ⭐ NEW

## 🔧 **Installation**

```bash
# From workspace root
pnpm add @hijraah/ui

# Or in your package.json
{
  "dependencies": {
    "@hijraah/ui": "workspace:*"
  }
}
```

## 📚 **Usage**

```typescript
// Individual imports (recommended for tree-shaking)
import { Button } from "@hijraah/ui/button";
import { Card, CardHeader, CardContent } from "@hijraah/ui/card";
import { Label } from "@hijraah/ui/label";
import { Textarea } from "@hijraah/ui/textarea";
import { Select } from "@hijraah/ui/select";
import { Checkbox } from "@hijraah/ui/checkbox";

// Layout components
import { Header } from "@hijraah/ui/header";
import { Footer } from "@hijraah/ui/footer";
import { Sidebar } from "@hijraah/ui/sidebar";
import { Navigation } from "@hijraah/ui/navigation";

// Chat components ⭐ NEW
import { Markdown } from "@hijraah/ui/markdown";
import { CodeBlock } from "@hijraah/ui/code-block";
import { TypingIndicator } from "@hijraah/ui/typing-indicator";
import { Message } from "@hijraah/ui/message";
import { MessageList } from "@hijraah/ui/message-list";
import { Suggestions } from "@hijraah/ui/suggestions";

// Factory pattern imports
import { createAlert, createProgress, createSelect } from "@hijraah/ui/alert";
import { createHeader, createFooter, createSidebar } from "@hijraah/ui/header";

// Composition helpers
import { ProgressComposed, CheckboxComposed } from "@hijraah/ui/progress";
import {
  HeaderComposed,
  SidebarComposed,
  FooterComposed,
} from "@hijraah/ui/header";
```

## 🏗️ **Development**

```bash
# Build components
pnpm build

# Watch mode
pnpm dev

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 📊 **Context7 Metrics Dashboard**

In development mode, components provide detailed Context7 observability:

```javascript
// Browser console shows Context7 traces
[Alert:Context7:Trace] {
  component: "Alert",
  variant: "success",
  dismissed: false,
  interactionCount: 3,
  timestamp: 1704067200000
}

[Progress:Context7:Trace] {
  component: "Progress",
  completionRate: "67%",
  estimatedTimeRemaining: "2.3s",
  performanceScore: 0.95
}

[Select:Context7:Trace] {
  component: "Select",
  interaction: {
    selectionRate: "15.8%",
    navigationEngagement: 7
  },
  keyboardNavigationCount: 7
}

// Chat components metrics ⭐ NEW
[Markdown:Context7:Trace] {
  component: "Markdown",
  contentLength: 1247,
  renderTime: "12ms",
  linkClicks: 3,
  readingTime: "45s"
}

[CodeBlock:Context7:Trace] {
  component: "CodeBlock",
  language: "typescript",
  copyActions: 2,
  codeLength: 456,
  lineCount: 24
}

[TypingIndicator:Context7:Trace] {
  component: "TypingIndicator",
  animationCycles: 47,
  performanceMetrics: {
    averageFps: 59,
    frameDrops: 1,
    cpuUsage: 3
  }
}

[Message:Context7:Trace] {
  component: "Message",
  role: "assistant",
  contentLength: 267,
  renderTime: "8ms",
  readTime: "23s",
  interactionCount: 1
}

[MessageList:Context7:Trace] {
  component: "MessageList",
  totalMessages: 42,
  visibleMessages: 8,
  virtualScrollEnabled: true,
  scrollMetrics: {
    scrollVelocity: 12.5,
    averageFps: 60
  }
}

[Suggestions:Context7:Trace] {
  component: "Suggestions",
  totalSuggestions: 4,
  interactionCount: 7,
  conversionRate: 0.64,
  renderTime: "4ms"
}
```

## 🎯 **Enterprise Features**

- **Type Safety**: Full TypeScript support with Context7 interfaces
- **Performance**: Resource pooling and optimized re-renders
- **Accessibility**: ARIA compliant with Context7 observability
- **Scalability**: Modular architecture supports large applications
- **Monitoring**: Built-in analytics and performance tracking
- **Resumability**: State preservation across component lifecycles

## 🔄 **Migration Status**

- ✅ **Phase 1**: Foundation Components (Button, Card, Input, Toast, Dialog)
- ✅ **Phase 2**: Enhanced Components (Alert, Badge, Progress, ScrollArea)
- ✅ **Phase 3**: Form Components (Label, Textarea, Select, Checkbox)
- ✅ **Phase 4**: Layout Components (Header, Footer, Sidebar, Navigation)
- 🔄 **Phase 5**: Complex Business Components (Chat, Document, Authentication)
  - ✅ **Tier 1**: Chat Utility Components (Markdown, CodeBlock, TypingIndicator) ⭐ **COMPLETED**
  - ✅ **Tier 2**: Core Chat Components (Message, MessageList, Suggestions) ⭐ **COMPLETED**
  - 🔄 **Tier 3**: Chat Input & Container (MessageInput, ChatHeader, ChatContainer)
  - 🔄 **Tier 4**: Advanced Features (Analytics, Artifact, Research, DocumentProcessor, WebScraper)

---

**Built with Context7 Architecture** • **Optimized for Immigration Platform** • **Enterprise Ready**
