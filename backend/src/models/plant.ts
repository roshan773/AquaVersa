import { Schema, model, Document, Types } from 'mongoose';

export interface IPlant extends Document {
  name: string;
  scientificName: string;
  slug: string;
  category: 'Foreground' | 'Midground' | 'Background' | 'Floating';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  co2Needs: boolean;
  lightingNeeds: 'Low' | 'Medium' | 'High';
  growthRate: 'Slow' | 'Medium' | 'Fast';
  compatibilityTips: string;
  description: string;
  benefits: string[];
  compatibleFish: Types.ObjectId[];
  careGuide: string;
  images: string[];
}

const PlantSchema = new Schema<IPlant>({
  name: { type: String, required: true },
  scientificName: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Foreground', 'Midground', 'Background', 'Floating'], required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  co2Needs: { type: Boolean, required: true },
  lightingNeeds: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  growthRate: { type: String, enum: ['Slow', 'Medium', 'Fast'], required: true },
  compatibilityTips: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  compatibleFish: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  careGuide: { type: String, required: true },
  images: [{ type: String }]
}, { timestamps: true });

PlantSchema.index({ name: 'text', scientificName: 'text', description: 'text' });

export default model<IPlant>('Plant', PlantSchema);
