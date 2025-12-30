import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">التحليلات</h1>
            <p className="text-muted-foreground mb-8">إحصائيات النمو والأداء</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-green-600">+45% العام الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-green-600">+32% العام الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">متوسط القيمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892 ر.س</div>
                <p className="text-xs text-green-600">+12% العام الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">معدل الرضا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs">من 2,340 تقييم</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card data-testid="card-revenue-chart">
              <CardHeader>
                <CardTitle>الإيرادات والطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="الإيرادات" />
                    <Line type="monotone" dataKey="orders" stroke="#10b981" name="الطلبات" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card data-testid="card-users-chart">
              <CardHeader>
                <CardTitle>نمو المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" name="المستخدمين" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
