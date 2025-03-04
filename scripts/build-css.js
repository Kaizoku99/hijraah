#!/usr/bin/env node

import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Starting CSS build process...');

// Check for file existence 
const inputFile = path.join(rootDir, 'src', 'app', 'globals.css');
const outputFile = path.join(rootDir, 'public', 'styles.css');

console.log('Checking if files exist:');
console.log(`Input CSS file (globals.css): ${fs.existsSync(inputFile) ? 'Found ✅' : 'Not found ❌'}`);
console.log(`Output directory (public): ${fs.existsSync(path.dirname(outputFile)) ? 'Found ✅' : 'Not found ❌'}`);

// For Tailwind CSS v4, we'll use the Next.js builder which has built-in support
// Create a simple shell CSS file to verify styling works
console.log('\nCreating a basic CSS file as a temporary measure...');

const basicCss = `/* Basic temporary CSS until Tailwind is properly configured */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --bg-color: white;
  --text-color: #111;
  --primary-color: #0070f3;
  --border-color: #eaeaea;
}

html[data-theme="dark"] {
  --bg-color: #111;
  --text-color: #f7f7f7;
  --primary-color: #3291ff;
  --border-color: #333;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  font-weight: 600;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

button, .button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

button:hover, .button:hover {
  background-color: color-mix(in srgb, var(--primary-color), black 10%);
}

.card {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}`;

try {
  fs.writeFileSync(outputFile, basicCss);
  console.log(`✅ Created temporary CSS file at ${outputFile}`);
  console.log(`\nTo properly fix Tailwind, please:`);
  console.log(`1. Make sure @tailwindcss/postcss is installed (npm install -D @tailwindcss/postcss)`);
  console.log(`2. Verify postcss.config.mjs is correctly set up`);
  console.log(`3. Use the right import in globals.css: @import "@tailwindcss/postcss";`);
  console.log(`4. Run next build and next start to ensure proper CSS building`);
} catch (error) {
  console.error(`❌ Error creating temporary CSS file: ${error.message}`);
} 