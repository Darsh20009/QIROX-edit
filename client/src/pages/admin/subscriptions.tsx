import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2 } from "lucide-react";

const subscriptions = [
  { id: "SUB-001", user: "أحمد محمد", plan: "متاجر", cycle: "سنوي", status: "نشط", price: "599 ر.س", endDate: "2025-12-30" },
  { id: "SUB-002", user: "فاطمة علي", plan: "تعليم", cycle: "شهري", status: "نشط", price: "99 ر.س", endDate: "2025-01-30" },
  { id: "SUB-003", user: "محمود حسن", plan: "مطاعم", cycle: "شهري", status: "منتهي", price: "149 ر.س", endDate: "2024-12-15" },
  { id: "SUB-004", user: "سارة إبراهيم", plan: "متاجر", cycle: "سنوي", status: "نشط", price: "599 ر.س", endDate: "2025-12-25" },
];

export default function AdminSubscriptions() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة الاشتراكات</h1>
              <p className="text-muted-foreground">إدارة اشتراكات المستخدمين والخطط</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي الاشتراكات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">نشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">منتهية الصلاحية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">29</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">الإيرادات الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,230 ر.س</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="ابحث عن اشتراك..." className="pr-10" data-testid="input-search-subs" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الاشتراك</th>
                      <th className="text-right p-3 font-medium">المستخدم</th>
                      <th className="text-right p-3 font-medium">الخطة</th>
                      <th className="text-right p-3 font-medium">الدورة</th>
                      <th className="text-right p-3 font-medium">السعر</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">انتهاء</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{sub.id}</td>
                        <td className="p-3">{sub.user}</td>
                        <td className="p-3">{sub.plan}</td>
                        <td className="p-3">{sub.cycle}</td>
                        <td className="p-3">{sub.price}</td>
                        <td className="p-3">
                          <Badge variant={sub.status === "نشط" ? "default" : "secondary"}>
                            {sub.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{sub.endDate}</td>
                        <td className="p-3 flex gap-2">
                          <Button size="icon" variant="ghost" data-testid={`button-edit-sub-${sub.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-sub-${sub.id}`}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
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
    </div>
  );
}
