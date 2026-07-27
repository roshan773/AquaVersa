import { Schema, model, Document, Types } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  contactEmail: string;
  socialLinks: Map<string, string>;
  featuredGuides: Types.ObjectId[];
}

const SettingsSchema = new Schema<ISettings>({
  siteName: { type: String, required: true, default: 'Fish Versa' },
  siteTagline: { type: String, required: true, default: 'The Ultimate Aquarium & Fish Encyclopedia' },
  siteDescription: { type: String, required: true, default: 'Learn care parameters, calculate gear, and build your aquascapes.' },
  contactEmail: { type: String, required: true, default: 'support@fishversa.com' },
  socialLinks: { type: Map, of: String, default: {} },
  featuredGuides: [{ type: Schema.Types.ObjectId, ref: 'Guide' }]
}, { timestamps: true });

export default model<ISettings>('Settings', SettingsSchema);
