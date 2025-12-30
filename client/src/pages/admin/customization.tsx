import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Layout, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminCustomizationPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-right">تخصيص المظهر والهوية</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>الألوان والقوالب</span>
                <Palette className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <div className="grid grid-cols-4 gap-2">
                {["#3b82f6", "#10b981", "#ef4444", "#f59e0b"].map((color) => (
                  <div key={color} className="h-10 rounded-md border cursor-pointer" style={{ backgroundColor: color }} />
                ))}
              </div>
              <Label>اللون الأساسي للنظام</Label>
              <Input type="color" defaultValue="#3b82f6" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>الخطوط والنصوص</span>
                <Type className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <Label>خط العناوين</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Tajawal</option>
                <option>Cairo</option>
                <option>Almarai</option>
              </select>
              <Label>حجم الخط الافتراضي</Label>
              <Input type="number" defaultValue="16" />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>تخطيط الصفحات</span>
                <Layout className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center cursor-pointer hover:border-primary">
                  <div className="h-20 bg-muted mb-2 rounded" />
                  <p className="text-sm">تخطيط عريض</p>
                </div>
                <div className="p-4 border rounded-lg text-center cursor-pointer border-primary bg-primary/5">
                  <div className="h-20 bg-muted mb-2 rounded" />
                  <p className="text-sm font-bold">تخطيط صندوقي</p>
                </div>
                <div className="p-4 border rounded-lg text-center cursor-pointer hover:border-primary">
                  <div className="h-20 bg-muted mb-2 rounded" />
                  <p className="text-sm">تخطيط جانبي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
