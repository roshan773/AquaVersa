const fs = require('fs');
const path = require('path');

function parseTsArray(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Find array start
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  if (startIndex === -1 || lastIndex === -1) return [];
  const arrayStr = content.substring(startIndex, lastIndex + 1);
  // Clean trailing commas before } or ]
  const cleaned = arrayStr
    .replace(/,\s*([\]}])/g, '$1')
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');
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
const food = parseTsArray('data/food.ts');

console.log('Fish count:', fish.length);
console.log('Plants count:', plants.length);
console.log('Equipment count:', equipment.length);
console.log('Diseases count:', diseases.length);
console.log('Food count:', food.length);

const inventory = [];

// Static Pages
const staticPages = [
  { url: '/', type: 'Home', purpose: 'Primary portal for aquarium knowledge, care guides, species libraries, and keeper tools' },
  { url: '/about', type: 'About', purpose: 'Overview of Roshan Aquva World, mission, standards, and educational philosophy' },
  { url: '/contact', type: 'Contact', purpose: 'Direct keeper inquiries, feedback, corrections, and contact channels' },
  { url: '/guides', type: 'Guides Index', purpose: 'Hub for foundational aquarium guides, cycling, chemistry, and hardware' },
  { url: '/start-aquarium', type: 'Guide', purpose: 'Step-by-step 5-stage roadmap for setting up a freshwater aquarium' },
  { url: '/water-params', type: 'Guide', purpose: 'Reference guide to aquarium water chemistry, nitrogen cycle, pH, GH, KH, and temperature' },
  { url: '/fish', type: 'Category / Index', purpose: 'Complete aquarium fish directory and care library covering freshwater and saltwater species' },
  { url: '/fish/freshwater', type: 'Category / Index', purpose: 'Freshwater aquarium fish species directory, care, and tank parameters' },
  { url: '/fish/saltwater', type: 'Category / Index', purpose: 'Saltwater / marine aquarium fish species directory and reef compatibility' },
  { url: '/plants', type: 'Category / Index', purpose: 'Aquatic plants catalog, lighting, CO2, substrate, and aquascaping guide' },
  { url: '/equipment', type: 'Category / Index', purpose: 'Aquarium equipment catalog, filtration, heating, lighting, and air hardware' },
  { url: '/diseases', type: 'Category / Index', purpose: 'Aquarium fish disease identification, symptom catalog, and treatment archive' },
  { url: '/food', type: 'Guide / Index', purpose: 'Aquarium fish diet guide, nutritional requirements, feeding schedules, and food types' },
  { url: '/compatibility', type: 'Interactive Tool', purpose: 'Fish community compatibility checker to simulate species pairing and temperament' },
  { url: '/tank-size', type: 'Interactive Tool', purpose: 'Tank size and water volume calculator with weight and dimension estimates' },
  { url: '/water-analyzer', type: 'Interactive Tool', purpose: 'Water parameter analyzer evaluating ammonia, nitrite, nitrate, pH, and safety' },
  { url: '/stocking-planner', type: 'Interactive Tool', purpose: 'Community stocking planner calculating biological load and schooling limits' },
  { url: '/fish-finder', type: 'Interactive Tool', purpose: 'Fish recommendation wizard matching tank size, experience, and water type' },
  { url: '/equipment-wizard', type: 'Interactive Tool', purpose: 'Hardware sizing calculator matching filtration and heating to tank volume' },
  { url: '/budget-calculator', type: 'Interactive Tool', purpose: 'Aquarium startup and maintenance budget cost estimator' },
  { url: '/aquascape-planner', type: 'Interactive Tool', purpose: 'Visual aquascape layout planner for hardscape and flora arrangement' },
  { url: '/symptom-checker', type: 'Interactive Tool', purpose: 'Interactive fish symptom checker for diagnosing behavioral and physical illness' },
  { url: '/quiz', type: 'Interactive Tool', purpose: 'Aquarium knowledge quiz testing aquatic husbandry and water chemistry skills' },
  { url: '/achievements', type: 'Interactive Feature', purpose: 'User learning milestone badges and achievement tracking' },
  { url: '/privacy-policy', type: 'Legal', purpose: 'Privacy policy and data collection transparency disclosures' },
  { url: '/terms', type: 'Legal', purpose: 'Terms of service and user agreement for educational content' },
  { url: '/search', type: 'Internal Search', purpose: 'Site-wide search across fish, plants, equipment, diseases, and guides (noindex)' },
];

console.log('Total Static Pages:', staticPages.length);

// Dynamic Fish
const dynamicFish = fish.map(f => ({
  url: `/fish/${f.category.toLowerCase()}/${f.slug}`,
  name: f.name,
  scientificName: f.scientificName,
  category: f.category,
  type: 'Fish Detail'
}));

// Dynamic Plants
const dynamicPlants = plants.map(p => ({
  url: `/plants/${p.slug}`,
  name: p.name,
  scientificName: p.scientificName,
  type: 'Plant Detail'
}));

// Dynamic Equipment
const dynamicEquipment = equipment.map(e => ({
  url: `/equipment/${e.slug}`,
  name: e.name,
  type: 'Equipment Detail'
}));

// Dynamic Diseases
const dynamicDiseases = diseases.map(d => ({
  url: `/diseases/${d.slug}`,
  name: d.name,
  type: 'Disease Detail'
}));

console.log('Dynamic Fish Pages:', dynamicFish.length);
console.log('Dynamic Plant Pages:', dynamicPlants.length);
console.log('Dynamic Equipment Pages:', dynamicEquipment.length);
console.log('Dynamic Disease Pages:', dynamicDiseases.length);

const totalPublicPages = staticPages.length + dynamicFish.length + dynamicPlants.length + dynamicEquipment.length + dynamicDiseases.length;
console.log('TOTAL PUBLIC PAGES:', totalPublicPages);
