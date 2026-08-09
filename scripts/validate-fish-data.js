import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/fish.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

const jsCode = fileContent
  .replace(/import \{.*\} from '.*';/g, '')
  .replace(/import \{.*\} from ".*";/g, '')
  .replace(/export const fishData: Fish\[\] =/, 'module.exports =');

let fishData;
try {
  const m = { exports: [] };
  const wrapper = new Function('module', 'exports', jsCode);
  wrapper(m, m.exports);
  fishData = m.exports;
} catch (e) {
  console.error("Failed to parse fish.ts", e);
  process.exit(1);
}

// Remove mock objects without slug
fishData = fishData.filter(f => f.slug);

let errors = [];

// Validation Rules
if (fishData.length !== 100) errors.push(`Total fish is ${fishData.length}, expected 100.`);

const fw = fishData.filter(f => f.category?.toLowerCase() === 'freshwater');
if (fw.length !== 50) errors.push(`Freshwater fish is ${fw.length}, expected 50.`);

const sw = fishData.filter(f => f.category?.toLowerCase() === 'saltwater');
if (sw.length !== 50) errors.push(`Saltwater fish is ${sw.length}, expected 50.`);

const allowedDiffs = ['Beginner', 'Advanced Beginner', 'Intermediate', 'Advanced'];
const ids = new Set();
const slugs = new Set();

fishData.forEach(fish => {
  if (!fish.category) errors.push(`Fish ${fish.name} missing category.`);
  if (!fish.difficulty) errors.push(`Fish ${fish.name} missing difficulty.`);
  else if (!allowedDiffs.includes(fish.difficulty)) errors.push(`Fish ${fish.name} has invalid difficulty: ${fish.difficulty}`);
  
  if (typeof fish.difficultyScore !== 'number') errors.push(`Fish ${fish.name} missing difficultyScore.`);
  if (!fish.difficultyReason) errors.push(`Fish ${fish.name} missing difficultyReason.`);
  if (typeof fish.beginnerSuitable !== 'boolean') errors.push(`Fish ${fish.name} missing beginnerSuitable.`);

  if (ids.has(fish.id)) errors.push(`Duplicate ID: ${fish.id}`);
  ids.add(fish.id);

  if (slugs.has(fish.slug)) errors.push(`Duplicate slug: ${fish.slug}`);
  slugs.add(fish.slug);
});

console.log("=== VALIDATION REPORT ===");
if (errors.length === 0) {
  console.log("All programmatic validations passed successfully!");
  console.log(`Total Fish: ${fishData.length}`);
  console.log(`Freshwater: ${fw.length}`);
  console.log(`Saltwater: ${sw.length}`);
  
  const beg = fishData.filter(f => f.difficulty === 'Beginner').length;
  const advBeg = fishData.filter(f => f.difficulty === 'Advanced Beginner').length;
  const int = fishData.filter(f => f.difficulty === 'Intermediate').length;
  const adv = fishData.filter(f => f.difficulty === 'Advanced').length;
  
  console.log(`Beginner: ${beg}`);
  console.log(`Advanced Beginner: ${advBeg}`);
  console.log(`Intermediate: ${int}`);
  console.log(`Advanced: ${adv}`);
} else {
  console.log("VALIDATION FAILED:");
  errors.forEach(e => console.log("-", e));
}
console.log("=========================");
