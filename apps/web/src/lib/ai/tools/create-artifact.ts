import { z } from 'zod';

import { updateArtifact, createArtifact } from '@/actions/artifacts';
import { createTool } from '@/lib/ai/tools';
import { ArtifactType, ArtifactVisibility } from '@/types/artifact';

export const CreateArtifactTool = createTool({
  name: 'create_artifact',
  description: 'Create a new artifact (document, code, spreadsheet, etc.) from the conversation',
  schema: z.object({
    title: z.string().describe('The title of the artifact'),
    type: z.enum(['document', 'code', 'spreadsheet', 'image', 'mindmap'] as const).describe('The type of artifact to create'),
    content: z.any().describe('The content of the artifact. For documents, include a text field. For code, include code, language, and fileName fields.'),
    visibility: z.enum(['private', 'public', 'team'] as const).optional().default('private').describe('The visibility of the artifact'),
    chat_id: z.string().optional().describe('The ID of the chat this artifact is associated with'),
  }),
  execute: async ({ title, type, content, visibility, chat_id }, { session }) => {
    try {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to create artifacts');
      }
      
      // Create the appropriate content structure based on the artifact type
      let structuredContent;
      switch (type) {
        case 'document':
          structuredContent = {
            text: content.text || '',
            format: content.format || 'markdown',
          };
          break;
        case 'code':
          structuredContent = {
            code: content.code || '',
            language: content.language || 'javascript',
            fileName: content.fileName || 'snippet.js',
          };
          break;
        case 'spreadsheet':
          structuredContent = {
            columns: content.columns || [],
            rows: content.rows || [],
          };
          break;
        case 'image':
          structuredContent = {
            url: content.url || '',
            alt: content.alt || '',
            width: content.width,
            height: content.height,
          };
          break;
        case 'mindmap':
          structuredContent = {
            nodes: content.nodes || [],
          };
          break;
        default:
          throw new Error(`Unsupported artifact type: ${type}`);
      }

      // Create the artifact in the database
      const artifact = await createArtifact({
        title,
        content: structuredContent,
        type: type as ArtifactType,
        visibility: (visibility || 'private') as ArtifactVisibility,
        user_id: session.user.id,
        chat_id,
      });

      return {
        status: 'success',
        message: `Created ${type} artifact: ${title}`,
        artifact_id: artifact.id,
        type,
      };
    } catch (error: any) {
      console.error('Error creating artifact:', error);
      return {
        status: 'error',
        message: error.message || 'Failed to create artifact',
      };
    }
  },
});

export const UpdateArtifactTool = createTool({
  name: 'update_artifact',
  description: 'Update an existing artifact with new content',
  schema: z.object({
    artifact_id: z.string().describe('The ID of the artifact to update'),
    title: z.string().optional().describe('The new title for the artifact'),
    content: z.any().optional().describe('The new content for the artifact'),
    visibility: z.enum(['private', 'public', 'team'] as const).optional().describe('The new visibility setting for the artifact'),
  }),
  execute: async ({ artifact_id, title, content, visibility }, { session }) => {
    try {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to update artifacts');
      }

      const updates: Record<string, any> = {};
      if (title) updates.title = title;
      if (content) updates.content = content;
      if (visibility) updates.visibility = visibility;

      // Update the artifact in the database
      await updateArtifact(artifact_id, updates, session.user.id);

      return {
        status: 'success',
        message: `Updated artifact successfully`,
        artifact_id,
      };
    } catch (error: any) {
      console.error('Error updating artifact:', error);
      return {
        status: 'error',
        message: error.message || 'Failed to update artifact',
      };
    }
  },
}); 