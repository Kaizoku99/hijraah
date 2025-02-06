import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { deepseek } from "@ai-sdk/deepseek";
import { Document } from "@langchain/core/documents";
import { Pinecone } from "@pinecone-database/pinecone";

// Environment variables validation
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key");
}

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error("Missing DeepSeek API key");
}

// Configure embeddings
export const embeddings = new OpenAIEmbeddings({
  modelName: process.env.EMBEDDING_MODEL || "text-embedding-3-small",
  dimensions: 1536,
});

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

const index = pc.index(process.env.PINECONE_INDEX!);

// Configure vector store
export const vectorStore = new PineconeStore(embeddings, {
  pineconeIndex: index,
  namespace: process.env.PINECONE_NAMESPACE,
});

// Configure chat models
export const openAIChat = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
  temperature: Number(process.env.TEMPERATURE) || 0.7,
  streaming: true,
});

export const deepseekChat = deepseek('deepseek-chat');

// RAG prompt template
const ragPromptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful AI assistant. Use the following context to answer the question.\n\nContext: {context}"],
  ["human", "{question}"]
]);

// Create retrieval chain with improved error handling
export const createRagChain = (model: ChatOpenAI | typeof deepseekChat = openAIChat) => {
  const retriever = vectorStore.asRetriever({
    k: Number(process.env.TOP_K) || 4,
  });

  const chain = RunnableSequence.from([
    {
      context: async (input: { question: string }) => {
        const docs = await retriever.getRelevantDocuments(input.question);
        return docs.map(doc => doc.pageContent).join('\n');
      },
      question: (input: { question: string }) => input.question,
    },
    ragPromptTemplate,
    model,
  ]).withConfig({
    runName: "RAGChain"
  });

  return chain;
};

// Document processing with chunking
export const processDocument = async (text: string, metadata = {}) => {
  const chunkSize = Number(process.env.CHUNK_SIZE) || 1000;
  const chunkOverlap = Number(process.env.CHUNK_OVERLAP) || 200;
  
  // Split text into chunks
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  
  // Create and store documents
  const docs = chunks.map(chunk => new Document({ 
    pageContent: chunk, 
    metadata: {
      ...metadata,
      chunk_size: chunkSize,
      chunk_overlap: chunkOverlap,
    }
  }));
  
  await vectorStore.addDocuments(docs);
  return docs;
}; 