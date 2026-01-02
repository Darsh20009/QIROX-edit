import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import { CheckCircle2, ArrowLeft, HelpCircle, Store, Coffee, GraduationCap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PlanCategory = "stores" | "restaurants" | "education";

const planCategories = [
  {
    id: "stores" as PlanCategory,
    name: "المتاجر الإلكترونية",
    nameEn: "E-commerce",
    icon: Store,
    description: "نظام متكامل للمتاجر الإلكترونية مع إدارة المنتجات والطلبات",
    plans: [
      {
        duration: "شهري",
        durationEn: "Monthly",
        price: "100",
        originalPrice: null,
        savings: null,
      },
      {
        duration: "6 أشهر",
        durationEn: "6 Months",
        price: "500",
        originalPrice: "600",
        savings: "وفر 100 ريال",
        popular: true,
      },
      {
        duration: "سنوي",
        durationEn: "Yearly",
        price: "899",
        originalPrice: "1200",
        savings: "وفر 301 ريال",
      },
    ],
    features: [
      "متجر إلكتروني كامل",
      "إدارة المنتجات والمخزون",
      "نظام الطلبات المتكامل",
      "تقارير المبيعات",
      "دعم متعدد اللغات",
      "تصميم متجاوب",
      "لوحة تحكم شاملة",
      "دعم فني 24/7",
    ],
  },
  {
    id: "restaurants" as PlanCategory,
    name: "المطاعم والكافيهات",
    nameEn: "Restaurants",
    icon: Coffee,
    description: "نظام نقاط البيع وإدارة المطاعم الشامل",
    plans: [
      {
        duration: "شهري",
        durationEn: "Monthly",
        price: "179",
        originalPrice: null,
        savings: null,
      },
      {
        duration: "6 أشهر",
        durationEn: "6 Months",
        price: "599",
        originalPrice: "1074",
        savings: "وفر 475 ريال",
        popular: true,
      },
      {
        duration: "سنوي",
        durationEn: "Yearly",
        price: "1099",
        originalPrice: "2148",
        savings: "وفر 1049 ريال",
      },
    ],
    features: [
      "نظام نقاط البيع (POS)",
      "إدارة القوائم والأسعار",
      "إدارة الطاولات والحجوزات",
      "نظام المطبخ",
      "إدارة الموظفين والورديات",
      "تقارير يومية وشهرية",
      "طباعة الفواتير",
      "دعم فني متخصص",
    ],
  },
  {
    id: "education" as PlanCategory,
    name: "المنصات التعليمية",
    nameEn: "Education",
    icon: GraduationCap,
    description: "نظام إدارة التعلم الإلكتروني المتكامل",
    plans: [
      {
        duration: "شهري",
        durationEn: "Monthly",
        price: "199",
        originalPrice: null,
        savings: null,
      },
      {
        duration: "6 أشهر",
        durationEn: "6 Months",
        price: "999",
        originalPrice: "1194",
        savings: "وفر 195 ريال",
        popular: true,
      },
      {
        duration: "سنوي",
        durationEn: "Yearly",
        price: "1799",
        originalPrice: "2388",
        savings: "وفر 589 ريال",
      },
    ],
    features: [
      "منصة تعليمية متكاملة",
      "إدارة الدورات والمحتوى",
      "نظام الاختبارات والشهادات",
      "بث مباشر للدروس",
      "منتدى نقاش الطلاب",
      "تتبع تقدم الطلاب",
      "شهادات رقمية",
      "تطبيق جوال للطلاب",
    ],
  },
];

const faqs = [
  {
    question: "هل يمكنني تغيير الخطة لاحقاً؟",
    answer: "نعم، يمكنك الترقية أو تغيير خطتك في أي وقت. سيتم احتساب الفرق بشكل تناسبي.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل الدفع عبر التحويل البنكي. تواصل معنا عبر الواتساب لإتمام عملية الدفع.",
  },
  {
    question: "هل هناك فترة تجريبية مجانية؟",
    answer: "نعم، نوفر فترة تجريبية مجانية لمدة 14 يوماً لجميع الخطط.",
  },
  {
    question: "ماذا يشمل الدعم الفني؟",
    answer: "الدعم الفني يشمل المساعدة التقنية، حل المشاكل، والتحديثات المستمرة للنظام.",
  },
  {
    question: "هل يمكنني إلغاء الاشتراك؟",
    answer: "نعم، يمكنك إلغاء اشتراكك في أي وقت. للاشتراكات الطويلة، يتم استرداد المبلغ المتبقي بشكل تناسبي.",
  },
];

export default function Pricing() {
  const [selectedCategory, setSelectedCategory] = useState<PlanCategory>("stores");

  return (
    <Layout>
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest" data-testid="badge-pricing-intro">
              شفافية مطلقة في الأسعار
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight" data-testid="text-pricing-title">
              استثمر في <span className="text-primary text-glow">نمو عملك</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed" data-testid="text-pricing-subtitle">
              خطط مدروسة بعناية لتناسب كل مرحلة من مراحل تطور مشروعك. ابدأ اليوم بأسعار تبدأ من 100 ريال فقط.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as PlanCategory)} className="w-full">
            <div className="flex justify-center mb-20">
              <TabsList className="h-20 p-2 bg-secondary/50 rounded-2xl border border-border/40" data-testid="tabs-plan-categories">
                {planCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-10 py-4 data-[state=active]:bg-background data-[state=active]:shadow-xl rounded-xl transition-all font-black text-lg gap-3"
                      data-testid={`tab-category-${category.id}`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {planCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {category.plans.map((plan, index) => (
                    <Card
                      key={plan.duration}
                      className={`relative border-none bg-background shadow-sm transition-all duration-500 rounded-[2.5rem] p-4 ${plan.popular ? "ring-4 ring-primary shadow-2xl scale-[1.05] z-10" : "hover:shadow-xl hover:-translate-y-2"}`}
                      data-testid={`card-plan-${category.id}-${index}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                          <Badge className="px-6 py-2 text-sm font-black rounded-full bg-primary text-white shadow-lg shadow-primary/20" data-testid={`badge-popular-${category.id}`}>
                            الخيار المفضل
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-10 text-center flex flex-col h-full">
                        <div className="mb-10">
                          <h3 className="text-2xl font-black mb-2" data-testid={`text-plan-duration-${category.id}-${index}`}>
                            {plan.duration}
                          </h3>
                          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{plan.durationEn}</p>
                        </div>

                        <div className="mb-12">
                          {plan.originalPrice && (
                            <span className="text-lg text-muted-foreground/60 line-through block mb-2 font-medium">
                              {plan.originalPrice} ريال
                            </span>
                          )}
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-7xl font-black tracking-tighter" data-testid={`text-plan-price-${category.id}-${index}`}>
                              {plan.price}
                            </span>
                            <span className="text-xl text-muted-foreground font-black">ريال</span>
                          </div>
                        </div>

                        {plan.savings && (
                          <div className="mb-12">
                            <div className="inline-block px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-black text-sm">
                              {plan.savings}
                            </div>
                          </div>
                        )}

                        <Link href="/register" className="mt-auto block">
                          <Button
                            size="lg"
                            variant={plan.popular ? "default" : "outline"}
                            className={`w-full h-16 text-xl font-black rounded-2xl transition-all shadow-lg ${plan.popular ? "shadow-primary/20" : "border-2"}`}
                            data-testid={`button-subscribe-${category.id}-${index}`}
                          >
                            ابدأ الآن
                            <ArrowLeft className="mr-2 w-6 h-6" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-secondary/30 rounded-[3rem] p-12 md:p-20">
                  <h3 className="text-3xl font-black mb-16 text-center">كل ما ستحصل عليه</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {category.features.map((feature, index) => (
                      <div
                        key={feature}
                        className="flex items-center gap-6 group"
                        data-testid={`feature-${category.id}-${index}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-bold text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-32 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-20 space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 shadow-inner">
              <HelpCircle className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              أسئلة قد تدور بذهنك
            </h2>
            <p className="text-lg text-muted-foreground font-medium">نحن هنا لتوضيح كل شيء قبل أن تبدأ.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none bg-background rounded-3xl px-8 shadow-sm transition-all hover:shadow-md"
              >
                <AccordionTrigger
                  className="text-right font-black text-xl text-foreground hover:no-underline py-8"
                  data-testid={`accordion-faq-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right pb-8 text-lg font-medium leading-relaxed" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
