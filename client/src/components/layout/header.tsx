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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <img src={qiroxLogo} alt="QIROX" className="h-14 w-auto dark:invert" />
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  ماذا تريد أن تبني؟
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {buildOptions.map((opt) => (
                  <Link key={opt.href} href={opt.href}>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <span className="font-bold">{opt.label}</span>
                      <span className="text-xs text-muted-foreground">{opt.desc}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/how-it-works">
              <Button variant="ghost" className="text-sm">كيف يعمل</Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isLoading && (
              <>
                {user ? (
                  <Link href="/dashboard">
                    <Button data-testid="button-dashboard">
                      <User className="h-4 w-4 ml-2" />
                      لوحة التحكم
                    </Button>
                  </Link>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link href="/register">
                      <Button data-testid="button-register">ابدأ الآن</Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
