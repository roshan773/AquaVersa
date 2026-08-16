import { Food } from "../lib/types";


export const foodData: Food[] = [
  {
    id: "fo-0",
    slug: "tropical-flakes",
    name: "Tropical Flakes",
    category: "Dry Food",
    description: "A common staple food for many tropical community fish. Floating flakes are especially useful for fish that feed near the surface and mid-water.",
    benefits: ["Convenient staple food", "Supports everyday nutrition when appropriately formulated", "Easy to portion for small fish"],
    frequency: "Daily (1-2 times)",
    suitableFor: ["Tetras", "Guppies", "Mollies", "Barbs", "Danios"],
    image: "/images/Tropical Flakes.png"
  },
  {
    id: "fo-1",
    slug: "sinking-pellets",
    name: "Sinking Pellets",
    category: "Dry Food",
    description: "Dense pellets designed to sink through the water column, making them useful for bottom-feeding fish and invertebrates when the pellet size and formulation are appropriate.",
    benefits: ["Useful for bottom feeders", "Allows food to reach lower areas of the aquarium", "Available in formulations for different dietary needs"],
    frequency: "Daily (1-2 times)",
    suitableFor: ["Corydoras Catfish", "Loaches", "Plecos", "Shrimp", "Snails"],
    image: "/images/Sinking Pellets.png"
  },
  {
    id: "fo-2",
    slug: "freeze-dried-bloodworms",
    name: "Freeze-Dried Bloodworms",
    category: "Treats",
    description: "Freeze-dried bloodworms that provide a palatable, protein-rich food that can be offered as an occasional part of a varied diet. Freeze-dried foods should be fed appropriately and should not replace a complete staple diet.",
    benefits: ["Highly palatable for many fish", "Provides a protein-rich supplemental food", "Useful as an occasional treat or conditioning food"],
    frequency: "Occasional (1-2 times a week)",
    suitableFor: ["Betta Fish", "Angelfish", "Discus", "Gouramis", "Tetras"],
    image: "/images/Freeze-Dried Bloodworms.png"
  },
  {
    id: "fo-3",
    slug: "algae-wafers",
    name: "Algae Wafers",
    category: "Fresh Food",
    description: "Sinking wafers commonly formulated with algae and vegetable ingredients for herbivorous and omnivorous bottom feeders. The exact nutritional value depends on the product formulation.",
    benefits: ["Provides vegetable and algae-based ingredients", "Convenient sinking food for bottom feeders", "Can supplement the diets of suitable herbivorous and omnivorous fish and invertebrates"],
    frequency: "Daily or as needed, depending on species and other foods offered",
    suitableFor: ["Plecostomus", "Otocinclus", "Snails", "Amano Shrimp", "Mollies"],
    image: "/images/Algae Wafers.png"
  },
  {
    id: "fo-4",
    slug: "live-brine-shrimp",
    name: "Live Brine Shrimp",
    category: "Live Food",
    description: "Live brine shrimp (Artemia) that can stimulate feeding behavior and provide a useful supplemental food, particularly for fry and fish that readily accept live foods.",
    benefits: ["Highly palatable to many fish", "Useful supplemental source of protein and nutrients", "Can be particularly useful for feeding fry and conditioning fish"],
    frequency: "Treat (1-2 times a week)",
    suitableFor: ["Betta Fish", "Arowana", "Discus", "Cichlids", "Clownfish"],
    image: "/images/Live Brine Shrimp.png"
  },
  {
    id: "fo-5",
    slug: "gel-food",
    name: "Gel Food Mix",
    category: "Custom",
    description: "A powdered food mix that forms a soft, moisture-rich gel when prepared according to the product instructions. Gel foods can be customized with suitable ingredients and are available in formulations for different fish diets.",
    benefits: ["Moist food texture", "Can be shaped into portions for different feeding habits", "Some formulations can be customized or used as a carrier for supplements or medication when appropriate"],
    frequency: "Daily or alternate days, depending on formulation and species",
    suitableFor: ["Goldfish", "Plecos", "Mollies", "Snails", "Cichlids"],
    image: "/images/Gel Food Mix.png"
  }
];