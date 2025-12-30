import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { FileSpreadsheet, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminInvoicesPage() {
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
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              تصدير الكل
            </Button>
          </div>
          <h1 className="text-3xl font-bold">الفواتير والمطالبات</h1>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="p-4 text-right">رقم الفاتورة</th>
                    <th className="p-4 text-right">العميل</th>
                    <th className="p-4 text-right">التاريخ</th>
                    <th className="p-4 text-right">المبلغ</th>
                    <th className="p-4 text-right">الحالة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono">INV-2024-00{i}</td>
                      <td className="p-4">شركة التجارة الحديثة</td>
                      <td className="p-4 text-muted-foreground">2024-12-30</td>
                      <td className="p-4 font-bold">{i * 1250} ر.س</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">مدفوعة</span>
                      </td>
                      <td className="p-4 text-center">
                        <Button variant="ghost" size="sm">عرض</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
