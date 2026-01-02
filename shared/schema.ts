import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(), // for subdomain
  plan: text("plan").notNull().default("basic"),
  settings: text("settings"), // JSON config
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("visitor"), 
  tenantId: varchar("tenant_id").notNull().default("default"),
  metadata: text("metadata"), 
});

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tenantId: varchar("tenant_id").notNull().default("default"),
  action: text("action").notNull(),
  module: text("module").notNull().default("Core"),
  details: text("details"),
  ipAddress: text("ip_address"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tenantId: varchar("tenant_id").notNull().default("default"),
  name: text("name").notNull(),
  description: text("description"),
  type: text("project_type").notNull(),
  status: text("status").notNull().default("pending"),
  progress: text("progress").notNull().default("0"),
  isApproved: text("is_approved").notNull().default("no"),
  approvedBy: varchar("approved_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type").notNull(),
  budget: text("budget"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTenantSchema = createInsertSchema(tenants).omit({
  id: true,
  createdAt: true,
});
export type Tenant = typeof tenants.$inferSelect;
export type InsertTenant = z.infer<typeof insertTenantSchema>;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  tenantId: true,
  metadata: true,
});
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  timestamp: true,
});
export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
