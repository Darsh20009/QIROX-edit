import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Trash2 } from "lucide-react";

const orders = [
  { id: "ORD-001", customer: "أحمد محمد", total: "2,500 ر.س", status: "مكتمل", date: "2024-12-28" },
  { id: "ORD-002", customer: "فاطمة علي", total: "1,200 ر.س", status: "قيد الإنجاز", date: "2024-12-29" },
  { id: "ORD-003", customer: "محمود حسن", total: "3,800 ر.س", status: "معلق", date: "2024-12-30" },
  { id: "ORD-004", customer: "سارة إبراهيم", total: "950 ر.س", status: "مكتمل", date: "2024-12-29" },
  { id: "ORD-005", customer: "علي عمر", total: "4,200 ر.س", status: "قيد الإنجاز", date: "2024-12-30" },
];

const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  "مكتمل": "default",
  "قيد الإنجاز": "secondary",
  "معلق": "destructive",
};

export default function AdminOrders() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
              <p className="text-muted-foreground">عرض وإدارة جميع الطلبات</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="ابحث عن طلب..." className="pr-10" data-testid="input-search-orders" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الطلب</th>
                      <th className="text-right p-3 font-medium">العميل</th>
                      <th className="text-right p-3 font-medium">المبلغ</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{order.id}</td>
                        <td className="p-3">{order.customer}</td>
                        <td className="p-3 font-medium">{order.total}</td>
                        <td className="p-3">
                          <Badge variant={statusColors[order.status] || "secondary"}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{order.date}</td>
                        <td className="p-3 flex gap-2">
                          <Button size="icon" variant="ghost" data-testid={`button-view-order-${order.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-order-${order.id}`}>
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
