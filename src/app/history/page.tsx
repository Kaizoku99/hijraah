'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/contexts/auth';
import { MainLayout } from '@/components/layouts/main-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

interface HistoryItem {
  id: string;
  type: string;
  title: string;
  description: string;
  created_at: string;
}

// Helper function for date formatting
const formatDateTime = (dateString: string): string => {
  return format(new Date(dateString), 'PPp');
};

export default function HistoryPage() {
  const [chatHistory, setChatHistory] = useState<HistoryItem[]>([]);
  const [documentHistory, setDocumentHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    if (!user?.id) return;

    async function loadHistory() {
      try {
        // Load chat history
        const { data: chatData, error: chatError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (chatError) throw chatError;

        // Load document history
        const { data: docs, error: docError } = await supabase
          .from('documents')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (docError) throw docError;

        setChatHistory(
          (chatData || []).map((chat: any) => ({
            id: chat.id,
            type: 'chat',
            title: 'Chat Session',
            description: chat.content,
            created_at: chat.created_at,
          }))
        );

        setDocumentHistory(
          (docs || []).map((doc: any) => ({
            id: doc.id,
            type: 'document',
            title: doc.name,
            description: `${doc.file_type.toUpperCase()} - ${(
              doc.file_size /
              1024 /
              1024
            ).toFixed(2)}MB`,
            created_at: doc.created_at,
          }))
        );
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, [user, supabase]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground">
            View your chat and document history
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
            <CardDescription>
              Your recent chats and document activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chats">
              <TabsList>
                <TabsTrigger value="chats">Chat History</TabsTrigger>
                <TabsTrigger value="documents">Document History</TabsTrigger>
              </TabsList>

              <TabsContent value="chats">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {chatHistory.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{item.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {formatDateTime(item.created_at)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="documents">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {documentHistory.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{item.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {formatDateTime(item.created_at)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 