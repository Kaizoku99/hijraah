import { ChatMessage } from '@/types/chat';
import { streamText } from 'ai';
import { customModel } from '@/lib/ai/models';
import { Agent, AgentState, AgentType, StepResult } from './agent-framework';
import { generatePersonalizationContext } from '@/lib/ai/personalization/user-history';
import { getSupabaseClient } from '@/lib/supabase/client';

/**
 * DocumentPreparerAgent helps users prepare and organize documents required
 * for immigration applications, generating templates and providing formatting guidance.
 */
export class DocumentPreparerAgent extends Agent {
  constructor(initialState?: Partial<AgentState>) {
    super(initialState);
    this.type = AgentType.DOCUMENT_PREPARER;
    
    // Initialize document-specific metadata if not present
    if (!this.metadata.documents) {
      this.metadata.documents = [];
    }
    
    if (!this.metadata.currentDocumentId) {
      this.metadata.currentDocumentId = null;
    }
  }

  /**
   * Process an incoming message and generate a response
   */
  async processMessage(message: string): Promise<string | ReadableStream> {
    // Update agent status
    await this.setStatus('thinking');

    // Create a message object and add it to the agent's history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      sessionId: this.id,
      createdAt: new Date().toISOString(),
    };
    await this.addMessage(userMessage);

    try {
      // If personalization is enabled and we have a user ID
      let personalizationContext = '';
      if (this.userId) {
        personalizationContext = await generatePersonalizationContext(this.userId);
      }

      // Prepare the context for the model
      const context = await this.getContext();
      
      // Get the AI model
      const model = customModel('immigration-fine-tuned');
      
      // Generate a streaming response using the AI model
      await this.setStatus('executing');
      
      const systemMessage = `You are an expert document preparation assistant for the Hijraah immigration platform. Your goal is to help users prepare documents required for their immigration applications.
${personalizationContext}
${context}

Guidelines:
1. Identify what documents the user needs to prepare
2. Provide specific formatting guidance for each document
3. Offer templates when appropriate
4. Explain common mistakes and how to avoid them
5. Guide the user through document certification or translation requirements
6. Help the user organize documents for submission`;

      // Create system message for the conversation
      const chatMessages: ChatMessage[] = [
        { 
          id: 'system', 
          role: 'system', 
          content: systemMessage, 
          sessionId: this.id,
          createdAt: this.createdAt,
        },
        ...this.messages,
      ];
      
      // Use the model to generate a response
      const response = await model.complete({
        prompt: this.formatChatMessagesForCompletion(chatMessages),
        maxTokens: 1000,
        temperature: 0.7,
      });
      
      // Stream the response
      const stream = streamText(response);
      
      // Save the content as it streams
      let fullContent = '';
      response.on('content', (chunk) => {
        fullContent += chunk;
        this.metadata.currentResponse = fullContent;
      });
      
      // When response is complete, save as a message
      response.on('end', async () => {
        const assistantMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: fullContent,
          sessionId: this.id,
          createdAt: new Date().toISOString(),
        };
        
        // Clear the current response from metadata
        this.metadata.currentResponse = '';
        
        // Add the message to history
        await this.addMessage(assistantMessage);
        
        // Analyze the message for document recommendations
        await this.extractDocumentRecommendations(fullContent);
        
        // Update status to complete
        await this.setStatus('complete');
      });
      
      return stream;
    } catch (error) {
      console.error('Error in DocumentPreparerAgent:', error);
      
      // Update status to error
      await this.setStatus('error');
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again.',
        sessionId: this.id,
        createdAt: new Date().toISOString(),
      };
      await this.addMessage(errorMessage);
      
      return 'I encountered an error while processing your request. Please try again.';
    }
  }

  /**
   * Extract document recommendations from the assistant's message
   */
  private async extractDocumentRecommendations(content: string): Promise<void> {
    // Pattern to detect document recommendations
    const documentPattern = /\[(DOCUMENT|DOC):(.*?)\]/gi;
    const matches = content.matchAll(documentPattern);
    
    // Extract document names
    const documentSet = new Set<string>();
    for (const match of matches) {
      if (match[2]) {
        documentSet.add(match[2].trim());
      }
    }
    
    // Add new documents to metadata
    for (const doc of documentSet) {
      if (!this.metadata.documents.some((d: any) => d.name === doc)) {
        this.metadata.documents.push({
          id: Date.now().toString(),
          name: doc,
          status: 'recommended',
          createdAt: new Date().toISOString(),
        });
      }
    }
    
    // Save the updated metadata
    await this.save();
  }

  /**
   * Format chat messages for model completion
   */
  private formatChatMessagesForCompletion(messages: ChatMessage[]): string {
    return messages.map(msg => {
      if (msg.role === 'system') {
        return `System: ${msg.content}\n\n`;
      } else if (msg.role === 'user') {
        return `User: ${msg.content}\n\n`;
      } else {
        return `Assistant: ${msg.content}\n\n`;
      }
    }).join('');
  }

  /**
   * Execute a step in the agent's workflow
   */
  async executeStep(): Promise<StepResult> {
    // Get the current step from metadata
    const currentStep = this.metadata.currentStep || 'identify_documents';
    
    try {
      switch (currentStep) {
        case 'identify_documents':
          // Identify required documents based on previous messages
          const documents = await this.identifyRequiredDocuments();
          this.metadata.documents = documents;
          this.metadata.currentStep = 'create_templates';
          return {
            output: documents,
            nextAction: 'create_templates',
          };
          
        case 'create_templates':
          // Create templates for documents
          const templates = await this.createDocumentTemplates();
          this.metadata.templates = templates;
          this.metadata.currentStep = 'guide_completion';
          return {
            output: templates,
            nextAction: 'guide_completion',
          };
          
        case 'guide_completion':
          // Guide the user through document completion
          const guidance = this.generateCompletionGuidance();
          this.metadata.currentStep = 'wait_for_user';
          return {
            output: guidance,
            nextAction: 'wait_for_user',
          };
          
        default:
          return {
            output: 'No action needed at this time.',
            nextAction: 'wait_for_user',
          };
      }
    } catch (error) {
      console.error('Error executing step:', error);
      return {
        output: null,
        error: 'Failed to execute step: ' + (error as Error).message,
        nextAction: 'wait_for_user',
      };
    }
  }

  /**
   * Identify required documents based on user conversation
   */
  private async identifyRequiredDocuments(): Promise<any[]> {
    // In a real system, this would analyze the conversation and identify documents
    // For now, return a simple array of document types
    return [
      {
        id: nanoid(),
        name: 'Passport Copy',
        status: 'required',
        description: 'Clear copy of all passport pages with visas and stamps',
      },
      {
        id: nanoid(),
        name: 'Application Form',
        status: 'required',
        description: 'Completed application form with all fields filled out',
      },
      {
        id: nanoid(),
        name: 'Passport Photos',
        status: 'required',
        description: '2 recent passport-sized photographs (35x45mm) with white background',
      },
    ];
  }

  /**
   * Create document templates based on identified documents
   */
  private async createDocumentTemplates(): Promise<any[]> {
    // In a real system, this would generate actual templates
    // For now, return placeholder data
    const templates = [];
    
    for (const doc of this.metadata.documents) {
      templates.push({
        id: nanoid(),
        documentId: doc.id,
        name: `${doc.name} Template`,
        format: 'PDF',
        url: '#', // Would be a real URL in production
      });
    }
    
    return templates;
  }

  /**
   * Generate guidance for document completion
   */
  private generateCompletionGuidance(): string {
    // In a real system, this would generate personalized guidance
    return `
Here are some tips for completing your documents:
- Ensure all information is accurate and matches your passport
- Use black ink for all forms
- Sign within the designated signature boxes
- Make photocopies of all documents before submission
- Have original documents ready for verification
    `;
  }

  /**
   * Get context for this agent type
   */
  async getContext(): Promise<string> {
    // Get information about the user's documents from the database
    let documentsContext = '';
    
    if (this.userId) {
      const supabase = getSupabaseClient();
      const { data } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', this.userId);
        
      if (data && data.length > 0) {
        documentsContext = `
The user has ${data.length} documents in their profile:
${data.map((doc: any) => `- ${doc.name} (${doc.status})`).join('\n')}
        `;
      }
    }
    
    // Basic context for document preparation
    return `
As a document preparation assistant, you should help users prepare and organize documents for immigration applications.

Document Types You Can Help With:
- Passports and travel documents
- Birth certificates
- Marriage certificates
- Educational credentials
- Employment verification
- Financial statements
- Medical examination reports
- Police clearance certificates

Common Document Requirements:
- Original and photocopies
- Certified translations
- Notarization or apostille
- Specific formatting requirements

${documentsContext}

When recommending documents, use the format [DOCUMENT:Name of Document] to help the system track your recommendations.
    `;
  }
}

// Helper function for generating IDs
function nanoid(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
} 