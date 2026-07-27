import { Schema, model, Document, Types } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  slug: string;
  category: 'Filter' | 'Heater' | 'Lighting' | 'Substrate' | 'CO2' | 'Tank' | 'Accessories';
  brand: string;
  specifications: Map<string, string>;
  pros: string[];
  cons: string[];
  powerConsumption: string;
  maintenance: string;
  recommendedFish: Types.ObjectId[];
  buyingGuide: string;
  images: string[];
  price: number;
  rating: number;
}

const EquipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Filter', 'Heater', 'Lighting', 'Substrate', 'CO2', 'Tank', 'Accessories'], required: true },
  brand: { type: String, required: true },
  specifications: { type: Map, of: String },
  pros: [{ type: String }],
  cons: [{ type: String }],
  powerConsumption: { type: String, required: true },
  maintenance: { type: String, required: true },
  recommendedFish: [{ type: Schema.Types.ObjectId, ref: 'Fish' }],
  buyingGuide: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.5 }
}, { timestamps: true });

EquipmentSchema.index({ name: 'text', brand: 'text', buyingGuide: 'text' });

export default model<IEquipment>('Equipment', EquipmentSchema);
