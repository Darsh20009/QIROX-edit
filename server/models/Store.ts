import mongoose, { Schema, Document, Types } from "mongoose";

export type StoreType = "ecommerce" | "restaurant" | "education";
export type StoreStatus = "active" | "inactive" | "pending";

export interface IStore extends Document {
  userId: Types.ObjectId;
  tenantId?: Types.ObjectId;
  subscriptionId: Types.ObjectId;
  name: string;
  nameEn?: string;
  slug: string;
  type: StoreType;
  status: StoreStatus;
  logo?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  settings: {
    currency: string;
    language: string;
    timezone: string;
    taxRate?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema = new Schema<IStore>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", index: true },
    subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription", required: true },
    name: { type: String, required: true },
    nameEn: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true },
    type: { 
      type: String, 
      enum: ["ecommerce", "restaurant", "education"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["active", "inactive", "pending"], 
      default: "pending" 
    },
    logo: { type: String },
    description: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    settings: {
      currency: { type: String, default: "SAR" },
      language: { type: String, default: "ar" },
      timezone: { type: String, default: "Asia/Riyadh" },
      taxRate: { type: Number, default: 15 },
    },
  },
  { timestamps: true }
);

export const Store = mongoose.model<IStore>("Store", StoreSchema);
