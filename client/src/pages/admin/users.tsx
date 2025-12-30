import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequestJson, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("employee");

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      return apiRequestJson<User>("POST", "/api/admin/users", {
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setNewUserName("");
      setNewUserEmail("");
      toast({ description: "تم إضافة المستخدم بنجاح" });
    },
  });

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
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">إضافة مستخدم جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="الاسم"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  data-testid="input-user-name"
                />
                <Input
                  placeholder="البريد الإلكتروني"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  data-testid="input-user-email"
                />
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  data-testid="select-user-role"
                >
                  <option value="admin">مدير</option>
                  <option value="employee">موظف</option>
                  <option value="customer">عميل</option>
                </select>
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newUserName || !newUserEmail}
                  data-testid="button-add-user"
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
                  <Input placeholder="ابحث عن مستخدم..." className="pr-10" data-testid="input-search-users" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground">جاري التحميل...</p>
              ) : users.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد مستخدمين</p>
              ) : (
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
                            <Badge variant={user.is_active ? "default" : "secondary"}>
                              {user.is_active ? "نشط" : "معطل"}
                            </Badge>
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
