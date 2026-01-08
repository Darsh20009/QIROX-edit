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
  }
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
