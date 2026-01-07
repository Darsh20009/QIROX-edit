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
    description: "حلول تجارة إلكترونية متكاملة للمؤسسات والشركات",
    plans: [
      {
        duration: "خطة مدى الحياة",
        durationEn: "Lifetime Plan",
        price: "4999",
        originalPrice: null,
        savings: null,
        popular: false,
        isCustom: false,
        features: [
          "تحديثات وتطويرات مستمرة",
          "التكلفة كاملة علينا",
          "ملكية كاملة للكود",
          "دعم فني VIP",
          "استضافة سحابية فائقة"
        ]
      },
      {
        duration: "الخطة السنوية",
        durationEn: "Annual Plan",
        price: "699",
        originalPrice: null,
        savings: null,
        popular: true,
        isCustom: false,
        features: [
          "الضمان الذهبي",
          "دومين باسم الشركة",
          "تحديثات دورية",
          "دعم فني متكامل",
          "كل المميزات الأساسية"
        ]
      }
    ],
    features: [],
  },
  {
    id: "restaurants" as PlanCategory,
    name: "المطاعم والكافيهات",
    nameEn: "Restaurants & Cafes",
    icon: Coffee,
    description: "نظام إدارة المطاعم والعمليات التشغيلية",
    plans: [
      {
        duration: "خطة مدى الحياة",
        durationEn: "Lifetime Plan",
        price: "6999",
        originalPrice: null,
        savings: null,
        popular: false,
        isCustom: false,
        features: [
          "نظام نقاط بيع متكامل",
          "إدارة المخزون والموردين",
          "تطويرات مخصصة",
          "دعم فني موقعي",
          "أتمتة كاملة للعمليات"
        ]
      },
      {
        duration: "الخطة السنوية",
        durationEn: "Annual Plan",
        price: "599",
        originalPrice: "799",
        savings: "التجديد بـ 799 ريال",
        popular: true,
        isCustom: false,
        features: [
          "دعم فني 24/7",
          "تقارير ذكاء أعمال",
          "تكامل مع تطبيقات التوصيل",
          "ضمان استمرارية الخدمة"
        ]
      }
    ],
    features: [],
  },
  {
    id: "education" as PlanCategory,
    name: "أنظمة التعليم",
    nameEn: "Educational Systems",
    icon: GraduationCap,
    description: "حلول تعليمية ذكية مخصصة للمدارس والجامعات والمنصات التدريبية",
    plans: [
      {
        duration: "طلب عرض سعر",
        durationEn: "Request Quote",
        price: "تواصل معنا",
        originalPrice: null,
        savings: null,
        popular: false,
        isCustom: true,
        features: [
          "تخصيص كامل للنظام",
          "إدارة المدارس والجامعات",
          "منصات تدريبية متطورة",
          "دعم فني خاص"
        ]
      }
    ],
    features: [],
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
              خطط <span className="text-primary text-glow">إبداعية بسيطة</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed" data-testid="text-pricing-subtitle">
              خطوات سهلة، وضوح تام، ودعم لا ينقطع. اختر باقتك وابدأ رحلة النجاح.
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
                <div className={`grid gap-8 mb-20 ${category.plans.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2"}`}>
                  {category.plans.map((plan, index) => (
                    <Card
                      key={plan.duration}
                      className={`relative border-none bg-background shadow-sm transition-all duration-500 rounded-[2.5rem] p-4 ${plan.popular ? "ring-4 ring-primary shadow-2xl scale-[1.02] z-10" : "hover:shadow-xl hover:-translate-y-2"}`}
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
                          {plan.price === "تواصل معنا" ? (
                            <span className="text-4xl font-black tracking-tight" data-testid={`text-plan-price-${category.id}-${index}`}>
                              {plan.price}
                            </span>
                          ) : (
                            <div className="flex items-baseline justify-center gap-2">
                              <span className="text-7xl font-black tracking-tighter" data-testid={`text-plan-price-${category.id}-${index}`}>
                                {plan.price}
                              </span>
                              <span className="text-xl text-muted-foreground font-black">ريال</span>
                            </div>
                          )}
                        </div>

                        {plan.savings && (
                          <div className="mb-12">
                            <div className="inline-block px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-black text-sm">
                              {plan.savings}
                            </div>
                          </div>
                        )}

                        <div className="space-y-4 mb-12 text-right">
                          {plan.features?.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                              <span className="font-bold text-foreground/80">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Link href={plan.price === "تواصل معنا" ? "/contact" : "/register"} className="mt-auto block">
                          <Button
                            size="lg"
                            variant={plan.popular ? "default" : "outline"}
                            className={`w-full h-16 text-xl font-black rounded-2xl transition-all shadow-lg ${plan.popular ? "shadow-primary/20" : "border-2"}`}
                            data-testid={`button-subscribe-${category.id}-${index}`}
                          >
                            {plan.price === "تواصل معنا" ? "اطلب عرض سعر" : "اطلب الآن"}
                            <ArrowLeft className="mr-2 w-6 h-6" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
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
