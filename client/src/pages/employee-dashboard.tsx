import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequestJson } from "@/lib/queryClient";
import { 
  Store, 
  ArrowLeft, 
  Loader2,
  Package,
  Coffee,
  GraduationCap,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  Users
} from "lucide-react";

interface StoreData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

const typeIcons = {
  ecommerce: Package,
  restaurant: Coffee,
  education: GraduationCap,
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const statusNames: Record<string, string> = {
  active: "نشط",
  pending: "قيد المراجعة",
  inactive: "غير نشط",
  suspended: "موقوف",
};

export default function EmployeeDashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
    if (!authLoading && user && user.role !== "employee" && user.role !== "admin") {
      setLocation("/dashboard");
    }
  }, [user, authLoading, setLocation]);

  const { data: storesData, isLoading: storesLoading } = useQuery<{ stores: StoreData[] }>({
    queryKey: ["/api", "admin", "stores"],
    enabled: !!user && (user.role === "employee" || user.role === "admin"),
  });

  const { data: messagesData, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api", "contact"],
    enabled: !!user && (user.role === "employee" || user.role === "admin"),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ storeId, status }: { storeId: string; status: string }) => {
      return apiRequestJson("PATCH", `/api/admin/stores/${storeId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "admin", "stores"] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة المتجر بنجاح",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في تحديث الحالة",
        variant: "destructive",
      });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || (user.role !== "employee" && user.role !== "admin")) {
    return null;
  }

  const stores = storesData?.stores || [];
  const messages = messagesData || [];
  const pendingStores = stores.filter(s => s.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold" data-testid="text-dashboard-title">لوحة تحكم الموظفين</h1>
              <p className="text-sm text-muted-foreground">إدارة طلبات العملاء والدعم</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-user-name">
              مرحباً، {user.name}
            </span>
            {user.role === "admin" && (
              <Link href="/admin">
                <Button variant="outline" size="sm" data-testid="button-admin-dashboard">
                  لوحة المدير
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              onClick={logout}
              data-testid="button-logout"
            >
              تسجيل خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card data-testid="card-stats-stores">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المتاجر</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-stores">{stores.length}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stats-pending">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">بانتظار المراجعة</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-pending-stores">{pendingStores.length}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stats-messages">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">رسائل التواصل</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-messages">{messages.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card data-testid="card-stores-list">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                المتاجر
              </CardTitle>
              <CardDescription>إدارة جميع متاجر العملاء</CardDescription>
            </CardHeader>
            <CardContent>
              {storesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : stores.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا توجد متاجر حتى الآن</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {stores.map((store) => {
                    const TypeIcon = typeIcons[store.type as keyof typeof typeIcons] || Package;
                    return (
                      <div
                        key={store._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg border"
                        data-testid={`card-store-${store._id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{store.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {store.userId?.name || "غير معروف"} - {store.slug}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={store.status}
                            onValueChange={(status) => 
                              updateStatusMutation.mutate({ storeId: store._id, status })
                            }
                            disabled={updateStatusMutation.isPending}
                          >
                            <SelectTrigger className="w-32" data-testid={`select-status-${store._id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">قيد المراجعة</SelectItem>
                              <SelectItem value="active">نشط</SelectItem>
                              <SelectItem value="inactive">غير نشط</SelectItem>
                              <SelectItem value="suspended">موقوف</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-messages-list">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                رسائل التواصل
              </CardTitle>
              <CardDescription>رسائل العملاء من صفحة التواصل</CardDescription>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : messages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا توجد رسائل حتى الآن</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-lg border"
                      data-testid={`card-message-${msg.id}`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-medium">{msg.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{msg.email}</p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
