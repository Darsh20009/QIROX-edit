import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  projectType: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContactMessage = mongoose.model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema
);
