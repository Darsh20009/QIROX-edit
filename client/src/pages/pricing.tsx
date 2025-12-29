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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2" data-testid="badge-pricing-intro">
              أقل الأسعار في السوق
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground" data-testid="text-pricing-title">
              خطط اشتراك مرنة
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
              اختر النظام المناسب لعملك بأسعار تنافسية. ابدأ تجربتك المجانية اليوم.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as PlanCategory)} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="h-14 p-1.5" data-testid="tabs-plan-categories">
                {planCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-6 py-3 data-[state=active]:shadow-sm"
                      data-testid={`tab-category-${category.id}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="hidden sm:inline font-medium">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {planCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" data-testid={`text-category-name-${category.id}`}>
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground" data-testid={`text-category-desc-${category.id}`}>
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {category.plans.map((plan, index) => (
                    <Card
                      key={plan.duration}
                      className={`relative border-0 shadow-md transition-all duration-300 ${plan.popular ? "ring-2 ring-primary shadow-lg scale-[1.02]" : "hover-elevate"}`}
                      data-testid={`card-plan-${category.id}-${index}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="px-4 py-1.5 text-sm" data-testid={`badge-popular-${category.id}`}>
                            الأكثر شعبية
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-8 pt-10">
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-bold text-foreground mb-1" data-testid={`text-plan-duration-${category.id}-${index}`}>
                            {plan.duration}
                          </h3>
                          <p className="text-sm text-muted-foreground">{plan.durationEn}</p>
                        </div>
                        <div className="text-center mb-6">
                          {plan.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through block mb-1">
                              {plan.originalPrice} ريال
                            </span>
                          )}
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl font-bold text-foreground" data-testid={`text-plan-price-${category.id}-${index}`}>
                              {plan.price}
                            </span>
                            <span className="text-lg text-muted-foreground">ريال</span>
                          </div>
                        </div>
                        {plan.savings && (
                          <div className="text-center mb-6">
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                              {plan.savings}
                            </Badge>
                          </div>
                        )}
                        <Link href="/register" className="block">
                          <Button
                            variant={plan.popular ? "default" : "outline"}
                            className="w-full h-12 text-base font-semibold"
                            data-testid={`button-subscribe-${category.id}-${index}`}
                          >
                            ابدأ الآن
                            <ArrowLeft className="w-5 h-5" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-0 shadow-sm bg-muted/30">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-8 text-center">
                      جميع الميزات المتضمنة
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.features.map((feature, index) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                          data-testid={`feature-${category.id}-${index}`}
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              الأسئلة الشائعة
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 bg-background rounded-xl px-6 shadow-sm"
              >
                <AccordionTrigger
                  className="text-right font-semibold text-foreground hover:no-underline py-5"
                  data-testid={`accordion-faq-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right pb-5 leading-relaxed" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative rounded-2xl bg-gradient-to-l from-primary to-primary/80 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                ابدأ تجربتك المجانية اليوم
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
                جرب النظام مجاناً لمدة 14 يوم. لا تحتاج بطاقة ائتمان.
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="px-10 py-6 text-lg font-semibold" data-testid="button-cta-free-trial">
                  ابدأ التجربة المجانية
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
