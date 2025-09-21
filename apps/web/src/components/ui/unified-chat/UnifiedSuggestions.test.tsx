import { render, screen, waitFor } from '@testing-library/react';
import { UnifiedSuggestions } from './UnifiedSuggestions';
import { UIMessage } from 'ai';

// Mock the fetch API
global.fetch = jest.fn();

// Mock the crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-123',
  },
});

describe('UnifiedSuggestions', () => {
  const mockAppend = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it('should render initial suggestions when no messages', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { text: 'Test suggestion 1', category: 'initial', confidence: 0.9 },
        { text: 'Test suggestion 2', category: 'initial', confidence: 0.8 },
      ],
    });

    render(
      <UnifiedSuggestions
        messages={[]}
        append={mockAppend}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Suggested questions')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('/api/suggestions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [],
        type: 'initial',
        context: {
          conversationLength: 0,
          lastUserMessage: '',
          lastAssistantMessage: '',
        },
      }),
    });
  });

  it('should render follow-up suggestions after assistant response', async () => {
    const messages: UIMessage[] = [
      {
        id: '1',
        role: 'user',
        parts: [{ type: 'text', text: 'Hello' }],
      },
      {
        id: '2',
        role: 'assistant',
        parts: [{ type: 'text', text: 'Hi there! How can I help you with immigration?' }],
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { text: 'Follow-up suggestion 1', category: 'follow-up', confidence: 0.9 },
        { text: 'Follow-up suggestion 2', category: 'follow-up', confidence: 0.8 },
      ],
    });

    render(
      <UnifiedSuggestions
        messages={messages}
        append={mockAppend}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Suggested questions')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('/api/suggestions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi there! How can I help you with immigration?' },
        ],
        type: 'follow-up',
        context: {
          conversationLength: 2,
          lastUserMessage: 'Hello',
          lastAssistantMessage: 'Hi there! How can I help you with immigration?',
        },
      }),
    });
  });

  it('should handle suggestion click correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { text: 'Test suggestion', category: 'initial', confidence: 0.9 },
      ],
    });

    render(
      <UnifiedSuggestions
        messages={[]}
        append={mockAppend}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Test suggestion')).toBeInTheDocument();
    });

    screen.getByText('Test suggestion').click();

    expect(mockAppend).toHaveBeenCalledWith({
      id: 'test-uuid-123',
      role: 'user',
      parts: [{ type: 'text', text: 'Test suggestion' }],
    });
  });

  it('should fallback to static suggestions when API fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <UnifiedSuggestions
        messages={[]}
        append={mockAppend}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Can you explain the Canada Express Entry requirements?')).toBeInTheDocument();
    });
  });

  it('should hide suggestions after extended conversations', async () => {
    const messages: UIMessage[] = Array.from({ length: 7 }, (_, i) => ({
      id: String(i + 1),
      role: i % 2 === 0 ? 'user' : 'assistant',
      parts: [{ type: 'text', text: `Message ${i + 1}` }],
    }));

    render(
      <UnifiedSuggestions
        messages={messages}
        append={mockAppend}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Suggested questions')).not.toBeInTheDocument();
    });
  });
});
