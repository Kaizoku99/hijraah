-- Create research sessions table
CREATE TABLE IF NOT EXISTS research_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table to store research data
CREATE TABLE IF NOT EXISTS research_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table to store document OCR results
CREATE TABLE IF NOT EXISTS document_ocr_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id TEXT NOT NULL UNIQUE,
  chat_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table to store document Q&A history
CREATE TABLE IF NOT EXISTS document_qa_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS research_sessions_user_id_idx ON research_sessions(user_id);
CREATE INDEX IF NOT EXISTS research_data_session_id_idx ON research_data(session_id);
CREATE INDEX IF NOT EXISTS document_ocr_results_file_id_idx ON document_ocr_results(file_id);
CREATE INDEX IF NOT EXISTS document_ocr_results_chat_id_idx ON document_ocr_results(chat_id);
CREATE INDEX IF NOT EXISTS document_qa_history_file_id_idx ON document_qa_history(file_id);
CREATE INDEX IF NOT EXISTS document_qa_history_chat_id_idx ON document_qa_history(chat_id);

-- Add RLS policies for research_sessions
ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own research sessions"
  ON research_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own research sessions"
  ON research_sessions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own research sessions"
  ON research_sessions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own research sessions"
  ON research_sessions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Add RLS policies for research_data
ALTER TABLE research_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view research data for their sessions"
  ON research_data FOR SELECT
  TO authenticated
  USING (
    session_id IN (
      SELECT id FROM research_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert research data for their sessions"
  ON research_data FOR INSERT
  TO authenticated
  WITH CHECK (
    session_id IN (
      SELECT id FROM research_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update research data for their sessions"
  ON research_data FOR UPDATE
  TO authenticated
  USING (
    session_id IN (
      SELECT id FROM research_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete research data for their sessions"
  ON research_data FOR DELETE
  TO authenticated
  USING (
    session_id IN (
      SELECT id FROM research_sessions WHERE user_id = auth.uid()
    )
  );

-- Add RLS policies for document_ocr_results
ALTER TABLE document_ocr_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own document OCR results"
  ON document_ocr_results FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own document OCR results"
  ON document_ocr_results FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own document OCR results"
  ON document_ocr_results FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own document OCR results"
  ON document_ocr_results FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Add RLS policies for document_qa_history
ALTER TABLE document_qa_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own document Q&A history"
  ON document_qa_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own document Q&A history"
  ON document_qa_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own document Q&A history"
  ON document_qa_history FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own document Q&A history"
  ON document_qa_history FOR DELETE
  TO authenticated
  USING (user_id = auth.uid()); 