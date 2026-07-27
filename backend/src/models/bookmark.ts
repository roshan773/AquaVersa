import { Schema, model, Document, Types } from 'mongoose';

export interface IBookmark extends Document {
  user: Types.ObjectId;
  itemType: 'fish' | 'plant' | 'equipment' | 'food' | 'blog' | 'guide';
  itemId: Types.ObjectId;
}

const BookmarkSchema = new Schema<IBookmark>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemType: { type: String, enum: ['fish', 'plant', 'equipment', 'food', 'blog', 'guide'], required: true },
  itemId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });

BookmarkSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

export default model<IBookmark>('Bookmark', BookmarkSchema);
