import { GuideStep } from "../lib/types";

export const starterGuideSteps: GuideStep[] = [
  {
    step: 1,
    title: "Choose Your Tank",
    description: "The tank is the foundation of your ecosystem. Larger tanks are actually easier for beginners because water parameters are more stable.",
    whatToBuy: "A 10 to 20-gallon glass aquarium, a sturdy stand, and a lid to prevent jumping.",
    whyNeeded: "Provides the physical environment for your fish. Lids reduce evaporation and prevent escapes.",
    commonMistakes: "Buying a tank smaller than 5 gallons for fish. Very small tanks fluctuate rapidly in temperature and toxicity.",
    recommendation: "Start with a 20-gallon \"long\" aquarium if you have the space."
  },
  {
    step: 2,
    title: "Prepare the Water",
    description: "Tap water contains chlorine and heavy metals that are toxic to fish. It must be treated before use.",
    whatToBuy: "Water conditioner (dechlorinator) and a clean bucket dedicated ONLY to the aquarium.",
    whyNeeded: "Chlorine burns fish gills and kills the beneficial bacteria needed to keep the tank clean.",
    commonMistakes: "Forgetting to add water conditioner, or using a household bucket that previously contained soap or chemicals.",
    recommendation: "Use a highly concentrated conditioner like Seachem Prime."
  },
  {
    step: 3,
    title: "Cycle the Aquarium",
    description: "This is the most critical step! The Nitrogen Cycle grows beneficial bacteria that consume toxic fish waste (ammonia).",
    whatToBuy: "Liquid ammonia (for fishless cycling) and an API Freshwater Master Test Kit.",
    whyNeeded: "Without these bacteria, fish waste will rapidly poison the water and kill the fish.",
    commonMistakes: "Adding fish on day 1 (the \"fish-in cycle\"), leading to stress or death. Cycling typically takes 3-6 weeks.",
    recommendation: "Do a fishless cycle. Add ammonia and test water until it reads 0 Ammonia, 0 Nitrite, and some Nitrates."
  }
];
