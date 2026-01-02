import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import qiroxLogo from "@assets/qirox_without_background_1767002019509.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const buildOptions = [
  { href: "/build", label: "بناء منصة (Builder)", desc: "مواقع، تطبيقات، بورتفوليو" },
  { href: "/systems", label: "نظام أعمال (Systems)", desc: "CRM, ERP, أتمتة" },
  { href: "/stores", label: "متجر (Store)", desc: "تجارة إلكترونية متكاملة" },
  { href: "/custom", label: "بناء خاص (Custom)", desc: "حلول تقنية مفصلة" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  const navItems = [
    { label: "كيف يعمل", href: "/how-it-works" },
    { label: "الأسعار", href: "/pricing" },
    { label: "من نحن", href: "/about" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between gap-8">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105" data-testid="link-logo">
              <img src={qiroxLogo} alt="QIROX" className="h-12 w-auto dark:invert" />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 font-black hover:text-primary">
                    ماذا تريد أن تبني؟
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 p-2 rounded-2xl border-border/40 bg-background/95 backdrop-blur-xl">
                  {buildOptions.map((opt) => (
                    <Link key={opt.href} href={opt.href}>
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer rounded-xl hover:bg-primary/5 transition-colors">
                        <span className="font-bold text-base">{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`text-sm font-bold transition-colors cursor-pointer hover:text-primary ${
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              {!isLoading && (
                <>
                  {user ? (
                    <Link href="/dashboard">
                      <Button className="font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5" data-testid="button-dashboard">
                        <User className="ml-2 h-4 w-4" />
                        لوحة التحكم
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link href="/login">
                        <Button variant="ghost" className="font-bold">دخول</Button>
                      </Link>
                      <Link href="/register">
                        <Button className="font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 px-6" data-testid="button-register">
                          ابدأ الآن
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="grid gap-2">
                <p className="text-xs font-bold text-muted-foreground px-2 mb-2 uppercase tracking-widest">خدماتنا</p>
                {buildOptions.map((opt) => (
                  <Link key={opt.href} href={opt.href}>
                    <span className="block p-4 rounded-xl bg-secondary/50 font-bold cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                      {opt.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="h-px bg-border/40 my-4" />
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="block p-2 font-bold text-lg cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="pt-6 grid gap-3">
                <Link href="/login">
                  <Button variant="outline" className="w-full font-bold h-12 rounded-xl" onClick={() => setMobileMenuOpen(false)}>دخول</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full font-bold h-12 rounded-xl" onClick={() => setMobileMenuOpen(false)}>ابدأ الآن</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
