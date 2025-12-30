import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Wrench, Settings2, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminMaintenancePage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return null;

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <h1 className="text-3xl font-bold mb-8">أدوات الصيانة والتشغيل</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>الصيانة المجدولة</span>
                <Wrench className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">لا توجد عمليات صيانة مجدولة حالياً.</p>
              <Button className="w-full" variant="outline">جدولة وقت صيانة</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>تحديثات النظام</span>
                <Settings2 className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                <span className="font-bold">v2.1.0</span>
                <span>الإصدار الحالي</span>
              </div>
              <Button className="w-full">التحقق من وجود تحديثات</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
