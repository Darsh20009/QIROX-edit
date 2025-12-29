import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "customer" | "employee" | "admin";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    role: { 
      type: String, 
      enum: ["customer", "employee", "admin"], 
      default: "customer" 
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
