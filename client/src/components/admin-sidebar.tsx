import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  Store,
  LogOut,
  Shield,
  Globe,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const menuItems = [
  { label: "لوحة التحكم", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "المستخدمين", href: "/admin/users", icon: Users },
  { label: "المنتجات", href: "/admin/products", icon: Package },
  { label: "الطلبات", href: "/admin/orders", icon: ShoppingCart },
  { label: "الاشتراكات", href: "/admin/subscriptions", icon: CreditCard },
  { label: "الأداء", href: "/admin/performance", icon: BarChart3 },
  { label: "الأمان", href: "/admin/security", icon: Shield },
  { label: "اللغات والنطاقات", href: "/admin/localization", icon: Globe },
  { label: "التحليلات", href: "/admin/analytics", icon: BarChart3 },
  { label: "التقارير", href: "/admin/reports", icon: FileText },
  { label: "المتاجر", href: "/admin/stores", icon: Store },
  { label: "الإعدادات", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const [location] = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="w-64 bg-card border-l border-border h-screen flex flex-col p-4 gap-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold">لوحة التحكم</h2>
        <p className="text-sm text-muted-foreground">{user?.name}</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <a href={item.href} key={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                data-testid={`button-admin-${item.label.toLowerCase()}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </a>
          );
        })}
      </nav>

      <Button
        variant="outline"
        onClick={logout}
        className="w-full justify-start gap-2"
        data-testid="button-admin-logout"
      >
        <LogOut className="w-4 h-4" />
        تسجيل خروج
      </Button>
    </div>
  );
}
