import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import { BRAND } from "@shared/branding";
import { SEO } from "@/components/layout/seo";
import { motion, AnimatePresence } from "framer-motion";
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
      {/* Refined Hero Section with Vibrant Background */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" 
          />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-right space-y-8 animate-float">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-primary text-sm font-bold border-primary/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              {BRAND.slogan}
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight">
              نصمم <span className="text-gradient drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">المستقبل</span> <br />
              بذكاء <span className="relative inline-block text-glow">
                QIROX
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-full blur-[2px]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mr-0">
              {BRAND.copy.hero.subtitle}
            </p>

            <div className="flex flex-row-reverse gap-6 pt-8">
              <Link href="/register">
                <Button size="lg" className="h-14 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-transform" data-testid="button-start">
                  ابدأ رحلتك
                </Button>
              </Link>
              {!selected && (
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-black text-lg glass-morphism hover:bg-primary/5" data-testid="button-info">
                    تعرف علينا
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="hover-elevate p-4 rounded-2xl">
                  <div className="text-3xl font-black text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src={qiroxHero} 
                alt="QIROX Experience" 
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -inset-1 bg-primary/20 blur-2xl -z-10 rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Reimagined Features Grid */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              {selected ? "باقة متكاملة لنجاحك" : "لماذا يختارنا الرواد؟"}
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              نحن لا نقدم مجرد خدمة، بل شراكة استراتيجية تضمن لك التميز في السوق الرقمي.
            </p>
          </div>

          <div className={`grid gap-6 ${selected ? "max-w-4xl mx-auto md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"}`}>
            {displayOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className="group relative border-none bg-background shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedOption(option.id)}
                  data-testid={`card-service-${option.id}`}
                >
                  <CardContent className="p-10 glass-morphism">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110 group-hover:rotate-3 shadow-neon">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{option.title}</h3>
                    <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                      <div className="text-2xl font-black text-gradient">{option.price}</div>
                      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Control Section Update */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={qiroxControl} 
                  alt="QIROX Control" 
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 p-10 bg-background rounded-[2rem] shadow-2xl border border-border/40 hidden xl:block max-w-xs">
                <p className="text-lg font-bold mb-2">ذكاء اصطناعي متقدم</p>
                <p className="text-sm text-muted-foreground">نظامنا يتعلم من عملك ليقترح لك أفضل الحلول للأتمتة والنمو.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10">
              <h2 className="text-5xl md:text-6xl font-black leading-[1.1]">
                قوة التحكم في <br />
                <span className="text-primary text-glow">راحة يدك</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                في QIROX، نؤمن أن التقنية المعقدة يجب أن تأتي بواجهة بسيطة. نحن نوفر لك لوحة تحكم شاملة تجعلك تدير إمبراطوريتك الرقمية بكل هدوء وثقة.
              </p>

              <div className="grid gap-4">
                {[
                  { title: "بناء الأنظمة", desc: "تصميم أنظمة معقدة بواجهة بديهية." },
                  { title: "الأمان السيبراني", desc: "تشفير عسكري لحماية بيانات عملائك." },
                  { title: "التوسع السحابي", desc: "نظام ينمو معك، من فكرة إلى عالمية." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-center p-6 rounded-[1.5rem] bg-secondary/50 hover:bg-secondary transition-colors group">
                    <div className="w-3 h-12 bg-primary/20 group-hover:bg-primary transition-colors rounded-full" />
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[4rem] bg-primary p-16 md:p-32 text-center overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10" />
            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                جاهز لصناعة <br /> قصتك القادمة؟
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register">
                  <Button size="lg" className="h-20 px-12 text-2xl font-black rounded-2xl bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:scale-105" data-testid="button-cta-start">
                    ابدأ الآن مجاناً
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="h-20 px-12 text-2xl font-black rounded-2xl border-white/20 text-white hover:bg-white/10 backdrop-blur-md" data-testid="button-cta-contact">
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
