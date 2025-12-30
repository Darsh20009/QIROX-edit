import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowLeft, Target, Eye, Heart } from "lucide-react";
import { Link } from "wouter";

const values = [
  {
    icon: Target,
    title: "الهدف قبل الربح",
    description: "نحن نبني أنظمة تخدم احتياجات بشرية حقيقية. يجب أن يجعل كل مشروع عمل شخص ما أسهل أو أعماله أفضل.",
  },
  {
    icon: Eye,
    title: "شفافية مطلقة",
    description: "لا توجد صناديق سوداء أو عمليات خفية. ترى كل قرار، وتوافق على كل تغيير، وتفهم بالضبط ما تحصل عليه.",
  },
  {
    icon: Heart,
    title: "التواصل البشري",
    description: "يجب أن تعزز التكنولوجيا القدرة البشرية، لا أن تحل محلها. نحن نبني أدوات تبقي البشر في القيادة.",
  },
];

export default function About() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            عن QIROX
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            نؤمن بأن أفضل التقنيات هي التي تخدم الإنسان. لهذا السبب نبني أنظمة تضع الناس في المركز.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  تأسست QIROX بناءً على ملاحظة بسيطة: مع تزايد قوة التكنولوجيا، غالباً ما تصبح أقل إنسانية. الأتمتة تعد بالكفاءة ولكنها تسبب القلق.
                </p>
                <p>
                  بدأنا QIROX لتقديم بديل. مكان تكون فيه التكنولوجيا أداة، وليست بديلاً. حيث يكون لكل نظام نبنيه إشراف بشري واضح.
                </p>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="p-8 text-center">
                  <blockquote className="text-lg text-foreground italic">
                    "ابنِ أنظمة.. وابقَ إنساناً"
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-muted mb-5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
