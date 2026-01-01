import mongoose, { Schema, Document } from "mongoose";

export type UserRole = 
  | "visitor" 
  | "client_owner" 
  | "client_admin" 
  | "client_editor"
  | "qirox_sales" 
  | "qirox_support"
  | "qirox_pm" 
  | "qirox_specialist"
  | "qirox_finance"
  | "system_admin"
  | "customer"
  | "admin"
  | "employee";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  isActive: boolean;
  tenantId: string;
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
      enum: [
        "visitor", "client_owner", "client_admin", "client_editor",
        "qirox_sales", "qirox_support", "qirox_pm", "qirox_specialist",
        "qirox_finance", "system_admin", "customer", "admin", "employee"
      ],
      default: "customer" 
    },
    isActive: { type: Boolean, default: true },
    tenantId: { type: String, default: "default" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
