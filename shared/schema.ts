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
  siteMode: text("site_mode").notNull().default("managed"), // managed, external, headless
  externalDomain: text("external_domain"),
  externalRepoUrl: text("external_repo_url"),
  hostingProvider: text("hosting_provider"),
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
  phone: text("phone"),
  projectName: text("project_name"),
  commercialRegisterUrl: text("commercial_register_url"),
  ibanCertificateUrl: text("iban_certificate_url"),
  projectIdea: text("project_idea"),
  selectedPlanId: text("selected_plan_id"),
  assignedEmployeeId: varchar("assigned_employee_id"),
  domainInfo: text("domain_info"),
  projectStatus: text("project_status").default("pending"),
  currentStage: text("current_stage"),
  stageDeadline: timestamp("stage_deadline"),
  whatsapp: text("whatsapp"),
  businessType: text("business_type"),
  loyaltyPoints: integer("loyalty_points").default(0).notNull(),
  loyaltyTier: text("loyalty_tier").default("bronze").notNull(),
  totalSpent: integer("total_spent").default(0).notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().default("default"),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  cost: text("cost"),
  categoryId: varchar("category_id"),
  images: text("images").array(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  variants: text("variants"), // JSON string for complexity
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  tenantId: varchar("tenant_id").notNull().default("default"),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name"),
  items: text("items").notNull(), // JSON string
  total: text("total").notNull(),
  status: text("status").notNull().default("new"),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dailyUpdates = pgTable("daily_updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  crUrl: text("cr_url"),
  ibanUrl: text("iban_url"),
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
  email: true,
  role: true,
  tenantId: true,
  metadata: true,
  phone: true,
  projectName: true,
  commercialRegisterUrl: true,
  ibanCertificateUrl: true,
  projectIdea: true,
  selectedPlanId: true,
  assignedEmployeeId: true,
  domainInfo: true,
  projectStatus: true,
  currentStage: true,
  stageDeadline: true,
  whatsapp: true,
  businessType: true,
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

export const apiKeys = pgTable("api_keys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull(),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  scopes: text("scopes").array(),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const webhooks = pgTable("webhooks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull(),
  url: text("url").notNull(),
  events: text("events").array().notNull(),
  secret: text("secret").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertApiKeySchema = createInsertSchema(apiKeys).omit({
  id: true,
  createdAt: true,
});
export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;

export const insertWebhookSchema = createInsertSchema(webhooks).omit({
  id: true,
  createdAt: true,
});
export type Webhook = typeof webhooks.$inferSelect;
export type InsertWebhook = z.infer<typeof insertWebhookSchema>;

export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;

export const deployments = pgTable("deployments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull(),
  version: varchar("version").notNull(),
  status: varchar("status").notNull(), // queued, building, deploying, live, failed, rolled_back
  commitHash: varchar("commit_hash"),
  deployedBy: varchar("deployed_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const buildLogs = pgTable("build_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deploymentId: varchar("deployment_id").notNull(),
  logLine: text("log_line").notNull(),
  level: varchar("level").default("info"), // info, error, warn
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const runtimeHealth = pgTable("runtime_health", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull(),
  status: varchar("status").notNull(), // healthy, degraded, down
  cpuUsage: integer("cpu_usage"),
  memoryUsage: integer("memory_usage"),
  lastCheck: timestamp("last_check").defaultNow().notNull(),
});

export const insertDeploymentSchema = createInsertSchema(deployments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type Deployment = typeof deployments.$inferSelect;
export type InsertDeployment = z.infer<typeof insertDeploymentSchema>;

export const insertBuildLogSchema = createInsertSchema(buildLogs).omit({
  id: true,
  timestamp: true,
});
export type BuildLog = typeof buildLogs.$inferSelect;
export type InsertBuildLog = z.infer<typeof insertBuildLogSchema>;

export const insertRuntimeHealthSchema = createInsertSchema(runtimeHealth).omit({
  id: true,
  lastCheck: true,
});
export type RuntimeHealth = typeof runtimeHealth.$inferSelect;
export type InsertRuntimeHealth = z.infer<typeof insertRuntimeHealthSchema>;

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
