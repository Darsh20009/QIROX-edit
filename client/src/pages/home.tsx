import { ChevronLeft, Check, Zap, Shield, Globe, ArrowUpRight, Play, Cpu, Layers, BarChart3, Users, Clock, HeadphonesIcon, Rocket, Building2, Package, CreditCard, MessageSquare, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    { 
      icon: Rocket, 
      title: "نقل سريع", 
      desc: "ننقل لك مشروعك باللي فيه خلال مدة أقصاها 7 أيام عمل"
    },
    { 
      icon: HeadphonesIcon, 
      title: "دعم فني 24/7", 
      desc: "فريق دعم متخصص جاهز لمساعدتك في أي وقت"
    },
    { 
      icon: Shield, 
      title: "أمان متقدم", 
      desc: "حماية بياناتك بأعلى معايير الأمان والتشفير"
    },
    { 
      icon: BarChart3, 
      title: "تحليلات ذكية", 
      desc: "تقارير ومؤشرات أداء لاتخاذ قرارات أفضل"
    },
  ];

  const steps = [
    { num: "1", title: "سجّل حسابك", desc: "أنشئ حسابك مجاناً في دقائق معدودة" },
    { num: "2", title: "أضف بياناتك", desc: "أدخل معلومات مشروعك والبيانات المطلوبة" },
    { num: "3", title: "ابدأ العمل", desc: "استمتع بإدارة مشروعك بكفاءة وسهولة" },
  ];

  const partners = [
    "شركة النور", "مؤسسة الرياض", "متجر الخليج", "تقنية المستقبل", 
    "حلول رقمية", "إبداع تقني", "نجاح للأعمال", "مشاريع السعودية"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="QIROX | ابنِ أنظمتك. ابقَ إنساناً." description="منصة متكاملة لإدارة الأعمال بتقنيات الذكاء الاصطناعي" />
      
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Badge className="bg-primary/10 text-primary border-0 px-6 py-2.5 text-sm font-medium rounded-full">
                <Zap className="w-4 h-4 ml-2" />
                الجيل الجديد من إدارة الأعمال
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.15] tracking-tight">
                ابنِ أنظمتك.
                <br />
                <span className="text-primary">ابقَ إنساناً.</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                منصة متكاملة تدمج بين قوة الذكاء الاصطناعي وبساطة التصميم،
                <br className="hidden md:block" />
                لتمكين فريقك من تحقيق المستحيل.
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 pt-4"
              >
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    data-testid="button-start-free"
                  >
                    ابدأ تجربتك المجانية
                    <ChevronLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-8 rounded-full text-base font-medium border-2 hover:bg-muted transition-all duration-300"
                    data-testid="button-contact-sales"
                  >
                    تواصل مع المبيعات
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground"
              >
                ننقل لك متجرك باللي فيه خلال مدة أقصاها <span className="font-bold text-primary">7 أيام عمل</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-b border-border/50 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
            أكبر الشركات يختارون QIROX لإدارة أعمالهم
          </p>
          <div className="flex gap-12 animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 px-8 py-4 bg-card rounded-xl border border-border/50 shadow-sm"
              >
                <span className="text-muted-foreground font-medium whitespace-nowrap">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-medium rounded-full mb-6">
              لماذا QIROX؟
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              كل ما تحتاجه في <span className="text-primary">مكان واحد</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة شاملة توفر لك جميع الأدوات اللازمة لإدارة أعمالك بكفاءة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-medium rounded-full mb-6">
              كيف يعمل؟
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ابدأ في <span className="text-primary">ثلاث خطوات</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg shadow-primary/25 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-medium rounded-full mb-6">
                <Star className="w-4 h-4 ml-2" />
                مميزات حصرية
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                أدوات متقدمة لنمو أعمالك
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                نوفر لك مجموعة شاملة من الأدوات والخدمات التي تساعدك على إدارة وتطوير أعمالك بكفاءة عالية
              </p>
              <ul className="space-y-4">
                {[
                  "لوحة تحكم متكاملة وسهلة الاستخدام",
                  "تقارير وتحليلات مفصلة في الوقت الفعلي",
                  "دعم متعدد اللغات والعملات",
                  "تكامل مع أكثر من 50 خدمة خارجية",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/features">
                  <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-full font-medium shadow-lg shadow-primary/25">
                    اكتشف المزيد
                    <ChevronLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 relative">
                <div className="absolute inset-4 bg-card rounded-2xl shadow-2xl border border-border/50 p-6">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <Card className="border-0 bg-primary/5">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Package className="w-10 h-10 text-primary mb-3" />
                        <span className="text-2xl font-bold">1,234</span>
                        <span className="text-sm text-muted-foreground">مشروع</span>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-primary/5">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Users className="w-10 h-10 text-primary mb-3" />
                        <span className="text-2xl font-bold">500+</span>
                        <span className="text-sm text-muted-foreground">عميل</span>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-primary/5">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <CreditCard className="w-10 h-10 text-primary mb-3" />
                        <span className="text-2xl font-bold">99.9%</span>
                        <span className="text-sm text-muted-foreground">رضا العملاء</span>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-primary/5">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <MessageSquare className="w-10 h-10 text-primary mb-3" />
                        <span className="text-2xl font-bold">24/7</span>
                        <span className="text-sm text-muted-foreground">دعم فني</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              جاهز للبدء؟
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              انضم إلى أكثر من 500 شركة تستخدم QIROX لإدارة أعمالها بنجاح
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="h-14 px-10 bg-white text-primary hover:bg-white/90 rounded-full text-base font-bold shadow-xl"
                  data-testid="button-cta-register"
                >
                  ابدأ تجربتك المجانية
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-10 border-2 border-white/30 text-white hover:bg-white/10 rounded-full text-base font-semibold"
                  data-testid="button-cta-contact"
                >
                  تحدث مع خبير
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">QIROX</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                منصة متكاملة لإدارة الأعمال بتقنيات الذكاء الاصطناعي
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">المنتج</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">المميزات</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">الأسعار</Link></li>
                <li><Link href="/integrations" className="hover:text-primary transition-colors">التكاملات</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">الشركة</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">وظائف</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">الدعم</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary transition-colors">مركز المساعدة</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              2026 QIROX. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">الخصوصية</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
