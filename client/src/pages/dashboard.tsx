import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { 
  Store, 
  CreditCard, 
  Plus, 
  ArrowLeft, 
  Loader2,
  Package,
  Coffee,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Subscription {
  _id: string;
  planType: "stores" | "restaurants" | "education";
  billingCycle: string;
  status: string;
  price: number;
  startDate: string;
  endDate: string;
  trialEndsAt?: string;
}

interface StoreData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  createdAt: string;
}

const planIcons = {
  stores: Package,
  restaurants: Coffee,
  education: GraduationCap,
};

const planNames = {
  stores: "المتاجر والتطبيقات",
  restaurants: "الكافيهات والمطاعم",
  education: "منصات التعليم",
};

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  trial: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

const statusNames: Record<string, string> = {
  active: "نشط",
  trial: "تجريبي",
  pending: "قيد المراجعة",
  expired: "منتهي",
  cancelled: "ملغي",
  inactive: "غير نشط",
};

export default function Dashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  const { data: subscriptionsData, isLoading: subsLoading } = useQuery<{ subscriptions: Subscription[] }>({
    queryKey: ["/api", "subscriptions"],
    enabled: !!user,
  });

  const { data: storesData, isLoading: storesLoading } = useQuery<{ stores: StoreData[] }>({
    queryKey: ["/api", "stores"],
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const subscriptions = subscriptionsData?.subscriptions || [];
  const stores = storesData?.stores || [];
  const hasActiveSubscription = subscriptions.some(s => s.status === "active" || s.status === "trial");

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
              <h1 className="text-xl font-semibold text-foreground" data-testid="text-dashboard-title">لوحة التحكم</h1>
              <p className="text-sm text-muted-foreground">مرحباً، {user.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} data-testid="button-logout">
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card data-testid="card-stats-subscriptions">
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">الاشتراكات</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptions.length}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stats-stores">
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">المتاجر</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stores.length}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stats-status">
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">الحالة</CardTitle>
              {hasActiveSubscription ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">
                {hasActiveSubscription ? "اشتراك فعال" : "لا يوجد اشتراك"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>الاشتراكات</CardTitle>
                <CardDescription>إدارة اشتراكاتك النشطة</CardDescription>
              </div>
              <Link href="/dashboard/subscribe">
                <Button size="sm" data-testid="button-new-subscription">
                  <Plus className="h-4 w-4 ml-2" />
                  اشتراك جديد
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد اشتراكات بعد</p>
                  <Link href="/dashboard/subscribe">
                    <Button variant="ghost" className="mt-2">ابدأ اشتراكك الآن</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((sub) => {
                    const Icon = planIcons[sub.planType];
                    return (
                      <div
                        key={sub._id}
                        className="flex items-center justify-between p-4 rounded-lg border"
                        data-testid={`subscription-item-${sub._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{planNames[sub.planType]}</p>
                            <p className="text-sm text-muted-foreground">
                              {sub.price} ريال / {sub.billingCycle === "monthly" ? "شهري" : sub.billingCycle === "6months" ? "6 أشهر" : "سنوي"}
                            </p>
                          </div>
                        </div>
                        <Badge className={statusColors[sub.status as keyof typeof statusColors]}>
                          {statusNames[sub.status]}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>المتاجر</CardTitle>
                <CardDescription>متاجرك ومنصاتك النشطة</CardDescription>
              </div>
              <Link href="/dashboard/stores/new">
                <Button size="sm" disabled={!hasActiveSubscription} data-testid="button-new-store">
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء متجر
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {storesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : stores.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Store className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد متاجر بعد</p>
                  {hasActiveSubscription ? (
                    <Link href="/dashboard/stores/new">
                      <Button variant="ghost" className="mt-2">أنشئ متجرك الأول</Button>
                    </Link>
                  ) : (
                    <p className="text-sm mt-2">تحتاج اشتراك فعال لإنشاء متجر</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {stores.map((store) => (
                    <Link key={store._id} href={`/dashboard/stores/${store._id}`}>
                      <div
                        className="flex items-center justify-between p-4 rounded-lg border hover-elevate cursor-pointer"
                        data-testid={`store-item-${store._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <Store className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{store.name}</p>
                            <p className="text-sm text-muted-foreground">/{store.slug}</p>
                          </div>
                        </div>
                        <Badge className={statusColors[store.status as keyof typeof statusColors]}>
                          {statusNames[store.status]}
                        </Badge>
                      </div>
                    </Link>
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
