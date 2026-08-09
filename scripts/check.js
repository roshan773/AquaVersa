import fs from 'fs';
const fileContent = fs.readFileSync('data/fish.ts', 'utf-8');

const missing = [];
const lines = fileContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Hawkfish')) {
    console.log('Found:', lines[i]);
  }
}
