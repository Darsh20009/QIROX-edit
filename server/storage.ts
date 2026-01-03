import { 
  type User, type InsertUser, 
  type Tenant, type InsertTenant,
  type Project, type InsertProject,
  type AuditLog, type InsertAuditLog,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";
import { isConnected } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTenants(): Promise<Tenant[]>;
  getTenant(id: string): Promise<Tenant | undefined>;
  getTenantBySlug(slug: string): Promise<Tenant | undefined>;
  createTenant(tenant: InsertTenant): Promise<Tenant>;

  getProjects(userId?: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project>;
  
  getDailyUpdates(userId: string): Promise<any[]>;
  createDailyUpdate(update: any): Promise<any>;

  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;
  getAuditLogs(tenantId?: string): Promise<AuditLog[]>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;

  getQuotes(): Promise<any[]>;
  createQuote(quote: any): Promise<any>;

  // Stubs for remaining models to avoid crashes
  getInvoices(userId?: string): Promise<any[]>;

  createInvoice(invoice: any): Promise<any>;
  getMeetings(userId?: string): Promise<any[]>;
  createMeeting(meeting: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tenants: Map<string, Tenant>;
  private projects: Map<string, Project>;
  private auditLogs: Map<string, AuditLog>;
  private contactMessages: Map<string, ContactMessage>;
  private dailyUpdates: Map<string, any>;

  constructor() {
    this.users = new Map();
    this.tenants = new Map();
    this.projects = new Map();
    this.auditLogs = new Map();
    this.contactMessages = new Map();
    this.dailyUpdates = new Map();
  }

  async getUser(id: string): Promise<User | undefined> { return this.users.get(id); }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: insertUser.email,
      role: insertUser.role || "visitor",
      tenantId: insertUser.tenantId || "default",
      metadata: insertUser.metadata || null,
      phone: insertUser.phone || null,
      projectName: (insertUser as any).projectName || null,
      commercialRegisterUrl: (insertUser as any).commercialRegisterUrl || null,
      ibanCertificateUrl: (insertUser as any).ibanCertificateUrl || null,
      projectIdea: (insertUser as any).projectIdea || null,
      selectedPlanId: (insertUser as any).selectedPlanId || null,
      assignedEmployeeId: (insertUser as any).assignedEmployeeId || null,
      domainInfo: (insertUser as any).domainInfo || null,
      projectStatus: (insertUser as any).projectStatus || "pending",
      currentStage: (insertUser as any).currentStage || null,
      stageDeadline: (insertUser as any).stageDeadline || null,
      whatsapp: (insertUser as any).whatsapp || null,
      businessType: (insertUser as any).businessType || null,
    };
    this.users.set(id, user);
    return user;
  }

  async getTenants(): Promise<Tenant[]> { return Array.from(this.tenants.values()); }
  async getTenant(id: string): Promise<Tenant | undefined> { return this.tenants.get(id); }
  async getTenantBySlug(slug: string): Promise<Tenant | undefined> {
    return Array.from(this.tenants.values()).find(t => t.slug === slug);
  }
  async createTenant(insert: InsertTenant): Promise<Tenant> {
    const id = randomUUID();
    const tenant: Tenant = { ...insert, id, createdAt: new Date(), settings: insert.settings || null, plan: insert.plan || "basic" };
    this.tenants.set(id, tenant);
    return tenant;
  }

  async getProjects(userId?: string): Promise<Project[]> {
    const all = Array.from(this.projects.values());
    if (userId) return all.filter(p => p.userId === userId);
    return all;
  }
  async getProject(id: string): Promise<Project | undefined> { return this.projects.get(id); }
  async createProject(insert: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insert, 
      id, 
      createdAt: new Date(),
      status: insert.status || "pending",
      progress: insert.progress || "0",
      description: insert.description || null,
      tenantId: insert.tenantId || "default",
      isApproved: insert.isApproved || "no",
      approvedBy: insert.approvedBy || null,
      crUrl: insert.crUrl ?? null,
      ibanUrl: insert.ibanUrl ?? null,
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const project = this.projects.get(id);
    if (!project) throw new Error("Project not found");
    const updated = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async getDailyUpdates(userId: string): Promise<any[]> {
    return Array.from(this.dailyUpdates.values()).filter(u => u.userId === userId);
  }
  async createDailyUpdate(insert: any): Promise<any> {
    const id = randomUUID();
    const update = { ...insert, id, createdAt: new Date() };
    this.dailyUpdates.set(id, update);
    return update;
  }

  async createAuditLog(insert: InsertAuditLog): Promise<AuditLog> {
    const id = randomUUID();
    const auditLog: AuditLog = { 
      ...insert, 
      id, 
      timestamp: new Date(),
      details: insert.details || null,
      ipAddress: insert.ipAddress || null,
      module: insert.module || "Core",
      tenantId: insert.tenantId || "default"
    };
    this.auditLogs.set(id, auditLog);
    return auditLog;
  }

  async getAuditLogs(tenantId?: string): Promise<AuditLog[]> {
    const all = Array.from(this.auditLogs.values());
    if (tenantId) return all.filter(log => log.tenantId === tenantId);
    return all.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createContactMessage(insert: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insert, id, createdAt: new Date(), company: insert.company || null, budget: insert.budget || null };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getQuotes(): Promise<any[]> { return []; }
  async createQuote(): Promise<any> { return {}; }
  async getInvoices(): Promise<any[]> { return []; }
  async createInvoice(): Promise<any> { return {}; }
  async getMeetings(): Promise<any[]> { return []; }
  async createMeeting(): Promise<any> { return {}; }
}

export class MongoStorage implements IStorage {
  private memStorage: MemStorage;
  constructor() { this.memStorage = new MemStorage(); }
  async getUser(id: string): Promise<User | undefined> { return this.memStorage.getUser(id); }
  async getUserByUsername(username: string): Promise<User | undefined> { return this.memStorage.getUserByUsername(username); }
  async createUser(user: InsertUser): Promise<User> { return this.memStorage.createUser(user); }
  async getTenants(): Promise<Tenant[]> { return this.memStorage.getTenants(); }
  async getTenant(id: string): Promise<Tenant | undefined> { return this.memStorage.getTenant(id); }
  async getTenantBySlug(slug: string): Promise<Tenant | undefined> { return this.memStorage.getTenantBySlug(slug); }
  async createTenant(tenant: InsertTenant): Promise<Tenant> { return this.memStorage.createTenant(tenant); }
  async getProjects(userId?: string): Promise<Project[]> { return this.memStorage.getProjects(userId); }
  async getProject(id: string): Promise<Project | undefined> { return this.memStorage.getProject(id); }
  async createProject(project: InsertProject): Promise<Project> { return this.memStorage.createProject(project); }
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> { return this.memStorage.updateProject(id, updates); }
  async createAuditLog(log: InsertAuditLog): Promise<AuditLog> { return this.memStorage.createAuditLog(log); }
  async getAuditLogs(tenantId?: string): Promise<AuditLog[]> { return this.memStorage.getAuditLogs(tenantId); }
  async createContactMessage(m: InsertContactMessage): Promise<ContactMessage> { return this.memStorage.createContactMessage(m); }
  async getContactMessages(): Promise<ContactMessage[]> { return this.memStorage.getContactMessages(); }
  
  async getDailyUpdates(userId: string): Promise<any[]> { return this.memStorage.getDailyUpdates(userId); }
  async createDailyUpdate(update: any): Promise<any> { return this.memStorage.createDailyUpdate(update); }
  
  async getQuotes(): Promise<any[]> { return []; }
  async createQuote(): Promise<any> { return {}; }
  async getInvoices(): Promise<any[]> { return []; }
  async createInvoice(): Promise<any> { return {}; }
  async getMeetings(): Promise<any[]> { return []; }
  async createMeeting(): Promise<any> { return {}; }
}

export const storage: IStorage = isConnected() ? new MongoStorage() : new MemStorage();
