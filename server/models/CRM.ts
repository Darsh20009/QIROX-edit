import mongoose, { Schema, Document, Types } from "mongoose";

export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface ITicket extends Document {
  tenantId: Types.ObjectId;
  customerId: Types.ObjectId;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact extends Document {
  tenantId: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    customerId: { type: Schema.Types.ObjectId, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["open", "in_progress", "waiting", "resolved", "closed"],
      default: "open"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },
    assignedTo: { type: Schema.Types.ObjectId },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const ContactSchema = new Schema<IContact>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    notes: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

TicketSchema.index({ tenantId: 1, status: 1 });
TicketSchema.index({ tenantId: 1, createdAt: -1 });
ContactSchema.index({ tenantId: 1, createdAt: -1 });

export const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);
export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
