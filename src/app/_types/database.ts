export interface Document {
  id: string;
  name: string;
  file_type: string;
  file_path: string;
  file_size: number;
  status: 'processing' | 'processed' | 'failed';
  description: string | null;
  user_id: string;
  metadata: {
    ocr_text?: string;
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
} 