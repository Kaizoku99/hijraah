import { Avatar } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant' | 'system';
    content: string;
    id?: string;
  };
  userAvatar?: string;
}

export function ChatMessage({ message, userAvatar }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <Avatar>
        {isUser ? (
          userAvatar ? (
            <img src={userAvatar} alt="User" className="rounded-full" />
          ) : (
            <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white">
              U
            </div>
          )
        ) : (
          <div className="bg-green-500 w-full h-full flex items-center justify-center text-white">
            AI
          </div>
        )}
      </Avatar>
      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div className="font-medium mb-1">{isUser ? 'You' : 'AI'}</div>
        <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 