const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const dataDir = path.join(__dirname, 'data');

// Read all files in public/images
let localImages = [];
try {
  localImages = fs.readdirSync(publicImagesDir);
} catch (e) {
  console.error("Error reading public/images directory:", e);
}

const localImagesSet = new Set(localImages);
const localImagesLowerMap = new Map();
localImages.forEach(file => {
  localImagesLowerMap.set(file.toLowerCase(), file);
});

console.log(`Found ${localImages.length} images in public/images/\n`);

const dataFiles = ['fish.ts', 'plants.ts', 'equipment.ts', 'food.ts', 'diseases.ts', 'guides.ts'];

const imageFieldRegex = /"image"\s*:\s*"([^"]+)"|image\s*:\s*"([^"]+)"/g;

const usedImages = new Set();
const missingImages = [];
const externalImages = [];

dataFiles.forEach(filename => {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File data/${filename} does not exist.`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  // Reset regex index
  imageFieldRegex.lastIndex = 0;
  
  console.log(`--- Checking data/${filename} ---`);
  
  // Find all instances
  while ((match = imageFieldRegex.exec(content)) !== null) {
    const imgUrl = match[1] || match[2];
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      externalImages.push({ file: filename, url: imgUrl });
      console.log(`[EXTERNAL] ${imgUrl}`);
    } else if (imgUrl.startsWith('/images/')) {
      const imgFile = imgUrl.substring('/images/'.length);
      usedImages.add(imgFile);
      if (localImagesSet.has(imgFile)) {
        // Exists exactly!
      } else {
        // Check case-insensitive
        const lowerFile = imgFile.toLowerCase();
        if (localImagesLowerMap.has(lowerFile)) {
          const correctName = localImagesLowerMap.get(lowerFile);
          console.log(`[CASE MISMATCH] "${imgFile}" should be "${correctName}" in data/${filename}`);
        } else {
          missingImages.push({ file: filename, image: imgFile });
          console.log(`[MISSING] "${imgFile}" does not exist in public/images/`);
        }
      }
    } else {
      console.log(`[UNKNOWN FORMAT] "${imgUrl}" in data/${filename}`);
    }
  }
  console.log();
});

console.log(`Summary:`);
console.log(`Total unique local images used: ${usedImages.size}`);
console.log(`Total missing local images: ${missingImages.length}`);
console.log(`Total external images used: ${externalImages.length}`);

// Find unused images in public/images
const unusedImages = [];
localImages.forEach(file => {
  if (!usedImages.has(file)) {
    // Check if case-insensitive version is used
    const lowerFile = file.toLowerCase();
    let isUsed = false;
    for (let u of usedImages) {
      if (u.toLowerCase() === lowerFile) {
        isUsed = true;
        break;
      }
    }
    if (!isUsed) {
      unusedImages.push(file);
    }
  }
});
console.log(`Total unused images in public/images/: ${unusedImages.length}`);
if (unusedImages.length > 0) {
  console.log("Unused images sample (up to 15):", unusedImages.slice(0, 15));
}
