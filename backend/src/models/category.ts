import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  type: 'fish' | 'plant' | 'equipment' | 'food' | 'general';
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, enum: ['fish', 'plant', 'equipment', 'food', 'general'], required: true }
}, { timestamps: true });

export default model<ICategory>('Category', CategorySchema);
