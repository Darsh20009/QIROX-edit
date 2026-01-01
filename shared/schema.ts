import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("visitor"), 
  // Roles: visitor, client_owner, client_admin, client_editor, qirox_sales, qirox_support, qirox_pm, qirox_specialist, qirox_finance, system_admin
  tenantId: varchar("tenant_id").notNull().default("default"),
  metadata: text("metadata"), // JSON string for extra fields
});

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status").notNull().default("active"),
  config: text("config"), // JSON string for tenant-specific settings
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tenantId: varchar("tenant_id").notNull().default("default"),
  action: text("action").notNull(),
  module: text("module").notNull().default("Core"), // Core, Build, Ops, Finance, Meet
  details: text("details"),
  ipAddress: text("ip_address"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const modules = pgTable("modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull(),
  name: text("name").notNull(), // QIROX Core, QIROX Build, QIROX Ops, etc.
  status: text("status").notNull().default("active"),
  config: text("config"), // JSON string for module settings
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

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tenantId: varchar("tenant_id").notNull().default("default"),
  name: text("name").notNull(),
  description: text("description"),
  type: text("project_type").notNull(),
  status: text("status").notNull().default("pending"),
  progress: text("progress").notNull().default("0"),
  requirements: text("requirements"),
  referenceUrls: text("reference_urls"),
  storeUrl: text("store_url"),
  isApproved: text("is_approved").notNull().default("no"), // Approval Gate
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taxInvoices = pgTable("tax_invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  userId: varchar("user_id").notNull(),
  tenantId: varchar("tenant_id").notNull().default("default"),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: text("amount").notNull(),
  taxAmount: text("tax_amount").notNull(), // 15% VAT for Saudi
  totalAmount: text("total_amount").notNull(),
  status: text("status").notNull().default("unpaid"), // unpaid, partially_paid, paid
  paidAmount: text("paid_amount").notNull().default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const meetings = pgTable("meetings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  userId: varchar("user_id").notNull(),
  tenantId: varchar("tenant_id").notNull().default("default"),
  title: text("title").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled
  link: text("link"), // Meeting link (ZEGO)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  items: text("items").notNull(), // JSON string
  total: text("total").notNull(),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected
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

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  timestamp: true,
});
export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
});
export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export const insertTaxInvoiceSchema = createInsertSchema(taxInvoices).omit({
  id: true,
  createdAt: true,
});
export type TaxInvoice = typeof taxInvoices.$inferSelect;
export type InsertTaxInvoice = z.infer<typeof insertTaxInvoiceSchema>;

export const insertMeetingSchema = createInsertSchema(meetings).omit({
  id: true,
  createdAt: true,
});
export type Meeting = typeof meetings.$inferSelect;
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
