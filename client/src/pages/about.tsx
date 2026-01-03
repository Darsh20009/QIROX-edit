import { Layout } from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Rocket, Target, Heart, ArrowLeft } from "lucide-react";

export default function About() {
  const values = [
    { icon: Rocket, title: "الابتكار", desc: "نسعى دائماً لتقديم حلول خارج الصندوق تتجاوز المألوف." },
    { icon: Target, title: "الدقة", desc: "نهتم بأدق التفاصيل لضمان جودة استثنائية في كل سطر برمج." },
    { icon: Heart, title: "الشغف", desc: "نعمل بشغف لنحول أفكار عملائنا إلى قصص نجاح ملهمة." },
    { icon: Users, title: "العميل أولاً", desc: "رضا عملائنا هو البوصلة التي توجه جميع قراراتنا." }
  ];

  return (
    <Layout>
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight mb-8">
            نحن نصنع <span className="text-primary text-glow">المستقبل الرقمي</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
            QIROX هي شركة تقنية سعودية رائدة، تأسست بهدف تمكين الشركات والأفراد من امتلاك أدوات تقنية متطورة تنافس عالمياً.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <Card key={i} className="border-none bg-background shadow-sm rounded-3xl p-8 text-right hover:shadow-xl transition-all group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{value.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative rounded-[4rem] bg-primary p-16 md:p-32 text-center overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                جاهز لتكون <br /> جزءاً من القصة؟
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register">
                  <Button size="lg" className="h-20 px-12 text-2xl font-black rounded-2xl bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:scale-105">
                    ابدأ مشروعك الآن
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="h-20 px-12 text-2xl font-black rounded-2xl border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
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
