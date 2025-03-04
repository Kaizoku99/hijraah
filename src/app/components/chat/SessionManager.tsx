import { SessionManager as UnifiedSessionManager } from '@/components/session-manager';

interface ChatSessionManagerProps {
  currentSessionId?: string;
  onSessionChange: (sessionId: string) => void;
  className?: string;
}

export function SessionManager({ currentSessionId, onSessionChange, className }: ChatSessionManagerProps) {
  return (
    <UnifiedSessionManager
      type="chat"
      currentSessionId={currentSessionId}
      onSessionChange={onSessionChange}
      className={className}
    />
  );
} 