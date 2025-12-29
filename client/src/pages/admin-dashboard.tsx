import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { 
  ArrowLeft, 
  Loader2,
  Users,
  CreditCard,
  Store,
  TrendingUp,
  Package,
  Coffee,
  GraduationCap,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalStores: number;
  totalRevenue: number;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface SubscriptionData {
  _id: string;
  planType: string;
  billingCycle: string;
  status: string;
  price: number;
  startDate: string;
  endDate: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

const planNames: Record<string, string> = {
  stores: "المتاجر",
  restaurants: "المطاعم",
  education: "التعليم",
};

const planIcons = {
  stores: Package,
  restaurants: Coffee,
  education: GraduationCap,
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  trial: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

const statusNames: Record<string, string> = {
  active: "نشط",
  trial: "تجريبي",
  expired: "منتهي",
  cancelled: "ملغي",
};

const roleNames: Record<string, string> = {
  customer: "عميل",
  employee: "موظف",
  admin: "مدير",
};

export default function AdminDashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
    if (!authLoading && user && user.role !== "admin") {
      setLocation("/dashboard");
    }
  }, [user, authLoading, setLocation]);

  const { data: statsData, isLoading: statsLoading } = useQuery<{ stats: Stats }>({
    queryKey: ["/api", "admin", "stats"],
    enabled: !!user && user.role === "admin",
  });

  const { data: usersData, isLoading: usersLoading } = useQuery<{ users: UserData[] }>({
    queryKey: ["/api", "admin", "users"],
    enabled: !!user && user.role === "admin",
  });

  const { data: subscriptionsData, isLoading: subsLoading } = useQuery<{ subscriptions: SubscriptionData[] }>({
    queryKey: ["/api", "admin", "subscriptions"],
    enabled: !!user && user.role === "admin",
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const stats = statsData?.stats;
  const users = usersData?.users || [];
  const subscriptions = subscriptionsData?.subscriptions || [];

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
              <h1 className="text-xl font-bold" data-testid="text-dashboard-title">لوحة تحكم المدير</h1>
              <p className="text-sm text-muted-foreground">إحصائيات وإدارة المنصة</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-user-name">
              مرحباً، {user.name}
            </span>
            <Link href="/employee">
              <Button variant="outline" size="sm" data-testid="button-employee-dashboard">
                لوحة الموظفين
              </Button>
            </Link>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card data-testid="card-stats-users">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="text-2xl font-bold" data-testid="text-total-users">{stats?.totalUsers || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-stats-subscriptions">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاشتراكات</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="text-2xl font-bold" data-testid="text-total-subs">{stats?.totalSubscriptions || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-stats-active">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">اشتراكات نشطة</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="text-2xl font-bold" data-testid="text-active-subs">{stats?.activeSubscriptions || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-stats-stores">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المتاجر</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="text-2xl font-bold" data-testid="text-total-stores">{stats?.totalStores || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-stats-revenue">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الإيرادات</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="text-2xl font-bold" data-testid="text-total-revenue">
                  {stats?.totalRevenue?.toLocaleString("ar-SA") || 0} ر.س
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card data-testid="card-users-list">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                المستخدمين
              </CardTitle>
              <CardDescription>جميع مستخدمي المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : users.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {users.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between gap-4 p-4 rounded-lg border"
                      data-testid={`card-user-${u._id}`}
                    >
                      <div>
                        <h4 className="font-medium">{u.name}</h4>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{roleNames[u.role] || u.role}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-subscriptions-list">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                الاشتراكات
              </CardTitle>
              <CardDescription>جميع اشتراكات العملاء</CardDescription>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : subscriptions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا يوجد اشتراكات</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {subscriptions.map((sub) => {
                    const PlanIcon = planIcons[sub.planType as keyof typeof planIcons] || Package;
                    return (
                      <div
                        key={sub._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg border"
                        data-testid={`card-subscription-${sub._id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <PlanIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{sub.userId?.name || "غير معروف"}</h4>
                            <p className="text-sm text-muted-foreground">
                              {planNames[sub.planType] || sub.planType} - {sub.price} ر.س
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[sub.status] || ""}>
                            {statusNames[sub.status] || sub.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
