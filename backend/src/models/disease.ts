import { Schema, model, Document, Types } from 'mongoose';

export interface IDisease extends Document {
  name: string;
  slug: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string;
  treatment: string;
  medicines: Types.ObjectId[];
  recovery: string;
  emergencyGuide: string;
  isFreshwater: boolean;
  isSaltwater: boolean;
}

const DiseaseSchema = new Schema<IDisease>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  symptoms: [{ type: String, required: true }],
  causes: [{ type: String, required: true }],
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  medicines: [{ type: Schema.Types.ObjectId, ref: 'Medicine' }],
  recovery: { type: String, required: true },
  emergencyGuide: { type: String, required: true },
  isFreshwater: { type: Boolean, default: true },
  isSaltwater: { type: Boolean, default: false }
}, { timestamps: true });

export default model<IDisease>('Disease', DiseaseSchema);
