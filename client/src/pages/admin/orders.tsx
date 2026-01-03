import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequestJson, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  total: number;
  status: string;
  order_date: string;
}

export default function AdminOrders() {
  const { toast } = useToast();
  const [newOrderNumber, setNewOrderNumber] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newTotal, setNewTotal] = useState("");

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      return apiRequestJson<Order>("POST", "/api/admin/orders", {
        order_number: newOrderNumber,
        customer_name: newCustomerName,
        total: parseFloat(newTotal),
        status: "pending",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      setNewOrderNumber("");
      setNewCustomerName("");
      setNewTotal("");
      toast({ description: "تم إضافة الطلب بنجاح" });
    },
  });

  const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "secondary",
    confirmed: "outline",
    preparing: "outline",
    ready: "outline",
    shipped: "outline",
    delivered: "default",
    cancelled: "destructive",
  };

  const statusLabels: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "تم التأكيد",
    preparing: "جاري التجهيز",
    ready: "جاهز للاستلام",
    shipped: "تم الشحن",
    delivered: "تم التوصيل",
    cancelled: "ملغي",
  };

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

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">إضافة طلب جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="رقم الطلب"
                  value={newOrderNumber}
                  onChange={(e) => setNewOrderNumber(e.target.value)}
                  data-testid="input-order-number"
                />
                <Input
                  placeholder="اسم العميل"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  data-testid="input-customer-name"
                />
                <Input
                  type="number"
                  placeholder="المبلغ"
                  value={newTotal}
                  onChange={(e) => setNewTotal(e.target.value)}
                  data-testid="input-order-total"
                />
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newOrderNumber || !newCustomerName || !newTotal}
                  data-testid="button-add-order"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة
                </Button>
              </div>
            </CardContent>
          </Card>

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
              {isLoading ? (
                <p className="text-center text-muted-foreground">جاري التحميل...</p>
              ) : orders.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد طلبات</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
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
                          <td className="p-3 font-medium">{order.order_number}</td>
                          <td className="p-3">{order.customer_name}</td>
                          <td className="p-3 font-medium">{order.total} ر.س</td>
                          <td className="p-3">
                            <Badge variant={statusColors[order.status] || "secondary"}>
                              {statusLabels[order.status] || order.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {new Date(order.order_date).toLocaleDateString("ar-SA")}
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button size="icon" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
