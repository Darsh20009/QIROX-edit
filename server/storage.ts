import { 
  type User, type InsertUser, 
  type ContactMessage, type InsertContactMessage, 
  type Project, type InsertProject,
  type TaxInvoice, type InsertTaxInvoice,
  type Meeting, type InsertMeeting,
  type Quote, type InsertQuote 
} from "@shared/schema";
import { randomUUID } from "crypto";
import { ContactMessage as ContactMessageModel } from "./models/ContactMessage";
import { isConnected } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getProjects(userId?: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project>;
  getInvoices(userId?: string): Promise<TaxInvoice[]>;
  createInvoice(invoice: InsertTaxInvoice): Promise<TaxInvoice>;
  getMeetings(userId?: string): Promise<Meeting[]>;
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getQuotes(): Promise<Quote[]>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  createAuditLog(log: any): Promise<any>;
  getAuditLogs(): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private projects: Map<string, Project>;
  private invoices: Map<string, TaxInvoice>;
  private meetings: Map<string, Meeting>;
  private quotes: Map<string, Quote>;
  private auditLogs: Map<string, any>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.projects = new Map();
    this.invoices = new Map();
    this.meetings = new Map();
    this.quotes = new Map();
    this.auditLogs = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "visitor",
      tenantId: insertUser.tenantId || "default"
    };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      company: insertMessage.company ?? null,
      budget: insertMessage.budget ?? null,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProjects(userId?: string): Promise<Project[]> {
    const all = Array.from(this.projects.values());
    if (userId) return all.filter(p => p.userId === userId);
    return all;
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insert: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insert, 
      id, 
      createdAt: new Date(),
      status: insert.status || "pending",
      progress: insert.progress || "0",
      description: insert.description || null,
      requirements: insert.requirements || null,
      referenceUrls: insert.referenceUrls || null,
      storeUrl: insert.storeUrl || null,
      tenantId: insert.tenantId || "default",
      isApproved: insert.isApproved || "no"
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

  async getInvoices(userId?: string): Promise<TaxInvoice[]> {
    const all = Array.from(this.invoices.values());
    if (userId) return all.filter(i => i.userId === userId);
    return all;
  }

  async createInvoice(insert: InsertTaxInvoice): Promise<TaxInvoice> {
    const id = randomUUID();
    const invoice: TaxInvoice = { 
      ...insert, 
      id, 
      createdAt: new Date(),
      status: insert.status || "unpaid",
      paidAmount: insert.paidAmount || "0",
      notes: insert.notes || null,
      tenantId: insert.tenantId || "default"
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async getMeetings(userId?: string): Promise<Meeting[]> {
    const all = Array.from(this.meetings.values());
    if (userId) return all.filter(m => m.userId === userId || m.tenantId === "default");
    return all;
  }

  async createMeeting(insert: InsertMeeting): Promise<Meeting> {
    const id = randomUUID();
    const meeting: Meeting = { 
      ...insert, 
      id, 
      createdAt: new Date(),
      status: insert.status || "scheduled",
      link: insert.link || null,
      tenantId: insert.tenantId || "default"
    };
    this.meetings.set(id, meeting);
    return meeting;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = { 
      ...insertQuote, 
      id, 
      createdAt: new Date(),
      status: insertQuote.status || "pending"
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async createAuditLog(log: any): Promise<any> {
    const id = randomUUID();
    const auditLog = { ...log, id, timestamp: new Date() };
    this.auditLogs.set(id, auditLog);
    return auditLog;
  }

  async getAuditLogs(): Promise<any[]> {
    return Array.from(this.auditLogs.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export class MongoStorage implements IStorage {
  private memStorage: MemStorage;

  constructor() {
    this.memStorage = new MemStorage();
  }

  async getUser(id: string): Promise<User | undefined> { return this.memStorage.getUser(id); }
  async getUserByUsername(username: string): Promise<User | undefined> { return this.memStorage.getUserByUsername(username); }
  async createUser(insertUser: InsertUser): Promise<User> { return this.memStorage.createUser(insertUser); }
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> { return this.memStorage.createContactMessage(insertMessage); }
  async getContactMessages(): Promise<ContactMessage[]> { return this.memStorage.getContactMessages(); }
  async getProjects(userId?: string): Promise<Project[]> { return this.memStorage.getProjects(userId); }
  async getProject(id: string): Promise<Project | undefined> { return this.memStorage.getProject(id); }
  async createProject(project: InsertProject): Promise<Project> { return this.memStorage.createProject(project); }
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> { return this.memStorage.updateProject(id, updates); }
  async getInvoices(userId?: string): Promise<TaxInvoice[]> { return this.memStorage.getInvoices(userId); }
  async createInvoice(invoice: InsertTaxInvoice): Promise<TaxInvoice> { return this.memStorage.createInvoice(invoice); }
  async getMeetings(userId?: string): Promise<Meeting[]> { return this.memStorage.getMeetings(userId); }
  async createMeeting(meeting: InsertMeeting): Promise<Meeting> { return this.memStorage.createMeeting(meeting); }
  async getQuotes(): Promise<Quote[]> { return this.memStorage.getQuotes(); }
  async createQuote(quote: InsertQuote): Promise<Quote> { return this.memStorage.createQuote(quote); }
  async createAuditLog(log: any): Promise<any> { return this.memStorage.createAuditLog(log); }
  async getAuditLogs(): Promise<any[]> { return this.memStorage.getAuditLogs(); }
}

const memStorage = new MemStorage();
const mongoStorage = new MongoStorage();

export const storage: IStorage = {
  getUser: (id) => isConnected() ? mongoStorage.getUser(id) : memStorage.getUser(id),
  getUserByUsername: (username) => isConnected() ? mongoStorage.getUserByUsername(username) : memStorage.getUserByUsername(username),
  createUser: (user) => isConnected() ? mongoStorage.createUser(user) : memStorage.createUser(user),
  createContactMessage: (message) => isConnected() ? mongoStorage.createContactMessage(message) : memStorage.createContactMessage(message),
  getContactMessages: () => isConnected() ? mongoStorage.getContactMessages() : memStorage.getContactMessages(),
  getInvoices: (userId) => isConnected() ? mongoStorage.getInvoices(userId) : memStorage.getInvoices(userId),
  createInvoice: (invoice) => isConnected() ? mongoStorage.createInvoice(invoice) : memStorage.createInvoice(invoice),
  getQuotes: () => isConnected() ? mongoStorage.getQuotes() : memStorage.getQuotes(),
  createQuote: (quote) => isConnected() ? mongoStorage.createQuote(quote) : memStorage.createQuote(quote),
  createAuditLog: (log) => isConnected() ? mongoStorage.createAuditLog(log) : memStorage.createAuditLog(log),
  getAuditLogs: () => isConnected() ? mongoStorage.getAuditLogs() : memStorage.getAuditLogs(),
  getProjects: (userId) => isConnected() ? mongoStorage.getProjects(userId) : memStorage.getProjects(userId),
  getProject: (id) => isConnected() ? mongoStorage.getProject(id) : memStorage.getProject(id),
  createProject: (project) => isConnected() ? mongoStorage.createProject(project) : memStorage.createProject(project),
  updateProject: (id, updates) => isConnected() ? mongoStorage.updateProject(id, updates) : memStorage.updateProject(id, updates),
  getMeetings: (userId) => isConnected() ? mongoStorage.getMeetings(userId) : memStorage.getMeetings(userId),
  createMeeting: (meeting) => isConnected() ? mongoStorage.createMeeting(meeting) : memStorage.createMeeting(meeting),
};
