import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { History, Activity, AlertCircle } from "lucide-react";

export default function AdminAuditPage() {
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
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-right">سجل النشاطات (Audit Logs)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-right">إجمالي العمليات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-right">1,240</div>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-right">تنبيهات أمنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-amber-500 text-right">12</div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-right">محاولات مرفوضة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-destructive text-right">3</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-end">
              <span>آخر العمليات</span>
              <History className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "تعديل إعدادات الموقع", user: "Admin", time: "قبل 10 دقائق", icon: Activity },
                { action: "حذف مستخدم تجريبي", user: "Admin", time: "قبل ساعة", icon: AlertCircle },
                { action: "تحديث خطة الاشتراك", user: "System", time: "قبل 3 ساعات", icon: Activity },
                { action: "إضافة متجر جديد", user: "Manager", time: "أمس", icon: Activity },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center p-3 border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <span className="text-sm text-muted-foreground">{log.time}</span>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">بواسطة: {log.user}</p>
                    </div>
                    <log.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
