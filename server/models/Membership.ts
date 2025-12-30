import mongoose, { Schema, Document } from "mongoose";

export interface IMembership extends Document {
  tenantId: string;
  userId: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  status: 'active' | 'invited' | 'removed';
  joinedAt: Date;
  invitedAt?: Date;
  invitedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MembershipSchema = new Schema<IMembership>(
  {
    tenantId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    role: { type: String, enum: ['owner', 'admin', 'editor', 'viewer'], default: 'editor' },
    status: { type: String, enum: ['active', 'invited', 'removed'], default: 'active' },
    joinedAt: { type: Date },
    invitedAt: { type: Date },
    invitedBy: { type: String },
  },
  { timestamps: true }
);

// Unique index on tenantId + userId
MembershipSchema.index({ tenantId: 1, userId: 1 }, { unique: true });

export const Membership = mongoose.model<IMembership>("Membership", MembershipSchema);
