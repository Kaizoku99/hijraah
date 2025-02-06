import { ChatOpenAI } from '@langchain/openai';

export const deepseekModel = new ChatOpenAI({
  modelName: 'deepseek-chat',
  temperature: 0.7,
  maxTokens: 4000,
  openAIApiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: 'https://api.deepseek.com/v1'
  }
});
