import { Schema, model, Document } from 'mongoose';

export interface IGuide extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  readTime: string;
  category: string;
  image: string;
  publishedAt: Date;
}

const GuideSchema = new Schema<IGuide>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], required: true },
  readTime: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

GuideSchema.index({ title: 'text', content: 'text', category: 'text' });

export default model<IGuide>('Guide', GuideSchema);
