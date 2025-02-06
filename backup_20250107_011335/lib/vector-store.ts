import { createClient } from '@supabase/supabase-js';
import { embeddings } from './embeddings';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';

export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  ),
  tableName: 'documents',
  queryName: 'match_documents'
});
