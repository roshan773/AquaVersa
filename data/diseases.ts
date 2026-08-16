import { Disease } from "../lib/types";

export const diseasesData: Disease[] = [
  {
    id: "dis-0",
    slug: "ich-white-spot",
    name: "Ich (White Spot Disease)",
    type: "Parasitic",
    description: "Ich (white spot disease) is a common freshwater parasitic disease caused by Ichthyophthirius multifiliis. It produces small white spots on the skin and fins and can also affect the gills. Heavy infections can be rapidly fatal if untreated.",
    symptoms: [
      "Small white spots resembling salt grains on the skin, fins, and eyes",
      "Fish rubbing or scratching against rocks and decorations (flashing)",
      "Rapid breathing or gasping at the water surface",
      "Clamped fins (holding fins close to the body)",
      "Lethargy and loss of appetite"
    ],
    transmission: "Ich is introduced via infected new fish, plants, or equipment. The parasite goes through multiple life stages, including a free-swimming stage (theront) that infects new hosts.",
    treatment: [
      "Treat promptly with an appropriate ich medication according to the product label and treatment schedule.",
      "Maintain stable, species-appropriate temperature and provide strong aeration during treatment.",
      "Aquarium salt may be appropriate for some freshwater species, but it is not suitable for every fish, plant, or invertebrate; use it only when appropriate and according to a species-safe protocol.",
      "Appropriate treatments may include labeled formalin-, copper-, or other ich medications; follow the product label and species-specific precautions.",
      "Perform water changes and substrate cleaning according to the medication instructions; removing debris can help reduce environmental parasite stages."
    ],
    prevention: [
      "Quarantine new fish and other livestock in a separate system for an appropriate observation period before introduction, with longer quarantine providing greater opportunity to detect disease.",
      "Maintain stable water temperature and avoid sudden drops (stress weakens the immune system).",
      "Regularly vacuum the gravel to reduce parasite loads."
    ],
    image: "/images/Ich (White Spot Disease).png",
    susceptible: ["Freshwater Betta", "Guppies", "Tetras", "Mollies"],
    affected: ["All freshwater species"],
    cure: "Treat with an appropriate ich medication according to its label, while maintaining stable, species-appropriate water conditions and good aeration."
  },
  {
    id: "dis-1",
    slug: "velvet-oodinium",
    name: "Velvet (Oodinium)",
    type: "Parasitic",
    description: "Velvet is a parasitic disease caused by dinoflagellates. In freshwater fish it is associated with Piscinoodinium, while marine velvet is caused by related Amyloodinium species. It can appear as fine yellow, gold, or rust-colored spots or a velvety film and can severely affect the gills.",
    symptoms: [
      "Fine dusty golden, yellow, or rust-colored film on the fish's body",
      "Frequent scratching or flashing against decorations",
      "Severe respiratory distress (gasping, rapid gill movement)",
      "Peeling skin or loss of color in advanced stages",
      "Clamped fins and extreme lethargy"
    ],
    transmission: "Highly contagious and capable of spreading through infected fish, contaminated water, and equipment. The pathogenic stages are photosynthetic, but light reduction alone should not be relied on as a complete treatment.",
    treatment: [
      "Treat promptly with an appropriate velvet medication recommended for the affected freshwater or marine fish and follow the product instructions exactly.",
      "Maintain stable, species-appropriate water conditions rather than using temperature increases as a stand-alone treatment.",
      "Use aquarium salt only when appropriate for the species and other aquarium inhabitants.",
      "For freshwater velvet, appropriate antiparasitic treatments may include copper or other veterinarian-recommended medications; marine velvet requires a marine-appropriate treatment protocol.",
      "Maintain strong aeration during treatment, especially when gill function is affected."
    ],
    prevention: [
      "Quarantine all new livestock for 2-3 weeks.",
      "Avoid introducing water from local pet shops into your aquarium.",
      "Keep stress levels low by maintaining stable parameters."
    ],
    image: "/images/Velvet (Oodinium).png",
    susceptible: ["Cichlids", "Angelfish", "Bettas", "Danios"],
    affected: ["All freshwater and saltwater species"],
    cure: "Treat with an appropriate velvet medication according to the species and product instructions, while maintaining stable water conditions and strong aeration."
  },
  {
    id: "dis-2",
    slug: "fin-rot",
    name: "Fin Rot",
    type: "Bacterial",
    description: "Fin rot describes progressive erosion or damage of the fins that is commonly associated with poor water quality, injury, stress, or secondary bacterial infection. Opportunistic microorganisms can colonize damaged tissue, and fungal or water-mold growth may occur secondarily.",
    symptoms: [
      "Fin edges turning white, red, or black",
      "Fins appearing frayed, split, or ragged",
      "Base of the fins showing red inflammation or rot moving toward the body",
      "Fungal cotton-like growths on the affected fin edges",
      "Loss of appetite and hovering near the bottom"
    ],
    transmission: "Fin damage is often associated with poor water quality, injury, stress, overcrowding, or fin-nipping. Opportunistic microorganisms can colonize damaged tissue, so improving the underlying conditions is an important part of treatment.",
    treatment: [
      "Test and correct ammonia, nitrite, nitrate, temperature, and other water-quality problems, and perform an appropriate partial water change.",
      "If medication is used, follow the product instructions regarding activated carbon and filtration.",
      "If bacterial infection is suspected to be severe or progressive, use an appropriate antibacterial treatment according to its label or seek fish-health professional advice.",
      "Do not use antifungal medication unless a fungal or water-mold infection is actually suspected; white or fuzzy growth on damaged tissue can be secondary.",
      "Salt is not a universal treatment; use it only when appropriate for the species and other aquarium inhabitants."
    ],
    prevention: [
      "Perform regular weekly water changes (20-30%) and monitor water quality parameters (Ammonia: 0, Nitrite: 0, Nitrate: <20).",
      "Avoid keeping fin-nipping fish with long-finned species like Bettas or Fancy Goldfish.",
      "Feed a high-quality, balanced diet to support the fish's natural immune defense."
    ],
    image: "/images/Fin Rot.png",
    susceptible: ["Goldfish", "Betta", "Angelfish", "Guppies"],
    affected: ["Any fish in poor water conditions"],
    cure: "Correct the underlying water-quality and husbandry problems first; if a bacterial infection is severe or progressing, use an appropriate treatment according to its label or seek fish-health professional advice."
  },
  {
    id: "dis-3",
    slug: "dropsy",
    name: "Dropsy",
    type: "Bacterial",
    description: "Dropsy is not a specific disease but a clinical sign of abnormal fluid accumulation in a fish. It can be associated with kidney dysfunction, severe infection, or other serious systemic problems and may cause abdominal swelling and scales that protrude outward (pineconing).",
    symptoms: [
      "Severely bloated or swollen abdomen",
      "Scales sticking out like a pinecone",
      "Pop-eye (protruding eyes)",
      "Lethargy and loss of appetite",
      "Pale gills and clamped fins"
    ],
    transmission: "Dropsy itself is not a single contagious disease. Its underlying cause may vary, and infectious conditions can sometimes affect other fish. Poor water quality and chronic stress can increase disease risk for the aquarium population.",
    treatment: [
      "Isolate the affected fish when practical so it can be observed and treated in a controlled environment.",
      "Test the main aquarium water and correct ammonia, nitrite, temperature, and other husbandry problems.",
      "Do not treat every case with Epsom salt; supportive treatment should be based on the suspected cause and species tolerance.",
      "Do not assume every case is bacterial; targeted treatment should be based on the suspected cause and, when possible, fish-health professional diagnosis.",
      "Maintain excellent water quality and offer an appropriate nutritious diet if the fish is willing to eat."
    ],
    prevention: [
      "Do not overfeed and ensure a high-quality, varied diet.",
      "Maintain a strict weekly water change schedule.",
      "Avoid crowding and minimize stress factors in the aquarium."
    ],
    image: "/images/Dropsy.png",
    susceptible: ["Goldfish", "Betta", "Gourami", "Guppies"],
    affected: ["All freshwater species, especially older or stressed fish"],
    cure: "There is no single cure for dropsy. Isolate when appropriate, correct water-quality problems, and seek fish-health advice to identify and treat the underlying cause."
  },
  {
    id: "dis-4",
    slug: "swim-bladder-disorder",
    name: "Swim Bladder Disorder",
    type: "Bacterial",
    description: "Swim bladder disorder is a general term for abnormal buoyancy or swimming problems. The swim bladder helps regulate buoyancy, but similar signs can result from digestive problems, injury, infection, organ disease, or other conditions.",
    symptoms: [
      "Sinking to the bottom or floating uncontrollably at the surface",
      "Swimming sideways, upside down, or at an odd angle",
      "Swollen belly or curved back",
      "Struggling to swim down or reach food"
    ],
    transmission: "Usually not directly contagious. Causes vary and may include digestive problems, injury, infection, organ dysfunction, or other conditions; constipation and swallowed air are only possible causes in some cases.",
    treatment: [
      "If constipation is suspected, a short period without food followed by an appropriate easily digested diet may help; avoid assuming constipation is the cause in every case.",
      "Avoid treating every buoyancy problem with peas; choose an appropriate, species-specific diet if constipation is suspected.",
      "Maintain a stable, species-appropriate temperature rather than raising temperature as a universal treatment.",
      "If buoyancy problems are severe, adjust the environment to make feeding and resting easier while avoiding unnecessary changes to the aquarium.",
      "If signs persist, worsen, or occur with swelling, wounds, respiratory distress, or other illness signs, seek fish-health professional advice rather than treating blindly with antibiotics."
    ],
    prevention: [
      "Pre-soak dry flake foods or pellets so they do not expand inside the fish's stomach.",
      "Feed a varied diet including sinking pellets, frozen foods, and blanched vegetables.",
      "Avoid sudden water temperature drops by using a reliable heater."
    ],
    image: "/images/Swim Bladder Disorder.png",
    susceptible: ["Fancy Goldfish", "Bettas", "Angelfish", "Gouramis"],
    affected: ["Deep-bodied fish species are most susceptible"],
    cure: "Treatment depends on the underlying cause. Check water quality, provide appropriate feeding and stable conditions, and seek fish-health advice if the problem persists or is accompanied by other illness signs."
  },
  {
    id: "dis-5",
    slug: "cotton-wool-disease",
    name: "Cotton Wool Disease (Saprolegnia)",
    type: "Fungal",
    description: "Cotton-wool disease commonly refers to an external water-mold infection such as Saprolegnia. It produces white, grey, or brown cotton-like growths on damaged skin, fins, eyes, or eggs and often develops after injury, parasite damage, or other stressors. Saprolegnia is an oomycete rather than a true fungus.",
    symptoms: [
      "White or grey cotton-like, fuzzy tufts on the skin or fins",
      "Fungal growths forming around open wounds or sores",
      "Clamped fins and scratching behavior",
      "Lethargy and fading skin color"
    ],
    transmission: "Saprolegnia and related water molds are widespread in aquatic environments and commonly colonize damaged or dead tissue. Outbreaks are associated with injury, poor sanitation, organic debris, parasites, and other stressors.",
    treatment: [
      "Correct water-quality and sanitation problems and remove dead or decaying material from the aquarium.",
      "Isolate the affected fish when practical, especially if it needs targeted treatment or close observation.",
      "Use an appropriate treatment for external Saprolegnia or other suspected water molds according to the product label or fish-health professional advice.",
      "Do not use salt as a universal treatment; use it only when appropriate for the species and other aquarium inhabitants.",
      "Maintain clean, well-oxygenated water and minimize further handling or injury."
    ],
    prevention: [
      "Handle fish carefully with soft nets to avoid damaging their protective slime coat.",
      "Address bacterial infections and parasites immediately before secondary fungus develops.",
      "Keep water clean and stress-free."
    ],
    image: "/images/Cotton Wool Disease (Saprolegnia).png",
    susceptible: ["Tetras", "Livebearers", "Goldfish", "Bettas"],
    affected: ["Any species with physical injuries or compromised slime coat"],
    cure: "Correct the underlying environmental or injury problem and use an appropriate treatment for suspected Saprolegnia or other water-mold infection according to its label or fish-health professional advice."
  }
];