// This is a script to generate placeholder avatar images
// Run with: node scripts/generate-avatar-placeholders.js

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create avatars directory if it doesn't exist
const avatarsDir = path.join(path.resolve(__dirname, '..'), 'public', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
  console.log(`Created directory: ${avatarsDir}`);
}

// Use DiceBear API to generate avatars
// See more options at: https://www.dicebear.com/styles
const AVATAR_STYLES = [
  'adventurer',
  'avataaars',
  'bottts',
  'identicon',
  'initials'
];

// Generate 5 default avatars (or more if needed)
for (let i = 1; i <= 5; i++) {
  const style = AVATAR_STYLES[(i - 1) % AVATAR_STYLES.length];
  const seed = `user-${i}-${Date.now()}`;
  const url = `https://api.dicebear.com/7.x/${style}/png?seed=${seed}&backgroundColor=b6e3f4`;
  const outputPath = path.join(avatarsDir, `default-${i}.png`);
  
  console.log(`Downloading avatar ${i} from ${url}...`);
  
  // Download the image
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download avatar ${i}. Status: ${response.statusCode}`);
      return;
    }
    
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      console.log(`Avatar ${i} saved to ${outputPath}`);
    });
    
    fileStream.on('error', (err) => {
      console.error(`Error writing avatar ${i} to file: ${err.message}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading avatar ${i}: ${err.message}`);
  });
} 