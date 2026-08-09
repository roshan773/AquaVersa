const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data/fish.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const slugRegex = /"slug": "([^"]+)",[\s\S]*?"name": "([^"]+)",[\s\S]*?"image": "(https:\/\/images\.unsplash\.com[^"]+)"/g;
let match;
let count = 0;
while ((match = slugRegex.exec(content)) !== null) {
  console.log(`${match[1]}|${match[2]}`);
  count++;
  if (count >= 5) break;
}
