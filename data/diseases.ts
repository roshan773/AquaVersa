import { Disease } from "../lib/types";

export const diseasesData: Disease[] = [
  {
    id: "dis-0",
    slug: "ich-white-spot",
    name: "Ich (White Spot Disease)",
    description: "Ich is the most common freshwater parasite (Ichthyophthirius multifiliis). It manifests as small, white, salt-like spots across the fish's body, fins, and gills. It is highly contagious and fatal if untreated.",
    symptoms: [
      "Small white spots resembling salt grains on the skin, fins, and eyes",
      "Fish rubbing or scratching against rocks and decorations (flashing)",
      "Rapid breathing or gasping at the water surface",
      "Clamped fins (holding fins close to the body)",
      "Lethargy and loss of appetite"
    ],
    transmission: "Ich is introduced via infected new fish, plants, or equipment. The parasite goes through multiple life stages, including a free-swimming stage (theront) that infects new hosts.",
    treatment: [
      "Gradually raise the water temperature to 82°F–85°F (28°C–29°C) over 24-48 hours. This speeds up the life cycle of the parasite, exposing the vulnerable free-swimming stage.",
      "Increase aeration using an air stone, as warmer water holds less dissolved oxygen.",
      "Add aquarium salt (1 tablespoon per 5 gallons of water) to support the fish's slime coat and disrupt the parasite's osmotic balance.",
      "Dose with a dedicated copper sulfate or malachite green medication, following the instructions strictly.",
      "Perform daily 25% water changes, vacuuming the substrate thoroughly to remove fallen parasite cysts (tomonts)."
    ],
    prevention: [
      "Quarantine all new fish and plants in a separate tank for at least 14 days before introducing them to the main aquarium.",
      "Maintain stable water temperature and avoid sudden drops (stress weakens the immune system).",
      "Regularly vacuum the gravel to reduce parasite loads."
    ],
    image: "/images/Ich (White Spot Disease).png",
    susceptible: ["Freshwater Betta", "Guppies", "Tetras", "Mollies"],
    affected: ["All freshwater species"],
    cure: "Increase temperature to 28°C, add aquarium salt, and treat with malachite green/formalin."
  },
  {
    id: "dis-1",
    slug: "velvet-oodinium",
    name: "Velvet (Oodinium)",
    description: "Velvet is a parasite infection caused by tiny dinoflagellates (Oodinium). It resembles a fine, dusty golden-yellow or rust-colored powder on the fish's body. It is fast-acting and attacks the gills heavily.",
    symptoms: [
      "Fine dusty golden, yellow, or rust-colored film on the fish's body",
      "Frequent scratching or flashing against decorations",
      "Severe respiratory distress (gasping, rapid gill movement)",
      "Peeling skin or loss of color in advanced stages",
      "Clamped fins and extreme lethargy"
    ],
    transmission: "Highly contagious. Introduced via infected fish, water, or nets. The dinoflagellate contains chlorophyll, meaning it utilizes light to produce energy, making blackout treatments useful.",
    treatment: [
      "Perform a complete blackout of the aquarium (turn off lights and cover the tank with a blanket), as the parasite relies on light for photosynthesis.",
      "Raise water temperature gradually to 82°F (28°C) to accelerate the parasite's life cycle.",
      "Add aquarium salt to reduce osmotic stress on the fish.",
      "Treat with copper-based medications (e.g., CopperSafe) or acriflavine. Maintain copper levels as instructed on the packaging.",
      "Maintain strong aeration during treatment."
    ],
    prevention: [
      "Quarantine all new livestock for 2-3 weeks.",
      "Avoid introducing water from local pet shops into your aquarium.",
      "Keep stress levels low by maintaining stable parameters."
    ],
    image: "/images/Velvet (Oodinium).png",
    susceptible: ["Cichlids", "Angelfish", "Bettas", "Danios"],
    affected: ["All freshwater and saltwater species"],
    cure: "Blackout the tank, raise temperature, improve water flow, and treat with copper-based medication."
  },
  {
    id: "dis-2",
    slug: "fin-rot",
    name: "Fin Rot",
    description: "Fin Rot is a bacterial (Pseudomonas or Aeromonas) or fungal infection that eats away at a fish's fins and tail. It is almost always a secondary infection brought on by poor water quality, injury, or severe stress.",
    symptoms: [
      "Fin edges turning white, red, or black",
      "Fins appearing frayed, split, or ragged",
      "Base of the fins showing red inflammation or rot moving toward the body",
      "Fungal cotton-like growths on the affected fin edges",
      "Loss of appetite and hovering near the bottom"
    ],
    transmission: "Fin Rot bacteria are naturally present in the aquarium but only infect fish when their immune systems are compromised due to high ammonia/nitrite levels, physical damage, or poor diet.",
    treatment: [
      "Perform an immediate 50% water change and thoroughly vacuum the substrate. High water quality is the best cure.",
      "Remove any carbon filters if you plan to dose medication.",
      "Add Melafix or a broad-spectrum antibiotic (like Erythromycin or Furan-2) for severe bacterial cases.",
      "For fungal rot, treat with an anti-fungal medication (like Ichonex or Pimafix).",
      "Add aquarium salt (1 teaspoon per gallon) to help heal tissues."
    ],
    prevention: [
      "Perform regular weekly water changes (20-30%) and monitor water quality parameters (Ammonia: 0, Nitrite: 0, Nitrate: <20).",
      "Avoid keeping fin-nipping fish with long-finned species like Bettas or Fancy Goldfish.",
      "Feed a high-quality, balanced diet to support the fish's natural immune defense."
    ],
    image: "/images/Fin Rot.png",
    susceptible: ["Goldfish", "Betta", "Angelfish", "Guppies"],
    affected: ["Any fish in poor water conditions"],
    cure: "Perform large water changes, keep water quality high, and treat with Melafix or broad-spectrum antibiotics."
  }
];
