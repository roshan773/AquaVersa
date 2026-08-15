const fs = require('fs');
const content = fs.readFileSync('data/fish.ts', 'utf8');

// Match everything inside fishData = [...]
// Since it's a TS array, let's just parse it or use regex to extract the objects
const matches = content.match(/\{[\s\S]*?\}/g);
if (matches) {
  matches.forEach(m => {
    const slugMatch = m.match(/"slug":\s*"([^"]+)"/);
    const nameMatch = m.match(/"name":\s*"([^"]+)"/);
    const imageMatch = m.match(/"image":\s*"([^"]+)"/);
    if (slugMatch && nameMatch && imageMatch) {
      console.log(`Slug: ${slugMatch[1]} | Name: ${nameMatch[1]} | Image: ${imageMatch[1]}`);
    }
  });
}
