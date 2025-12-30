import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "أحمد محمد", email: "ahmed@example.com", role: "admin", status: "نشط" },
  { id: 2, name: "فاطمة علي", email: "fatima@example.com", role: "موظف", status: "نشط" },
  { id: 3, name: "محمود حسن", email: "mahmoud@example.com", role: "عميل", status: "معطل" },
  { id: 4, name: "سارة إبراهيم", email: "sara@example.com", role: "موظف", status: "نشط" },
  { id: 5, name: "علي عمر", email: "ali@example.com", role: "عميل", status: "نشط" },
];

export default function AdminUsers() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
              <p className="text-muted-foreground">إدارة جميع مستخدمي النظام</p>
            </div>
            <Button data-testid="button-add-user">
              <Plus className="w-4 h-4 mr-2" />
              إضافة مستخدم
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="ابحث عن مستخدم..." className="pr-10" data-testid="input-search-users" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">الاسم</th>
                      <th className="text-right p-3 font-medium">البريد الإلكتروني</th>
                      <th className="text-right p-3 font-medium">الدور</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3 text-muted-foreground">{user.email}</td>
                        <td className="p-3">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={user.status === "نشط" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-3 flex gap-2">
                          <Button size="icon" variant="ghost" data-testid={`button-edit-user-${user.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-user-${user.id}`}>
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
