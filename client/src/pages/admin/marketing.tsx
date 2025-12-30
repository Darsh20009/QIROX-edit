import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Mail, Send, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminMarketingPage() {
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
        <h1 className="text-3xl font-bold mb-8">التسويق والحملات</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>حملة بريدية جديدة</span>
                <Mail className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="عنوان الرسالة" />
              </div>
              <div className="space-y-2">
                <Textarea placeholder="محتوى الرسالة التسويقية..." className="min-h-[200px]" />
              </div>
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                إرسال للجميع
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>سجل الحملات السابقة</span>
                <History className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border rounded-lg flex justify-between items-center">
                    <span className="text-sm text-green-600">مكتملة</span>
                    <div className="text-right">
                      <p className="font-medium">حملة تخفيضات الشتاء #{i}</p>
                      <p className="text-xs text-muted-foreground">تم الإرسال لـ {i * 150} مستخدم</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
