import { Header } from "./header";
import { Footer } from "./footer";
import { useAuth } from "@/lib/auth";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Video, 
  Package, 
  Store, 
  Settings, 
  LogOut,
  Menu,
  X,
  MessageSquare,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "QIROX Build", href: "/kanban", icon: Package },
    { name: "QIROX Meet", href: "/meetings", icon: Video },
    { name: "QIROX Requests", href: "/agency/dashboard", icon: MessageSquare },
    { name: "QIROX Finance", href: "/admin/financials", icon: CreditCard },
    { name: "QIROX Ops", href: "/employee", icon: LayoutDashboard },
    { name: "QIROX Core", href: "/admin/settings", icon: Settings },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-l bg-card">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-2xl font-bold text-primary">QIROX</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <a className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}>
                    <item.icon className={`ml-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                    }`} />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t p-4">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
            <LogOut className="ml-3 h-5 w-5" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Header for Mobile */}
      <div className="md:hidden flex items-center justify-between h-16 px-4 border-b bg-card sticky top-0 z-50">
        <h1 className="text-xl font-bold text-primary">QIROX</h1>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 right-0 w-64 bg-card shadow-xl p-4" onClick={e => e.stopPropagation()}>
            <nav className="mt-8 space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a 
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                      location === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="ml-3 h-6 w-6" />
                    {item.name}
                  </a>
                </Link>
              ))}
              <Button variant="ghost" className="w-full justify-start text-destructive mt-4" onClick={() => logout()}>
                <LogOut className="ml-3 h-6 w-6" />
                تسجيل الخروج
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pr-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
