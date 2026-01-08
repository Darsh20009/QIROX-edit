import axios, { AxiosInstance } from 'axios';

export interface SDKConfig {
  apiKey: string;
  baseUrl?: string;
  tenantId?: string;
}

export class QiroxConnect {
  private client: AxiosInstance;
  public auth: AuthModule;
  public data: DataModule;
  public events: EventsModule;

  constructor(config: SDKConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://api.qirox.online',
      headers: {
        'X-API-Key': config.apiKey,
        'Content-Type': 'application/json'
      }
    });

    this.auth = new AuthModule(this.client);
    this.data = new DataModule(this.client);
    this.events = new EventsModule(this.client);
    this.ui = new UIModule(this.client);
  }
  public ui: UIModule;
}

class AuthModule {
  constructor(private client: AxiosInstance) {}
  async validate() {
    const res = await this.client.post('/api/v1/test-connection');
    return res.data;
  }
}

class DataModule {
  constructor(private client: AxiosInstance) {}
  async getTenantInfo() {
    const res = await this.client.get('/api/cloud/tenant-status');
    return res.data;
  }
}

class UIModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Returns a configuration object for a health status widget
   */
  async getHealthWidgetConfig() {
    const res = await this.client.get('/api/runtime-health');
    return {
      type: 'status-indicator',
      data: res.data,
      theme: {
        healthy: 'text-green-500',
        warning: 'text-yellow-500',
        critical: 'text-red-500'
      }
    };
  }
}

class EventsModule {
  constructor(private client: AxiosInstance) {}
  
  async reportDeploy(data: { event: string; version: string; commitHash?: string; health?: any }) {
    const res = await this.client.post('/api/v1/external/deploy-event', data);
    return res.data;
  }

  async reportHealth(health: { status: string; cpuUsage?: number; memoryUsage?: number }) {
    const res = await this.client.post('/api/v1/external/health', health);
    return res.data;
  }
}

export interface UIWidgetConfig {
  type: string;
  data: any;
  theme: Record<string, string>;
}
