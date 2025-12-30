import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequestJson, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Store {
  _id: string;
  name: string;
  owner?: string;
  status?: string;
}

export default function AdminStores() {
  const { toast } = useToast();
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreOwner, setNewStoreOwner] = useState("");

  const { data: stores = [], isLoading } = useQuery<Store[]>({
    queryKey: ["/api/admin/stores"],
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      return apiRequestJson<Store>("POST", "/api/admin/stores", {
        name: newStoreName,
        owner: newStoreOwner,
        status: "active",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stores"] });
      setNewStoreName("");
      setNewStoreOwner("");
      toast({ description: "تم إضافة المتجر بنجاح" });
    },
  });

  const activeCount = stores.filter(s => s.status === "active").length;

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة المتاجر</h1>
              <p className="text-muted-foreground">إدارة متاجر النظام</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المتاجر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-stores">{stores.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">متاجر نشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-active-stores">{activeCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">معطلة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600" data-testid="stat-inactive-stores">
                  {stores.length - activeCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-sales">N/A</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">إضافة متجر جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="اسم المتجر"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  data-testid="input-store-name"
                />
                <Input
                  placeholder="صاحب المتجر"
                  value={newStoreOwner}
                  onChange={(e) => setNewStoreOwner(e.target.value)}
                  data-testid="input-store-owner"
                />
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newStoreName}
                  data-testid="button-add-store"
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
                  <Input placeholder="ابحث عن متجر..." className="pr-10" data-testid="input-search-stores" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground">جاري التحميل...</p>
              ) : stores.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد متاجر</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-3 font-medium">اسم المتجر</th>
                        <th className="text-right p-3 font-medium">صاحب المتجر</th>
                        <th className="text-right p-3 font-medium">الحالة</th>
                        <th className="text-right p-3 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map((store) => (
                        <tr key={store._id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{store.name}</td>
                          <td className="p-3">{store.owner || "غير محدد"}</td>
                          <td className="p-3">
                            <Badge variant={store.status === "active" ? "default" : "secondary"}>
                              {store.status === "active" ? "نشط" : "معطل"}
                            </Badge>
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button size="icon" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
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
