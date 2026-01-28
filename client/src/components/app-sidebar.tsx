import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  Layers,
  Activity,
  LogOut,
  Search,
  Zap,
  Bell,
  ChevronLeft,
  Sparkles,
  Crown,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { title: "الرئيسية", url: "/", icon: Home, badge: null },
  { title: "لوحة التحكم", url: "/agency/dashboard", icon: Activity, badge: null },
  { title: "المشاريع", url: "/tenants", icon: Layers, badge: "3" },
  { title: "التحليلات", url: "/admin/analytics", icon: BarChart3, badge: null },
  { title: "المستخدمين", url: "/admin/users", icon: Users, badge: null },
  { title: "الإعدادات", url: "/admin/settings", icon: Settings, badge: null },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <Sidebar variant="inset" className="border-l border-border/50 bg-gradient-to-b from-card to-background">
      <SidebarHeader className="p-5 border-b border-border/50">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight">QIROX</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">Build Systems. Stay Human.</span>
            </div>
          </div>
        </Link>
        
        <div className="mt-5 relative group">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="ابحث عن أي شيء..." 
            className="pr-10 h-12 bg-muted/50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
            data-testid="input-sidebar-search"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/70 uppercase tracking-widest text-[10px] font-semibold mb-3 px-3">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        h-12 px-3 rounded-xl transition-all duration-300 group
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary/15 to-emerald-500/10 shadow-sm border border-primary/20' 
                          : 'hover:bg-muted/80'
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center gap-3 w-full">
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/25' 
                            : 'bg-muted group-hover:bg-primary/10'
                          }
                        `}>
                          <item.icon className={`
                            w-5 h-5 transition-colors
                            ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}
                          `} />
                        </div>
                        <span className={`
                          text-sm font-medium flex-1 transition-colors
                          ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}
                        `}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge className="h-6 min-w-6 px-2 text-[10px] font-bold bg-gradient-to-r from-primary to-emerald-600 text-white border-0 shadow-sm">
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <ChevronLeft className="w-4 h-4 text-primary" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-muted-foreground/70 uppercase tracking-widest text-[10px] font-semibold mb-3 px-3">
            التحديثات
          </SidebarGroupLabel>
          <div className="px-3 space-y-3">
            <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">3 تحديثات جديدة</p>
                  <p className="text-[10px] text-muted-foreground">منذ ساعتين</p>
                </div>
              </div>
              <Button size="sm" className="w-full h-9 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                عرض الكل
              </Button>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-semibold">ترقية الباقة</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">احصل على مميزات إضافية</p>
              <Button size="sm" variant="outline" className="w-full h-9 rounded-lg border-purple-500/30 text-purple-600 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all">
                <Sparkles className="w-4 h-4 ml-2" />
                ترقية الآن
              </Button>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto border-t border-border/50">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted to-muted/50 border border-border/50">
            <Avatar className="h-12 w-12 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
              <AvatarImage src="/attached_assets/profile_placeholder.png" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-bold text-lg">
                {user?.username?.charAt(0).toUpperCase() || "ي"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">
                {user?.username || "يوسف درويش"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                مدير المشاريع
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-11 px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
