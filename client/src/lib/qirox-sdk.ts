import type { products, orders } from "@shared/schema";

export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;

export interface QiroxConfig {
  apiKey: string;
  baseUrl?: string;
}

export class QiroxConnect {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: QiroxConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:5000");
  }

  private async request(path: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        "X-API-Key": this.apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`QIROX API Error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  async getProducts(): Promise<Product[]> {
    return this.request("/api/v1/products");
  }

  async createOrder(order: any): Promise<Order> {
    return this.request("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }

  async verifyWebhook(payload: string, signature: string, secret: string): Promise<boolean> {
    return !!(payload && signature && secret);
  }
}
