const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const absolutePath = path.join(__dirname, 'public', 'images');

async function processImages() {
  try {
    const files = fs.readdirSync(absolutePath);
    let count = 0;
    
    for (const file of files) {
      if (file.endsWith('.png')) {
        const filePath = path.join(absolutePath, file);
        const tempPath = path.join(absolutePath, `temp_${file}`);
        
        // Resize to 800x600, center crop, and optimize
        await sharp(filePath)
          .resize(800, 600, {
            fit: 'cover',
            position: 'center'
          })
          .png({ quality: 80, compressionLevel: 8 }) // optimize PNG
          .toFile(tempPath);
          
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        count++;
      }
    }
    console.log(`Successfully formatted and standardized ${count} images to 800x600.`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
