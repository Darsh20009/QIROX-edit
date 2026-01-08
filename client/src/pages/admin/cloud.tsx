import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Server, Shield, Zap, Plus, ExternalLink, Code, Database, Settings, Copy, Check, Rocket, Activity } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Deployment, RuntimeHealth } from "@shared/schema";

export default function CloudManagement() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const { data: cloudStatus } = useQuery({
    queryKey: ["/api/cloud/tenant-status"],
  });

  const { data: deployments } = useQuery<Deployment[]>({ 
    queryKey: ["/api/deployments"] 
  });

  const { data: health } = useQuery<RuntimeHealth>({ 
    queryKey: ["/api/runtime-health"], 
    refetchInterval: 5000 
  });

  const { data: apiKeys } = useQuery<any[]>({ 
    queryKey: ["/api/keys"] 
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "تم النسخ!", description: `تم نسخ ${label} إلى الحافظة.` });
  };

  const updateExternalMode = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PATCH", "/api/cloud/external-mode", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cloud/tenant-status"] });
      toast({ title: "تم تحديث الإعدادات بنجاح" });
    },
  });

  const subdomains = [
    { id: 1, name: (cloudStatus as any)?.subdomain || "store1.qirox.online", type: "Storefront", status: "active", ssl: "valid", traffic: "1.2k" },
    { id: 2, name: "api.qirox.app", type: "Backend API", status: "active", ssl: "valid", traffic: "45k" },
  ];

  const externalDeployments = deployments?.filter(d => d.deployedBy === 'External CI/CD') || [];

  return (
    <div className="flex h-screen bg-background text-right">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8 flex-row-reverse">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">QIROX Cloud</h1>
            <p className="text-muted-foreground">إدارة النطاقات، المراقبة الخارجية، والتحكم في النشر (External Deploy)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              عرض الموقع
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة نطاق جديد
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse text-right">
              <CardTitle className="text-sm font-medium">Remote Status</CardTitle>
              <Activity className={`h-4 w-4 ${health?.status === 'healthy' ? 'text-green-500' : 'text-yellow-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{health?.status || "Waiting..."}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last Ping: {health?.lastCheck ? new Date(health.lastCheck).toLocaleTimeString() : 'N/A'}
              </p>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse text-right">
              <CardTitle className="text-sm font-medium">External Version</CardTitle>
              <Rocket className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{externalDeployments[0]?.version || "N/A"}</div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {externalDeployments[0]?.commitHash?.substring(0, 7) || 'No hash'}
              </p>
            </CardContent>
          </Card>
          <Card className="hover-elevate border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse text-right">
              <CardTitle className="text-sm font-medium">وضع الموقع</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(cloudStatus as any)?.siteMode === "managed" ? "Managed" : 
                 (cloudStatus as any)?.siteMode === "external" ? "External" : "Headless"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">تكوين النشر الحالي</p>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse text-right">
              <CardTitle className="text-sm font-medium">Uptime Guard</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground mt-1">Monitoring active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="text-lg flex items-center gap-2 justify-end">
                <span>External Tracking & SDK</span>
                <Settings className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="p-4 bg-muted rounded-lg space-y-4 text-right">
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <span className="text-sm font-semibold">Deployment Webhook URL</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(`${window.location.origin}/api/v1/external/deploy-event`, 'Webhook URL')}>
                      {copied === 'Webhook URL' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <code className="text-[10px] block bg-black text-green-500 p-2 rounded text-left overflow-x-auto">
                    {window.location.origin}/api/v1/external/deploy-event
                  </code>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <span className="text-sm font-semibold">SDK API Key</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(apiKeys?.[0]?.key || 'QX-API-KEY', 'API Key')}>
                      {copied === 'API Key' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <code className="text-[10px] block bg-black text-green-500 p-2 rounded text-left overflow-x-auto">
                    {apiKeys?.[0]?.key || 'QX-API-KEY-REQUIRED'}
                  </code>
                </div>
              </div>

              <div className="space-y-2 text-right">
                <h3 className="font-semibold text-sm">Example CI/CD Integration:</h3>
                <pre className="text-[9px] bg-black text-white p-3 rounded overflow-x-auto text-left">
{`curl -X POST \${WEBHOOK_URL} \\
  -H "X-API-Key: \${API_KEY}" \\
  -d '{
    "event": "build_success",
    "version": "v2.1.0",
    "health": { "status": "healthy", "cpuUsage": 12 }
  }'`}
                </pre>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <Button 
                  variant={(cloudStatus as any)?.siteMode === "managed" ? "default" : "outline"}
                  className="flex-col h-auto py-4 gap-2"
                  onClick={() => updateExternalMode.mutate({ siteMode: "managed" })}
                >
                  <Zap className="w-5 h-5" />
                  <div className="font-bold">Managed</div>
                </Button>
                <Button 
                  variant={(cloudStatus as any)?.siteMode === "external" ? "default" : "outline"}
                  className="flex-col h-auto py-4 gap-2"
                  onClick={() => updateExternalMode.mutate({ siteMode: "external" })}
                >
                  <Globe className="w-5 h-5" />
                  <div className="font-bold">External</div>
                </Button>
                <Button 
                  variant={(cloudStatus as any)?.siteMode === "headless" ? "default" : "outline"}
                  className="flex-col h-auto py-4 gap-2"
                  onClick={() => updateExternalMode.mutate({ siteMode: "headless" })}
                >
                  <Code className="w-5 h-5" />
                  <div className="font-bold">Headless</div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-right flex items-center gap-2 justify-end">
                <span>نطاقات العميل النشطة</span>
                <Globe className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full text-sm text-right">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                      <th className="p-3">النطاق</th>
                      <th className="p-3">النوع</th>
                      <th className="p-3">الحالة</th>
                      <th className="p-3">SSL</th>
                      <th className="p-3">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subdomains.map((sub) => (
                      <tr key={sub.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium text-primary">{sub.name}</td>
                        <td className="p-3">{sub.type}</td>
                        <td className="p-3">
                          <Badge variant={sub.status === "active" ? "default" : "secondary"}>
                            {sub.status === "active" ? "نشط" : "صيانة"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={sub.ssl === "valid" ? "outline" : "destructive"} className="gap-1">
                            <Shield className="w-3 h-3" />
                            {sub.ssl === "valid" ? "محمي" : "منتهي"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button size="sm" variant="ghost">إعدادات</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
