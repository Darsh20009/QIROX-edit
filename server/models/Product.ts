import mongoose, { Schema, Document, Types } from "mongoose";

export type ProductStatus = "active" | "inactive" | "out_of_stock";

export interface IProduct extends Document {
  storeId: Types.ObjectId;
  name: string;
  nameEn?: string;
  description?: string;
  price: number;
  comparePrice?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  quantity: number;
  category?: string;
  images: string[];
  status: ProductStatus;
  featured: boolean;
  options?: {
    name: string;
    values: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    name: { type: String, required: true },
    nameEn: { type: String },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    cost: { type: Number, min: 0 },
    sku: { type: String },
    barcode: { type: String },
    quantity: { type: Number, default: 0, min: 0 },
    category: { type: String },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
    featured: { type: Boolean, default: false },
    options: [
      {
        name: { type: String },
        values: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.index({ storeId: 1, status: 1 });
ProductSchema.index({ storeId: 1, category: 1 });
ProductSchema.index({ storeId: 1, sku: 1 });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
