import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db';

// Import models
import User from '../models/user';
import Fish from '../models/fish';
import Plant from '../models/plant';
import Equipment from '../models/equipment';
import Food from '../models/food';
import Medicine from '../models/medicine';
import Disease from '../models/disease';
import Blog from '../models/blog';
import Guide from '../models/guide';
import FAQ from '../models/faq';
import Settings from '../models/settings';
import WaterParameter from '../models/waterParameter';
import SpeciesGroup from '../models/speciesGroup';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('[SEED] Connected to database. Clearing existing collections...');

    // Clear all
    await User.deleteMany({});
    await Fish.deleteMany({});
    await Plant.deleteMany({});
    await Equipment.deleteMany({});
    await Food.deleteMany({});
    await Medicine.deleteMany({});
    await Disease.deleteMany({});
    await Blog.deleteMany({});
    await Guide.deleteMany({});
    await FAQ.deleteMany({});
    await Settings.deleteMany({});
    await WaterParameter.deleteMany({});
    await SpeciesGroup.deleteMany({});

    console.log('[SEED] Seeding Admin User...');
    const hashedAdminPassword = await bcrypt.hash('AdminPassword123!', 10);
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@fishversa.com',
      passwordHash: hashedAdminPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('[SEED] Seeding Medicines...');
    const medicines = await Medicine.create([
      {
        name: 'Ich-X',
        slug: 'ich-x',
        description: 'Highly effective copper-free treatment for Ich, Velvet, and other external protozoan parasites.',
        activeIngredients: ['Formaldehyde', 'Methanol', 'Malachite Green Chloride'],
        purpose: 'Treats Ich (white spot) and external parasites.',
        dosageInstructions: '5 mL (1 teaspoon) per 10 gallons of water daily after a 20% water change.',
        instructions: 'Remove carbon filter media. Shake well before dosing. Add directly to water flow.',
        warnings: ['Stains silicone and porous ornaments.', 'Keep out of reach of children.'],
        cautions: ['Monitor aquarium parameters closely during treatment.']
      },
      {
        name: 'API Melafix',
        slug: 'api-melafix',
        description: 'All-natural antibacterial treatment made from tea tree extract to heal open wounds, fin rot, and cloudy eyes.',
        activeIngredients: ['Melaleuca (Tea Tree) Extract'],
        purpose: 'Heals wounds, treats bacterial infections, and restores torn fins.',
        dosageInstructions: '5 mL per 10 gallons of water daily for 7 days.',
        instructions: 'Add directly to flow. Ensure strong surface aeration.',
        warnings: ['May cause light foaming in soft water.'],
        cautions: ['Do not overdose. Safe for invertebrates.']
      },
      {
        name: 'Erythromycin',
        slug: 'erythromycin',
        description: 'Broad-spectrum antibiotic used to treat bacterial diseases like columnaris, body slime, and mouth fungus.',
        activeIngredients: ['Erythromycin Phosphate'],
        purpose: 'Treats broad bacterial infections and cyanobacteria (blue-green algae).',
        dosageInstructions: 'One packet per 10 gallons. Repeat dose after 24 hours, perform 25% water change, and repeat process.',
        instructions: 'Remove active carbon before dosing. Re-insert carbon after treatment course.',
        warnings: ['May suppress beneficial biofilter bacteria. Monitor ammonia.'],
        cautions: ['For animal treatment only.']
      }
    ]);

    console.log('[SEED] Seeding Diseases...');
    const diseases = await Disease.create([
      {
        name: 'Ich (White Spot Disease)',
        slug: 'ich-white-spot',
        symptoms: ['Tiny white crystalline spots on body and fins', 'Scratching against rocks (flashing)', 'Clamped fins', 'Lethargy'],
        causes: ['Protozoan parasite Ichthyophthirius multifiliis', 'Stress triggered by sudden temperature shifts'],
        diagnosis: 'Visually identify salt-like white spots scattered over scale surface or tail.',
        treatment: 'Slowly raise water temperature to 28°C (82°F) to speed up parasite lifecycle. Dose with Ich-X according to package instructions.',
        medicines: [medicines[0]._id],
        recovery: 'Usually cures within 7-10 days of sustained temperature increase and dosing. Maintain high aeration.',
        emergencyGuide: 'Isolate affected fish if possible, or treat the entire community tank if multiple fish show symptoms.',
        isFreshwater: true,
        isSaltwater: true
      },
      {
        name: 'Fin Rot',
        slug: 'fin-rot',
        symptoms: ['Frayed, ragged fin edges', 'Redness or dark coloration at fin bases', 'Loss of fin tissue'],
        causes: ['Bacterial infection (Aeromonas/Pseudomonas)', 'Poor water parameters (excess ammonia/nitrite)', 'Aggressive fin-nippers'],
        diagnosis: 'Observe disintegrating fin margins that look torn or split, sometimes with white margins.',
        treatment: 'Perform a 50% water change. Clean substrate thoroughly. Dose API Melafix daily for 7 days.',
        medicines: [medicines[1]._id],
        recovery: 'Fin tissue will gradually regrow as clear tissue over 2-4 weeks after infection clears.',
        emergencyGuide: 'Verify water chemistry immediately. Correct high organic waste through cleanings and water changes.',
        isFreshwater: true,
        isSaltwater: true
      }
    ]);

    console.log('[SEED] Seeding Plants...');
    const plants = await Plant.create([
      {
        name: 'Java Fern',
        scientificName: 'Microsorum pteropus',
        slug: 'java-fern',
        category: 'Midground',
        difficulty: 'Easy',
        co2Needs: false,
        lightingNeeds: 'Low',
        growthRate: 'Slow',
        compatibilityTips: 'Do not bury rhizome in gravel; tie it to rocks or driftwood with thread or aquarium glue.',
        description: 'Hardy, slow-growing fern that attaches its roots to hardscape decoration, safe from plant-eating fish.',
        benefits: ['Absorbs nitrates', 'Provides hiding spots for fry', 'Bitter taste deters herbivorous fish'],
        careGuide: 'Thrives in low-light setups. Prune dying leaves at the base to encourage new growth.',
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400']
      },
      {
        name: 'Amazon Sword',
        scientificName: 'Echinodorus grisebachii',
        slug: 'amazon-sword',
        category: 'Background',
        difficulty: 'Medium',
        co2Needs: false,
        lightingNeeds: 'Medium',
        growthRate: 'Medium',
        compatibilityTips: 'Requires deep substrate (2+ inches) and heavy root feeding to thrive.',
        description: 'A large, broad-leafed background plant that forms impressive root networks, creating excellent visual coverage.',
        benefits: ['Excellent oxygenation', 'Creates strong visual backgrounds', 'Provides large leaf surface areas for bio-films'],
        careGuide: 'Insert root tabs monthly to ensure iron supply. Remove yellowing outer leaves regularly.',
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400']
      }
    ]);

    console.log('[SEED] Seeding Equipment...');
    const equipment = await Equipment.create([
      {
        name: 'Fluval FX6 Canister Filter',
        slug: 'fluval-fx6-canister-filter',
        category: 'Filter',
        brand: 'Fluval',
        specifications: new Map([
          ['Flow Rate', '925 GPH (3500 LPH)'],
          ['For Aquariums Up To', '400 Gallons (1500 Liters)'],
          ['Media Capacity', '5.9 Liters'],
          ['Wattage', '43W']
        ]),
        pros: ['High water flow rate', 'Massive biological filtration capacity', 'Self-priming smart pump technology'],
        cons: ['High power consumption', 'Bulky under-tank footprint', 'Premium pricing'],
        powerConsumption: '43 Watts',
        maintenance: 'Clean internal sponges and rinse media in tank water every 3 months.',
        buyingGuide: 'Recommended for large tanks (75 gal+) housing high-waste species like Goldfish or Oscars.',
        images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400'],
        price: 369.99,
        rating: 4.8
      },
      {
        name: 'Eheim Jager TruTemp 150W Heater',
        slug: 'eheim-jager-trutemp-150w-heater',
        category: 'Heater',
        brand: 'Eheim',
        specifications: new Map([
          ['Wattage', '150W'],
          ['For Aquariums Up To', '40 Gallons'],
          ['Temperature Range', '18°C - 34°C'],
          ['Material', 'Schott Laboratory Glass']
        ]),
        pros: ['Highly accurate thermostat', 'Dry-running safety shutoff', 'Fully submersible'],
        cons: ['Relatively long casing length', 'Calibration knob can be stiff'],
        powerConsumption: '150 Watts',
        maintenance: 'Unplug and let cool for 15 minutes before performing water changes.',
        buyingGuide: 'Ideal for tropical setups between 30 and 40 gallons. Mount horizontally near filter flow.',
        images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400'],
        price: 32.99,
        rating: 4.6
      }
    ]);

    console.log('[SEED] Seeding Food...');
    await Food.create([
      {
        name: 'Fluval Bug Bites Tropical Pellets',
        slug: 'fluval-bug-bites-tropical-pellets',
        type: 'Pellets',
        description: 'Insect-larvae based sinking micro pellets designed for community tropical setups.',
        nutrition: new Map([
          ['Crude Protein (min)', '45.0%'],
          ['Crude Fat (min)', '12.5%'],
          ['Crude Fiber (max)', '5.0%']
        ]),
        feedingSchedule: 'Feed 2-3 times daily, only what your fish can consume in 2 minutes.',
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400']
      }
    ]);

    console.log('[SEED] Seeding Fish Species...');
    const fishList = await Fish.create([
      {
        commonName: 'Neon Tetra',
        scientificName: 'Paracheirodon innesi',
        family: 'Characidae',
        slug: 'neon-tetra',
        images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'],
        difficulty: 'Beginner',
        minTankSize: { liters: 38, gallons: 10 },
        waterParams: { tempMin: 21, tempMax: 27, phMin: 6.0, phMax: 7.0, dghMin: 2, dghMax: 10, waterType: 'Freshwater' },
        dietType: 'Omnivore',
        foodRecommendations: ['Tropical Flakes', 'Brine Shrimp', 'Daphnia'],
        feedingFrequency: 'Once or twice daily',
        lifespan: 5,
        adultSize: { cm: 4, inches: 1.5 },
        temperament: 'Peaceful',
        activityLevel: 'Medium',
        swimmingLevel: ['Mid'],
        origin: 'Amazon River Basin, South America',
        breedingNotes: {
          mechanism: 'Egg-layer',
          difficulty: 'Hard',
          details: 'Requires very soft, acidic water and low lighting to initiate spawning. Eggs are highly light sensitive.'
        },
        compatibleMates: [],
        notCompatibleMates: [],
        idealPlants: [plants[0]._id, plants[1]._id],
        idealEquipment: [equipment[1]._id],
        proneDiseases: [diseases[0]._id, diseases[1]._id],
        interestingFacts: [
          'Their glowing stripes reflect light to help school mates locate each other in dark waters.',
          'They sleep at night, and their blue and red colors fade to camouflage from predators.'
        ],
        faq: [
          { question: 'Do Neon Tetras need a heater?', answer: 'Yes, they are tropical fish and require a heater to maintain temperatures between 21°C and 27°C.' },
          { question: 'How many Tetras should be kept together?', answer: 'Keep a school of at least 6-10 tetras to prevent stress and encourage natural swimming behavior.' }
        ],
        careTips: 'Tetras thrive in heavily planted tanks with dim lighting. Ensure your tank is fully cycled before adding them.',
        rationales: 'Small size, peaceful temperament, and low bioload make them perfect for beginner hobbyists with a 10-gallon tank.'
      },
      {
        commonName: 'Siamese Fighting Fish (Betta)',
        scientificName: 'Betta splendens',
        family: 'Osphronemidae',
        slug: 'betta-splendens',
        images: ['https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=600'],
        difficulty: 'Beginner',
        minTankSize: { liters: 19, gallons: 5 },
        waterParams: { tempMin: 24, tempMax: 28, phMin: 6.5, phMax: 7.5, dghMin: 3, dghMax: 8, waterType: 'Freshwater' },
        dietType: 'Carnivore',
        foodRecommendations: ['Betta Pellets', 'Bloodworms', 'Mysis Shrimp'],
        feedingFrequency: 'Once daily (4-5 small pellets)',
        lifespan: 3,
        adultSize: { cm: 7, inches: 2.7 },
        temperament: 'Aggressive',
        activityLevel: 'Low',
        swimmingLevel: ['Top', 'Mid'],
        origin: 'Mekong River Basin, Thailand',
        breedingNotes: {
          mechanism: 'Other',
          difficulty: 'Hard',
          details: 'Bubble nest builder. Male builds nest, guards eggs, and chases female away after spawning is completed.'
        },
        compatibleMates: [],
        notCompatibleMates: [],
        idealPlants: [plants[0]._id],
        idealEquipment: [equipment[1]._id],
        proneDiseases: [diseases[1]._id],
        interestingFacts: [
          'They possess a specialized labyrinth organ, allowing them to breathe atmospheric air from the surface.',
          'Male bettas are fiercely territorial and will fight to the death.'
        ],
        faq: [
          { question: 'Can two male Bettas live in the same tank?', answer: 'No, they will fight and severely injure or kill each other.' },
          { question: 'Do Bettas need filters?', answer: 'Yes, they need a low-flow filter. Sponges filters are best.' }
        ],
        careTips: 'Use silk or live plants to protect their delicate fins. Provide a low-flow sponge filter.',
        rationales: 'Highly resilient and capable of breathing air, making them tolerant of beginners, but territorial behavior restricts tank mates.'
      }
    ]);

    // Update cross compatibilities
    fishList[0].compatibleMates.push(fishList[0]._id);
    fishList[1].notCompatibleMates.push(fishList[1]._id);
    await fishList[0].save();
    await fishList[1].save();

    console.log('[SEED] Seeding Guides...');
    const guides = await Guide.create([
      {
        title: 'How to Cycle Your Aquarium',
        slug: 'how-to-cycle-your-aquarium',
        content: 'Aquarium cycling is the fundamental process of establishing beneficial bacteria colonies that convert highly toxic ammonia into nitrite, and then into less harmful nitrate. This nitrogen cycle prevents New Tank Syndrome, which is the leading cause of fish deaths in new aquariums. To cycle a tank, setup your filter, add a source of ammonia (either fish food or pure liquid ammonia), and monitor parameters using a liquid test kit daily. The cycle is complete when ammonia and nitrite read 0 ppm and nitrates are present.',
        excerpt: 'Step-by-step beginner guide to establishing the biological filter in your new aquarium.',
        difficulty: 'Beginner',
        readTime: '7 min read',
        category: 'Setup',
        image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'
      },
      {
        title: 'Water Parameters Explained',
        slug: 'water-parameters-explained',
        content: 'Understanding water parameters is key to successful fish keeping. pH measures acidity or alkalinity on a scale of 0 to 14, where 7.0 is neutral. Most tropical fish prefer stable pH levels between 6.5 and 7.5. Ammonia and Nitrite must always read 0 ppm, as even small concentrations are fatal to fish. Nitrate should be kept below 20 ppm through weekly water changes. Water hardness (dGH) refers to dissolved mineral content, which affects fish osmosis.',
        excerpt: 'Learn the chemistry behind healthy aquarium environments, including pH, temp, ammonia, and nitrates.',
        difficulty: 'All Levels',
        readTime: '8 min read',
        category: 'Water Quality',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'
      }
    ]);

    console.log('[SEED] Seeding Blogs...');
    await Blog.create([
      {
        title: '10 Secrets to A Beautiful Aquascape',
        slug: '10-secrets-to-beautiful-aquascape',
        content: 'Creating a high-end aquascape relies on core design principles that balance visual beauty with biological stability. By understanding the visual triggers of nature, you can convert any standard fish tank into a breathtaking aquatic masterpiece.\n\nSecret 1: The Golden Ratio and Rule of Thirds\nAvoid placing your primary hardscape directly in the center of the tank. Divide your aquarium grid into a 3x3 layout. Place your main focal elements—such as the tallest stone or the key bend of a driftwood branch—exactly at one of the intersection points. This simple off-center placement creates a natural asymmetry that is visually pleasing.\n\nSecret 2: Create a Strong Depth Perspective\nBuild a steep slope with your substrate. Make the substrate in the back corners of your tank at least 4 to 6 inches (10-15 cm) higher than the front. This forces a perspective that makes the aquarium appear much deeper and three-dimensional, drawing the viewer in.\n\nSecret 3: Choose High-Contrast Signature Hardscape\nNever mix unrelated types of rock or wood. Choose one theme, such as Seiryu Stone, Dragon Stone, or Spiderwood, and stick with it. Align the grains and crevices of the rocks in the same direction to mimic natural river flows.\n\nSecret 4: Heavy Planting from Day One\nTo prevent algae breakouts, plant at least 70% of the substrate from the very beginning. Combine fast-growing stem plants in the background with carpeting plants in the foreground. This nutrient competition ensures algae cannot gain a foothold.\n\nSecret 5: Master Carbon Dioxide (CO2) Injection\nCarbon is the fundamental building block of aquatic flora. Dosing liquid carbon is not enough; pressurized CO2 diffused into fine mist is critical for growing dense carpets and keeping red stem plants vibrant.\n\nSecret 6: Choose a Dedicated Cleanup Crew\nIntroduce Amano shrimp, Nerite snails, and Otocinclus catfish as soon as the cycle is complete. They act as nature\'s maintenance crew, eating hair algae and organic film.\n\nSecret 7: Optimize Lighting Channels\nUse full-spectrum LED lighting and limit the photoperiod to 7-8 hours daily. A smart ramp up/down schedule reduces stress on the fish.\n\nSecret 8: Regular Pruning and Trimming\nPruning stem plants frequently encourages lateral buds, resulting in thick bushy groupings rather than leggy stems.\n\nSecret 9: Liquid Fertilization Balance\nLearn to read plant deficiencies. Pinholes in leaves mean potassium deficiency, while yellowing leaves mean nitrogen is low. Adjust your dosing accordingly.\n\nSecret 10: Pristine Circulation\nEnsure your filter turnover rate distributes nutrients and CO2 evenly. Position lily pipes to create a gentle vortex that sweeps waste to the intake.',
        excerpt: 'Pro aquascaping tips to take your planted tank design to the next level.',
        category: 'Design',
        tags: ['Aquascaping', 'Plants', 'Hardscape'],
        image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'Mastering the Nitrogen Cycle: Avoid New Tank Syndrome',
        slug: 'mastering-the-nitrogen-cycle-avoid-new-tank-syndrome',
        content: 'New Tank Syndrome is the number one cause of fish mortality. It occurs when live animals are introduced to an uncycled tank that lacks the beneficial bacterial filter required to process toxic nitrogenous waste.\n\nWhat is the Nitrogen Cycle?\nFish continuously release ammonia (NH3) through their gills and organic waste. Even in small quantities (above 0.25 ppm), ammonia causes chemical burns to gills and organs. The nitrogen cycle is the natural chemical process where biological colonies convert this ammonia first into Nitrite (NO2-), which is also highly toxic, and finally into Nitrate (NO3-), which is relatively harmless at levels under 20 ppm.\n\nStep-by-Step Cycle Guide:\n\n1. Dose Ammonia: Set up the tank, filter, and heater. Add pure liquid ammonia until your test kit reads 2-3 ppm. Alternatively, add a pinch of fish food daily to rot and produce ammonia.\n2. Ammonia to Nitrite: In about 7-14 days, Nitrosomonas bacteria will establish in your filter media. They consume the ammonia, causing it to drop, while Nitrite levels spike.\n3. Nitrite to Nitrate: In another 14-21 days, Nitrobacter and Nitrospira bacteria will colonize, converting toxic Nitrites into Nitrates.\n4. Complete: The cycle is finished when your tank can completely process 2 ppm of ammonia into nitrate within 24 hours, leaving 0 ppm ammonia and 0 ppm nitrite.\n5. Water Change: Perform a large 50-70% water change to lower nitrates below 20 ppm before adding your first fish.',
        excerpt: 'The essential guide to biological filtration, water chemistry parameters, and keeping your fish safe.',
        category: 'Water Quality',
        tags: ['Cycling', 'Water Chemistry', 'New Tank'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'The Ultimate Guide to Betta Fish Care & Setup',
        slug: 'ultimate-guide-to-betta-fish-care-setup',
        content: 'Betta fish (Betta splendens) are among the most beautiful and misunderstood freshwater fish in the hobby. Often sold in tiny plastic cups, they require a proper setup to display their vibrant colors and active behaviors.\n\nMyth 1: Bettas live in mud puddles\nIn the wild, Bettas inhabit rice paddies, slow-moving streams, and marshes in Southeast Asia. While shallow, these environments are massive, continuous water bodies with rich vegetation. A Betta should never be kept in a bowl under 5 gallons.\n\nMinimum Aquarium Specs:\n- Size: 5 Gallons or larger. A larger tank provides water stability and swimming room.\n- Temperature: Bettas are tropical. They need a steady temperature of 25°C to 27°C (78°F to 80°F). An adjustable heater is mandatory.\n- Filter: Bettas have long, heavy fins that make swimming against strong currents exhausting. Use a low-flow sponge filter or an adjustable filter baffled with intake sponge.\n- Decor: Avoid plastic plants with sharp edges, which rip Betta fins. Use live plants (like Anubias or Java Fern) and smooth driftwood instead.\n- Feeding: Feed high-protein carnivore pellets or flakes twice daily, supplemented with frozen bloodworms or brine shrimp. Avoid overfeeding, as Bettas are prone to bloating and constipation.',
        excerpt: 'Break the myths: learn the proper tank size, water temperature, filtration needs, and compatible tank mates for healthy Betta splendens.',
        category: 'Fish Care',
        tags: ['Betta', 'Anabantoids', 'Fish Care'],
        image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'Planted Tank Fertilizers: Liquid vs. Root Tabs',
        slug: 'planted-tank-fertilizers-liquid-vs-root-tabs',
        content: 'Aquarium plants require macro-nutrients (Nitrogen, Phosphorus, Potassium) and micro-nutrients (Iron, Magnesium) to grow. How they absorb these nutrients determines what fertilizer you should use.\n\nWater Column Feeders:\nPlants like Java Fern, Anubias, Bucephalandra, Java Moss, and floaters (like Frogbit) absorb nutrients directly from the water column. They do not feed through the substrate. For these species, an All-in-One liquid fertilizer dosed directly to the water column weekly is the best approach.\n\nHeavy Root Feeders:\nSpecies like Amazon Swords, Crypts, and Vallisneria feed primarily through root systems. If planted in inert sand or gravel, they will slowly starve and rot. For root feeders, you must insert Root Tabs (nutrient capsules) deep into the gravel near their root systems every 1 to 2 months.\n\nSubstrate Choices:\n- Active Aquasoil: Soil pre-loaded with nutrients, perfect for the first year of growth.\n- Inert Sand/Gravel: Requires consistent root tab supplementation.\n- Liquid Dosing: Start with half-doses to avoid nutrient spikes that trigger green dust and hair algae.',
        excerpt: 'Understand how different aquatic plants absorb nutrients and how to balance liquid dosing with root feeding.',
        category: 'Plants',
        tags: ['Fertilizer', 'Plants', 'Aquascaping'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'Identifying and Treating Ich (White Spot Disease) Safely',
        slug: 'identifying-and-treating-ich-safely',
        content: 'Ich (Ichthyophthirius multifiliis) is a highly contagious external parasite. It manifests as tiny white spots, resembling salt grains, sprinkled over the fish\'s body, fins, and gills. If untreated, it causes skin damage, respiratory distress, and death.\n\nLifecycle of Ich:\n1. Trophont: The visible stage feeding on the fish. It is protected by a mucus layer and immune to medications.\n2. Tomont: The cyst stage. It falls off the fish, attaches to substrate, and multiplies.\n3. Theront: The free-swimming stage looking for a host. This is the only stage vulnerable to treatment.\n\nStep-by-Step Treatment Protocol:\n- Raise Heat: Slowly increase the temperature to 28°C-30°C (82°F-86°F). This speeds up the lifecycle, forcing the parasite into the vulnerable free-swimming stage.\n- Increase Aeration: Warm water holds less oxygen. Add an air pump and airstone.\n- Medicate: Dose daily with a copper-free medication like Ich-X. Perform a 20-30% water change before each dose to vacuum up fallen tomonts.\n- Remove Carbon: Active carbon must be removed from your filter as it removes the medication from the water.\n- Complete Course: Continue treatment for 3-4 days after the last spot disappears to prevent relapse.',
        excerpt: 'A complete emergency checklist to recognize parasite infections and cure your community aquarium without losing livestock.',
        category: 'Diseases',
        tags: ['Ich', 'Parasites', 'Disease Treatment'],
        image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'Shrimp Breeding for Beginners: Neocaridina Guide',
        slug: 'shrimp-breeding-beginners-neocaridina-guide',
        content: 'Dwarf shrimp (Neocaridina davidi), including Cherry Shrimp, Blue Velvet, and Yellow Goldenbacks, are hardy, beautiful, and easy to breed in a home aquarium.\n\nWater Requirements:\n- Temperature: 21°C to 25°C (70°F to 77°F). Higher temps accelerate breeding but shorten life spans.\n- GH (General Hardness): 4 to 8 degrees. GH measures calcium and magnesium, which shrimp need to mold their shells.\n- KH (Carbonate Hardness): 1 to 5 degrees. Keeps pH stable.\n- pH: 6.8 to 7.6.\n\nCare & Diet:\nShrimp eat biofilm, algae, and organic debris. Supplement their diet with high-calcium shrimp pellets and blanched vegetables (spinach, cucumber).\n\nBreeding and Fry Survival:\nFemale shrimp carry eggs underneath their tails (called "berried" shrimp). In 20-30 days, they hatch into miniature versions of adults. To ensure fry survival:\n- Avoid Fish: Even small fish like guppies will eat baby shrimp. A shrimp-only tank is best.\n- Sponge Filter: Power filter intakes will suck up and kill fry. Cover intakes with a sponge or use a biological air-driven sponge filter.\n- Mosses: Plant Java Moss or Christmas Moss. Moss collects biofilm for baby shrimp to eat and provides cover.',
        excerpt: 'Learn the water parameters, feeding habits, and tank setup secrets to start a thriving colony of colorful cherry shrimp.',
        category: 'Shrimp',
        tags: ['Shrimp', 'Breeding', 'Invertebrates'],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'A Guide to Selecting the Right Canister Filter',
        slug: 'guide-to-selecting-canister-filter',
        content: 'Canister filters are the gold standard for large aquariums and planted aquascapes. Placed inside the stand beneath the tank, they offer massive media capacity and high flow rates.\n\nKey Selection Parameters:\n1. Flow Rate (GPH): Your filter should turnover the entire volume of your aquarium 4 to 6 times per hour. For a 55-gallon tank, you need a filter rated for at least 220-300 Gallons Per Hour.\n2. Filter Volume: A larger canister holds more media, which means more surface area for nitrifying bacteria to grow and less frequent maintenance.\n3. Media Configuration:\n- Mechanical: Sponges of varying density placed at the entry point to catch debris.\n- Biological: High-surface-area porous media like ceramic rings, pumice, or bio-balls placed in the middle trays.\n- Chemical: Purigen or active carbon placed at the exit point to polish the water and remove odors.\n\nMaintenance Tip:\nNever wash biological media in tap water, as chlorine kills the bacteria. Always rinse it in a bucket of drained aquarium water.',
        excerpt: 'Understand GPH flow rates, mechanical vs. biological filtration, and how to pack canister media for crystal clear water.',
        category: 'Equipment',
        tags: ['Filter', 'Equipment', 'Water Quality'],
        image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200'
      },
      {
        title: 'Top 5 Mistakes Beginners Make with New Tanks',
        slug: 'top-5-mistakes-beginners-make',
        content: 'Entering the aquarium hobby is rewarding, but simple mistakes can lead to lost fish and frustration. Here are the top 5 mistakes and how to avoid them:\n\n1. Overstocking: Adding too many fish to a small volume creates excess waste, overwhelming the biological filter. Start slow and research adult sizes.\n2. Overfeeding: Beginners often feed too much. Leftover food decays, causing toxic ammonia spikes. Feed only what they eat in 2 minutes.\n3. Replacing Filter Media: Cleaning or discarding cartridge filters washes away the beneficial bacteria. Rinse sponges in old tank water instead.\n4. Neglecting Water Changes: Weekly water changes of 20-30% are essential to dilute nitrates and replenish trace minerals. Tap water must always be treated with a dechlorinator.\n5. Lack of Research: Buying fish based on looks without checking water parameters, compatibility, or tank size requirements usually ends in conflict.',
        excerpt: 'Avoid deadly mistakes: learn how to properly feed, stock, and maintain your aquarium filter for long-term success.',
        category: 'Troubleshooting',
        tags: ['Beginner', 'Maintenance', 'Mistakes'],
        image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=1200'
      }
    ]);

    console.log('[SEED] Seeding FAQs...');
    await FAQ.create([
      {
        question: 'What is the Nitrogen Cycle?',
        answer: 'The Nitrogen Cycle is the process by which beneficial bacteria convert toxic fish waste (ammonia) into nitrite, and then into less toxic nitrate.',
        category: 'Setup'
      },
      {
        question: 'How often should I change my aquarium water?',
        answer: 'Perform a 20-25% water change weekly to remove accumulated nitrates and replenish trace minerals.',
        category: 'Maintenance'
      }
    ]);

    console.log('[SEED] Seeding Water Parameters...');
    await WaterParameter.create([
      {
        name: 'Ammonia (NH3/NH4+)',
        range: '0 ppm',
        description: 'Highly toxic waste product produced by fish respiration and decaying organic materials.',
        optimalValue: '0 ppm (absolute)',
        warnings: 'Any level above 0 ppm damages gills, causes stress, and can lead to rapid death.'
      },
      {
        name: 'pH (Potential Hydrogen)',
        range: '6.0 - 8.0',
        description: 'Measures the concentration of hydrogen ions in the water to determine acidity or alkalinity.',
        optimalValue: '7.0 (neutral for general community)',
        warnings: 'Sudden shifts in pH are highly stressful. Maintain stability rather than chasing specific numbers.'
      }
    ]);

    console.log('[SEED] Seeding Species Groups...');
    await SpeciesGroup.create([
      {
        name: 'Tetras',
        description: 'Small, colorful schooling fish of the Characidae family, native to South American waterways.',
        careCharacteristics: 'Prefer soft, acidic water, heavily planted tanks, and must be kept in groups of 6+.'
      }
    ]);

    console.log('[SEED] Seeding Settings...');
    await Settings.create({
      siteName: 'Fish Versa',
      siteTagline: 'The Ultimate Aquarium & Fish Encyclopedia',
      siteDescription: 'A dynamic, premium database covering tropical fish species, plant requirements, calculators, and equipment.',
      contactEmail: 'admin@fishversa.com',
      featuredGuides: [guides[0]._id, guides[1]._id]
    });

    console.log('[SEED] Seeding complete! Database is fully populated.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
