import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Zap, Globe, Palette, ArrowLeft } from "lucide-react";
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
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-8">
            كيف يعمل <span className="text-primary text-glow">QIROX؟</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            نحن نبسط لك العمليات التقنية المعقدة لتركز أنت على نمو تجارتك وإبداعك. أربع خطوات تفصلك عن النجاح.
          </p>
        </div>
      </section>

      <section className="py-24 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative z-10 text-center group">
                  <div className="w-24 h-24 rounded-3xl bg-background border-4 border-primary text-primary flex items-center justify-center mx-auto mb-10 shadow-2xl transition-all group-hover:bg-primary group-hover:text-white">
                    <Icon className="w-10 h-10" />
                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-black text-xl shadow-lg border-4 border-background">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-6">{step.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-background rounded-[3rem] p-12 md:p-20 text-center shadow-xl">
            <h2 className="text-4xl font-black mb-8">هل أنت مستعد للانطلاق؟</h2>
            <p className="text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto">انضم لآلاف الشركات التي تثق في QIROX لبناء حضورها الرقمي الاحترافي.</p>
            <Link href="/register">
              <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl shadow-lg shadow-primary/20">
                ابدأ رحلتك الآن مجاناً
                <ArrowLeft className="mr-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
