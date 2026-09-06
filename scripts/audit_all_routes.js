const fs = require('fs');
const path = require('path');

function parseTsArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  if (startIndex === -1 || lastIndex === -1) return [];
  const arrayStr = content.substring(startIndex, lastIndex + 1);
  try {
    return eval('(' + arrayStr + ')');
  } catch (e) {
    console.error('Eval error on ' + filePath, e);
    return [];
  }
}

const fish = parseTsArray('data/fish.ts');
const plants = parseTsArray('data/plants.ts');
const equipment = parseTsArray('data/equipment.ts');
const diseases = parseTsArray('data/diseases.ts');

const routes = [];

// Static Pages
const staticConfigs = [
  { path: '/', file: 'app/page.tsx', name: 'Home' },
  { path: '/about', file: 'app/about/page.tsx', name: 'About' },
  { path: '/contact', file: 'app/contact/page.tsx', name: 'Contact' },
  { path: '/guides', file: 'app/guides/page.tsx', name: 'Care Guides' },
  { path: '/start-aquarium', file: 'app/start-aquarium/page.tsx', name: 'Start Aquarium' },
  { path: '/water-params', file: 'app/water-params/page.tsx', name: 'Water Parameters Guide' },
  { path: '/fish', file: 'app/fish/page.tsx', name: 'Fish Library' },
  { path: '/fish/freshwater', file: 'app/fish/freshwater/page.tsx', name: 'Freshwater Fish' },
  { path: '/fish/saltwater', file: 'app/fish/saltwater/page.tsx', name: 'Saltwater Fish' },
  { path: '/plants', file: 'app/plants/page.tsx', name: 'Aquatic Plants' },
  { path: '/equipment', file: 'app/equipment/page.tsx', name: 'Equipment Guide' },
  { path: '/diseases', file: 'app/diseases/page.tsx', name: 'Fish Diseases & Treatment' },
  { path: '/food', file: 'app/food/page.tsx', name: 'Fish Diet & Nutrition' },
  { path: '/compatibility', file: 'app/compatibility/page.tsx', name: 'Species Compatibility Checker' },
  { path: '/tank-size', file: 'app/tank-size/page.tsx', name: 'Tank Size & Volume Calculator' },
  { path: '/water-analyzer', file: 'app/water-analyzer/page.tsx', name: 'Water Parameter Analyzer' },
  { path: '/stocking-planner', file: 'app/stocking-planner/page.tsx', name: 'Community Stocking Planner' },
  { path: '/fish-finder', file: 'app/fish-finder/page.tsx', name: 'Fish Recommendation Finder' },
  { path: '/equipment-wizard', file: 'app/equipment-wizard/page.tsx', name: 'Equipment Selection Wizard' },
  { path: '/budget-calculator', file: 'app/budget-calculator/page.tsx', name: 'Aquarium Budget Calculator' },
  { path: '/aquascape-planner', file: 'app/aquascape-planner/page.tsx', name: 'Aquascape Visual Planner' },
  { path: '/symptom-checker', file: 'app/symptom-checker/page.tsx', name: 'Fish Symptom Diagnostic Checker' },
  { path: '/quiz', file: 'app/quiz/page.tsx', name: 'Aquarium Knowledge Quiz' },
  { path: '/achievements', file: 'app/achievements/page.tsx', name: 'Keeper Achievements' },
  { path: '/privacy-policy', file: 'app/privacy-policy/page.tsx', name: 'Privacy Policy' },
  { path: '/terms', file: 'app/terms/page.tsx', name: 'Terms & Conditions' },
  { path: '/search', file: 'app/search/page.tsx', name: 'Search Library' },
  { path: '/thank-you', file: 'app/thank-you/page.tsx', name: 'Thank You' },
];

staticConfigs.forEach(s => {
  const content = fs.existsSync(s.file) ? fs.readFileSync(s.file, 'utf8') : '';
  const isClient = content.includes('"use client"') || content.includes("'use client'");
  const hasMeta = content.includes('metadata') || content.includes('generateMetadata');
  routes.push({
    url: s.path,
    file: s.file,
    type: 'Static',
    isClient,
    hasMeta,
  });
});

console.log('STATIC ROUTES AUDIT:');
console.table(routes);

console.log('\nDYNAMIC COUNTS:');
console.log('Fish dynamic:', fish.length);
console.log('Plants dynamic:', plants.length);
console.log('Equipment dynamic:', equipment.length);
console.log('Diseases dynamic:', diseases.length);
console.log('Total routes on site:', routes.length + fish.length + plants.length + equipment.length + diseases.length);
