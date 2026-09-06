const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

const pages = getFiles('app').filter(f => f.endsWith('page.tsx'));
console.log(`Found ${pages.length} page.tsx files:`);
pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const isClient = content.includes('"use client"') || content.includes("'use client'");
  const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log(p.replace(/\\/g, '/'), JSON.stringify({ 
    isClient, 
    hasMetadata, 
    h1Count: h1Matches ? h1Matches.length : 0,
    h1Text: h1Matches ? h1Matches.map(h => h.replace(/<[^>]*>/g, '').trim()).join(' | ') : 'none'
  }));
});
