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

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export default function AdminProducts() {
  const { toast } = useToast();
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      return apiRequestJson<Product>("POST", "/api/admin/products", {
        name: newProductName,
        category: newProductCategory,
        price: parseFloat(newProductPrice),
        stock: 0,
        status: "active",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      setNewProductName("");
      setNewProductCategory("");
      setNewProductPrice("");
      toast({ description: "تم إضافة المنتج بنجاح" });
    },
  });

  const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    active: "default",
    inactive: "secondary",
    out_of_stock: "destructive",
    draft: "outline",
  };

  const statusLabels: Record<string, string> = {
    active: "نشط",
    inactive: "غير نشط",
    out_of_stock: "نفذ من المخزون",
    draft: "مسودة",
  };

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
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">إضافة منتج جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="اسم المنتج"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  data-testid="input-product-name"
                />
                <Input
                  placeholder="الفئة"
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  data-testid="input-product-category"
                />
                <Input
                  type="number"
                  placeholder="السعر"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  data-testid="input-product-price"
                />
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newProductName || !newProductPrice}
                  data-testid="button-add-product"
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
                  <Input placeholder="ابحث عن منتج..." className="pr-10" data-testid="input-search-products" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground">جاري التحميل...</p>
              ) : products.length === 0 ? (
                <p className="text-center text-muted-foreground">لا توجد منتجات</p>
              ) : (
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
                          <td className="p-3">{product.price} ر.س</td>
                          <td className="p-3">
                            <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                              {product.stock} وحدة
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={statusColors[product.status] || "secondary"}>
                              {statusLabels[product.status] || product.status}
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
