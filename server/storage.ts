import { type User, type InsertUser, type ContactMessage as ContactMessageType, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";
import { ContactMessage as ContactMessageModel } from "./models/ContactMessage";
import { isConnected } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessageType>;
  getContactMessages(): Promise<ContactMessageType[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessageType>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
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
    return docs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      company: (doc.company as string | null) ?? null,
      projectType: doc.projectType,
      budget: (doc.budget as string | null) ?? null,
      message: doc.message,
      createdAt: doc.createdAt,
    }));
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
};
