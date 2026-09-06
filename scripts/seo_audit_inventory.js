const fs = require('fs');
const path = require('path');

function extractSlugsAndNames(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const items = [];
  const regex = /{\s*id:\s*["']([^"']+)["'][\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({ id: match[1], slug: match[2], name: match[3] });
  }
  return items;
}

// Fish items
const fishContent = fs.readFileSync('data/fish.ts', 'utf8');
const fishItems = [];
const fishRegex = /id:\s*["']([^"']+)["'][\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?category:\s*["']([^"']+)["']/g;
let fMatch;
while ((fMatch = fishRegex.exec(fishContent)) !== null) {
  fishItems.push({ id: fMatch[1], slug: fMatch[2], name: fMatch[3], category: fMatch[4].toLowerCase() });
}

// Plants
const plants = extractSlugsAndNames('data/plants.ts');

// Equipment
const equipment = extractSlugsAndNames('data/equipment.ts');

// Diseases
const diseases = extractSlugsAndNames('data/diseases.ts');

console.log('Fish items count:', fishItems.length);
console.log('Plant items count:', plants.length);
console.log('Equipment items count:', equipment.length);
console.log('Diseases count:', diseases.length);

console.log('\nSample Fish:', fishItems.slice(0, 3));
console.log('\nSample Plants:', plants.slice(0, 3));
console.log('\nSample Equipment:', equipment.slice(0, 3));
console.log('\nSample Diseases:', diseases.slice(0, 3));
