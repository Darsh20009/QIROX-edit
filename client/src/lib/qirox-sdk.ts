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
    this.baseUrl = config.baseUrl || (typeof window !== 'undefined' ? window.location.origin : "https://qirox.online");
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

  async subscribeToEvents(callback: (event: any) => void) {
    const eventSource = new EventSource(`${this.baseUrl}/api/v1/events?apiKey=${this.apiKey}`);
    eventSource.onmessage = (e) => callback(JSON.parse(e.data));
    return () => eventSource.close();
  }

  async verifyWebhook(payload: string, signature: string, secret: string): Promise<boolean> {
    // Note: In a browser this is a stub. Real verification should happen on the external backend.
    return !!(payload && signature && secret);
  }
}
