import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import {
  Store,
  Utensils,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Zap,
  Clock,
  Headphones,
  TrendingUp,
  Globe,
} from "lucide-react";

type BuildOption = {
  id: string;
  icon: React.ElementType;
  title: string;
  titleEn: string;
  description: string;
  features: string[];
  price: string;
};

const buildOptions: BuildOption[] = [
  {
    id: "store",
    icon: Store,
    title: "المتاجر الإلكترونية",
    titleEn: "E-Commerce",
    description: "أنشئ متجرك الإلكتروني الاحترافي مع نظام إدارة شامل للمنتجات والطلبات والعملاء.",
    features: ["إدارة المنتجات", "نظام الطلبات", "تقارير المبيعات", "دعم الدفع الإلكتروني"],
    price: "100",
  },
  {
    id: "restaurant",
    icon: Utensils,
    title: "المطاعم والكافيهات",
    titleEn: "Restaurants",
    description: "نظام متكامل لإدارة المطاعم مع قوائم الطعام والحجوزات وتتبع الطلبات.",
    features: ["قوائم الطعام الرقمية", "نظام الحجوزات", "إدارة الطاولات", "تقارير يومية"],
    price: "179",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "المنصات التعليمية",
    titleEn: "Education",
    description: "أنشئ منصتك التعليمية مع إدارة الدورات والطلاب والشهادات.",
    features: ["إدارة الدورات", "نظام الطلاب", "الشهادات الرقمية", "المحتوى التفاعلي"],
    price: "199",
  },
];

const stats = [
  { value: "+500", label: "مشروع ناجح" },
  { value: "99%", label: "رضا العملاء" },
  { value: "24/7", label: "دعم فني" },
  { value: "100%", label: "ملكية كاملة" },
];

const features = [
  {
    icon: Shield,
    title: "أمان متقدم",
    description: "حماية بيانات عملك بأحدث تقنيات التشفير والأمان",
  },
  {
    icon: Zap,
    title: "سرعة فائقة",
    description: "أداء سريع وموثوق يضمن تجربة مستخدم ممتازة",
  },
  {
    icon: Clock,
    title: "إعداد سريع",
    description: "ابدأ متجرك في دقائق مع واجهة سهلة الاستخدام",
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description: "فريق دعم متخصص جاهز لمساعدتك على مدار الساعة",
  },
  {
    icon: TrendingUp,
    title: "تحليلات ذكية",
    description: "تقارير وإحصائيات تفصيلية لتتبع أداء عملك",
  },
  {
    icon: Globe,
    title: "متعدد اللغات",
    description: "دعم كامل للعربية والإنجليزية مع RTL",
  },
];

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selected = buildOptions.find((opt) => opt.id === selectedOption);

  return (
    <Layout>
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm" data-testid="badge-tagline">
              أقل الأسعار في السوق
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight" data-testid="text-hero-title">
              أنشئ نظامك الرقمي
              <span className="block mt-2 bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-transparent">
                بكل سهولة واحترافية
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
              منصة QIROX تمكّنك من إنشاء وإدارة متجرك الإلكتروني أو مطعمك أو منصتك التعليمية بأسعار تنافسية وميزات احترافية.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg" data-testid="button-start-free">
                  ابدأ تجربتك المجانية
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg" data-testid="button-view-pricing">
                  عرض الأسعار
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center" data-testid={`stat-item-${index}`}>
                <div className="text-3xl md:text-4xl font-bold text-primary" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">حلولنا</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              ماذا تريد أن تبني؟
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر نوع المشروع الذي يناسب عملك وابدأ رحلتك الرقمية اليوم
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {buildOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedOption === option.id;
              return (
                <Card
                  key={option.id}
                  className={`relative cursor-pointer transition-all duration-300 overflow-visible ${
                    isSelected ? "ring-2 ring-primary shadow-lg" : "hover-elevate"
                  }`}
                  onClick={() => setSelectedOption(isSelected ? null : option.id)}
                  data-testid={`card-option-${option.id}`}
                >
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-colors ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{option.title}</h3>
                      <span className="text-sm text-muted-foreground">({option.titleEn})</span>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-bold text-primary">{option.price}</span>
                      <span className="text-muted-foreground">ريال/شهرياً</span>
                    </div>
                    <ul className="space-y-3">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selected && (
            <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Link href="/register">
                <Button size="lg" className="px-10" data-testid="button-start-selected">
                  ابدأ الآن مع {selected.title}
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">لماذا QIROX؟</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              ميزات تجعلنا مختلفين
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              نقدم لك أفضل الأدوات والميزات لإنجاح عملك الرقمي
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-0 bg-background shadow-sm" data-testid={`feature-item-${index}`}>
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2" data-testid={`text-feature-title-${index}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-feature-desc-${index}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative rounded-2xl bg-gradient-to-l from-primary to-primary/80 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                جاهز لبدء رحلتك الرقمية؟
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
                انضم إلى مئات الأعمال الناجحة التي تثق في QIROX. ابدأ تجربتك المجانية لمدة 14 يوماً الآن.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-6 text-lg font-semibold" data-testid="button-cta-register">
                    ابدأ مجاناً
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 py-6 text-lg border-primary-foreground/30 text-primary-foreground bg-transparent" data-testid="button-cta-contact">
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
