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
    <Sidebar variant="inset" className="border-l border-border">
      <SidebarHeader className="p-5 border-b border-border">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">QIROX</span>
              <span className="text-[10px] text-muted-foreground -mt-1">منصة إدارة الأعمال</span>
            </div>
          </div>
        </Link>
        
        <div className="mt-5 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="ابحث عن أي شيء..." 
            className="pr-10 h-11 bg-muted border-0 rounded-xl focus-visible:ring-primary"
            data-testid="input-sidebar-search"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-semibold mb-3 px-3">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        h-12 px-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-primary/10' 
                          : 'hover:bg-muted'
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center gap-3 w-full">
                        <div className={`
                          w-9 h-9 rounded-lg flex items-center justify-center transition-all
                          ${isActive 
                            ? 'bg-primary shadow-lg shadow-primary/25' 
                            : 'bg-muted'
                          }
                        `}>
                          <item.icon className={`
                            w-4 h-4
                            ${isActive ? 'text-white' : 'text-muted-foreground'}
                          `} />
                        </div>
                        <span className={`
                          text-sm font-medium flex-1
                          ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'}
                        `}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge className="h-5 min-w-5 px-1.5 text-[10px] font-bold bg-primary/10 text-primary border-0">
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
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-semibold mb-3 px-3">
            الإشعارات
          </SidebarGroupLabel>
          <div className="px-3">
            <div className="bg-muted rounded-xl p-4 space-y-3 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">3 تحديثات جديدة</p>
                  <p className="text-[10px] text-muted-foreground">منذ ساعتين</p>
                </div>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto border-t border-border">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <Avatar className="h-11 w-11 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src="/attached_assets/profile_placeholder.png" />
              <AvatarFallback className="bg-primary text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || "ي"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.username || "يوسف درويش"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                مدير المشاريع
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-11 px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">تسجيل الخروج</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
