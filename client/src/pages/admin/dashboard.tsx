import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Users, Package, ShoppingCart, CreditCard, Shield } from "lucide-react";

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">المستخدمين</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">1,234</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-bold">+12%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">المشاريع النشطة</CardTitle>
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-emerald-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">56</div>
                <p className="text-xs text-muted-foreground mt-1">12 مشروعاً جديداً هذا الأسبوع</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">الإيرادات</CardTitle>
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <CreditCard className="w-5 h-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">125,430 <span className="text-sm">ر.س</span></div>
                <p className="text-xs text-muted-foreground mt-1 text-emerald-500 font-bold">نمو مستقر</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "إعدادات النظام", icon: Shield, href: "/admin/settings", count: "آمن" },
              { label: "QIROX Core", icon: Users, href: "/admin/stores", count: "12" },
              { label: "QIROX Build", icon: Package, href: "/build/kanban", count: "24" },
              { label: "الطلبات", icon: ShoppingCart, href: "/admin/support", count: "12" },
              { label: "السحابة", icon: Globe, href: "/admin/cloud", count: "99.9%" },
              { label: "العمليات", icon: Activity, href: "/admin/audit", count: "156" }
            ].map((item, i) => (
              <Card key={i} className="border-primary/5 bg-primary/5 hover-elevate transition-all cursor-pointer group text-center" onClick={() => setLocation(item.href)}>
                <CardContent className="pt-6">
                  <div className="mx-auto w-10 h-10 rounded-xl bg-background flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{item.label}</p>
                  <p className="text-lg font-black text-primary">{item.count}</p>
                </CardContent>
              </Card>
            ))}
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
