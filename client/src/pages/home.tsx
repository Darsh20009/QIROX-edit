import { Search as SearchIcon, ArrowLeft, ChevronLeft, Check, Star, Zap, Shield, Globe } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

import qiroxHero from "@assets/ChatGPT_Image_Jan_2,_2026,_04_26_37_PM_1769504697766.png";
import qiroxMobile from "@assets/Screenshot_2026-01-02_013112_1769504726157.png";
import qiroxTeam from "@assets/Screenshot_2026-01-02_013107_1769504726156.png";
import qiroxDashboard from "@assets/Screenshot_2026-01-27_120537_1769504770694.png";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

import { translations, Language } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const features = [
    { icon: Zap, title: "سرعة فائقة", desc: "أداء عالي وتحميل سريع" },
    { icon: Shield, title: "أمان متقدم", desc: "حماية بيانات عالية" },
    { icon: Globe, title: "وصول عالمي", desc: "دعم متعدد اللغات" },
  ];

  const stats = [
    { value: "500+", label: "عميل نشط" },
    { value: "99.9%", label: "وقت التشغيل" },
    { value: "24/7", label: "دعم فني" },
    { value: "50+", label: "مشروع منجز" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 font-sans">
      <SEO title="QIROX | Build Systems. Stay Human." description="نظام متكامل لإدارة الأعمال" />
      
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>الحل الأمثل لإدارة أعمالك</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                ابنِ أنظمتك.
                <br />
                <span className="bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ابقَ إنساناً.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                منصة متكاملة تجمع بين القوة والبساطة. صُممت لتمكين فريقك من تحقيق المزيد بجهد أقل.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-base font-medium shadow-lg shadow-blue-500/25"
                    data-testid="button-start-free"
                  >
                    ابدأ مجاناً
                    <ChevronLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-8 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-base font-medium"
                    data-testid="button-view-pricing"
                  >
                    عرض الأسعار
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-slate-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">+500</span> عميل يثقون بنا
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50">
                <img 
                  src={qiroxHero} 
                  alt="QIROX Platform" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">جاهز للإنتاج</p>
                    <p className="text-sm text-slate-500">99.9% وقت تشغيل</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                المميزات
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                كل ما تحتاجه في مكان واحد
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                منصة شاملة توفر لك جميع الأدوات اللازمة لإدارة أعمالك بكفاءة
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="h-full border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={qiroxMobile} 
                  alt="Mobile App" 
                  className="rounded-2xl shadow-xl w-full"
                />
                <img 
                  src={qiroxTeam} 
                  alt="Team" 
                  className="rounded-2xl shadow-xl w-full mt-8"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                لماذا QIROX؟
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                تجربة مستخدم استثنائية على جميع الأجهزة
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                سواء كنت على الكمبيوتر أو الهاتف، ستحصل على نفس التجربة السلسة والقوية. صُمم النظام ليكون سريع الاستجابة ومتوافق مع جميع الأجهزة.
              </p>
              <ul className="space-y-4">
                {["تصميم متجاوب", "تطبيق موبايل", "مزامنة فورية"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ابدأ رحلتك معنا اليوم
            </h2>
            <p className="text-lg text-slate-300 mb-10">
              انضم إلى مئات الشركات التي تثق بـ QIROX لإدارة أعمالها
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-base font-semibold"
                  data-testid="button-cta-register"
                >
                  ابدأ الآن مجاناً
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-10 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl text-base font-medium"
                  data-testid="button-cta-contact"
                >
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={qiroxLogo} alt="QIROX" className="h-8 w-auto" />
            </div>
            
            <div className="flex gap-8 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-800 transition-colors">الخصوصية</Link>
              <Link href="/terms" className="hover:text-slate-800 transition-colors">الشروط</Link>
              <Link href="/contact" className="hover:text-slate-800 transition-colors">تواصل معنا</Link>
            </div>

            <p className="text-sm text-slate-400">
              2026 QIROX. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
