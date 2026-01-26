import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

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
  | "system_admin";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  isActive: boolean;
  isFirstLogin: boolean;
  tenantId: string;
  metadata?: string;
  projectName?: string;
  projectStatus?: string;
  currentStage?: string;
  stageDeadline?: Date;
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
        "qirox_finance", "system_admin"
      ],
      default: "visitor" 
    },
    isActive: { type: Boolean, default: true },
    isFirstLogin: { type: Boolean, default: true },
    tenantId: { type: String, default: "default" },
    metadata: { type: String },
    projectName: { type: String },
    projectStatus: { type: String, default: "pending" },
    currentStage: { type: String },
    stageDeadline: { type: Date },
  },
  { timestamps: true }
);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export const User = mongoose.model<IUser>("User", UserSchema);
