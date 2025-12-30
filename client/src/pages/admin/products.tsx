import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const products = [
  { id: 1, name: "منتج أول", category: "إلكترونيات", price: "499 ر.س", stock: 45, status: "نشط" },
  { id: 2, name: "منتج ثاني", category: "ملابس", price: "199 ر.س", stock: 120, status: "نشط" },
  { id: 3, name: "منتج ثالث", category: "إكسسوارات", price: "89 ر.س", stock: 0, status: "معطل" },
  { id: 4, name: "منتج رابع", category: "إلكترونيات", price: "899 ر.س", stock: 23, status: "نشط" },
  { id: 5, name: "منتج خامس", category: "ملابس", price: "249 ر.س", stock: 67, status: "نشط" },
];

export default function AdminProducts() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
              <p className="text-muted-foreground">إدارة كل المنتجات والمخزون</p>
            </div>
            <Button data-testid="button-add-product">
              <Plus className="w-4 h-4 mr-2" />
              إضافة منتج
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="ابحث عن منتج..." className="pr-10" data-testid="input-search-products" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم المنتج</th>
                      <th className="text-right p-3 font-medium">الفئة</th>
                      <th className="text-right p-3 font-medium">السعر</th>
                      <th className="text-right p-3 font-medium">المخزون</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3 text-muted-foreground">{product.category}</td>
                        <td className="p-3">{product.price}</td>
                        <td className="p-3">
                          <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                            {product.stock} وحدة
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={product.status === "نشط" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-3 flex gap-2">
                          <Button size="icon" variant="ghost" data-testid={`button-edit-product-${product.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-product-${product.id}`}>
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
