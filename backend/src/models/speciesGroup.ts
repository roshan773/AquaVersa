import { Schema, model, Document } from 'mongoose';

export interface ISpeciesGroup extends Document {
  name: string;
  description: string;
  careCharacteristics: string;
}

const SpeciesGroupSchema = new Schema<ISpeciesGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  careCharacteristics: { type: String, required: true }
}, { timestamps: true });

export default model<ISpeciesGroup>('SpeciesGroup', SpeciesGroupSchema);
