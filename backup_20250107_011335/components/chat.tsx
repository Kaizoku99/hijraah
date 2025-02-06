import { useChat } from 'ai/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ChatProps {
  initialMessages?: {
    id: string;
    content: string;
    role: 'system' | 'user' | 'assistant';
  }[];
}

export function Chat({ initialMessages }: ChatProps) {
  const [provider, setProvider] = useState<'openai' | 'deepseek'>('openai');
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages,
    api: '/api/chat',
    body: {
      provider
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred while sending your message');
    }
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="mb-4">
        <select 
          value={provider}
          onChange={(e) => setProvider(e.target.value as 'openai' | 'deepseek')}
          className="p-2 border rounded"
        >
          <option value="openai">OpenAI</option>
          <option value="deepseek">DeepSeek</option>
        </select>
      </div>

      <div className="space-y-4 mb-4">
        {messages.map(m => (
          <div key={m.id} className={`p-4 rounded-lg ${
            m.role === 'assistant' ? 'bg-gray-100' : 'bg-blue-100'
          }`}>
            <div className="font-bold mb-2">
              {m.role === 'assistant' ? 'AI' : 'You'}
            </div>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}
        
        {isLoading && (
          <div className="p-4 rounded-lg bg-gray-100">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
        
        {error && (
          <div className="p-4 rounded-lg bg-red-100 text-red-700">
            {error.message || 'An error occurred'}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md mb-8">
        <input
          className="w-full p-2 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask a question..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
} 