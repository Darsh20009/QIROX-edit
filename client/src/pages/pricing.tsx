import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import { CheckCircle2, ArrowRight, HelpCircle, Store, Coffee, GraduationCap } from "lucide-react";
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
    name: "المتاجر والتطبيقات",
    nameEn: "E-commerce & Apps",
    icon: Store,
    description: "نظام متكامل للمتاجر الإلكترونية مع تكامل Tap, Tabby, Tamara",
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
      "تكامل مع Tap للدفع",
      "تكامل مع Tabby (اشتر الآن وادفع لاحقاً)",
      "تكامل مع Tamara",
      "إدارة المنتجات والمخزون",
      "تتبع الطلبات",
      "تقارير المبيعات",
      "دعم فني على مدار الساعة",
    ],
  },
  {
    id: "restaurants" as PlanCategory,
    name: "الكافيهات والمطاعم",
    nameEn: "Cafes & Restaurants",
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
      "تكامل مع تطبيقات التوصيل",
      "دعم فني متخصص",
    ],
  },
  {
    id: "education" as PlanCategory,
    name: "منصات التعليم",
    nameEn: "Education Platforms",
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
      "بوابة دفع متكاملة",
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
    answer: "نقبل الدفع عبر Tap, Tabby, Tamara, وكذلك التحويل البنكي المباشر.",
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
  const currentCategory = planCategories.find((c) => c.id === selectedCategory)!;
  const CategoryIcon = currentCategory.icon;

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6" data-testid="badge-pricing-intro">
              أقل الأسعار في السوق
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground" data-testid="text-pricing-title">
              خطط اشتراك مرنة
            </h1>
            <p className="mt-6 text-lg text-muted-foreground" data-testid="text-pricing-subtitle">
              اختر النظام المناسب لعملك بأسعار تنافسية. ابدأ اليوم وانمو معنا.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as PlanCategory)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12" data-testid="tabs-plan-categories">
              {planCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                    data-testid={`tab-category-${category.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {planCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground" data-testid={`text-category-name-${category.id}`}>
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground mt-2" data-testid={`text-category-desc-${category.id}`}>
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {category.plans.map((plan, index) => (
                    <Card
                      key={plan.duration}
                      className={`relative ${plan.popular ? "ring-2 ring-foreground" : ""}`}
                      data-testid={`card-plan-${category.id}-${index}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge variant="default" data-testid={`badge-popular-${category.id}`}>الأكثر شعبية</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-4">
                        <h3 className="text-lg font-semibold text-foreground" data-testid={`text-plan-duration-${category.id}-${index}`}>
                          {plan.duration}
                        </h3>
                        <p className="text-sm text-muted-foreground">{plan.durationEn}</p>
                      </CardHeader>
                      <CardContent className="text-center space-y-4">
                        <div>
                          {plan.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through block">
                              {plan.originalPrice} ريال
                            </span>
                          )}
                          <span className="text-4xl font-bold text-foreground" data-testid={`text-plan-price-${category.id}-${index}`}>
                            {plan.price}
                          </span>
                          <span className="text-lg text-muted-foreground mr-1">ريال</span>
                        </div>
                        {plan.savings && (
                          <Badge variant="secondary" className="text-green-600 dark:text-green-400">
                            {plan.savings}
                          </Badge>
                        )}
                        <Link href="/register" className="block pt-4">
                          <Button
                            variant={plan.popular ? "default" : "outline"}
                            className="w-full"
                            data-testid={`button-subscribe-${category.id}-${index}`}
                          >
                            ابدأ الآن
                            <ArrowRight className="mr-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                      مميزات {category.name}
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {category.features.map((feature, index) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                          data-testid={`feature-${category.id}-${index}`}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-foreground text-sm">{feature}</span>
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

      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4">
              <HelpCircle className="w-6 h-6 text-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              الأسئلة الشائعة
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger
                  className="text-right font-medium text-foreground hover:no-underline"
                  data-testid={`accordion-faq-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-right" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            ابدأ تجربتك المجانية اليوم
          </h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            جرب النظام مجاناً لمدة 14 يوم. لا تحتاج بطاقة ائتمان.
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg" data-testid="button-cta-free-trial">
              ابدأ التجربة المجانية
              <ArrowRight className="mr-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
