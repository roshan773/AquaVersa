import { Food } from "../lib/types";

export const foodData: Food[] = [
  {
    id: "fo-0",
    slug: "tropical-flakes",
    name: "Tropical Flakes",
    category: "Dry Food",
    description: "The most popular general-purpose fish food. Specially formulated to float at the surface, making it ideal for top and mid-water feeders.",
    benefits: ["Balanced nutrition", "Enhances natural coloration", "Highly digestible, minimizes waste"],
    frequency: "Daily (1-2 times)",
    suitableFor: ["Tetras", "Guppies", "Mollies", "Barbs", "Danios"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fo-1",
    slug: "sinking-pellets",
    name: "Sinking Pellets",
    category: "Dry Food",
    description: "Dense, slow-dissolving pellets that quickly sink to the bottom. Formulated to resist falling apart in the water, giving substrate feeders ample time to graze.",
    benefits: ["Targeted bottom feeding", "High protein concentration", "Supports shell health for snails and shrimp"],
    frequency: "Daily (Once at night)",
    suitableFor: ["Corydoras Catfish", "Loaches", "Plecos", "Shrimp", "Snails"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fo-2",
    slug: "freeze-dried-bloodworms",
    name: "Freeze-Dried Bloodworms",
    category: "Treats",
    description: "Pure, high-protein bloodworms that have been freeze-dried to lock in nutrients and flavor while eliminating potential parasites found in live cultures.",
    benefits: ["Extremely high protein", "Stimulates natural hunting behaviors", "Great for conditioning breeding pairs"],
    frequency: "Occasional (2-3 times a week)",
    suitableFor: ["Betta Fish", "Angelfish", "Discus", "Gouramis", "Tetras"],
    image: "https://images.unsplash.com/photo-1518558406542-93116df157e9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fo-3",
    slug: "algae-wafers",
    name: "Algae Wafers",
    category: "Fresh Food",
    description: "Hard-pressed discs containing high concentrations of spirulina and vegetable matter. Perfect for herbivorous bottom dwellers that scrape or rasp their food.",
    benefits: ["Rich in natural vegetable fibers", "Promotes healthy digestion", "Long-lasting stability prevents water clouding"],
    frequency: "Daily (Once at night)",
    suitableFor: ["Plecostomus", "Otocinclus", "Snails", "Amano Shrimp", "Mollies"],
    image: "https://images.unsplash.com/photo-1616011400827-0cfd6874ebdb?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fo-4",
    slug: "live-brine-shrimp",
    name: "Live Brine Shrimp",
    category: "Live Food",
    description: "Freshly hatched or adult brine shrimp (Artemia). Providing live movement triggering predatory feeding instincts and offering vitamins.",
    benefits: ["Stimulates appetite in picky eaters", "High concentrations of essential amino acids", "Improves fry survival rates"],
    frequency: "Treat (1-2 times a week)",
    suitableFor: ["Betta Fish", "Arowana", "Discus", "Cichlids", "Clownfish"],
    image: "https://images.unsplash.com/photo-1500466487140-5259e51221b6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fo-5",
    slug: "gel-food",
    name: "Gel Food Mix",
    category: "Custom",
    description: "A powder that forms a nutrient-dense, moisture-rich gel when mixed with hot water. Easily customizable with veggies, vitamins, or medicine.",
    benefits: ["Highest hydration level", "Perfect carrier for medications", "Gentle on sensitive digestive tracts"],
    frequency: "Daily or alternate days",
    suitableFor: ["Goldfish", "Plecos", "Mollies", "Snails", "Cichlids"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop"
  }
];
