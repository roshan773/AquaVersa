import { Schema, model, Document, Types } from 'mongoose';

export interface IFish extends Document {
  commonName: string;
  scientificName: string;
  family: string;
  slug: string;
  images: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  minTankSize: {
    liters: number;
    gallons: number;
  };
  waterParams: {
    tempMin: number;
    tempMax: number;
    phMin: number;
    phMax: number;
    dghMin: number;
    dghMax: number;
    waterType: 'Freshwater' | 'Brackish' | 'Saltwater';
  };
  dietType: 'Herbivore' | 'Carnivore' | 'Omnivore';
  foodRecommendations: string[];
  feedingFrequency: string;
  lifespan: number;
  adultSize: {
    cm: number;
    inches: number;
  };
  temperament: 'Peaceful' | 'Semi-aggressive' | 'Aggressive';
  activityLevel: 'Low' | 'Medium' | 'High';
  swimmingLevel: ('Top' | 'Mid' | 'Bottom')[];
  origin: string;
  breedingNotes: {
    mechanism: 'Egg-layer' | 'Livebearer' | 'Mouthbrooder' | 'Other';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    details: string;
  };
  compatibleMates: Types.ObjectId[];
  notCompatibleMates: Types.ObjectId[];
  idealPlants: Types.ObjectId[];
  idealEquipment: Types.ObjectId[];
  proneDiseases: Types.ObjectId[];
  interestingFacts: string[];
  faq: { question: string; answer: string }[];
  careTips: string;
  rationales: string;
}

const FishSchema = new Schema<IFish>({
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true, unique: true },
  family: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  images: [{ type: String }],
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  minTankSize: {
    liters: { type: Number, required: true },
    gallons: { type: Number, required: true }
  },
  waterParams: {
    tempMin: { type: Number, required: true },
    tempMax: { type: Number, required: true },
    phMin: { type: Number, required: true },
    phMax: { type: Number, required: true },
    dghMin: { type: Number, required: true },
    dghMax: { type: Number, required: true },
    waterType: { type: String, enum: ['Freshwater', 'Brackish', 'Saltwater'], required: true }
  },
  dietType: { type: String, enum: ['Herbivore', 'Carnivore', 'Omnivore'], required: true },
  foodRecommendations: [{ type: String }],
  feedingFrequency: { type: String, required: true },
  lifespan: { type: Number, required: true },
  adultSize: {
    cm: { type: Number, required: true },
    inches: { type: Number, required: true }
  },
  temperament: { type: String, enum: ['Peaceful', 'Semi-aggressive', 'Aggressive'], required: true },
  activityLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  swimmingLevel: [{ type: String, enum: ['Top', 'Mid', 'Bottom'] }],
  origin: { type: String, required: true },
  breedingNotes: {
    mechanism: { type: String, enum: ['Egg-layer', 'Livebearer', 'Mouthbrooder', 'Other'], required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    details: { type: String, required: true }
  },
  compatibleMates: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  notCompatibleMates: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  idealPlants: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
  idealEquipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
  proneDiseases: [{ type: Schema.Types.ObjectId, ref: 'Disease' }],
  interestingFacts: [{ type: String }],
  faq: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  careTips: { type: String, required: true },
  rationales: { type: String, required: true }
}, { timestamps: true });

FishSchema.index({ commonName: 'text', scientificName: 'text', family: 'text', careTips: 'text' });

export default model<IFish>('Fish', FishSchema);
