import { type User, type InsertUser, type ContactMessage as ContactMessageType, type InsertContactMessage, type Invoice, type InsertInvoice, type Quote, type InsertQuote, contactMessages, insertContactMessageSchema } from "@shared/schema";
import { randomUUID } from "crypto";
import { ContactMessage as ContactMessageModel } from "./models/ContactMessage";
import { isConnected } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessageType>;
  getContactMessages(): Promise<ContactMessageType[]>;
  // Finance
  getInvoices(): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getQuotes(): Promise<Quote[]>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessageType>;
  private invoices: Map<string, Invoice>;
  private quotes: Map<string, Quote>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.invoices = new Map();
    this.quotes = new Map();
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessageType> {
    const id = randomUUID();
    const message: ContactMessageType = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessageType[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getInvoices(): Promise<Invoice[]> {
    return Array.from(this.invoices.values());
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = randomUUID();
    const invoice: Invoice = { 
      ...insertInvoice, 
      id, 
      createdAt: new Date(),
      status: insertInvoice.status || "unpaid",
      dueDate: insertInvoice.dueDate || null
    };
    this.invoices.set(id, invoice);
    return invoice;
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
}

export class MongoStorage implements IStorage {
  private memStorage: MemStorage;

  constructor() {
    this.memStorage = new MemStorage();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.memStorage.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.memStorage.getUserByUsername(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return this.memStorage.createUser(insertUser);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessageType> {
    const company = insertMessage.company ? String(insertMessage.company) : null;
    const budget = insertMessage.budget ? String(insertMessage.budget) : null;
    
    const doc = await ContactMessageModel.create({
      name: insertMessage.name,
      email: insertMessage.email,
      company,
      projectType: insertMessage.projectType,
      budget,
      message: insertMessage.message,
    });

    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      company: doc.company as string | null,
      projectType: doc.projectType,
      budget: doc.budget as string | null,
      message: doc.message,
      createdAt: doc.createdAt,
    };
  }

  async getContactMessages(): Promise<ContactMessageType[]> {
    const docs = await ContactMessageModel.find().sort({ createdAt: -1 });
    return docs.map((doc: any) => {
      const company = doc.company ?? null;
      const budget = doc.budget ?? null;
      return {
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        company: company as string | null,
        projectType: doc.projectType,
        budget: budget as string | null,
        message: doc.message,
        createdAt: doc.createdAt,
      };
    });
  }

  async getInvoices(): Promise<Invoice[]> {
    return this.memStorage.getInvoices();
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    return this.memStorage.createInvoice(invoice);
  }

  async getQuotes(): Promise<Quote[]> {
    return this.memStorage.getQuotes();
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    return this.memStorage.createQuote(quote);
  }
}

const memStorage = new MemStorage();
const mongoStorage = new MongoStorage();

export const storage: IStorage = {
  getUser: (id) => isConnected() ? mongoStorage.getUser(id) : memStorage.getUser(id),
  getUserByUsername: (username) => isConnected() ? mongoStorage.getUserByUsername(username) : memStorage.getUserByUsername(username),
  createUser: (user) => isConnected() ? mongoStorage.createUser(user) : memStorage.createUser(user),
  createContactMessage: (message) => isConnected() ? mongoStorage.createContactMessage(message) : memStorage.createContactMessage(message),
  getContactMessages: () => isConnected() ? mongoStorage.getContactMessages() : memStorage.getContactMessages(),
  getInvoices: () => isConnected() ? mongoStorage.getInvoices() : memStorage.getInvoices(),
  createInvoice: (invoice) => isConnected() ? mongoStorage.createInvoice(invoice) : memStorage.createInvoice(invoice),
  getQuotes: () => isConnected() ? mongoStorage.getQuotes() : memStorage.getQuotes(),
  createQuote: (quote) => isConnected() ? mongoStorage.createQuote(quote) : memStorage.createQuote(quote),
};
