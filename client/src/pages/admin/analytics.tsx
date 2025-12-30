import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const chartData = [
  { month: "يناير", users: 120, revenue: 24000, orders: 45 },
  { month: "فبراير", users: 150, revenue: 28000, orders: 52 },
  { month: "مارس", users: 180, revenue: 32000, orders: 61 },
  { month: "أبريل", users: 200, revenue: 38000, orders: 75 },
  { month: "مايو", users: 250, revenue: 45000, orders: 89 },
  { month: "يونيو", users: 310, revenue: 52000, orders: 102 },
];

export default function AdminAnalytics() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">تحليلات الأداء والنمو</h1>
          <p className="text-muted-foreground">مراقبة المؤشرات الحيوية للنظام بشكل مباشر</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "إجمالي المبيعات", value: "152,430 ر.س", icon: DollarSign, trend: "+12.5%", positive: true },
            { label: "المستخدمين النشطين", value: "1,240", icon: Users, trend: "+5.2%", positive: true },
            { label: "الطلبات الجديدة", value: "85", icon: ShoppingCart, trend: "-2.1%", positive: false },
            { label: "معدل التحويل", value: "3.2%", icon: TrendingUp, trend: "+0.8%", positive: true },
          ].map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs flex items-center gap-1 mt-1 ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                  {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  <span>{stat.trend} مقارنة بالشهر السابق</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات والنمو الشهري</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" name="الإيرادات" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>توزيع الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} name="الطلبات" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
