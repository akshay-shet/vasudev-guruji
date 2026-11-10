import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const mappedProducts = JSON.parse(fs.readFileSync('scripts/mapped_products.json', 'utf8'));

const downloadsDir = path.resolve('public/img/shop-downloads');
const targetShopDir = path.resolve('public/img/shop');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}
if (!fs.existsSync(targetShopDir)) {
  fs.mkdirSync(targetShopDir, { recursive: true });
}

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuffer));
}

async function processProduct(prod, index, total) {
  const { id, name, file, imgUrl, matchedTitle } = prod;
  console.log(`[${index + 1}/${total}] Processing ${id} (${name})...`);
  
  if (!imgUrl) {
    console.warn(`  WARNING: No image URL for ${id}`);
    return;
  }

  // Derive raw extension from url
  const urlObj = new URL(imgUrl);
  let ext = path.extname(urlObj.pathname) || '.jpg';
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase())) {
    ext = '.jpg';
  }

  const rawPath = path.join(downloadsDir, `${id}${ext}`);
  const targetWebp = path.join(targetShopDir, `${id}.webp`);

  try {
    // 1. Download raw image
    await downloadFile(imgUrl, rawPath);
    console.log(`  Downloaded: ${path.basename(rawPath)} (${fs.statSync(rawPath).size} bytes)`);

    // 2. Convert to 500x500 padded white-background webp
    execFileSync('ffmpeg', [
      '-y',
      '-i', rawPath,
      '-vf', 'scale=500:500:force_original_aspect_ratio=decrease,pad=500:500:(ow-iw)/2:(oh-ih)/2:color=white',
      '-c:v', 'libwebp',
      '-quality', '84',
      targetWebp
    ], { stdio: 'pipe' });

    console.log(`  Converted -> ${path.basename(targetWebp)} (${fs.statSync(targetWebp).size} bytes)`);
  } catch (err) {
    console.error(`  ERROR processing ${id}:`, err.message);
  }
}

async function main() {
  console.log(`Starting download and conversion for ${mappedProducts.length} shop items...`);
  for (let i = 0; i < mappedProducts.length; i++) {
    await processProduct(mappedProducts[i], i, mappedProducts.length);
  }
  console.log('All products processed successfully!');
}

main();
