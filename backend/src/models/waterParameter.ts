import { Schema, model, Document } from 'mongoose';

export interface IWaterParameter extends Document {
  name: string;
  range: string;
  description: string;
  optimalValue: string;
  warnings: string;
}

const WaterParameterSchema = new Schema<IWaterParameter>({
  name: { type: String, required: true },
  range: { type: String, required: true },
  description: { type: String, required: true },
  optimalValue: { type: String, required: true },
  warnings: { type: String, required: true }
}, { timestamps: true });

export default model<IWaterParameter>('WaterParameter', WaterParameterSchema);
