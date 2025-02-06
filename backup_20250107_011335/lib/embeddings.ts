import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';

export const embeddings = new OpenAIEmbeddings({
  modelName: 'text-embedding-3-small',
  stripNewLines: true,
  batchSize: 512
});
