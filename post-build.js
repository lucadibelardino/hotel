import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'dist', 'index.html');
const dest = path.join(__dirname, 'dist', '404.html');

try {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied index.html to 404.html for GitHub Pages SPA support.');
} catch (err) {
    console.error('Error copying file:', err);
    process.exit(1);
}
