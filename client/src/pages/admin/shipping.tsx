import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Truck, Package, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminShippingPage() {
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
        <h1 className="text-3xl font-bold mb-8">إدارة الشحن والتوصيل</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>شركات الشحن</span>
                <Truck className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Aramex", "SMSA", "DHL"].map((company) => (
                <div key={company} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">إعدادات</Button>
                    <div className="w-2 h-2 rounded-full bg-green-500 my-auto" />
                  </div>
                  <span className="font-medium">{company}</span>
                </div>
              ))}
              <Button className="w-full" variant="outline">إضافة شركة جديدة</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>مناطق التغطية</span>
                <MapPin className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-bold">25 ر.س</span>
                <span>الرياض</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-bold">35 ر.س</span>
                <span>جدة</span>
              </div>
              <Button className="w-full" variant="outline">إضافة منطقة</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
