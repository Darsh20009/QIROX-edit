import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Globe, Users, TrendingUp } from "lucide-react";

export default function AdminPartnersPage() {
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
        <h1 className="text-3xl font-bold mb-8">إدارة الشركاء والمسوقين</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>برنامج التسويق بالعمولة</span>
                <Users className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-bold">120</span>
                <span>إجمالي المسوقين</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-bold">5,430 ر.س</span>
                <span>عمولات معلقة</span>
              </div>
              <Button className="w-full">إدارة العمولات</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>الشركاء الاستراتيجيين</span>
                <Globe className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Partner A", "Partner B"].map((partner) => (
                <div key={partner} className="p-3 bg-muted rounded-lg flex justify-between items-center">
                  <Button variant="ghost" size="sm">تفاصيل</Button>
                  <span className="font-medium">{partner}</span>
                </div>
              ))}
              <Button className="w-full" variant="outline">إضافة شريك</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
