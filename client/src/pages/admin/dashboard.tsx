import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Users, Package, ShoppingCart, CreditCard } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "admin" && user.role !== "system_admin"))) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return null;

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">مرحباً، {user?.name}</h1>
          <p className="text-muted-foreground mb-8">ملخص أداء النظام</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card data-testid="card-users">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
              </CardContent>
            </Card>

            <Card data-testid="card-products">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
                <Package className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">35 منتج جديد</p>
              </CardContent>
            </Card>

            <Card data-testid="card-orders">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">45 طلب قيد الإنجاز</p>
              </CardContent>
            </Card>

            <Card data-testid="card-revenue">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الإيرادات</CardTitle>
                <CreditCard className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125,430 ر.س</div>
                <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-primary/20 bg-primary/5 hover-elevate transition-all cursor-pointer" onClick={() => setLocation("/build/kanban")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-primary">QIROX Build</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">24</div>
                <p className="text-[10px] text-muted-foreground">مشاريع نشطة</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5 hover-elevate transition-all cursor-pointer" onClick={() => setLocation("/admin/support")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-primary">QIROX Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">12</div>
                <p className="text-[10px] text-muted-foreground">طلبات معلقة</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5 hover-elevate transition-all cursor-pointer" onClick={() => setLocation("/admin/cloud")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-primary">QIROX Cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">99.9%</div>
                <p className="text-[10px] text-muted-foreground">استقرار النظام</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5 hover-elevate transition-all cursor-pointer" onClick={() => setLocation("/admin/audit")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-primary">QIROX Ops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">156</div>
                <p className="text-[10px] text-muted-foreground">عملية مؤرشفة</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>آخر الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1004, customer: "أحمد محمد", amount: 1500, status: "مكتمل" },
                    { id: 1003, customer: "سارة علي", amount: 750, status: "قيد التجهيز" },
                    { id: 1002, customer: "خالد عبدالله", amount: 2200, status: "بانتظار التأكيد" }
                  ].map((order) => (
                    <div key={order.id} className="flex justify-between items-center pb-3 border-b last:border-0 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                      <div>
                        <p className="font-bold">طلب #{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-primary">{order.amount} ر.س</p>
                        <p className={`text-[10px] font-bold ${order.status === "مكتمل" ? "text-green-500" : "text-amber-500"}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>آخر المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "فهد العتيبي", email: "fahad@example.com", time: "قبل ساعتين" },
                    { name: "ليلى حسن", email: "laila@qirox.net", time: "قبل 5 ساعات" },
                    { name: "محمد إبراهيم", email: "m.ibra@gmail.com", time: "أمس" }
                  ].map((user, i) => (
                    <div key={i} className="flex justify-between items-center pb-3 border-b last:border-0 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <p className="text-[10px] font-medium text-muted-foreground">{user.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
