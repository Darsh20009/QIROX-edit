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
  CreditCard,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleDownload = () => {
    // Creative download logic
    const link = document.createElement('a');
    link.href = '#'; // Placeholder for actual tool URL
    link.download = 'qirox-tool.exe';
    document.body.appendChild(link);
    // Visual feedback
    const logo = document.getElementById('interactive-logo');
    if (logo) {
      logo.classList.add('animate-bounce');
      setTimeout(() => logo.classList.remove('animate-bounce'), 1000);
    }
    // We can't actually trigger a real download without a file, but we can show the intent
    alert('بدء تحميل أداة QIROX الذكية...');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Header />
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Refined Sidebar for Desktop */}
      <div className="hidden md:flex w-72 flex-col fixed inset-y-0 right-0 border-l border-border/40 bg-card/30 backdrop-blur-2xl glass-morphism">
        <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
          <div className="flex items-center px-8 mb-12">
            <div 
              id="interactive-logo"
              onClick={handleDownload}
              className="flex items-center gap-3 cursor-pointer group"
              title="تحميل الأداة الذكية"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-primary/30 transform transition-transform group-hover:scale-110 active:scale-95 animate-pulse-glow">
                <span className="text-3xl font-black italic">Q</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-gradient">QIROX</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            <p className="text-xs font-black text-muted-foreground px-4 mb-4 uppercase tracking-[0.2em]">القائمة الرئيسية</p>
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <a className={`group flex items-center justify-between px-4 py-3.5 text-sm font-bold rounded-2xl transition-all ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}>
                    <div className="flex items-center">
                      <item.icon className={`ml-3 flex-shrink-0 h-5 w-5 transition-colors ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                      }`} />
                      {item.name}
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border/40">
          <div className="bg-secondary/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground truncate">خطة الرواد</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl font-bold h-10" 
              onClick={() => logout()}
            >
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Header for Mobile */}
      <div className="md:hidden flex items-center justify-between h-20 px-6 border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-lg">Q</div>
          <span className="font-black text-xl tracking-tighter">QIROX</span>
        </Link>
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              className="fixed inset-y-0 right-0 w-80 bg-card shadow-2xl p-6 flex flex-col" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 mt-12 space-y-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a 
                      className={`flex items-center px-4 py-4 text-lg font-bold rounded-2xl ${
                        location === item.href ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="ml-4 h-6 w-6" />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <Button variant="ghost" className="w-full justify-start text-destructive h-14 rounded-2xl font-bold text-lg" onClick={() => logout()}>
                <LogOut className="ml-4 h-6 w-6" />
                تسجيل الخروج
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 md:pr-72">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-12"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
