import { env } from '@/env.mjs';
import { rateLimit } from '@/lib/rate-limit.ts';
import { chatService } from '@/services/chat.ts';
import { Message } from '@/types/chat.ts';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

// ... rest of the code ...