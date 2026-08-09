const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data/fish.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const absolutePath = path.join(__dirname, 'public', 'images');
const files = fs.readdirSync(absolutePath);

// Create a list of available local image names
const localImages = new Set(files.filter(f => f.endsWith('.png')));

// Some nice fallback Unsplash images for fish
const fallbacks = [
  "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601614838634-1bfaf38965f8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520302630592-fac87d005221?q=80&w=800&auto=format&fit=crop"
];

let fallbackIndex = 0;
let restoredCount = 0;

const slugRegex = /"slug": "([^"]+)",([\s\S]*?)"image": "([^"]+)"/g;

content = content.replace(slugRegex, (match, slug, middle, currentImage) => {
  if (currentImage.startsWith('/images/')) {
    // Extract filename
    const filename = currentImage.split('/').pop();
    
    // If the local file doesn't exist, replace with a fallback
    if (!localImages.has(filename)) {
      const fallbackUrl = fallbacks[fallbackIndex % fallbacks.length];
      fallbackIndex++;
      restoredCount++;
      return `"slug": "${slug}",${middle}"image": "${fallbackUrl}"`;
    }
  }
  
  return match;
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log(`Restored ${restoredCount} missing images to Unsplash placeholders.`);
