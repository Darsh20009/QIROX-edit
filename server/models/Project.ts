import mongoose, { Schema, Document, Types } from "mongoose";

export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export interface ITask extends Document {
  projectId: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo?: Types.ObjectId;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject extends Document {
  tenantId: Types.ObjectId;
  name: string;
  description?: string;
  status: ProjectStatus;
  owner: Types.ObjectId;
  team: Types.ObjectId[];
  startDate?: Date;
  endDate?: Date;
  tasks: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { 
      type: String, 
      enum: ["todo", "in_progress", "review", "done"],
      default: "todo"
    },
    assignedTo: { type: Schema.Types.ObjectId },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

const ProjectSchema = new Schema<IProject>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["planning", "active", "on_hold", "completed", "cancelled"],
      default: "planning"
    },
    owner: { type: Schema.Types.ObjectId, required: true },
    team: [{ type: Schema.Types.ObjectId }],
    startDate: { type: Date },
    endDate: { type: Date },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

ProjectSchema.index({ tenantId: 1, status: 1 });
ProjectSchema.index({ tenantId: 1, createdAt: -1 });
TaskSchema.index({ projectId: 1, status: 1 });

export const Task = mongoose.model<ITask>("Task", TaskSchema);
export const Project = mongoose.model<IProject>("Project", ProjectSchema);
