'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeepResearch } from '@/components/research/deep-research';
import { SessionManager as UnifiedSessionManager } from '@/components/session-manager';

interface ResearchSessionManagerProps {
    userId: string;
    onSessionCreate?: (sessionId: string) => void;
}

export function ResearchSessionManager({ userId, onSessionCreate }: ResearchSessionManagerProps) {
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

    const handleSessionChange = (sessionId: string) => {
        setActiveSessionId(sessionId);
        onSessionCreate?.(sessionId);
    };

    return (
        <div>
            {!activeSessionId ? (
                <UnifiedSessionManager
                    type="research"
                    currentSessionId={activeSessionId || undefined}
                    onSessionChange={handleSessionChange}
                    className="w-full"
                />
            ) : (
                <div>
                    <Button
                        variant="outline"
                        className="mb-4"
                        onClick={() => setActiveSessionId(null)}
                    >
                        ← Back to Research
                    </Button>
                    <DeepResearch sessionId={activeSessionId} />
                </div>
            )}
        </div>
    );
} 