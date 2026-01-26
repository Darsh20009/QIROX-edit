import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  tenantId: string;
  deployUrl?: string;
  githubRepo?: string;
  domainAccounts?: string;
  services?: string;
  stages: {
    name: string;
    completed: boolean;
    deadline?: Date;
  }[];
  checklist: {
    item: string;
    completed: boolean;
  }[];
  pricing: {
    total: number;
    paid: number;
    remaining: number;
  };
  invoices: {
    id: string;
    url: string;
    date: Date;
    amount: number;
    status: string;
  }[];
  envVars?: string;
  dbInfo?: string;
  timeline: {
    event: string;
    date: Date;
    actor: string;
  }[];
  nextUpdate?: string;
  responsiblePerson?: string;
  status: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    tenantId: { type: String, required: true },
    deployUrl: { type: String },
    githubRepo: { type: String },
    domainAccounts: { type: String },
    services: { type: String },
    stages: [{
      name: { type: String },
      completed: { type: Boolean, default: false },
      deadline: { type: Date }
    }],
    checklist: [{
      item: { type: String },
      completed: { type: Boolean, default: false }
    }],
    pricing: {
      total: { type: Number, default: 0 },
      paid: { type: Number, default: 0 },
      remaining: { type: Number, default: 0 }
    },
    invoices: [{
      id: { type: String },
      url: { type: String },
      date: { type: Date },
      amount: { type: Number },
      status: { type: String }
    }],
    envVars: { type: String },
    dbInfo: { type: String },
    timeline: [{
      event: { type: String },
      date: { type: Date, default: Date.now },
      actor: { type: String }
    }],
    nextUpdate: { type: String },
    responsiblePerson: { type: String },
    status: { type: String, default: "active" }
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
