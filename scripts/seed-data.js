const fs = require('fs');
const path = require('path');

const freshwaterNames = [
  "Neon Tetra", "Guppy", "Betta Fish", "Corydoras Catfish", "Angelfish", "Oscar",
  "Discus", "Zebra Danio", "Cherry Barb", "Harlequin Rasbora", "Plecostomus",
  "Kuhli Loach", "Molly", "Platy", "Swordtail", "Gourami", "Celestial Pearl Danio",
  "Rummy Nose Tetra", "Cardinal Tetra", "Otocinclus", "African Cichlid",
  "Convict Cichlid", "Jack Dempsey", "Texas Cichlid", "Green Terror",
  "Bolivian Ram", "German Blue Ram", "Apistogramma", "Kribensis", "Clown Loach",
  "Yoyo Loach", "Tiger Barb", "Odessa Barb", "Goldfish", "Koi",
  "White Cloud Mountain Minnow", "Rainbow Shark", "Red Tail Shark",
  "Bala Shark", "Silver Dollar", "Congo Tetra", "Ember Tetra",
  "Black Skirt Tetra", "Bloodfin Tetra", "Buenos Aires Tetra",
  "Serpae Tetra", "Diamond Tetra", "Emperor Tetra", "Panda Garra", "Glass Catfish"
];

const saltwaterNames = [
  "Ocellaris Clownfish", "Yellow Tang", "Blue Hippo Tang", "Royal Gramma",
  "Flame Angelfish", "Coral Beauty", "Mandarinfish", "Banggai Cardinalfish",
  "Pajama Cardinalfish", "Firefish Goby", "Diamond Goby", "Watchman Goby",
  "Six Line Wrasse", "Melanurus Wrasse", "Leopard Wrasse", "Cleaner Wrasse",
  "Fairy Wrasse", "Bicolor Blenny", "Tailspot Blenny", "Lawnmower Blenny",
  "Midas Blenny", "Foxface Rabbitfish", "Kole Tang", "Powder Blue Tang",
  "Achilles Tang", "Naso Tang", "Sailfin Tang", "Emperor Angelfish",
  "Majestic Angelfish", "Regal Angelfish", "Peppermint Angelfish",
  "Longnose Hawkfish", "Flame Hawkfish", "Snowflake Eel", "Ribbon Eel",
  "Green Mandarin", "Spotted Mandarin", "Clown Triggerfish", "Niger Triggerfish",
  "Picasso Triggerfish", "Porcupine Puffer", "Dogface Puffer", "Valentini Puffer",
  "Copperband Butterflyfish", "Raccoon Butterflyfish", "Threadfin Butterflyfish",
  "Moorish Idol", "Lionfish", "Fuzzy Dwarf Lionfish", "Panther Grouper"
];

const plantNames = [
  "Java Fern", "Anubias Nana", "Amazon Sword", "Monte Carlo", "Jungle Val",
  "Dwarf Hairgrass", "Dwarf Baby Tears", "Glossostigma", "Cryptocoryne Wendtii",
  "Cryptocoryne Balansae", "Water Wisteria", "Water Sprite", "Hornwort",
  "Anacharis", "Duckweed", "Frogbit", "Water Spangles", "Red Root Floater",
  "Ludwigia Repens", "Ludwigia Super Red", "Rotala Rotundifolia", "Rotala Macrandra",
  "Alternanthera Reineckii", "Hygrophila Pinnatifida", "Hygrophila Corymbosa",
  "Bacopa Caroliniana", "Bacopa Monnieri", "Pennywort", "Pearl Weed",
  "Staurogyne Repens", "Bucephalandra", "Bolbitis Heudelotii",
  "Christmas Moss", "Java Moss", "Weeping Moss", "Flame Moss",
  "Riccia Fluitans", "Pelia Moss", "Marimo Moss Ball", "Vallisneria Spiralis",
  "Vallisneria Nana", "Sagittaria Subulata", "Echinodorus Tenellus",
  "Micro Sword", "Aponogeton Madagascariensis", "Aponogeton Ulvaceus",
  "Crinum Calamistratum", "Tiger Lotus", "Banana Plant", "Water Onion"
];

const equipmentNames = [
  "Canister Filter", "Sponge Filter", "Submersible Aquarium Heater",
  "Full Spectrum LED Plant Light", "Protein Skimmer",
  "Hang-On-Back Filter", "Internal Power Filter", "Undergravel Filter",
  "Fluidized Bed Filter", "UV Sterilizer", "Titanium Heater",
  "Inline Heater", "Aquarium Chiller", "T5 Fluorescent Fixture",
  "Metal Halide Light", "LED Reef Light", "Moonlight LEDs",
  "Air Pump", "Air Stone", "Check Valve", "Airline Tubing",
  "Wavemaker", "Powerhead", "Gyre Pump", "Return Pump",
  "Auto Top Off (ATO) System", "Reverse Osmosis (RO/DI) System",
  "Dosing Pump", "Calcium Reactor", "Kalkwasser Reactor",
  "Media Reactor", "GFO Reactor", "Carbon Reactor",
  "Bio-Pellet Reactor", "Refugium Light", "Algae Scrubber",
  "Aquarium Controller", "Digital Thermometer", "pH Monitor",
  "Salinity Monitor", "Gravel Vacuum", "Python Water Changer",
  "Magnetic Algae Scraper", "Long-handled Algae Scraper",
  "Aquascaping Tweezers", "Aquascaping Scissors", "Sand Flattener",
  "Coral Glue", "Epoxy Putty", "Frag Plugs"
];

// High quality Unsplash images matching the vibe
const fishImages = [
  "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520302630592-fac87d005221?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601614838634-1bfaf38965f8?q=80&w=800&auto=format&fit=crop"
];

const plantImages = [
  "https://images.unsplash.com/photo-1500466487140-5259e51221b6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616011400827-0cfd6874ebdb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518558406542-93116df157e9?q=80&w=800&auto=format&fit=crop"
];

const equipImages = [
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
  "/hero_aquarium.jpg"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const fishData = [];
// Freshwater
freshwaterNames.forEach((name, i) => {
  fishData.push({
    id: `fw-${i}`,
    slug: name.toLowerCase().replace(/ /g, '-'),
    name: name,
    scientificName: `${name.split(' ')[0]} ${name.split(' ')[1] || 'species'}`,
    category: 'Freshwater',
    difficulty: getRandom(['Beginner', 'Intermediate', 'Advanced']),
    temperament: getRandom(['Peaceful', 'Semi-Aggressive', 'Aggressive']),
    minTankSize: getRandom([5, 10, 20, 30, 55, 75]),
    maxSize: getRandom([2, 4, 6, 8, 12]),
    temperature: "72-80°F",
    ph: "6.5-7.5",
    lifespan: "3-5 years",
    diet: getRandom(["Omnivore", "Carnivore", "Herbivore"]),
    description: `The ${name} is a stunning addition to any freshwater aquarium. Known for its dynamic coloration and interesting behavior, this species has become a staple in the hobby. It thrives in well-planted environments with plenty of hiding spaces. Ensure proper water parameters are maintained to keep them healthy and vibrant.`,
    careGuide: `Keep the tank clean with regular 20% weekly water changes. Feed a varied diet of high-quality flakes, pellets, and occasional frozen treats like bloodworms. Ensure the tank size meets their minimum requirements to prevent stunting and stress.`,
    image: getRandom(fishImages),
    compatibleWith: [] // Will populate randomly
  });
});

// Saltwater
saltwaterNames.forEach((name, i) => {
  fishData.push({
    id: `sw-${i}`,
    slug: name.toLowerCase().replace(/ /g, '-'),
    name: name,
    scientificName: `${name.split(' ')[0]} ${name.split(' ')[1] || 'species'}`,
    category: 'Saltwater',
    difficulty: getRandom(['Beginner', 'Intermediate', 'Advanced']),
    temperament: getRandom(['Peaceful', 'Semi-Aggressive', 'Aggressive']),
    minTankSize: getRandom([30, 55, 75, 120]),
    maxSize: getRandom([3, 5, 8, 10, 15]),
    temperature: "75-82°F",
    ph: "8.1-8.4",
    lifespan: "5-10 years",
    diet: getRandom(["Omnivore", "Carnivore", "Herbivore"]),
    description: `The ${name} is a brilliant marine fish that brings life to any reef or fish-only saltwater tank. With its striking patterns, it serves as an excellent centerpiece. They require pristine water conditions and a mature tank with plenty of live rock for grazing and hiding.`,
    careGuide: `Maintain stable salinity (1.023-1.025 SG) and zero ammonia/nitrites. They can be sensitive to sudden changes in water chemistry. Feed them a high-quality marine diet including mysis shrimp and algae sheets.`,
    image: getRandom(fishImages),
    compatibleWith: [] 
  });
});

const plantData = plantNames.map((name, i) => ({
  id: `p-${i}`,
  slug: name.toLowerCase().replace(/ /g, '-'),
  name: name,
  scientificName: `${name.split(' ')[0]} plantensis`,
  difficulty: getRandom(['Easy', 'Intermediate', 'Advanced']),
  growthRate: getRandom(['Slow', 'Moderate', 'Fast']),
  light: getRandom(['Low', 'Medium', 'High']),
  co2: getRandom(['Optional', 'Recommended', 'Required']),
  placement: getRandom(['Foreground', 'Midground', 'Background', 'Floating']),
  temperature: "70-82°F",
  ph: "6.0-7.5",
  image: getRandom(plantImages),
  description: `The ${name} is a beautiful aquatic plant that provides oxygen, absorbs nitrates, and offers hiding spots for shy fish. It is an excellent choice for aquascaping and creating a natural environment.`
}));

const equipmentData = equipmentNames.map((name, i) => ({
  id: `e-${i}`,
  slug: name.toLowerCase().replace(/ /g, '-'),
  name: name,
  category: getRandom(['Filtration', 'Heating', 'Lighting', 'Water Management', 'Marine']),
  description: `The ${name} is a critical piece of hardware for maintaining a stable and thriving aquarium ecosystem. Designed for efficiency and reliability.`,
  purpose: `Helps maintain pristine water quality and ideal conditions for your aquatic life.`,
  howItWorks: `Uses advanced technology to automate and regulate tank parameters, reducing the burden on the aquarist.`,
  suitableTanks: ["Freshwater", "Saltwater", "Planted"],
  maintenance: `Regular cleaning and inspection every 1-3 months to ensure optimal performance.`,
  beginnerMistakes: `Failing to read the instruction manual and miscalibrating the device during initial setup.`,
  image: getRandom(equipImages)
}));

const oldData = require('./old_data.js');
const oldPlantsData = [
  {
    id: "p1",
    slug: "java-fern",
    name: "Java Fern",
    scientificName: "Microsorum pteropus",
    difficulty: "Easy",
    growthRate: "Slow",
    light: "Low",
    co2: "Optional",
    placement: "Midground / Attached to hardscape",
    temperature: "68–82°F (20–28°C)",
    ph: "6.0–7.5",
    image: "/images/java_fern.png",
    description: "Java Fern is perhaps the most universally recommended plant for beginner aquarists. Originating from Southeast Asia, it is an epiphyte, meaning that in nature it grows attached to rocks and driftwood rather than buried in soil. In the aquarium, planting its rhizome (the thick green stem the roots grow from) directly into the gravel will cause it to rot and die. It must be tied or glued to hardscape.\n\nIt is incredibly hardy and tolerates very low lighting and a wide range of water parameters. Because of its tough, leathery leaves, it is one of the few plants that herbivorous fish (like goldfish and certain cichlids) will usually leave alone. It reproduces by growing miniature 'plantlets' directly on the edges of its older leaves, which eventually detach and float away to root elsewhere."
  },
  {
    id: "p2",
    slug: "anubias-nana",
    name: "Anubias Nana",
    scientificName: "Anubias barteri var. nana",
    difficulty: "Easy",
    growthRate: "Slow",
    light: "Low",
    co2: "Optional",
    placement: "Foreground to Midground",
    temperature: "72–82°F (22–28°C)",
    ph: "6.0–7.5",
    image: "/images/anubias.png",
    description: "Anubias Nana is a stunning, dark green plant with thick, broad leaves that provide excellent resting spots for fish like Bettas. Like Java Fern, it is an epiphyte and must be attached to wood or rock rather than buried in the substrate.\n\nIt is notoriously slow-growing, often producing only one new leaf per month. While this makes it very easy to maintain without constant trimming, it also makes the broad leaves susceptible to algae growth if placed under lighting that is too intense. It thrives in low-tech setups without injected CO2 and is robust enough to survive in tanks with rowdy fish."
  },
  {
    id: "p3",
    slug: "amazon-sword",
    name: "Amazon Sword",
    scientificName: "Echinodorus bleheri",
    difficulty: "Easy",
    growthRate: "Fast",
    light: "Medium",
    co2: "Recommended",
    placement: "Background",
    temperature: "72–82°F (22–28°C)",
    ph: "6.5–7.5",
    image: "/images/amazon_sword.png",
    description: "The Amazon Sword is a classic centerpiece plant for large aquariums. Under the right conditions, this heavy root-feeder can explode in growth, producing massive, bright green leaves that can easily reach 20 inches in height. It is ideal for planting in the background of the tank where it can create a dense, jungle-like aesthetic.\n\nBecause of its massive root structure, the Amazon Sword requires a deep, nutrient-rich substrate. If you are using plain gravel or sand, you must regularly push root tab fertilizers deep into the substrate near its base. While it can survive in low light, medium to high light paired with root fertilizers will unlock its true potential and speed."
  },
  {
    id: "p4",
    slug: "monte-carlo",
    name: "Monte Carlo",
    scientificName: "Micranthemum tweediei",
    difficulty: "Intermediate",
    growthRate: "Moderate",
    light: "Medium to High",
    co2: "Required",
    placement: "Foreground (Carpet)",
    temperature: "68–77°F (20–25°C)",
    ph: "6.0–7.5",
    image: "/images/monte_carlo.png",
    description: "Monte Carlo is one of the most popular plants used to create a lush, bright green 'carpet' across the floor of an aquarium. It produces tiny, round leaves and creeps horizontally along the substrate, eventually forming a dense, grassy lawn that looks spectacular in aquascapes.\n\nWhile considered easier to grow than other carpeting plants like Dwarf Baby Tears, Monte Carlo still strongly benefits from (and often requires) high lighting and injected CO2 to achieve that dense, ground-hugging growth. Without sufficient light, the plant will stretch vertically toward the surface instead of spreading outward. Regular trimming is required to prevent the bottom layers from rotting and detaching from the soil."
  },
  {
    id: "p5",
    slug: "vallisneria",
    name: "Jungle Val",
    scientificName: "Vallisneria americana",
    difficulty: "Easy",
    growthRate: "Fast",
    light: "Low to Medium",
    co2: "Optional",
    placement: "Background",
    temperature: "64–82°F (18–28°C)",
    ph: "6.5–8.0",
    image: "/images/jungle_val.png",
    description: "Jungle Val is a towering, ribbon-like plant that is perfect for creating a dramatic background or hiding equipment like heaters and filter intake tubes. It grows incredibly fast and tall, with its long leaves often reaching the surface and gracefully trailing across the top of the water.\n\nIt propagates rapidly by sending out runners beneath the substrate, quickly forming a dense forest if left unchecked. It is very hardy and can tolerate harder water than many other aquatic plants. Note that Jungle Val is famously sensitive to liquid carbon supplements (like Excel); using these products will often cause the plant to melt away completely."
  }
];

const finalFishData = [...oldData.fish, ...fishData];
const finalPlantData = [...oldPlantsData, ...plantData];
const finalEquipData = [...oldData.equipment, ...equipmentData];

// Write to files
fs.writeFileSync(
  path.join(__dirname, '../data/fish.ts'),
  `import { Fish } from "../lib/types";\n\nexport const fishData: Fish[] = ${JSON.stringify(finalFishData, null, 2)};\n`
);

fs.writeFileSync(
  path.join(__dirname, '../data/plants.ts'),
  `import { Plant } from "../lib/types";\n\nexport const plantData: Plant[] = ${JSON.stringify(finalPlantData, null, 2)};\n`
);

fs.writeFileSync(
  path.join(__dirname, '../data/equipment.ts'),
  `import { Equipment } from "../lib/types";\n\nexport const equipmentData: Equipment[] = ${JSON.stringify(finalEquipData, null, 2)};\n`
);

console.log('Database successfully seeded with 200 items!');
