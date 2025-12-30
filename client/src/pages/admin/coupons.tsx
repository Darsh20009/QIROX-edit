import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Tags, Percent, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminCouponsPage() {
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
        <div className="flex justify-between items-center mb-8">
          <Button className="gap-2">إنشاء كود جديد</Button>
          <h1 className="text-3xl font-bold">إدارة الكوبونات والخصومات</h1>
        </div>
        
        <div className="space-y-4">
          {[
            { code: "WELCOME20", discount: "20%", expiry: "2025-01-01", usage: 45 },
            { code: "QIROX50", discount: "50 ر.س", expiry: "2024-12-31", usage: 120 },
          ].map((coupon) => (
            <Card key={coupon.code}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm">تعديل</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">حذف</Button>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">استخدام</p>
                    <p className="font-bold">{coupon.usage}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">ينتهي في</p>
                    <p className="font-medium">{coupon.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{coupon.code}</p>
                    <p className="text-sm text-muted-foreground">خصم بقيمة {coupon.discount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
