import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Mail, MessageSquare, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminNotificationsPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-right">إدارة التنبيهات</h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>تنبيهات النظام</span>
                <BellRing className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Switch defaultChecked />
                <Label>تنبيه عند تسجيل مستخدم جديد</Label>
              </div>
              <div className="flex items-center justify-between">
                <Switch defaultChecked />
                <Label>تنبيه عند طلب جديد</Label>
              </div>
              <div className="flex items-center justify-between">
                <Switch />
                <Label>تنبيه عند انخفاض المخزون</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>تنبيهات البريد</span>
                <Mail className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Switch defaultChecked />
                <Label>إرسال فواتير للعملاء</Label>
              </div>
              <div className="flex items-center justify-between">
                <Switch defaultChecked />
                <Label>نشرات بريدية أسبوعية</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>الرسائل القصيرة SMS</span>
                <MessageSquare className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-right">
              <p className="text-sm text-muted-foreground">خدمة SMS غير مفعلة حالياً. يرجى ربط مزود خدمة لتفعيل التنبيهات.</p>
              <Button variant="outline" className="w-full">ربط مزود خدمة</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
