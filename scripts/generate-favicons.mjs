import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <!-- Background Rounded Indigo Badge -->
  <rect width="512" height="512" rx="144" fill="#27187E"/>
  
  <!-- Outer Dotted Atlas Ring -->
  <circle cx="256" cy="256" r="216" stroke="#CFCAF5" stroke-width="12" stroke-dasharray="24 24" opacity="0.65"/>
  
  <!-- Stylized Marine Waves Forming Aquatic Crown / Fish silhouette -->
  <!-- Upper Wave -->
  <path d="M128 216C168 168 216 160 256 184C296 208 344 184 384 152C360 216 312 248 272 232C232 224 176 248 128 216Z" fill="#F7F7FF"/>
  
  <!-- Main Intertwining Wave Ribbon -->
  <path d="M120 280C160 240 224 248 264 280C304 312 352 304 392 256C368 328 304 360 256 328C208 304 160 320 120 280Z" fill="#F7F7FF"/>
  
  <!-- Lower Ripple Anchor -->
  <path d="M168 352C208 328 248 336 280 368C312 400 352 384 376 360C352 400 296 408 264 384C232 360 192 376 168 352Z" fill="#CFCAF5"/>
  
  <!-- Atlas Polaris Star Point -->
  <circle cx="368" cy="144" r="20" fill="#F7F7FF"/>
  <circle cx="368" cy="144" r="32" stroke="#F7F7FF" stroke-width="4" opacity="0.4"/>
</svg>`);

async function generateFavicons() {
  const publicDir = path.resolve('public');
  const appDir = path.resolve('app');

  // 1. Generate PNGs at multiple resolutions
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png64 = await sharp(svgBuffer).resize(64, 64).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Write Apple Touch Icon
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);

  // Write icon.png
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
  fs.writeFileSync(path.join(appDir, 'icon.png'), png64);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png64);

  // Write favicon.ico (32x32 PNG is supported by modern browsers inside ico or direct)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), png32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), png32);

  console.log('Successfully generated all favicons and touch icons!');
}

generateFavicons().catch(console.error);
