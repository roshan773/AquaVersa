import fs from 'fs';
import path from 'path';

// Define the updated lists
const lists = {
  freshwater: {
    Beginner: [
      "Guppy", "Betta Fish", "Zebra Danio", "Cherry Barb", "Harlequin Rasbora", 
      "Molly", "Platy", "Swordtail", "Black Skirt Tetra", "Bloodfin Tetra", "Buenos Aires Tetra"
    ],
    "Advanced Beginner": [
      "Neon Tetra", "Corydoras Catfish", "Kuhli Loach", "Gourami", "Celestial Pearl Danio", 
      "Cardinal Tetra", "Convict Cichlid", "Bolivian Ram", "Kribensis", "Tiger Barb", 
      "Odessa Barb", "Goldfish", "White Cloud Mountain Minnow", "Congo Tetra", 
      "Ember Tetra", "Serpae Tetra", "Diamond Tetra", "Emperor Tetra"
    ],
    Intermediate: [
      "Angelfish", "Plecostomus", "Rummy Nose Tetra", "Otocinclus", "African Cichlid", 
      "German Blue Ram", "Apistogramma", "Clown Loach", "Yoyo Loach", "Rainbow Shark", 
      "Red Tail Shark", "Silver Dollar", "Panda Garra", "Glass Catfish"
    ],
    Advanced: [
      "Oscar", "Discus", "Jack Dempsey", "Texas Cichlid", "Green Terror", "Bala Shark", "Koi"
    ]
  },
  saltwater: {
    Beginner: [
      "Ocellaris Clownfish", "Royal Gramma", "Pajama Cardinalfish", "Firefish Goby"
    ],
    "Advanced Beginner": [
      "Banggai Cardinalfish", "Watchman Goby", "Bicolor Blenny", "Tailspot Blenny", 
      "Midas Blenny", "Lawnmower Blenny", "Flame Hawkfish", "Longnose Hawkfish"
    ],
    Intermediate: [
      "Yellow Tang", "Blue Hippo Tang", "Flame Angelfish", "Coral Beauty", "Diamond Goby", 
      "Six Line Wrasse", "Melanurus Wrasse", "Fairy Wrasse", "Foxface Rabbitfish", "Kole Tang", 
      "Snowflake Eel", "Valentini Puffer", "Dogface Puffer", "Fuzzy Dwarf Lionfish", "Lionfish"
    ],
    Advanced: [
      "Mandarinfish", "Leopard Wrasse", "Cleaner Wrasse", "Powder Blue Tang", "Achilles Tang", 
      "Naso Tang", "Sailfin Tang", "Emperor Angelfish", "Majestic Angelfish", "Regal Angelfish", 
      "Peppermint Angelfish", "Ribbon Eel", "Green Mandarin", "Spotted Mandarin", 
      "Clown Triggerfish", "Niger Triggerfish", "Picasso Triggerfish", "Porcupine Puffer", 
      "Copperband Butterflyfish", "Raccoon Butterflyfish", "Threadfin Butterflyfish", 
      "Moorish Idol", "Panther Grouper"
    ]
  }
};

const scores = {
  "Beginner": 1,
  "Advanced Beginner": 2,
  "Intermediate": 3,
  "Advanced": 4
};

const reasons = {
  "Beginner": "Great choices for new aquarists. Hardy, forgiving of minor beginner mistakes, and have straightforward feeding and basic filtration requirements.",
  "Advanced Beginner": "Suitable for beginners ready for a little more responsibility. May require more consistent maintenance or have specific social/group requirements.",
  "Intermediate": "Best for aquarists with some experience. Requires more demanding water parameters, larger aquarium, or more careful compatibility planning.",
  "Advanced": "Best suited for experienced aquarists. Requires specialized care, large aquariums, or difficult acclimation and feeding."
};

const beginnerSuitable = {
  "Beginner": true,
  "Advanced Beginner": true,
  "Intermediate": false,
  "Advanced": false
};

const filePath = path.join(process.cwd(), 'data/fish.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

// We use eval to parse the array securely
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

// Create lookup map
const fishMap = new Map();
Object.entries(lists.freshwater).forEach(([diff, fishes]) => {
  fishes.forEach(f => fishMap.set(f.toLowerCase(), { difficulty: diff, category: 'Freshwater' }));
});
Object.entries(lists.saltwater).forEach(([diff, fishes]) => {
  fishes.forEach(f => fishMap.set(f.toLowerCase(), { difficulty: diff, category: 'Saltwater' }));
});

const report = {
  total: 0,
  freshwater: 0,
  saltwater: 0,
  beginner: 0,
  advancedBeginner: 0,
  intermediate: 0,
  advanced: 0,
  changed: [],
  missing: [],
  duplicates: new Set(),
  invalid: [],
};

const idSet = new Set();
const slugSet = new Set();

fishData = fishData.filter((fish) => {
  // Ensure exactly 100 actual fish elements. 
  if (!fish.slug) {
    return false;
  }
  return true;
});

fishData = fishData.map(fish => {
  const fishNameLower = fish.name.toLowerCase();
  
  // Exact match first
  let mapping = fishMap.get(fishNameLower);
  
  // Fuzzy match
  if (!mapping) {
    const foundEntry = [...fishMap.entries()].find(([k]) => fishNameLower.includes(k) || k.includes(fishNameLower));
    if (foundEntry) mapping = foundEntry[1];
  }

  if (!mapping) {
    report.missing.push(fish.name);
    return fish;
  }

  const oldDiff = fish.difficulty;
  const newDiff = mapping.difficulty;

  if (oldDiff !== newDiff) {
    report.changed.push(`${fish.name}: ${oldDiff || 'None'} -> ${newDiff}`);
  }

  fish.difficulty = newDiff;
  fish.difficultyScore = scores[newDiff];
  fish.difficultyReason = reasons[newDiff];
  fish.beginnerSuitable = beginnerSuitable[newDiff];
  
  if (fish.category !== mapping.category) {
    fish.category = mapping.category;
  }

  report.total++;
  if (fish.category.toLowerCase() === 'freshwater') report.freshwater++;
  if (fish.category.toLowerCase() === 'saltwater') report.saltwater++;
  if (newDiff === 'Beginner') report.beginner++;
  if (newDiff === 'Advanced Beginner') report.advancedBeginner++;
  if (newDiff === 'Intermediate') report.intermediate++;
  if (newDiff === 'Advanced') report.advanced++;

  if (idSet.has(fish.id)) report.duplicates.add(fish.id);
  idSet.add(fish.id);
  
  if (slugSet.has(fish.slug)) report.duplicates.add(fish.slug);
  slugSet.add(fish.slug);

  return fish;
});

const newFileContent = `import { Fish } from "../lib/types";

export const fishData: Fish[] = ${JSON.stringify(fishData, null, 2)};
`;

fs.writeFileSync(filePath, newFileContent);

console.log("=== FINAL REPORT ===");
console.log(`Total Fish: ${report.total}`);
console.log(`Freshwater: ${report.freshwater}`);
console.log(`Saltwater: ${report.saltwater}`);
console.log(`Beginner: ${report.beginner}`);
console.log(`Advanced Beginner: ${report.advancedBeginner}`);
console.log(`Intermediate: ${report.intermediate}`);
console.log(`Advanced: ${report.advanced}`);
console.log("====================");
if (report.missing.length > 0) console.log("Missing mappings:", report.missing);
if (report.changed.length > 0) console.log(`Changed: ${report.changed.length} fish`);
if (report.duplicates.size > 0) console.log("Duplicates found:", Array.from(report.duplicates));
