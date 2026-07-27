import { Schema, model, Document, Types } from 'mongoose';

export interface IFood extends Document {
  name: string;
  slug: string;
  type: 'Pellets' | 'Flakes' | 'Frozen Food' | 'Live Food' | 'Vegetables';
  description: string;
  nutrition: Map<string, string>;
  feedingSchedule: string;
  recommendedFish: Types.ObjectId[];
  images: string[];
}

const FoodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Pellets', 'Flakes', 'Frozen Food', 'Live Food', 'Vegetables'], required: true },
  description: { type: String, required: true },
  nutrition: { type: Map, of: String },
  feedingSchedule: { type: String, required: true },
  recommendedFish: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  images: [{ type: String }]
}, { timestamps: true });

FoodSchema.index({ name: 'text', description: 'text' });

export default model<IFood>('Food', FoodSchema);
