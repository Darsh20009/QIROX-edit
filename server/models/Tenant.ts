import mongoose, { Schema, Document } from "mongoose";

export interface ITenant extends Document {
  name: string;
  slug: string;
  ownerId: string;
  description?: string;
  status: 'active' | 'inactive' | 'suspended';
  subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
  settings: {
    language: 'ar' | 'en';
    currency: string;
    timezone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    ownerId: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    subscriptionTier: { type: String, enum: ['free', 'starter', 'professional', 'enterprise'], default: 'free' },
    settings: {
      language: { type: String, enum: ['ar', 'en'], default: 'en' },
      currency: { type: String, default: 'USD' },
      timezone: { type: String, default: 'UTC' },
    },
  },
  { timestamps: true }
);

export const Tenant = mongoose.model<ITenant>("Tenant", TenantSchema);
