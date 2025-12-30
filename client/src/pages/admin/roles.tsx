import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Users, UserPlus, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminRolesPage() {
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
        <h1 className="text-3xl font-bold mb-8">إدارة الأدوار والصلاحيات</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-end">
              <span>الأدوار المتوفرة</span>
              <ShieldAlert className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: "مدير نظام", count: 2, color: "bg-red-100 text-red-700" },
                { role: "مشرف محتوى", count: 5, color: "bg-blue-100 text-blue-700" },
                { role: "دعم فني", count: 8, color: "bg-green-100 text-green-700" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">تعديل</Button>
                    <span className="text-xs text-muted-foreground my-auto">{item.count} مستخدم</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.color}`}>{item.role}</span>
                </div>
              ))}
              <Button className="w-full mt-4" variant="outline">إضافة دور جديد</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
