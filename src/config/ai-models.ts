interface AIModel {
  id: string
  name: string
  description: string
  contextLength: number
  isMultimodal: boolean
}

export const models: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable model for text and vision',
    contextLength: 128000,
    isMultimodal: true
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Latest GPT-4 model with enhanced capabilities',
    contextLength: 128000,
    isMultimodal: true
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most tasks',
    contextLength: 16385,
    isMultimodal: false
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'High performance model with advanced reasoning',
    contextLength: 200000,
    isMultimodal: true
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance and efficiency',
    contextLength: 180000,
    isMultimodal: true
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    description: 'Fast and efficient model for most tasks',
    contextLength: 150000,
    isMultimodal: true
  }
]

export const defaultModel = 'gpt-4o' 