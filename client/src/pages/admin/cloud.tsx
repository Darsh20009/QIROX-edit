import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Server, Shield, Zap, Plus, ExternalLink, Code, Database, Settings } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function CloudManagement() {
  const { toast } = useToast();
  const { data: cloudStatus } = useQuery({
    queryKey: ["/api/cloud/tenant-status"],
  });

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

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <div className="flex justify-between items-center mb-8 flex-row-reverse">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">QIROX Cloud</h1>
            <p className="text-muted-foreground">إدارة النطاقات الفرعية، شهادات SSL، والتحكم الخارجي (External Mode)</p>
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
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse">
              <CardTitle className="text-sm font-medium">إجمالي النطاقات</CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">3 نطاقات جديدة هذا الشهر</p>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse">
              <CardTitle className="text-sm font-medium">حالة الخوادم</CardTitle>
              <Server className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">مستقر</div>
              <p className="text-xs text-muted-foreground mt-1">جميع العقد تعمل بكفاءة</p>
            </CardContent>
          </Card>
          <Card className="hover-elevate border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse">
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
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 flex-row-reverse">
              <CardTitle className="text-sm font-medium">الحماية (DDoS)</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">نشط</div>
              <p className="text-xs text-muted-foreground mt-1">تم صد 32 محاولة اختراق اليوم</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="text-lg flex items-center gap-2 justify-end">
                <span>Site Mode Configuration</span>
                <Settings className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Button 
                    variant={(cloudStatus as any)?.siteMode === "managed" ? "default" : "outline"}
                    className="flex-col h-auto py-4 gap-2"
                    onClick={() => updateExternalMode.mutate({ siteMode: "managed" })}
                  >
                    <Zap className="w-5 h-5" />
                    <div className="font-bold">Managed</div>
                    <div className="text-[10px] opacity-70">استضافة QIROX</div>
                  </Button>
                  <Button 
                    variant={(cloudStatus as any)?.siteMode === "external" ? "default" : "outline"}
                    className="flex-col h-auto py-4 gap-2"
                    onClick={() => updateExternalMode.mutate({ siteMode: "external" })}
                  >
                    <Globe className="w-5 h-5" />
                    <div className="font-bold">External</div>
                    <div className="text-[10px] opacity-70">استضافة خاصة</div>
                  </Button>
                  <Button 
                    variant={(cloudStatus as any)?.siteMode === "headless" ? "default" : "outline"}
                    className="flex-col h-auto py-4 gap-2"
                    onClick={() => updateExternalMode.mutate({ siteMode: "headless" })}
                  >
                    <Code className="w-5 h-5" />
                    <div className="font-bold">Headless</div>
                    <div className="text-[10px] opacity-70">API فقط</div>
                  </Button>
                </div>

                {(cloudStatus as any)?.siteMode === "external" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2 justify-end">
                        رابط المستودع (GitHub/GitLab)
                        <Code className="w-4 h-4" />
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded-md border bg-background text-right" 
                        placeholder="https://github.com/..."
                        defaultValue={(cloudStatus as any)?.externalRepoUrl}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2 justify-end">
                        النطاق الخاص (Custom Domain)
                        <Globe className="w-4 h-4" />
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded-md border bg-background text-right" 
                        placeholder="www.yourdomain.com"
                        defaultValue={(cloudStatus as any)?.externalDomain}
                      />
                    </div>
                  </div>
                )}

                {(cloudStatus as any)?.siteMode === "headless" && (
                  <div className="p-4 rounded-lg bg-muted/50 text-right animate-in fade-in slide-in-from-top-2">
                    <h3 className="font-bold mb-2 flex items-center gap-2 justify-end">
                      Headless API Access
                      <Database className="w-4 h-4" />
                    </h3>
                    <code className="block p-2 bg-background rounded border text-left text-xs">
                      GET https://api.qirox.online/v1/{(cloudStatus as any)?.slug}
                    </code>
                    <p className="text-xs text-muted-foreground mt-2">
                      استخدم مفتاح الـ API الخاص بك للوصول إلى البيانات بشكل مباشر
                    </p>
                  </div>
                )}

                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-right">
                  <h4 className="font-bold flex items-center gap-2 justify-end mb-1">
                    إشعار الأنماط
                    <Shield className="w-4 h-4" />
                  </h4>
                  <p className="text-sm">
                    {(cloudStatus as any)?.siteMode === "managed" && "في هذا الوضع، تتكفل QIROX بكامل عمليات النشر والتحديث تلقائياً."}
                    {(cloudStatus as any)?.siteMode === "external" && "أنت تملك الكود والدومين وتتحكم في الاستضافة، مع بقاء ذكاء QIROX معك."}
                    {(cloudStatus as any)?.siteMode === "headless" && "سيعمل النظام كقاعدة بيانات وذكاء اصطناعي خلفي فقط لتطبيقك الخاص."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-right">النطاقات النشطة</CardTitle>
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
                      <th className="p-3">الترافيك</th>
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
                        <td className="p-3 flex items-center gap-1 justify-end">
                          <Zap className="w-3 h-3 text-amber-500" />
                          {sub.traffic}
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
