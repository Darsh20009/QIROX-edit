import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

const stores = [
  { id: 1, name: "متجر الإلكترونيات", owner: "أحمد محمد", sales: "45,230 ر.س", products: 156, status: "نشط" },
  { id: 2, name: "متجر الملابس", owner: "فاطمة علي", sales: "28,900 ر.س", products: 203, status: "نشط" },
  { id: 3, name: "متجر الأثاث", owner: "محمود حسن", sales: "15,600 ر.س", products: 87, status: "معطل" },
  { id: 4, name: "متجر الأكسسوارات", owner: "سارة إبراهيم", sales: "32,450 ر.س", products: 312, status: "نشط" },
];

export default function AdminStores() {
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
            <Button data-testid="button-add-store">
              <Plus className="w-4 h-4 mr-2" />
              إضافة متجر
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المتاجر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">متاجر نشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">المنتجات الكلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,456</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">إجمالي المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 مليون ر.س</div>
              </CardContent>
            </Card>
          </div>

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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم المتجر</th>
                      <th className="text-right p-3 font-medium">صاحب المتجر</th>
                      <th className="text-right p-3 font-medium">المبيعات</th>
                      <th className="text-right p-3 font-medium">المنتجات</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stores.map((store) => (
                      <tr key={store.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{store.name}</td>
                        <td className="p-3">{store.owner}</td>
                        <td className="p-3">{store.sales}</td>
                        <td className="p-3">
                          <Badge variant="outline">{store.products} منتج</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={store.status === "نشط" ? "default" : "secondary"}>
                            {store.status}
                          </Badge>
                        </td>
                        <td className="p-3 flex gap-2">
                          <Button size="icon" variant="ghost" data-testid={`button-view-store-${store.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-edit-store-${store.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-store-${store.id}`}>
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
