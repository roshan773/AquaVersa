import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  user?: Types.ObjectId;
  userName: string;
  content: string;
  targetType: 'fish' | 'plant' | 'blog' | 'guide';
  targetId: Types.ObjectId;
  isApproved: boolean;
}

const CommentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  targetType: { type: String, enum: ['fish', 'plant', 'blog', 'guide'], required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

export default model<IComment>('Comment', CommentSchema);
