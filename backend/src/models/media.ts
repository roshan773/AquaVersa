import { Schema, model, Document } from 'mongoose';

export interface IMedia extends Document {
  url: string;
  publicId?: string;
  fileName: string;
  fileType: string;
  sizeBytes: number;
}

const MediaSchema = new Schema<IMedia>({
  url: { type: String, required: true },
  publicId: { type: String },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  sizeBytes: { type: Number, required: true }
}, { timestamps: true });

export default model<IMedia>('Media', MediaSchema);
