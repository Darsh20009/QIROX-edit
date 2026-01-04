import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Server, Shield, Zap, Plus } from "lucide-react";

export default function CloudManagement() {
  const subdomains = [
    { id: 1, name: "store1.qirox.app", type: "Storefront", status: "active", ssl: "valid", traffic: "1.2k" },
    { id: 2, name: "api.qirox.app", type: "Backend API", status: "active", ssl: "valid", traffic: "45k" },
    { id: 3, name: "staging.qirox.app", type: "Staging", status: "maintenance", ssl: "expiring", traffic: "0.1k" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <div className="flex justify-between items-center mb-8 flex-row-reverse">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">QIROX Cloud</h1>
            <p className="text-muted-foreground">إدارة النطاقات الفرعية، شهادات SSL، وتوزيع الأحمال</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة نطاق جديد
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
  );
}
