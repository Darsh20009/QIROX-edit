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
  Inbox, 
  BarChart2, 
  Settings, 
  Users, 
  Package, 
  ShoppingCart, 
  Shield, 
  Activity,
  LogOut,
  User as UserIcon,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/agency/dashboard", icon: Activity },
  { title: "Projects", url: "/tenants", icon: Package },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart2 },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Sidebar variant="inset" className="bg-[#0D0D0D] border-r border-white/5">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-black font-bold text-lg">Q</span>
          </div>
          <span className="text-white font-medium tracking-tight">QIROX</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 uppercase tracking-[0.2em] text-[10px] mb-2 px-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    className="hover-elevate transition-all duration-200 h-10 px-4 group"
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="w-4 h-4 text-white/60 group-hover:text-white group-data-[active=true]:text-white" />
                      <span className="text-sm font-medium text-white/60 group-hover:text-white group-data-[active=true]:text-white">
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

      <SidebarFooter className="p-4 mt-auto border-t border-white/5">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-white/5">
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarImage src="/attached_assets/profile_placeholder.png" />
              <AvatarFallback className="bg-white/10 text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.username || "Youssef Darwish"}
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider truncate">
                Web Projects Director
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 px-4 text-white/60 hover:text-white hover:bg-white/5 rounded-md"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Log out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
