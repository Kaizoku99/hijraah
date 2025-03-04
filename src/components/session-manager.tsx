import { useState, useEffect } from 'react';
import { useSession } from '@/components/session-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getSupabaseClient } from '@/lib/supabase/client';

export type SessionType = 'chat' | 'research' | 'case';

interface Session {
    id: string;
    title: string | null;
    type: SessionType;
    created_at: string;
    metadata?: Record<string, any>;
}

interface SessionManagerProps {
    type: SessionType;
    currentSessionId?: string;
    onSessionChange: (sessionId: string) => void;
    className?: string;
}

export function SessionManager({
    type,
    currentSessionId,
    onSessionChange,
    className,
}: SessionManagerProps) {
    const { session: authSession } = useSession();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const supabase = getSupabaseClient();

    useEffect(() => {
        if (!authSession?.user.id) return;
        loadSessions();
    }, [authSession?.user.id, type]);

    const loadSessions = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('user_id', authSession?.user.id)
                .eq('type', type)
                .eq('status', 'active')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSessions(data || []);
        } catch (error) {
            console.error(`Error loading ${type} sessions:`, error);
            toast.error(`Failed to load ${type} sessions`);
        } finally {
            setIsLoading(false);
        }
    };

    const createSession = async () => {
        try {
            if (!authSession?.user.id) {
                toast.error('Please sign in to create a session');
                return;
            }

            const newSession = {
                user_id: authSession.user.id,
                type,
                status: 'active',
                title: `New ${type} session`,
                created_at: new Date().toISOString(),
                metadata: {},
            };

            const { data, error } = await supabase
                .from('sessions')
                .insert(newSession)
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setSessions([data, ...sessions]);
                onSessionChange(data.id);
                toast.success('New session created');
            }
        } catch (error) {
            console.error('Error creating session:', error);
            toast.error('Failed to create new session');
        }
    };

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Sessions
                </CardTitle>
                <Button onClick={createSession} variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Create new session</span>
                </Button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <p className="text-sm text-muted-foreground">No active sessions</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {sessions.map((session) => (
                                <Button
                                    key={session.id}
                                    variant={currentSessionId === session.id ? 'secondary' : 'ghost'}
                                    className="w-full justify-start text-sm"
                                    onClick={() => onSessionChange(session.id)}
                                >
                                    <span className="truncate">
                                        {session.title || new Date(session.created_at).toLocaleString()}
                                    </span>
                                </Button>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
} 