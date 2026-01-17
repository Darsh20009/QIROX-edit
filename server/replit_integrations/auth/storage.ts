import { users, type User, type UpsertUser } from "@shared/models/auth";
import { storage } from "../../storage";
import { eq } from "drizzle-orm";

// Interface for auth storage operations
// (IMPORTANT) These user operations are mandatory for Replit Auth.
export interface IAuthStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

class AuthStorage implements IAuthStorage {
  async getUser(id: string): Promise<User | undefined> {
    return await storage.getUser(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    return await storage.upsertUser(userData);
  }
}

export const authStorage = new AuthStorage();
