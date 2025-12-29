import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth";
import { 
  Store, 
  CreditCard, 
  Plus, 
  ArrowRight, 
  Loader2,
  Package,
  Coffee,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  ShoppingCart
} from "lucide-react";
import qiroxLogo from "@assets/qirox_without_background_1767002019509.png";

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

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  trial: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
  expired: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  cancelled: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
  inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
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
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" data-testid="link-logo">
                <img src={qiroxLogo} alt="QIROX" className="h-6 w-auto dark:invert" />
              </Link>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <LayoutDashboard className="h-4 w-4 text-primary" />
                <span className="font-medium">لوحة التحكم</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-dashboard-title">
            مرحباً، {user.name}
          </h1>
          <p className="text-muted-foreground mt-1">إدارة اشتراكاتك ومتاجرك من مكان واحد</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-0 shadow-sm" data-testid="card-stats-subscriptions">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الاشتراكات</p>
                  <p className="text-3xl font-bold text-foreground">{subscriptions.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm" data-testid="card-stats-stores">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">المتاجر</p>
                  <p className="text-3xl font-bold text-foreground">{stores.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Store className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm" data-testid="card-stats-orders">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الطلبات</p>
                  <p className="text-3xl font-bold text-foreground">0</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm" data-testid="card-stats-status">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الحالة</p>
                  <p className="text-lg font-bold text-foreground">
                    {hasActiveSubscription ? "نشط" : "غير نشط"}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${hasActiveSubscription ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                  {hasActiveSubscription ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-lg">الاشتراكات</CardTitle>
                <CardDescription>إدارة اشتراكاتك النشطة</CardDescription>
              </div>
              <Link href="/dashboard/subscribe">
                <Button data-testid="button-new-subscription">
                  <Plus className="h-4 w-4 ml-2" />
                  اشتراك جديد
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">لا توجد اشتراكات</p>
                  <p className="text-sm text-muted-foreground mb-4">ابدأ اشتراكك الآن للوصول لجميع الميزات</p>
                  <Link href="/dashboard/subscribe">
                    <Button variant="outline">ابدأ اشتراكك الآن</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {subscriptions.map((sub) => {
                    const Icon = planIcons[sub.planType];
                    return (
                      <div
                        key={sub._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/50"
                        data-testid={`subscription-item-${sub._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-background">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{planNames[sub.planType]}</p>
                            <p className="text-sm text-muted-foreground">
                              {sub.price} ريال / {sub.billingCycle === "monthly" ? "شهري" : sub.billingCycle === "6months" ? "6 أشهر" : "سنوي"}
                            </p>
                          </div>
                        </div>
                        <Badge className={statusColors[sub.status] || ""}>
                          {statusNames[sub.status]}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-lg">المتاجر</CardTitle>
                <CardDescription>متاجرك ومنصاتك النشطة</CardDescription>
              </div>
              <Link href="/dashboard/stores/new">
                <Button disabled={!hasActiveSubscription} data-testid="button-new-store">
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء متجر
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {storesLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : stores.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Store className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">لا توجد متاجر</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {hasActiveSubscription ? "أنشئ متجرك الأول الآن" : "تحتاج اشتراك فعال لإنشاء متجر"}
                  </p>
                  {hasActiveSubscription && (
                    <Link href="/dashboard/stores/new">
                      <Button variant="outline">أنشئ متجرك الأول</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {stores.map((store) => (
                    <Link key={store._id} href={`/dashboard/stores/${store._id}`}>
                      <div
                        className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 hover-elevate cursor-pointer transition-all"
                        data-testid={`store-item-${store._id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-background">
                            <Store className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{store.name}</p>
                            <p className="text-sm text-muted-foreground">/{store.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={statusColors[store.status] || ""}>
                            {statusNames[store.status]}
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
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
