import { Schema, model, Document, Types } from 'mongoose';

export interface ICompatibility extends Document {
  fishA: Types.ObjectId;
  fishB: Types.ObjectId;
  status: 'Compatible' | 'Caution' | 'Incompatible';
  reason: string;
}

const CompatibilitySchema = new Schema<ICompatibility>({
  fishA: { type: Schema.Types.ObjectId, ref: 'Fish', required: true },
  fishB: { type: Schema.Types.ObjectId, ref: 'Fish', required: true },
  status: { type: String, enum: ['Compatible', 'Caution', 'Incompatible'], required: true },
  reason: { type: String, required: true }
}, { timestamps: true });

CompatibilitySchema.index({ fishA: 1, fishB: 1 }, { unique: true });

export default model<ICompatibility>('Compatibility', CompatibilitySchema);
