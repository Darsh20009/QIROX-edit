import mongoose, { Schema, Document, Types } from "mongoose";

export type PlanType = "stores" | "restaurants" | "education";
export type BillingCycle = "monthly" | "6months" | "yearly";
export type SubscriptionStatus = "active" | "cancelled" | "expired" | "trial";

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  planType: PlanType;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  price: number;
  startDate: Date;
  endDate: Date;
  trialEndsAt?: Date;
  paymentConfirmedAt?: Date;
  paymentConfirmedBy?: Types.ObjectId;
  paymentNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    planType: { 
      type: String, 
      enum: ["stores", "restaurants", "education"], 
      required: true 
    },
    billingCycle: { 
      type: String, 
      enum: ["monthly", "6months", "yearly"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["active", "cancelled", "expired", "trial"], 
      default: "trial" 
    },
    price: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    trialEndsAt: { type: Date },
    paymentConfirmedAt: { type: Date },
    paymentConfirmedBy: { type: Schema.Types.ObjectId, ref: "User" },
    paymentNotes: { type: String },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export const PLAN_PRICES = {
  stores: {
    monthly: 100,
    "6months": 500,
    yearly: 899,
  },
  restaurants: {
    monthly: 179,
    "6months": 599,
    yearly: 1099,
  },
  education: {
    monthly: 199,
    "6months": 999,
    yearly: 1799,
  },
};
