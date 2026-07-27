import { Schema, model, Document, Types } from 'mongoose';

export interface IMedicine extends Document {
  name: string;
  slug: string;
  description: string;
  activeIngredients: string[];
  purpose: string;
  dosageInstructions: string;
  safeFish: Types.ObjectId[];
  unsafeFish: Types.ObjectId[];
  instructions: string;
  warnings: string[];
  cautions: string[];
}

const MedicineSchema = new Schema<IMedicine>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  activeIngredients: [{ type: String }],
  purpose: { type: String, required: true },
  dosageInstructions: { type: String, required: true },
  safeFish: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  unsafeFish: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  instructions: { type: String, required: true },
  warnings: [{ type: String }],
  cautions: [{ type: String }]
}, { timestamps: true });

export default model<IMedicine>('Medicine', MedicineSchema);
