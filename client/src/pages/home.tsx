import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import { BRAND } from "@shared/branding";
import { SEO } from "@/components/layout/seo";
import {
  Monitor,
  Database,
  ShoppingBag,
  Code,
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
    id: "build",
    icon: Monitor,
    title: "بناء منصة",
    titleEn: "Builder",
    description: "بناء مواقع وتطبيقات بورتفوليو احترافية مع أداء فائق وسرعة في النشر.",
    features: ["تجاوب كامل", "SEO متقدم", "سرعة فائقة", "تصميم عصري"],
    price: "150",
  },
  {
    id: "systems",
    icon: Database,
    title: "نظام أعمال",
    titleEn: "Business Systems",
    description: "أتمتة العمليات الإدارية، CRM، ونظم إدارة الموارد (ERP) مفصلة حسب احتياجك.",
    features: ["أتمتة المهام", "إدارة العملاء", "تقارير مالية", "لوحة تحكم ذكية"],
    price: "450",
  },
  {
    id: "stores",
    icon: ShoppingBag,
    title: "متجر إلكتروني",
    titleEn: "Store",
    description: "متجر متكامل يدعم الدفع، الشحن، وإدارة المخزون مع تجربة شراء سلسة.",
    features: ["بوابات دفع", "إدارة الشحن", "كوبونات خصم", "تطبيقات جوال"],
    price: "250",
  },
  {
    id: "custom",
    icon: Code,
    title: "بناء خاص",
    titleEn: "Custom Build",
    description: "حلول برمجية مخصصة للأفكار الجديدة والتقنيات المعقدة.",
    features: ["كود مخصص", "توسع لا محدود", "أمان عالٍ", "دعم فني مخصص"],
    price: "اتصل بنا",
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
  const [location] = useLocation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const path = location.split("/")[1];
    if (["build", "systems", "stores", "custom"].includes(path)) {
      setSelectedOption(path);
    } else {
      setSelectedOption(null);
    }
  }, [location]);

  const selected = buildOptions.find((opt) => opt.id === selectedOption);
  const displayOptions = selected ? [selected] : buildOptions;

  return (
    <Layout>
      <SEO 
        title={selected?.title} 
        description={selected?.description}
      />
      <section className="relative py-24 md:py-32 overflow-hidden premium-gradient">
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">{BRAND.slogan}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              {selected ? `ابنِ ${selected.title}` : BRAND.copy.hero.title}
              <span className="block mt-2 bg-gradient-to-l from-primary via-emerald-500 to-primary/70 bg-clip-text text-transparent">
                {selected ? selected.titleEn : "الرقمية اليوم"}
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {selected ? selected.description : BRAND.copy.hero.subtitle}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg shadow-xl shadow-primary/20 hover-elevate">
                  ابدأ الآن
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              {!selected && (
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-lg glass-card hover-elevate">
                    كيف نعمل؟
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {selected ? "مميزات الحل" : "ماذا تريد أن تبني؟"}
            </h2>
          </div>

          <div className={`grid gap-6 ${selected ? "max-w-xl mx-auto" : "md:grid-cols-2 lg:grid-cols-4"}`}>
            {displayOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className="relative cursor-pointer transition-all duration-300 hover-elevate group"
                  onClick={() => setSelectedOption(option.id)}
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-bold text-primary">{option.price}</span>
                      {option.price !== "اتصل بنا" && <span className="text-xs text-muted-foreground">ريال/شهرياً</span>}
                    </div>
                    <ul className="space-y-3">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {selected && (
            <div className="mt-12 text-center">
              <Button variant="ghost" onClick={() => setSelectedOption(null)}>
                عرض جميع الخيارات
              </Button>
            </div>
          )}
        </div>
      </section>

      {!selected && (
        <>
          <section className="py-12 border-y border-border bg-muted/30">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">لماذا QIROX؟</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  ميزات تجعلنا مختلفين
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={feature.title} className="border-0 bg-background shadow-sm">
                      <CardContent className="p-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
