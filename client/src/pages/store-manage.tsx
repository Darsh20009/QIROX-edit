import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequestJson } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Store, 
  ArrowLeft, 
  Loader2,
  Package,
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  Folder,
  BarChart3,
  DollarSign,
  Clock
} from "lucide-react";

interface StoreData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface ProductData {
  _id: string;
  name: string;
  nameEn?: string;
  description?: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  category?: string;
  images: string[];
  status: string;
  featured: boolean;
  createdAt: string;
}

interface CategoryData {
  _id: string;
  name: string;
  nameEn?: string;
  description?: string;
  order: number;
  isActive: boolean;
}

interface OrderData {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

interface StoreStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

const productFormSchema = z.object({
  name: z.string().min(2, "اسم المنتج مطلوب"),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "السعر يجب أن يكون رقم موجب"),
  comparePrice: z.coerce.number().min(0).optional(),
  quantity: z.coerce.number().min(0).default(0),
  category: z.string().optional(),
  status: z.enum(["active", "inactive", "out_of_stock"]).default("active"),
  featured: z.boolean().default(false),
});

const categoryFormSchema = z.object({
  name: z.string().min(2, "اسم الفئة مطلوب"),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  order: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

type ProductFormData = z.infer<typeof productFormSchema>;
type CategoryFormData = z.infer<typeof categoryFormSchema>;

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  out_of_stock: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  preparing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  ready: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  shipped: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  refunded: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const statusNames: Record<string, string> = {
  active: "نشط",
  inactive: "غير نشط",
  out_of_stock: "نفذ المخزون",
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  preparing: "جاري التحضير",
  ready: "جاهز",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
  paid: "مدفوع",
  failed: "فشل",
  refunded: "مسترد",
};

export default function StoreManage() {
  const { storeId } = useParams<{ storeId: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  const { data: storeData, isLoading: storeLoading } = useQuery<{ store: StoreData }>({
    queryKey: ["/api", "stores", storeId],
    enabled: !!user && !!storeId,
  });

  const { data: statsData, isLoading: statsLoading } = useQuery<{ stats: StoreStats }>({
    queryKey: ["/api", "stores", storeId, "stats"],
    enabled: !!user && !!storeId,
  });

  const { data: productsData, isLoading: productsLoading } = useQuery<{ products: ProductData[] }>({
    queryKey: ["/api", "stores", storeId, "products"],
    enabled: !!user && !!storeId,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<{ categories: CategoryData[] }>({
    queryKey: ["/api", "stores", storeId, "categories"],
    enabled: !!user && !!storeId,
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery<{ orders: OrderData[] }>({
    queryKey: ["/api", "stores", storeId, "orders"],
    enabled: !!user && !!storeId,
  });

  const productForm = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      nameEn: "",
      description: "",
      price: 0,
      comparePrice: undefined,
      quantity: 0,
      category: "",
      status: "active",
      featured: false,
    },
  });

  const categoryForm = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      nameEn: "",
      description: "",
      order: 0,
      isActive: true,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      return apiRequestJson("POST", `/api/stores/${storeId}/products`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "products"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "stats"] });
      setProductDialogOpen(false);
      productForm.reset();
      toast({ title: "تم بنجاح", description: "تم إضافة المنتج بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في إضافة المنتج",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ productId, data }: { productId: string; data: Partial<ProductFormData> }) => {
      return apiRequestJson("PATCH", `/api/stores/${storeId}/products/${productId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "products"] });
      setProductDialogOpen(false);
      setEditingProduct(null);
      productForm.reset();
      toast({ title: "تم بنجاح", description: "تم تحديث المنتج بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في تحديث المنتج",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      return apiRequestJson("DELETE", `/api/stores/${storeId}/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "products"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "stats"] });
      toast({ title: "تم بنجاح", description: "تم حذف المنتج بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في حذف المنتج",
        variant: "destructive",
      });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: CategoryFormData) => {
      return apiRequestJson("POST", `/api/stores/${storeId}/categories`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "stats"] });
      setCategoryDialogOpen(false);
      categoryForm.reset();
      toast({ title: "تم بنجاح", description: "تم إضافة الفئة بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في إضافة الفئة",
        variant: "destructive",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ categoryId, data }: { categoryId: string; data: Partial<CategoryFormData> }) => {
      return apiRequestJson("PATCH", `/api/stores/${storeId}/categories/${categoryId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "categories"] });
      setCategoryDialogOpen(false);
      setEditingCategory(null);
      categoryForm.reset();
      toast({ title: "تم بنجاح", description: "تم تحديث الفئة بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في تحديث الفئة",
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      return apiRequestJson("DELETE", `/api/stores/${storeId}/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "stats"] });
      toast({ title: "تم بنجاح", description: "تم حذف الفئة بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في حذف الفئة",
        variant: "destructive",
      });
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return apiRequestJson("PATCH", `/api/stores/${storeId}/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "stores", storeId, "stats"] });
      toast({ title: "تم بنجاح", description: "تم تحديث حالة الطلب بنجاح" });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في تحديث الحالة",
        variant: "destructive",
      });
    },
  });

  const handleProductSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProductMutation.mutate({ productId: editingProduct._id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleCategorySubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ categoryId: editingCategory._id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const openEditCategory = (category: CategoryData) => {
    setEditingCategory(category);
    categoryForm.reset({
      name: category.name,
      nameEn: category.nameEn || "",
      description: category.description || "",
      order: category.order,
      isActive: category.isActive,
    });
    setCategoryDialogOpen(true);
  };

  const openNewCategory = () => {
    setEditingCategory(null);
    categoryForm.reset();
    setCategoryDialogOpen(true);
  };

  const openEditProduct = (product: ProductData) => {
    setEditingProduct(product);
    productForm.reset({
      name: product.name,
      nameEn: product.nameEn || "",
      description: product.description || "",
      price: product.price,
      comparePrice: product.comparePrice,
      quantity: product.quantity,
      category: product.category || "",
      status: product.status as "active" | "inactive" | "out_of_stock",
      featured: product.featured,
    });
    setProductDialogOpen(true);
  };

  const openNewProduct = () => {
    setEditingProduct(null);
    productForm.reset();
    setProductDialogOpen(true);
  };

  if (authLoading || storeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || !storeData?.store) {
    return null;
  }

  const store = storeData.store;
  const stats = statsData?.stats;
  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];
  const orders = ordersData?.orders || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" data-testid="button-back-dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground" data-testid="text-store-name">{store.name}</h1>
              <p className="text-sm text-muted-foreground">/{store.slug}</p>
            </div>
          </div>
          <Badge className={statusColors[store.status] || ""}>
            {statusNames[store.status] || store.status}
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card data-testid="card-stat-products">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalProducts || 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-categories">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الفئات</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCategories || 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-orders">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
              {(stats?.pendingOrders || 0) > 0 && (
                <p className="text-xs text-muted-foreground">{stats?.pendingOrders} قيد الانتظار</p>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-stat-revenue">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalRevenue || 0} ريال</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products" data-testid="tab-products">
              <Package className="h-4 w-4 ml-2" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="categories" data-testid="tab-categories">
              <Folder className="h-4 w-4 ml-2" />
              الفئات
            </TabsTrigger>
            <TabsTrigger value="orders" data-testid="tab-orders">
              <ShoppingCart className="h-4 w-4 ml-2" />
              الطلبات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>المنتجات</CardTitle>
                  <CardDescription>إدارة منتجات متجرك</CardDescription>
                </div>
                <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewProduct} data-testid="button-add-product">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة منتج
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</DialogTitle>
                      <DialogDescription>
                        {editingProduct ? "قم بتعديل بيانات المنتج" : "أدخل بيانات المنتج الجديد"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={productForm.handleSubmit(handleProductSubmit)} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">اسم المنتج *</Label>
                          <Input
                            id="name"
                            {...productForm.register("name")}
                            placeholder="اسم المنتج"
                            data-testid="input-product-name"
                          />
                          {productForm.formState.errors.name && (
                            <p className="text-sm text-destructive">{productForm.formState.errors.name.message}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">السعر *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              {...productForm.register("price")}
                              placeholder="0.00"
                              data-testid="input-product-price"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="comparePrice">السعر قبل الخصم</Label>
                            <Input
                              id="comparePrice"
                              type="number"
                              step="0.01"
                              {...productForm.register("comparePrice")}
                              placeholder="0.00"
                              data-testid="input-product-compare-price"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="quantity">الكمية</Label>
                            <Input
                              id="quantity"
                              type="number"
                              {...productForm.register("quantity")}
                              placeholder="0"
                              data-testid="input-product-quantity"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">الحالة</Label>
                            <Select
                              value={productForm.watch("status")}
                              onValueChange={(value) => productForm.setValue("status", value as "active" | "inactive" | "out_of_stock")}
                            >
                              <SelectTrigger data-testid="select-product-status">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">نشط</SelectItem>
                                <SelectItem value="inactive">غير نشط</SelectItem>
                                <SelectItem value="out_of_stock">نفذ المخزون</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">الوصف</Label>
                          <Textarea
                            id="description"
                            {...productForm.register("description")}
                            placeholder="وصف المنتج"
                            data-testid="input-product-description"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setProductDialogOpen(false);
                            setEditingProduct(null);
                          }}
                        >
                          إلغاء
                        </Button>
                        <Button
                          type="submit"
                          disabled={createProductMutation.isPending || updateProductMutation.isPending}
                          data-testid="button-save-product"
                        >
                          {(createProductMutation.isPending || updateProductMutation.isPending) ? (
                            <>
                              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              جاري الحفظ...
                            </>
                          ) : editingProduct ? "تحديث" : "إضافة"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد منتجات حتى الآن</p>
                    <Button variant="ghost" className="mt-2" onClick={openNewProduct}>
                      أضف منتجك الأول
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg border"
                        data-testid={`product-item-${product._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.price} ريال • الكمية: {product.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[product.status] || ""}>
                            {statusNames[product.status] || product.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditProduct(product)}
                            data-testid={`button-edit-product-${product._id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProductMutation.mutate(product._id)}
                            disabled={deleteProductMutation.isPending}
                            data-testid={`button-delete-product-${product._id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>الفئات</CardTitle>
                  <CardDescription>تنظيم منتجاتك في فئات</CardDescription>
                </div>
                <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewCategory} data-testid="button-add-category">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة فئة
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}</DialogTitle>
                      <DialogDescription>
                        {editingCategory ? "قم بتعديل بيانات الفئة" : "أدخل بيانات الفئة الجديدة"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cat-name">اسم الفئة *</Label>
                        <Input
                          id="cat-name"
                          {...categoryForm.register("name")}
                          placeholder="اسم الفئة"
                          data-testid="input-category-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cat-description">الوصف</Label>
                        <Textarea
                          id="cat-description"
                          {...categoryForm.register("description")}
                          placeholder="وصف الفئة"
                          data-testid="input-category-description"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setCategoryDialogOpen(false);
                            setEditingCategory(null);
                          }}
                        >
                          إلغاء
                        </Button>
                        <Button
                          type="submit"
                          disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                          data-testid="button-save-category"
                        >
                          {(createCategoryMutation.isPending || updateCategoryMutation.isPending) ? (
                            <>
                              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              جاري الحفظ...
                            </>
                          ) : editingCategory ? "تحديث" : "إضافة"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {categoriesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد فئات حتى الآن</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div
                        key={category._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg border"
                        data-testid={`category-item-${category._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <Folder className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            {category.description && (
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={category.isActive ? statusColors.active : statusColors.inactive}>
                            {category.isActive ? "نشطة" : "غير نشطة"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditCategory(category)}
                            data-testid={`button-edit-category-${category._id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteCategoryMutation.mutate(category._id)}
                            disabled={deleteCategoryMutation.isPending}
                            data-testid={`button-delete-category-${category._id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>الطلبات</CardTitle>
                <CardDescription>إدارة طلبات العملاء</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد طلبات حتى الآن</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg border"
                        data-testid={`order-item-${order._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <ShoppingCart className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.customerName} • {order.total} ريال
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[order.paymentStatus] || ""}>
                            {statusNames[order.paymentStatus] || order.paymentStatus}
                          </Badge>
                          <Select
                            value={order.status}
                            onValueChange={(status) => 
                              updateOrderStatusMutation.mutate({ orderId: order._id, status })
                            }
                            disabled={updateOrderStatusMutation.isPending}
                          >
                            <SelectTrigger className="w-36" data-testid={`select-order-status-${order._id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">قيد الانتظار</SelectItem>
                              <SelectItem value="confirmed">مؤكد</SelectItem>
                              <SelectItem value="preparing">جاري التحضير</SelectItem>
                              <SelectItem value="ready">جاهز</SelectItem>
                              <SelectItem value="shipped">تم الشحن</SelectItem>
                              <SelectItem value="delivered">تم التوصيل</SelectItem>
                              <SelectItem value="cancelled">ملغي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
