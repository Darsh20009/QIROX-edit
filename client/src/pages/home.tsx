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

const caseStudies = [
  {
    title: "منصة إمداد التقنية",
    type: "Business Systems",
    result: "أتمتة 90% من العمليات الإدارية",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "متجر رداء النخبة",
    type: "Store",
    result: "زيادة المبيعات بنسبة 150%",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "تطبيق وصلني",
    type: "Custom Build",
    result: "خدمة 10,000 مستخدم نشط",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
  },
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

import qiroxHero from "@assets/qirox_1767360025807.png";
import qiroxControl from "@assets/ChatGPT_Image_Jan_2,_2026,_04_26_37_PM_1767360506756.png";

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
      {/* Creative Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 dark:bg-primary/20 light:bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-50 dark:opacity-100" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-50 dark:opacity-100" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        </div>

        <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-right space-y-8 animate-fade-in">
            <Badge variant="outline" className="whitespace-nowrap inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border [border-color:var(--badge-outline)] shadow-xs px-4 py-2 border-primary/30 text-primary-foreground bg-primary/5 rounded-full text-lg ml-[152px] mr-[152px]">
              {BRAND.slogan}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
              {selected ? `ابنِ ${selected.title}` : "نظام ذكي"}
              <span className="block text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                {selected ? selected.titleEn : "لمستقبل عملك"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-xl leading-relaxed">
              {selected ? selected.description : "نحن لا نبني مجرد أكواد، بل نصمم تجارب تقنية تعزز من كفاءة أعمالك وتجعلها أكثر إنسانية وإبداعاً."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all hover:scale-105 active-elevate-2">
                  ابدأ رحلتك الإبداعية
                  <ArrowLeft className="mr-3 w-6 h-6" />
                </Button>
              </Link>
              {!selected && (
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl border-white/10 text-white hover:bg-white/5 backdrop-blur-sm">
                    استكشف كيف نعمل
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="relative z-10 transition-transform duration-700 group-hover:rotate-y-6 group-hover:scale-105">
              <img 
                src={qiroxHero} 
                alt="QIROX Futuristic Interaction" 
                className="rounded-3xl shadow-2xl border border-white/5 mt-[81px] mb-[81px]"
              />
              <div className="absolute -inset-4 bg-primary/20 blur-2xl -z-10 rounded-full group-hover:opacity-100 opacity-0 transition-opacity" />
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -top-6 -right-6 p-6 glass-card rounded-2xl border border-white/10 animate-bounce-slow hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white font-bold text-lg">الأنظمة متصلة</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Control & Intelligence Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/10">
                <img 
                  src={qiroxControl} 
                  alt="QIROX Control Center" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-8 left-8 text-right">
                  <Badge className="mb-4 bg-primary text-white border-0">مركز التحكم الذكي</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">إدارة متكاملة بلمسة واحدة</h3>
                  <p className="text-white/70">كل تفاصيل عملك تحت سيطرتك، بكل بساطة واحترافية.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 text-right">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                احترافية تفوق <br />
                <span className="text-primary">التوقعات</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                في QIROX، نؤمن أن التقنية يجب أن تكون في خدمة الإنسان. نظامنا مصمم ليعطيك القوة والتحكم، مع واجهة مستخدم إبداعية تجعل العمل متعة لا تنتهي.
              </p>
              
              <div className="grid gap-6">
                {[
                  { title: "بناء الأنظمة", desc: "تصميم أنظمة معقدة بواجهة بسيطة." },
                  { title: "الذكاء الاصطناعي", desc: "أتمتة ذكية تتعلم من أداء عملك." },
                  { title: "الأمان المطلق", desc: "حماية بياناتك هي أولويتنا القصوى." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                    <div className="flex-1 text-right">
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Existing Options Grid */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 text-right">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              {selected ? "مميزات الحل المختار" : "اختر مسارك للإبداع"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              حلول تقنية مصممة لتنمو مع طموحك. اختر ما يناسب أهدافك اليوم.
            </p>
          </div>

          <div className={`grid gap-8 ${selected ? "max-w-2xl mx-auto" : "md:grid-cols-2 lg:grid-cols-4"}`}>
            {displayOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className="relative overflow-hidden cursor-pointer transition-all duration-500 hover-elevate group border-border/50 bg-background/80 backdrop-blur-sm rounded-3xl"
                  onClick={() => setSelectedOption(option.id)}
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{option.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-4xl font-black text-primary">{option.price}</span>
                      {option.price !== "اتصل بنا" && <span className="text-sm text-muted-foreground">ريال/شهر</span>}
                    </div>
                    <ul className="space-y-4">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative rounded-[40px] bg-primary p-12 md:p-24 text-center overflow-hidden shadow-2xl shadow-primary/40">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                هل أنت مستعد <br /> لنقل عملك للمستقبل؟
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto">
                انضم إلى أكثر من 500 شركة بدأت رحلتها الرقمية مع QIROX.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link href="/register">
                  <Button size="lg" className="h-20 px-12 text-2xl font-black rounded-3xl bg-white text-primary hover:bg-white/90 shadow-xl transition-all hover:scale-105">
                    ابدأ مجاناً الآن
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="h-20 px-12 text-2xl font-black rounded-3xl border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                    تحدث معنا
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

