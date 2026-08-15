const fs = require('fs');
const content = fs.readFileSync('data/equipment.ts', 'utf8');

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
