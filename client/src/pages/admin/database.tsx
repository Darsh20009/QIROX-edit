import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Database, HardDrive, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDatabasePage() {
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
        <h1 className="text-3xl font-bold mb-8 text-right">إدارة قاعدة البيانات</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>حالة التخزين</span>
                <HardDrive className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-bold">156 MB / 512 MB</span>
                <span className="text-sm text-muted-foreground">مساحة البيانات</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[30%]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>العمليات المجدولة</span>
                <RefreshCcw className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <p className="text-sm">آخر نسخة احتياطية: اليوم 03:00 ص</p>
              <Button className="w-full">بدء نسخة احتياطية الآن</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>الجداول والمجموعات</span>
                <Database className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Users", "Orders", "Products", "Stores", "Subscriptions"].map((table) => (
                  <div key={table} className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg transition-colors border-b last:border-0">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">تحليل</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">إفراغ</Button>
                    </div>
                    <span className="font-medium">{table}</span>
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
