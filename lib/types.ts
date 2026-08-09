export interface Fish {
  id: string;
  slug?: string;
  name: string;
  scientificName?: string;
  category?: string;
  difficulty?: string;
  adultSize?: string;
  maxSize?: number;
  minTankSize?: number;
  minimumTankSize?: string;
  temperature?: string;
  ph?: string;
  temperament?: string;
  diet?: string | string[];
  lifespan?: string;
  compatibility?: string[];
  compatibleWith?: string[];
  plants?: string[];
  image: string;
  description: string;
  careGuide?: string;
}

export interface Plant {
  id: string;
  slug?: string;
  name: string;
  scientificName?: string;
  difficulty?: string;
  growthRate?: string;
  light?: string;
  co2?: string;
  placement?: string;
  temperature?: string;
  ph?: string;
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
