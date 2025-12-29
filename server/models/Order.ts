import mongoose, { Schema, Document, Types } from "mongoose";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  options?: Record<string, string>;
}

export interface IOrder extends Document {
  storeId: Types.ObjectId;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress?: string;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    options: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    shippingAddress: { type: String },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

OrderSchema.index({ storeId: 1, status: 1 });
OrderSchema.index({ storeId: 1, createdAt: -1 });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);

export async function generateOrderNumber(storeId: string): Promise<string> {
  const count = await Order.countDocuments({ storeId });
  const timestamp = Date.now().toString(36).toUpperCase();
  return `ORD-${timestamp}-${(count + 1).toString().padStart(4, "0")}`;
}
