import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, User, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import qiroxLogo from "@assets/qirox_without_background_1767002019509.png";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/how-it-works", label: "كيف يعمل" },
  { href: "/pricing", label: "الأسعار" },
  { href: "/about", label: "عن QIROX" },
  { href: "/contact", label: "تواصل معنا" },
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
            <img src={qiroxLogo} alt="QIROX" className="h-10 w-auto dark:invert" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    location === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isLoading && (
              <>
                {user ? (
                  <Link href="/dashboard" className="hidden sm:block">
                    <Button data-testid="button-dashboard">
                      <User className="h-4 w-4 ml-2" />
                      لوحة التحكم
                    </Button>
                  </Link>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" data-testid="button-login">
                        دخول
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button data-testid="button-register">
                        ابدأ مجاناً
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm font-medium ${
                      location === link.href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              {!isLoading && (
                <>
                  {user ? (
                    <Link href="/dashboard" className="mt-2">
                      <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        <User className="h-4 w-4 ml-2" />
                        لوحة التحكم
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2 mt-2">
                      <Link href="/login">
                        <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                          تسجيل الدخول
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                          ابدأ مجاناً
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
