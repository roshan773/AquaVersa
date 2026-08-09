export interface Fish {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  category: "freshwater" | "saltwater";
  difficulty: "Easy" | "Intermediate" | "Advanced";
  adultSize: string;
  minimumTankSize: string;
  temperature: string;
  ph: string;
  temperament: string;
  diet: string[];
  lifespan: string;
  compatibility: string[];
  plants: string[];
  image: string;
  description: string;
}

export interface Plant {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  difficulty: "Easy" | "Intermediate" | "Advanced";
  growthRate: "Slow" | "Moderate" | "Fast";
  light: "Low" | "Medium" | "High";
  co2: "Optional" | "Recommended" | "Required";
  placement: string;
  temperature: string;
  ph: string;
  image: string;
  description: string;
}

export interface Equipment {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  purpose: string;
  howItWorks: string;
  suitableTanks: string[];
  maintenance: string;
  beginnerMistakes: string;
  image: string;
}

export interface GuideStep {
  step: number;
  title: string;
  description: string;
  whatToBuy: string;
  whyNeeded: string;
  commonMistakes: string;
  recommendation: string;
}
