import { StreamingTextResponse } from '@vercel/ai';
import { LangChainStream } from '@langchain/core/streams';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ragConfig } from './rag-config';

interface ChatMessage {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

interface Document {
  pageContent: string;
  metadata: Record<string, any>;
}

const TEMPLATE = `Answer the question based on the following context. If you cannot find the answer in the context, say so and answer based on your general knowledge.

Context: {context}

Question: {question}

Answer in a helpful and friendly tone. If you're using information from the context, try to cite it naturally in your response.`;

const basePrompt = PromptTemplate.fromTemplate(TEMPLATE);

export async function createChatStream({
  messages,
  provider = 'openai'
}: {
  messages: ChatMessage[];
  provider?: 'openai' | 'deepseek';
}) {
  const { stream, handlers } = LangChainStream();
  
  try {
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('Invalid message format');
    }

    // Search for relevant documents
    const results = await ragConfig.vectorStore.similaritySearch(lastMessage.content, 3);
    
    if (!results || results.length === 0) {
      throw new Error('No relevant context found. Please try a different question.');
    }

    const context = results.map((doc: Document) => doc.pageContent).join('\n\n');

    // Create the model based on provider
    const model = new ChatOpenAI({
      modelName: provider === 'openai' ? ragConfig.modelName : ragConfig.deepseek.modelName,
      streaming: true,
      temperature: provider === 'openai' ? ragConfig.temperature : ragConfig.deepseek.temperature,
      maxTokens: provider === 'openai' ? ragConfig.maxTokens : ragConfig.deepseek.maxTokens,
    });

    // Create the chain
    const chain = RunnableSequence.from([
      {
        context: () => context,
        question: (input: string) => input,
      },
      basePrompt,
      model,
      new StringOutputParser(),
    ]);

    // Execute the chain
    await chain.invoke(lastMessage.content, { callbacks: [handlers] });

    return new StreamingTextResponse(stream);
  } catch (error) {
    // Convert error to string and stream it back
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(errorMessage));
        controller.close();
      },
    });
    return new StreamingTextResponse(stream);
  }
} 