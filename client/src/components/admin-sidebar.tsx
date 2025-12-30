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
  Database,
  HelpCircle,
  Palette,
  BellRing,
  Share2,
  History,
  Wallet,
  Terminal,
  Send,
  Truck,
  Tags,
  Users2,
  Boxes,
  FileSpreadsheet,
  Wrench,
  ShieldAlert,
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
  { label: "قاعدة البيانات", href: "/admin/database", icon: Database },
  { label: "الدعم والرسائل", href: "/admin/support", icon: HelpCircle },
  { label: "تخصيص المظهر", href: "/admin/customization", icon: Palette },
  { label: "التنبيهات", href: "/admin/notifications", icon: BellRing },
  { label: "التواصل الاجتماعي", href: "/admin/social", icon: Share2 },
  { label: "سجل النشاطات", href: "/admin/audit", icon: History },
  { label: "الإدارة المالية", href: "/admin/financials", icon: Wallet },
  { label: "سجلات النظام العميقة", href: "/admin/logs", icon: Terminal },
  { label: "التسويق والحملات", href: "/admin/marketing", icon: Send },
  { label: "إدارة المحتوى", href: "/admin/content", icon: FileText },
  { label: "الشحن والتوصيل", href: "/admin/shipping", icon: Truck },
  { label: "الكوبونات والخصومات", href: "/admin/coupons", icon: Tags },
  { label: "الشركاء والمسوقين", href: "/admin/partners", icon: Users2 },
  { label: "المخزون", href: "/admin/inventory", icon: Boxes },
  { label: "الفواتير", href: "/admin/invoices", icon: FileSpreadsheet },
  { label: "الصيانة والتشغيل", href: "/admin/maintenance", icon: Wrench },
  { label: "الأدوار والصلاحيات", href: "/admin/roles", icon: ShieldAlert },
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

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <a href={item.href} key={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-2 h-9"
                data-testid={`button-admin-${item.label.toLowerCase()}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
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
