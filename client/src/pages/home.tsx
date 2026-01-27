import { ChevronLeft, Check, Zap, Shield, Globe, ArrowUpRight, Play, Cpu, Layers, BarChart3, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    { 
      icon: Zap, 
      title: "سرعة خارقة", 
      desc: "أداء فائق السرعة مع تقنيات الذكاء الاصطناعي المتقدمة",
      gradient: "from-amber-500 to-orange-600"
    },
    { 
      icon: Shield, 
      title: "أمان لا يُضاهى", 
      desc: "تشفير من الدرجة العسكرية لحماية بياناتك الحساسة",
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      icon: Globe, 
      title: "وصول عالمي", 
      desc: "دعم متعدد اللغات مع انتشار في أكثر من 50 دولة",
      gradient: "from-blue-500 to-cyan-600"
    },
    { 
      icon: Cpu, 
      title: "ذكاء اصطناعي", 
      desc: "أتمتة ذكية تتعلم من أنماط عملك وتتكيف معها",
      gradient: "from-purple-500 to-pink-600"
    },
  ];

  const stats = [
    { value: "500+", label: "عميل نشط", icon: Users },
    { value: "99.9%", label: "وقت التشغيل", icon: Zap },
    { value: "24/7", label: "دعم فني", icon: Shield },
    { value: "50M+", label: "عملية يومياً", icon: BarChart3 },
  ];

  const testimonials = [
    { name: "أحمد الخالدي", role: "مدير تقني", text: "غيّر QIROX طريقة إدارتنا للمشاريع بالكامل" },
    { name: "سارة العمري", role: "مؤسسة شركة", text: "منصة رائعة وفريق دعم استثنائي" },
    { name: "محمد الفيصل", role: "مدير عمليات", text: "وفّرنا 40% من وقت الإدارة" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO title="QIROX | ابنِ أنظمتك. ابقَ إنساناً." description="منصة متكاملة لإدارة الأعمال بتقنيات الذكاء الاصطناعي" />
      
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 to-primary/30 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "-4s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0 backdrop-blur-sm">
                  <Zap className="w-4 h-4 ml-2" />
                  الجيل الجديد من إدارة الأعمال
                </Badge>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                <span className="block">ابنِ أنظمتك.</span>
                <span className="block gradient-text text-glow">ابقَ إنساناً.</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                منصة متكاملة تدمج بين قوة الذكاء الاصطناعي وبساطة التصميم، لتمكين فريقك من تحقيق المستحيل.
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 pt-4"
              >
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="h-14 px-10 gradient-bg text-white rounded-2xl text-base font-semibold shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all duration-300 group"
                    data-testid="button-start-free"
                  >
                    ابدأ مجاناً
                    <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-10 rounded-2xl text-base font-medium glass border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
                    data-testid="button-how-it-works"
                  >
                    <Play className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                    شاهد كيف يعمل
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-8 pt-8"
              >
                <div className="flex -space-x-4 space-x-reverse">
                  {["A", "B", "C", "D", "E"].map((letter, i) => (
                    <div 
                      key={i} 
                      className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm ring-4 ring-background shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, hsl(${260 + i * 20} 80% 55%), hsl(${280 + i * 20} 85% 50%))` 
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">+500</p>
                  <p className="text-sm text-muted-foreground">شركة تثق بنا</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card border-0 shadow-soft hover:shadow-glow transition-all duration-500 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0 mb-6">
              <Layers className="w-4 h-4 ml-2" />
              المميزات
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              كل ما تحتاجه في <span className="gradient-text">مكان واحد</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة شاملة توفر لك جميع الأدوات اللازمة لإدارة أعمالك بكفاءة وذكاء
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card border-0 shadow-soft hover:shadow-glow transition-all duration-500 group h-full">
                  <CardContent className="p-8 flex gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0 mb-6">
              <Users className="w-4 h-4 ml-2" />
              آراء العملاء
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ماذا يقول <span className="gradient-text">عملاؤنا</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="glass-card border-0 shadow-soft hover:shadow-glow transition-all duration-500 h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-5 h-5 rounded-full bg-amber-400" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              ابدأ رحلتك معنا اليوم
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              انضم إلى مئات الشركات الرائدة التي تثق بـ QIROX لإدارة أعمالها وتحقيق نموها
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="h-16 px-12 bg-white text-foreground hover:bg-white/90 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 group"
                  data-testid="button-cta-register"
                >
                  ابدأ الآن مجاناً
                  <ChevronLeft className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-16 px-12 border-2 border-white/40 text-white hover:bg-white/10 rounded-2xl text-lg font-semibold transition-all duration-300"
                  data-testid="button-cta-contact"
                >
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 bg-card/50 border-t border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">QIROX</span>
            </div>
            
            <div className="flex gap-8 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">الخصوصية</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">الشروط</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">تواصل معنا</Link>
              <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">الدعم</Link>
            </div>

            <p className="text-sm text-muted-foreground">
              2026 QIROX. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
