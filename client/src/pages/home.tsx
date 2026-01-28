import { useState, useEffect } from "react";
import { ChevronLeft, Check, Zap, Shield, Layers, BarChart3, Users, HeadphonesIcon, Rocket, Package, CreditCard, MessageSquare, Star, ChevronRight, Quote, Sparkles, TrendingUp, Award } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import heroImage1 from "@assets/qirox_1769593584374.png";
import heroImage2 from "@assets/ChatGPT_Image_Jan_2,_2026,_04_26_37_PM_1769593589852.png";
import heroImage3 from "@assets/Screenshot_2026-01-02_013103_1769593609189.png";
import heroImage4 from "@assets/Screenshot_2026-01-02_013107_1769593609190.png";
import heroImage5 from "@assets/Screenshot_2026-01-02_013112_1769593609190.png";

import partnerLogo1 from "@assets/Elegant_Coffee_Culture_Design_1757428233689_1769594241050.png";
import partnerLogo2 from "@assets/Screenshot_2025-12-03_213226_1769594250134.png";
import partnerLogo3 from "@assets/Screenshot_2025-12-24_203835_1769594265339.png";
import partnerLogo4 from "@assets/Screenshot_2026-01-27_123515_1769594282071.png";
import partnerLogo5 from "@assets/Screenshot_2025-12-29_215627_1769594290330.png";
import partnerLogo6 from "@assets/Screenshot_2026-01-25_211424_1769594309742.png";
import partnerLogo7 from "@assets/Screenshot_2026-01-25_182548_1769594323911.png";
import partnerLogo8 from "@assets/Screenshot_2026-01-27_123435_1769594340706.png";
import partnerLogo9 from "@assets/Screenshot_2026-01-27_123301_1769594352549.png";
import partnerLogo10 from "@assets/Screenshot_2026-01-28_125929_1769594390744.png";
import partnerLogo11 from "@assets/Screenshot_2026-01-28_125936_1769594390745.png";
import partnerLogo12 from "@assets/Screenshot_2026-01-28_130014_1769594469795.png";
import partnerLogo13 from "@assets/Screenshot_2026-01-28_130058_1769594469796.png";

const partnerLogos = [
  partnerLogo1, partnerLogo2, partnerLogo3, partnerLogo4, partnerLogo5,
  partnerLogo6, partnerLogo7, partnerLogo8, partnerLogo9, partnerLogo10,
  partnerLogo11, partnerLogo12, partnerLogo13
];

const heroSlides = [
  {
    image: heroImage1,
    title: "ابنِ أنظمتك. ابقَ إنساناً.",
    subtitle: "تقنية متطورة بلمسة إنسانية",
    testimonial: {
      text: "QIROX غيّر طريقة إدارتنا للمشاريع بالكامل!",
      author: "أحمد الراشد",
      role: "مدير تقنية المعلومات",
      company: "شركة النور"
    }
  },
  {
    image: heroImage2,
    title: "قوة التحكم في يدك",
    subtitle: "أنظمة متكاملة لإدارة أعمالك",
    testimonial: {
      text: "أفضل منصة عربية لإدارة الأعمال بدون منافس",
      author: "سارة المهندس", 
      role: "المدير التنفيذي",
      company: "تقنية المستقبل"
    }
  },
  {
    image: heroImage3,
    title: "Build Systems. Stay Human.",
    subtitle: "الجيل الجديد من التقنية",
    testimonial: {
      text: "وفّرنا 40% من الوقت في إدارة المشاريع",
      author: "محمد القحطاني",
      role: "مدير المشاريع", 
      company: "حلول رقمية"
    }
  },
  {
    image: heroImage4,
    title: "فريق واحد. هدف واحد.",
    subtitle: "تعاون سلس وإنتاجية عالية",
    testimonial: {
      text: "الدعم الفني ممتاز ومتاح على مدار الساعة",
      author: "فاطمة العلي",
      role: "مديرة العمليات",
      company: "نجاح للأعمال"
    }
  },
  {
    image: heroImage5,
    title: "في كل مكان. في كل وقت.",
    subtitle: "إدارة مشاريعك من أي جهاز",
    testimonial: {
      text: "تطبيق الموبايل رائع وسريع جداً",
      author: "خالد الدوسري",
      role: "رائد أعمال",
      company: "إبداع تقني"
    }
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const features = [
    { icon: Rocket, title: "نقل سريع", desc: "ننقل لك مشروعك باللي فيه خلال مدة أقصاها 7 أيام عمل", color: "from-emerald-500 to-teal-600" },
    { icon: HeadphonesIcon, title: "دعم فني 24/7", desc: "فريق دعم متخصص جاهز لمساعدتك في أي وقت", color: "from-blue-500 to-indigo-600" },
    { icon: Shield, title: "أمان متقدم", desc: "حماية بياناتك بأعلى معايير الأمان والتشفير", color: "from-purple-500 to-pink-600" },
    { icon: BarChart3, title: "تحليلات ذكية", desc: "تقارير ومؤشرات أداء لاتخاذ قرارات أفضل", color: "from-orange-500 to-red-600" },
  ];

  const stats = [
    { value: "500+", label: "عميل سعيد", icon: Users },
    { value: "1,234", label: "مشروع ناجح", icon: Package },
    { value: "99.9%", label: "رضا العملاء", icon: Award },
    { value: "24/7", label: "دعم متواصل", icon: HeadphonesIcon },
  ];

  const steps = [
    { num: "01", title: "سجّل حسابك", desc: "أنشئ حسابك مجاناً في دقائق معدودة", icon: Users },
    { num: "02", title: "أضف بياناتك", desc: "أدخل معلومات مشروعك والبيانات المطلوبة", icon: Layers },
    { num: "03", title: "ابدأ العمل", desc: "استمتع بإدارة مشروعك بكفاءة وسهولة", icon: Rocket },
  ];

  const testimonials = [
    { text: "QIROX غيّر طريقة إدارتنا للمشاريع! سهولة الاستخدام والدعم الفني الممتاز جعلانا نوفر الكثير من الوقت والجهد.", author: "أحمد الراشد", role: "مدير تقنية المعلومات", company: "شركة النور" },
    { text: "أفضل استثمار قمنا به لأعمالنا. النظام شامل ومتكامل ويلبي جميع احتياجاتنا.", author: "سارة المهندس", role: "المدير التنفيذي", company: "تقنية المستقبل" },
    { text: "الدعم الفني سريع ومحترف. فريق QIROX يفهم احتياجاتنا ويقدم حلول مبتكرة.", author: "محمد القحطاني", role: "مدير المشاريع", company: "حلول رقمية" },
  ];


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO title="QIROX | ابنِ أنظمتك. ابقَ إنساناً." description="منصة متكاملة لإدارة الأعمال بتقنيات الذكاء الاصطناعي" />
      
      <section className="relative min-h-[100vh] md:min-h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50 z-10" />
            <img 
              src={heroSlides[currentSlide].image} 
              alt="QIROX Hero" 
              className="w-full h-full object-cover object-center md:object-top"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white"
              >
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full mb-6 md:mb-8">
                  <Sparkles className="w-3 md:w-4 h-3 md:h-4 ml-1.5 md:ml-2" />
                  الجيل الجديد من إدارة الأعمال
                </Badge>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.15] mb-4 md:mb-6 drop-shadow-2xl">
                  {heroSlides[currentSlide].title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 md:mb-10 leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link href="/register">
                    <Button 
                      size="lg" 
                      className="h-14 md:h-16 px-8 md:px-10 bg-white text-gray-900 hover:bg-white/90 rounded-full text-base md:text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-105"
                      data-testid="button-start-free"
                    >
                      ابدأ مجاناً الآن
                      <ChevronLeft className="w-5 md:w-6 h-5 md:h-6 mr-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-14 md:h-16 px-8 md:px-10 border-2 border-white/40 text-white hover:bg-white/10 rounded-full text-base md:text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                      data-testid="button-contact-sales"
                    >
                      تواصل معنا
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                key={`testimonial-${currentSlide}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:block"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <Quote className="w-12 h-12 text-primary mb-6" />
                  <p className="text-xl text-white leading-relaxed mb-8">
                    "{heroSlides[currentSlide].testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 ring-2 ring-primary ring-offset-2 ring-offset-transparent">
                      <AvatarFallback className="bg-primary text-white text-lg font-bold">
                        {heroSlides[currentSlide].testimonial.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-white text-lg">{heroSlides[currentSlide].testimonial.author}</p>
                      <p className="text-white/70">{heroSlides[currentSlide].testimonial.role}</p>
                      <p className="text-primary font-medium">{heroSlides[currentSlide].testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-500 rounded-full ${
                      idx === currentSlide 
                        ? 'w-12 h-3 bg-primary' 
                        : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                    }`}
                    data-testid={`button-slide-${idx}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="w-12 h-12 rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={prevSlide}
                  data-testid="button-prev-slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="w-12 h-12 rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={nextSlide}
                  data-testid="button-next-slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <p className="text-4xl md:text-5xl font-bold mb-1">{stat.value}</p>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border/50 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
            أكثر من 500 شركة تثق بـ QIROX لإدارة أعمالها
          </p>
          <div className="flex gap-8 animate-marquee">
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-4 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-muted-foreground font-medium whitespace-nowrap">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-primary/10 text-primary border-0 px-6 py-2.5 text-sm font-medium rounded-full mb-6">
              <TrendingUp className="w-4 h-4 ml-2" />
              لماذا QIROX؟
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              كل ما تحتاجه في <span className="text-primary">مكان واحد</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة شاملة توفر لك جميع الأدوات اللازمة لإدارة أعمالك بكفاءة وسهولة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full group bg-card hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
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

      <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-primary/10 text-primary border-0 px-6 py-2.5 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4 ml-2" />
              كيف يعمل؟
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              ابدأ في <span className="text-primary">ثلاث خطوات</span> بسيطة
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-l from-primary via-primary/50 to-primary" />
            
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center relative z-10"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
                  <step.icon className="w-10 h-10" />
                </div>
                <div className="text-6xl font-black text-primary/10 absolute -top-4 right-1/2 translate-x-1/2">{step.num}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-white/10 text-white border-0 px-6 py-2.5 text-sm font-medium rounded-full mb-6">
              <Star className="w-4 h-4 ml-2" />
              آراء عملائنا
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              ماذا يقول <span className="text-primary">عملاؤنا</span>؟
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 h-full hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-primary">
                        <AvatarFallback className="bg-primary text-white font-bold">{t.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white">{t.author}</p>
                        <p className="text-white/60 text-sm">{t.role} - {t.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-primary/10 text-primary border-0 px-6 py-2.5 text-sm font-medium rounded-full mb-6">
                <Star className="w-4 h-4 ml-2" />
                مميزات حصرية
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                أدوات متقدمة لنمو <span className="text-primary">أعمالك</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                نوفر لك مجموعة شاملة من الأدوات والخدمات التي تساعدك على إدارة وتطوير أعمالك بكفاءة عالية
              </p>
              <ul className="space-y-5">
                {[
                  "لوحة تحكم متكاملة وسهلة الاستخدام",
                  "تقارير وتحليلات مفصلة في الوقت الفعلي",
                  "دعم متعدد اللغات والعملات",
                  "تكامل مع أكثر من 50 خدمة خارجية",
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-12">
                <Link href="/features">
                  <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-full text-lg font-semibold shadow-xl shadow-primary/25 hover:scale-105 transition-all duration-300">
                    اكتشف المزيد
                    <ChevronLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-emerald-500/10 to-teal-500/20 rounded-[3rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
                
                <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 h-full">
                  <div className="grid grid-cols-2 gap-6 h-full">
                    {[
                      { icon: Package, value: "1,234", label: "مشروع", color: "from-emerald-500 to-teal-600" },
                      { icon: Users, value: "500+", label: "عميل", color: "from-blue-500 to-indigo-600" },
                      { icon: CreditCard, value: "99.9%", label: "رضا", color: "from-purple-500 to-pink-600" },
                      { icon: MessageSquare, value: "24/7", label: "دعم", color: "from-orange-500 to-red-600" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-muted transition-colors"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold">{item.value}</span>
                        <span className="text-muted-foreground">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary via-emerald-500 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              جاهز لبدء رحلة النجاح؟
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              انضم إلى أكثر من 500 شركة ناجحة تستخدم QIROX لإدارة أعمالها
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="h-16 px-12 bg-white text-primary hover:bg-white/90 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-all duration-300"
                  data-testid="button-cta-register"
                >
                  ابدأ تجربتك المجانية
                  <ChevronLeft className="w-6 h-6 mr-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-16 px-12 border-2 border-white/40 text-white hover:bg-white/10 rounded-full text-lg font-semibold backdrop-blur-sm"
                  data-testid="button-cta-contact"
                >
                  تحدث مع خبير
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl">QIROX</span>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                منصة متكاملة لإدارة الأعمال بتقنيات الذكاء الاصطناعي. ابنِ أنظمتك. ابقَ إنساناً.
              </p>
              <p className="text-primary font-semibold">Build Systems. Stay Human.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">المنتج</h4>
              <ul className="space-y-4 text-white/70">
                <li><Link href="/features" className="hover:text-primary transition-colors">المميزات</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">الأسعار</Link></li>
                <li><Link href="/integrations" className="hover:text-primary transition-colors">التكاملات</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">الشركة</h4>
              <ul className="space-y-4 text-white/70">
                <li><Link href="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">وظائف</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">الدعم</h4>
              <ul className="space-y-4 text-white/70">
                <li><Link href="/help" className="hover:text-primary transition-colors">مركز المساعدة</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/50">
              2026 QIROX. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-8 text-white/50">
              <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">الخصوصية</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
