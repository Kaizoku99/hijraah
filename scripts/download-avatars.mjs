// This is a script to generate placeholder avatar images
// Run with: node scripts/download-avatars.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Avatar sources
const AVATAR_SOURCES = [
  'https://api.dicebear.com/7.x/adventurer/png?seed=avatar1&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/png?seed=avatar2&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/bottts/png?seed=avatar3&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/identicon/png?seed=avatar4&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/initials/png?seed=avatar5&backgroundColor=b6e3f4'
];

// Create avatars directory if it doesn't exist
const avatarsDir = path.join(path.resolve(__dirname, '..'), 'public', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
  console.log(`Created directory: ${avatarsDir}`);
} else {
  console.log(`Using existing directory: ${avatarsDir}`);
}

// Download and save each avatar
async function downloadAvatars() {
  console.log('Starting avatar downloads...');
  
  for (let i = 0; i < AVATAR_SOURCES.length; i++) {
    const url = AVATAR_SOURCES[i];
    const outputPath = path.join(avatarsDir, `default-${i + 1}.png`);
    
    console.log(`Downloading avatar ${i + 1} from ${url}...`);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Failed to download avatar ${i + 1}. Status: ${response.status}`);
        continue;
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      fs.writeFileSync(outputPath, buffer);
      console.log(`Avatar ${i + 1} saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error downloading avatar ${i + 1}:`, error.message);
    }
  }
  
  console.log('Avatar download completed!');
}

// Run the download function
downloadAvatars().catch(error => {
  console.error('Error in download process:', error);
}); 