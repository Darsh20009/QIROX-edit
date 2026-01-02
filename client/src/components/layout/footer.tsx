import { Link } from "wouter";
import qiroxLogo from "@assets/qirox_without_background_1767002019509.png";

const footerLinks = {
  product: [
    { href: "/how-it-works", label: "كيف يعمل" },
    { href: "/pricing", label: "الأسعار" },
  ],
  company: [
    { href: "/about", label: "عن QIROX" },
    { href: "/contact", label: "تواصل معنا" },
  ],
  legal: [
    { href: "/terms", label: "الشروط والأحكام" },
    { href: "/privacy", label: "سياسة الخصوصية" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block" data-testid="link-footer-logo">
              <img src={qiroxLogo} alt="QIROX" className="h-8 w-auto dark:invert" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed" data-testid="text-footer-tagline">
              منصة متكاملة لإنشاء وإدارة الأعمال الرقمية بأسعار تنافسية وميزات احترافية.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">المنتج</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">الشركة</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-4">قانوني</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            جميع الحقوق محفوظة QIROX {new Date().getFullYear()}
          </p>
          <p className="text-sm text-muted-foreground">صُنع عبر فريق QIROX TEC</p>
        </div>
      </div>
    </footer>
  );
}
