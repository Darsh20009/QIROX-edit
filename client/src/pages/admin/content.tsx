import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { FileText, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminContentPage() {
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة مقال جديد
          </Button>
          <h1 className="text-3xl font-bold">إدارة المحتوى (المدونة)</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-32 bg-muted flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground opacity-20" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">كيف تبدأ مشروعك الإلكتروني الناجح في 2024</h3>
                <p className="text-xs text-muted-foreground mb-4">تم النشر في: 2024-12-2{i}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Edit2 className="h-3 w-3" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive gap-1">
                    <Trash2 className="h-3 w-3" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
