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
  Sparkles,
  FileText as TextIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { LogoQ } from "@/components/ui/logo-q";

const menuItems = [
  { label: "لوحة التحكم", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "الذكاء الاصطناعي", href: "/admin/ai", icon: Sparkles },
  { label: "معالجة النصوص", href: "/admin/text-tool", icon: TextIcon },
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
  const [location, setLocation] = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="w-64 bg-card border-l border-border h-screen flex flex-col p-4 gap-4 sticky top-0">
      <div className="mb-6 flex items-center gap-3 p-2 bg-secondary/30 rounded-2xl border border-border/40">
        <LogoQ className="w-10 h-10" />
        <div>
          <h2 className="text-sm font-black tracking-tight">QIROX CORE</h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{user?.role?.replace('_', ' ')}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl transition-all duration-200 ${isActive ? 'shadow-lg shadow-primary/20' : 'hover:bg-primary/5'}`}
              onClick={() => setLocation(item.href)}
              data-testid={`button-admin-${item.label.toLowerCase()}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary'}`} />
              <span className="text-xs font-bold">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-border/50">
        <Button
          variant="outline"
          onClick={logout}
          className="w-full justify-start gap-3 h-11 rounded-xl border-dashed hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all"
          data-testid="button-admin-logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-bold">تسجيل خروج</span>
        </Button>
      </div>
    </div>
  );
}
