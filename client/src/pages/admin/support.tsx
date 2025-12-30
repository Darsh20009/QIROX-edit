import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { HelpCircle, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSupportPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-right">الدعم الفني والرسائل</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>التذاكر المفتوحة</span>
                <HelpCircle className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-xl hover:border-primary/50 transition-colors text-right">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">قيد الانتظار</span>
                      <h3 className="font-bold text-lg">مشكلة في تسجيل الدخول #{100 + i}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">أواجه صعوبة في الدخول إلى لوحة التحكم الخاصة بمتجري منذ الصباح...</p>
                    <div className="flex justify-between items-center">
                      <Button size="sm">رد الآن</Button>
                      <span className="text-xs text-muted-foreground">منذ {i * 2} ساعة</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-end">
                  <span>إحصائيات الدعم</span>
                  <MessageSquare className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-right">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-bold">12</span>
                  <span>متوسط وقت الرد (ساعة)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-bold">94%</span>
                  <span>نسبة رضا العملاء</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-end">
                  <span>الاتصال المباشر</span>
                  <Phone className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-right">
                <p className="text-sm">مركز المساعدة يعمل حالياً بكفاءة عالية</p>
                <Button variant="outline" className="w-full">فتح المحادثة الفورية</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
