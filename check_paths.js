const fs = require('fs');
const content = fs.readFileSync('data/fish.ts', 'utf8');

const slugRegex = /"slug": "([^"]+)",[\s\S]*?"image": "([^"]+)"/g;
let match;
while ((match = slugRegex.exec(content)) !== null) {
  if (['neon-tetra', 'kuhli-loach', 'molly', 'platy', 'swordtail', 'african-cichlid', 'convict-cichlid'].includes(match[1])) {
    console.log(`${match[1]} -> ${match[2]}`);
  }
}
