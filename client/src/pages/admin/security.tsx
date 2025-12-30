import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Shield, Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSecurityPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-right">إعدادات الأمان</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>جدار الحماية</span>
                <Shield className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <Button variant="outline" size="sm">تغيير</Button>
                <p className="text-sm font-medium">حالة جدار الحماية: نشط</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <Button variant="outline" size="sm">عرض</Button>
                <p className="text-sm font-medium">سجل المحاولات الفاشلة: 0 اليوم</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>التنبيهات الأمنية</span>
                <Bell className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <Button variant="outline" size="sm">تفعيل</Button>
                <p className="text-sm font-medium">تنبيهات البريد الإلكتروني</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <Button variant="outline" size="sm">تفعيل</Button>
                <p className="text-sm font-medium">تنبيهات الرسائل القصيرة</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>سياسة كلمة المرور</span>
                <Lock className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-right text-muted-foreground mb-4">تحديد القواعد المطلوبة لكلمات مرور المستخدمين</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md text-center">
                  <p className="font-bold">8 أحرف</p>
                  <p className="text-xs text-muted-foreground">الحد الأدنى</p>
                </div>
                <div className="p-4 border rounded-md text-center">
                  <p className="font-bold">أرقام ورموز</p>
                  <p className="text-xs text-muted-foreground">مطلوب</p>
                </div>
                <div className="p-4 border rounded-md text-center">
                  <p className="font-bold">تغيير دوري</p>
                  <p className="text-xs text-muted-foreground">كل 90 يوم</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
