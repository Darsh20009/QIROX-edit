import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequestJson, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  _id: string;
  planType: string;
  billingCycle: string;
  price: number;
  status: string;
  endDate: string;
  userId?: string;
}

export default function AdminSubscriptions() {
  const { toast } = useToast();
  const [newPlan, setNewPlan] = useState("stores");
  const [newCycle, setNewCycle] = useState("monthly");
  const [newPrice, setNewPrice] = useState("");

  const { data: subscriptions = [], isLoading } = useQuery<Subscription[]>({
    queryKey: ["/api/admin/subscriptions"],
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      return apiRequestJson<Subscription>("POST", "/api/admin/subscriptions", {
        plan: newPlan,
        billing_cycle: newCycle,
        price: parseFloat(newPrice),
        status: "active",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscriptions"] });
      setNewPrice("");
      toast({ description: "تم إضافة الاشتراك بنجاح" });
    },
  });

  const activeCount = subscriptions.filter(s => s.status === "active").length;
  const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.price || 0), 0);

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
                <div className="text-2xl font-bold" data-testid="stat-total-subs">{subscriptions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">نشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-active-subs">{activeCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">منتهية الصلاحية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600" data-testid="stat-expired-subs">
                  {subscriptions.length - activeCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">الإيرادات الكلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-revenue">{totalRevenue.toLocaleString()} ر.س</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">إضافة اشتراك جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  data-testid="select-plan-type"
                >
                  <option value="stores">متاجر</option>
                  <option value="restaurants">مطاعم</option>
                  <option value="education">تعليم</option>
                </select>
                <select
                  value={newCycle}
                  onChange={(e) => setNewCycle(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  data-testid="select-billing-cycle"
                >
                  <option value="monthly">شهري</option>
                  <option value="6months">6 أشهر</option>
                  <option value="yearly">سنوي</option>
                </select>
                <Input
                  type="number"
                  placeholder="السعر"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  data-testid="input-subscription-price"
                />
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newPrice}
                  data-testid="button-add-subscription"
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
                  <Input placeholder="ابحث عن اشتراك..." className="pr-10" data-testid="input-search-subs" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground">جاري التحميل...</p>
              ) : subscriptions.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد اشتراكات</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-3 font-medium">رقم الاشتراك</th>
                        <th className="text-right p-3 font-medium">الخطة</th>
                        <th className="text-right p-3 font-medium">الدورة</th>
                        <th className="text-right p-3 font-medium">السعر</th>
                        <th className="text-right p-3 font-medium">الحالة</th>
                        <th className="text-right p-3 font-medium">انتهاء</th>
                        <th className="text-right p-3 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub, idx) => (
                        <tr key={sub._id} className="border-b hover:bg-muted/50">
                          <td className="p-3">SUB-{(idx + 1).toString().padStart(3, "0")}</td>
                          <td className="p-3">{sub.planType}</td>
                          <td className="p-3">{sub.billingCycle}</td>
                          <td className="p-3">{sub.price} ر.س</td>
                          <td className="p-3">
                            <Badge variant={sub.status === "active" ? "default" : "secondary"}>
                              {sub.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {new Date(sub.endDate).toLocaleDateString("ar-SA")}
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button size="icon" variant="ghost">
                              <Edit className="w-4 h-4" />
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
