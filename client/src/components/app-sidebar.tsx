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
  BarChart2, 
  Settings, 
  Users, 
  Package, 
  Activity,
  LogOut,
  Search,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

const navItems = [
  { title: "الرئيسية", url: "/", icon: Home },
  { title: "لوحة التحكم", url: "/agency/dashboard", icon: Activity },
  { title: "المشاريع", url: "/tenants", icon: Package },
  { title: "التحليلات", url: "/admin/analytics", icon: BarChart2 },
  { title: "المستخدمين", url: "/admin/users", icon: Users },
  { title: "الإعدادات", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <Sidebar variant="inset" className="bg-card border-l border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <Link href="/">
          <div className="flex items-center gap-3 px-2 cursor-pointer">
            <img 
              src={qiroxLogo} 
              alt="QIROX" 
              className="h-8 w-auto dark:invert"
            />
          </div>
        </Link>
        <div className="mt-4 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث..." 
            className="pr-10 bg-muted/50 border-0 focus-visible:ring-1"
            data-testid="input-sidebar-search"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-wider text-[10px] mb-2 px-4">
            التنقل
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    className="hover-elevate transition-all duration-200 h-11 px-4 group rounded-lg"
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-data-[active=true]:text-primary" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground group-data-[active=true]:text-foreground group-data-[active=true]:font-semibold">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto border-t border-border">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-muted/50">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src="/attached_assets/profile_placeholder.png" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user?.username?.charAt(0).toUpperCase() || "ي"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.username || "يوسف درويش"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                مدير المشاريع
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-11 px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
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
