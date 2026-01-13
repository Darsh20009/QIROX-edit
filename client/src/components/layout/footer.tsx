import { Link } from "wouter";
import qiroxLogo from "@assets/qirox_without_background_1767002019509.png";
import { Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { SiX } from "react-icons/si";

const footerLinks = {
  product: [
    { href: "/developers", label: "مركز المطورين" },
    { href: "/pricing", label: "الأسعار" },
    { href: "/build", label: "بناء منصة" },
    { href: "/stores", label: "المتاجر" },
  ],
  company: [
    { href: "/about", label: "عن QIROX" },
    { href: "/contact", label: "تواصل معنا" },
    { href: "/careers", label: "الوظائف" },
    { href: "/blog", label: "المدونة" },
  ],
  legal: [
    { href: "/terms", label: "الشروط والأحكام" },
    { href: "/privacy", label: "سياسة الخصوصية" },
    { href: "/security", label: "الأمان" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border/40 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8 text-right">
            <Link href="/" className="inline-block transition-transform hover:scale-105" data-testid="link-footer-logo">
              <img src={qiroxLogo} alt="QIROX" className="h-12 w-auto dark:invert" />
            </Link>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm font-medium" data-testid="text-footer-tagline">
              نحن نعيد تعريف صناعة البرمجيات في العالم العربي، من خلال تقديم حلول تقنية تجمع بين القوة والجمال وسهولة الاستخدام.
            </p>
            <div className="flex gap-4 justify-end">
              <a href="https://x.com/QIROXtec" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                <SiX className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/qirox.tec/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-foreground/80">المنتج</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-bold"
                    data-testid={`link-footer-${link.href.replace("/", "") || "home"}`}
                  >
                    <span className="cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-foreground/80">الشركة</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-bold"
                    data-testid={`link-footer-${link.href.replace("/", "") || "home"}`}
                  >
                    <span className="cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-foreground/80">اتصل بنا</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-muted-foreground font-medium justify-end">
                <a href="mailto:support@qirox.online" className="hover:text-primary transition-colors">
                  support@qirox.online
                </a>
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground font-medium justify-end">
                <a href="https://wa.me/201155201921" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +201155201921 (WhatsApp)
                </a>
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
              </li>
              <li className="flex items-center gap-4 text-muted-foreground font-medium justify-end">
                <a href="tel:+966532441566" className="hover:text-primary transition-colors">
                  +966532441566
                </a>
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8 order-2 md:order-1">
            <p className="text-sm text-muted-foreground font-medium" data-testid="text-footer-copyright">
              © {new Date().getFullYear()} QIROX TEC. جميع الحقوق محفوظة.
            </p>
            <div className="hidden md:flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors font-bold">
                  <span className="cursor-pointer">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <p className="text-sm font-black text-primary/80 order-1 md:order-2">صُنع بحب في المملكة 🇸🇦</p>
        </div>
      </div>
    </footer>
  );
}
