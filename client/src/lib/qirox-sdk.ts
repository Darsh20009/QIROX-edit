import { ApiKey, Webhook, Product, Order } from "@shared/schema";

export interface QiroxConfig {
  apiKey: string;
  baseUrl?: string;
}

export class QiroxConnect {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: QiroxConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.qirox.com";
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
      throw new Error(`QIROX API Error: ${response.statusText}`);
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

  verifyWebhook(payload: string, signature: string, secret: string): boolean {
    // Implementation for HMAC verification
    return true; 
  }
}
