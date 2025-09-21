#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import { glob } from 'glob';

// Function to fix AI SDK tool definitions
function fixToolDefinitions(content) {
    // Replace inputSchema with parameters
    content = content.replace(/inputSchema:/g, 'parameters:');

    // Fix execute function parameters - remove explicit typing
    content = content.replace(
        /execute: async \(\{ ([^}]+) \}: \{ [^}]+ \}\) =>/g,
        'execute: async ({ $1 }) =>'
    );

    return content;
}

// Function to process a single file
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fixedContent = fixToolDefinitions(content);

        if (content !== fixedContent) {
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            console.log(`Fixed: ${filePath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Main function
async function main() {
    try {
        // Find all TypeScript files in the MAS package
        const files = await glob('packages/hijraah-mas/src/**/*.ts', {
            ignore: ['**/node_modules/**', '**/dist/**']
        });

        console.log(`Found ${files.length} TypeScript files to check...`);

        let fixedCount = 0;
        for (const file of files) {
            if (processFile(file)) {
                fixedCount++;
            }
        }

        console.log(`\nFixed ${fixedCount} files.`);

        if (fixedCount > 0) {
            console.log('\nAll AI SDK tool definitions have been updated to v5 syntax.');
            console.log('- Changed inputSchema to parameters');
            console.log('- Removed explicit typing from execute function parameters');
        }

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();