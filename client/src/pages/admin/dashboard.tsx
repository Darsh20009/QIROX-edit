import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Users, Package, ShoppingCart, CreditCard, Shield, Globe, Activity, Rocket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { RuntimeHealth } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const chartData = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 900 },
  { name: '23:59', value: 700 },
];

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: stats } = useQuery<{ totalDeployments: number, lastDeployment: any, health: RuntimeHealth }>({
    queryKey: ["/api/stats/overview"],
  });

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "admin" && user.role !== "system_admin"))) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return null;

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        <div>
          <h1 className="text-3xl font-bold mb-2">مرحباً، {user?.name}</h1>
          <p className="text-muted-foreground mb-8">ملخص أداء النظام</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">المواقع المدارة</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">8</div>
                <p className="text-xs text-muted-foreground mt-1"> QI-Powered Managed Sites</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">الربط الخارجي</CardTitle>
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">2</div>
                <p className="text-xs text-muted-foreground mt-1">External API Connectors</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">عمليات النشر</CardTitle>
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Rocket className="w-5 h-5 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{stats?.totalDeployments || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  آخر عملية: {stats?.lastDeployment?.version || "لا يوجد"}
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">صحة النظام</CardTitle>
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black capitalize">{stats?.health?.status || "Checking..."}</div>
                <p className="text-xs text-muted-foreground mt-1">CPU: {stats?.health?.cpuUsage || 0}% | RAM: {stats?.health?.memoryUsage || 0}%</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 rounded-[2rem] border-0 shadow-xl bg-background/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-black">أداء النظام (24 ساعة)</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.1)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 10}}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{backgroundColor: 'hsl(var(--background))', borderRadius: '12px', border: '1px solid hsl(var(--border))'}}
                      itemStyle={{color: 'hsl(var(--primary))'}}
                    />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-0 shadow-xl bg-background/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-black">توزيع المواقع</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 flex flex-col gap-6 justify-center h-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold opacity-70">Managed Sites</span>
                  <Badge variant="default">80%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full" style={{width: '80%'}} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold opacity-70">External API</span>
                  <Badge variant="secondary">15%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-full" style={{width: '15%'}} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold opacity-70">Headless</span>
                  <Badge variant="outline">5%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="border border-primary/20 h-full" style={{width: '5%'}} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-[2rem] border-0 shadow-xl bg-background/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-black">آخر العمليات</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {[
                    { id: 1004, customer: "أحمد محمد", amount: 1500, status: "مكتمل", type: "متجر إلكتروني" },
                    { id: 1003, customer: "سارة علي", amount: 750, status: "قيد التجهيز", type: "تجديد اشتراك" },
                    { id: 1002, customer: "خالد عبدالله", amount: 2200, status: "بانتظار التأكيد", type: "باقة مطاعم" }
                  ].map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 rounded-2xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary">
                          #{order.id.toString().slice(-2)}
                        </div>
                        <div>
                          <p className="font-black text-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-primary">{order.amount} ر.س</p>
                        <Badge variant="outline" className={`text-[10px] font-bold rounded-full border-0 ${order.status === "مكتمل" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-0 shadow-xl bg-background/50 backdrop-blur-sm">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-black">المستخدمين الجدد</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {[
                    { name: "فهد العتيبي", email: "fahad@example.com", time: "قبل ساعتين", role: "صاحب متجر" },
                    { name: "ليلى حسن", email: "laila@qirox.net", time: "قبل 5 ساعات", role: "مطعم" },
                    { name: "محمد إبراهيم", email: "m.ibra@gmail.com", time: "أمس", role: "مطور" }
                  ].map((user, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl hover:bg-primary/5 transition-all border border-transparent hover:border-primary/10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-black text-primary border-2 border-background shadow-sm">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-black">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.role}</p>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">{user.time}</p>
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
