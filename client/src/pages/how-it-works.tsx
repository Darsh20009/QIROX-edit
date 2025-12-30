import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  ArrowLeft, 
  Rocket, 
  Zap, 
  Globe,
  Palette
} from "lucide-react";
import { Link } from "wouter";

const steps = [
  {
    icon: Rocket,
    title: "ابدأ رحلتك",
    description: "قم بالتسجيل في المنصة واختيار نوع المشروع الذي يناسبك سواء كان متجراً، مطعماً، أو منصة تعليمية."
  },
  {
    icon: Palette,
    title: "خصص هويتك",
    description: "استخدم أدوات التخصيص المتقدمة لاختيار الألوان، الخطوط، وتخطيط الصفحات بما يعكس علامتك التجارية."
  },
  {
    icon: Zap,
    title: "أضف محتواك",
    description: "ارفع منتجاتك، قوائم الطعام، أو دوراتك التعليمية بسهولة من خلال لوحة التحكم المتطورة."
  },
  {
    icon: Globe,
    title: "انطلق للعالم",
    description: "بضغطة زر واحدة، سيكون موقعك جاهزاً لاستقبال العملاء والطلبات من كل مكان."
  }
];

export default function HowItWorks() {
  return (
    <Layout>
      <section className="py-20 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">كيف يعمل QIROX؟</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نحن نبسط لك العمليات التقنية المعقدة لتركز أنت على نمو تجارتك وإبداعك.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
