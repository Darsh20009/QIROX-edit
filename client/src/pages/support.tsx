import { Layout } from "@/components/layout/layout";
import { SEO } from "@/components/layout/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, MessageSquare, LifeBuoy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const supportOptions = [
  {
    icon: Headphones,
    title: "الدعم الفني المباشر",
    description: "تحدث مع خبير تقني لمساعدتك في حل أي مشكلة تواجهك.",
    action: "تواصل الآن",
    link: "https://wa.me/2011201921",
  },
  {
    icon: MessageSquare,
    title: "الاستشارات الفنية",
    description: "احصل على استشارة مهنية حول أفضل الأنظمة لعملك.",
    action: "احجز موعداً",
    link: "/contact",
  },
  {
    icon: LifeBuoy,
    title: "مركز المساعدة",
    description: "مقالات وأدلة تعليمية تغطي كل تفاصيل المنصة.",
    action: "تصفح الأدلة",
    link: "#",
  },
  {
    icon: FileText,
    title: "طلبات الميزات",
    description: "هل لديك فكرة لنظام جديد؟ نحن نستمع لمقترحاتك.",
    action: "أرسل فكرة",
    link: "/contact",
  },
];

export default function Support() {
  return (
    <Layout>
      <SEO title="الدعم الفني" description="دعم فني بشري متخصص لمساعدة عملك على النمو." />
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">الدعم الفني البشري</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              نحن لا نستخدم الردود الآلية المعقدة. ستحصل دائماً على مساعدة من إنسان حقيقي يفهم احتياجاتك.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.title} className="hover-elevate border-0 shadow-sm bg-muted/30 no-default-hover-elevate">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={option.link}>{option.action}</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
