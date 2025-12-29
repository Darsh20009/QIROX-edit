import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  storeId: Types.ObjectId;
  name: string;
  nameEn?: string;
  description?: string;
  image?: string;
  parentId?: Types.ObjectId;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    name: { type: String, required: true },
    nameEn: { type: String },
    description: { type: String },
    image: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "Category" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CategorySchema.index({ storeId: 1, isActive: 1 });
CategorySchema.index({ storeId: 1, parentId: 1 });

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
