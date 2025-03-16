'use client';

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth'
import {
  type ChatSession,
  type ChatMessage,
  createChatSession,
  getChatSessions,
  getChatMessages,
  sendChatMessage,
  subscribeToChatMessages
} from '@/lib/supabase/chat'
import { Card } from '../card'
import { Button } from '../button'
import { Spinner } from '../spinner'
import { toast } from 'sonner'

interface SessionManagerProps {
  currentSessionId?: string | null;
  onSessionChange?: (sessionId: string) => void;
  onNewSession?: () => void;
  onMessageReceived?: (message: ChatMessage) => void;
}

export function SessionManager({
  currentSessionId,
  onSessionChange,
  onNewSession,
  onMessageReceived
}: SessionManagerProps) {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(currentSessionId || null)

  useEffect(() => {
    if (!user) return

    const loadSessions = async () => {
      try {
        const sessions = await getChatSessions(user.id)
        setSessions(sessions)

        // Select the first session if exists and no current session is selected
        if (sessions.length > 0 && !selectedSessionId) {
          setSelectedSessionId(sessions[0].id)
          onSessionChange?.(sessions[0].id)
        }
      } catch (error) {
        console.error('Error loading sessions:', error)
        toast.error('Failed to load chat sessions')
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [user, onSessionChange, selectedSessionId])

  // Update selected session when currentSessionId changes
  useEffect(() => {
    if (currentSessionId && currentSessionId !== selectedSessionId) {
      setSelectedSessionId(currentSessionId)
    }
  }, [currentSessionId])

  useEffect(() => {
    if (!selectedSessionId || !onMessageReceived) return

    const subscription = subscribeToChatMessages(selectedSessionId, (message) => {
      onMessageReceived(message)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [selectedSessionId, onMessageReceived])

  const handleCreateSession = async () => {
    if (!user) return

    try {
      if (onNewSession) {
        onNewSession()
      } else {
        const session = await createChatSession(user.id)
        setSessions((prev) => [session, ...prev])
        setSelectedSessionId(session.id)
        onSessionChange?.(session.id)
      }
    } catch (error) {
      console.error('Error creating session:', error)
      toast.error('Failed to create new chat session')
    }
  }

  const handleSelectSession = async (session: ChatSession) => {
    setSelectedSessionId(session.id)
    onSessionChange?.(session.id)

    try {
      const messages = await getChatMessages(session.id)
      // Handle messages if needed
    } catch (error) {
      console.error('Error loading messages:', error)
      toast.error('Failed to load chat messages')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner />
      </div>
    )
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chat Sessions</h2>
        <Button onClick={handleCreateSession}>New Chat</Button>
      </div>

      <div className="space-y-2">
        {sessions.map((session) => (
          <Button
            key={session.id}
            variant={selectedSessionId === session.id ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => handleSelectSession(session)}
          >
            {session.title || `Chat ${new Date(session.created_at).toLocaleDateString()}`}
          </Button>
        ))}
      </div>
    </Card>
  )
} 