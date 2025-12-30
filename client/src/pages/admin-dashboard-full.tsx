import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AdminStats {
  users?: any[];
  subscriptions?: any[];
}

export default function AdminDashboardFull() {
  const { user } = useAuth();

  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: users = {} } = useQuery<{ users: any[] }>({
    queryKey: ["/api/admin/users"],
  });

  const { data: subscriptions = {} } = useQuery<{ subscriptions: any[] }>({
    queryKey: ["/api/admin/subscriptions"],
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">غير مصرح</h1>
        <p className="text-gray-500">يجب أن تكون مسؤول للدخول</p>
      </div>
    );
  }

  const chartData = [
    { name: "يناير", users: 40, revenue: 2400 },
    { name: "فبراير", users: 50, revenue: 2210 },
    { name: "مارس", users: 30, revenue: 2290 },
    { name: "أبريل", users: 60, revenue: 2000 },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">لوحة التحكم الإدارية</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">إجمالي المستخدمين</h3>
            <p className="text-3xl font-bold mt-2">{(users as any)?.users?.length || 0}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">الاشتراكات النشطة</h3>
            <p className="text-3xl font-bold mt-2">{(subscriptions as any)?.subscriptions?.length || 0}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">الإيرادات الشهرية</h3>
            <p className="text-3xl font-bold mt-2">50,000 ر.س</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">معدل النمو</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">+15%</p>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">الإحصائيات الشهرية</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" name="المستخدمين" />
              <Bar dataKey="revenue" fill="#10b981" name="الإيرادات" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Users Table */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">المستخدمين</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-2">الاسم</th>
                  <th className="text-right p-2">البريد الإلكتروني</th>
                  <th className="text-right p-2">الدور</th>
                  <th className="text-right p-2">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {(users as any)?.users?.slice(0, 5).map((u: any) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">تفاصيل</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
