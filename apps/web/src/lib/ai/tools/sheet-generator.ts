import { z } from 'zod';

// Placeholder tool to generate sheet data
export const generateSheetTool = {
    description: 'Generates a data sheet (table) based on a query. Returns structured data.',
    parameters: z.object({
        query: z.string().describe('The query describing the data needed for the sheet.'),
        title: z.string().optional().describe('Optional title for the sheet artifact.'),
    }),
    // Execute function now returns the data directly
    execute: async ({ query, title }: { query: string; title?: string }) => {
        console.log(`Tool: generateSheetTool called with query: ${query}`);
        
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

        const simulatedData = {
            columns: ['Name', 'Specialty', 'Contact'],
            rows: [
                { Name: 'Jane Doe', Specialty: 'Family Immigration', Contact: 'jane.doe@example.com' },
                { Name: 'John Smith', Specialty: 'Work Permits', Contact: 'john.smith@example.com' },
                { Name: 'Alex Green', Specialty: 'Citizenship Applications', Contact: 'alex.green@example.com' },
            ]
        };

        const sheetTitle = title || `Data for: ${query.substring(0, 30)}...`;

        // Return the structured data along with the title
        return {
            title: sheetTitle,
            data: simulatedData 
        };
    },
}; 