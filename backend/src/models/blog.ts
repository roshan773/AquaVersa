import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  category: string;
  image: string;
  publishedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, default: 'Fish Versa Team' },
  tags: [{ type: String }],
  category: { type: String, required: true },
  image: { type: String },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default model<IBlog>('Blog', BlogSchema);
