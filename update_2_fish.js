const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data/fish.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const updatedFish = ['african-cichlid', 'convict-cichlid'];

const slugRegex = /"slug": "([^"]+)",([\s\S]*?)"image": "([^"]+)"/g;

content = content.replace(slugRegex, (match, slug, middle, currentImage) => {
  if (updatedFish.includes(slug)) {
    const localImage = `/images/${slug.replace(/-/g, '_')}.png`;
    return `"slug": "${slug}",${middle}"image": "${localImage}"`;
  }
  return match;
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log(`Updated fish.ts to point to local AI images for African Cichlid and Convict Cichlid.`);
