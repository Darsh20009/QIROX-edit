import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Target, Heart, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SEO } from "@/components/layout/seo";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

export default function About() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const values = [
    { icon: Rocket, title: lang === "ar" ? "الابتكار" : "Innovation", desc: lang === "ar" ? "نسعى دائماً لتقديم حلول خارج الصندوق تتجاوز المألوف." : "Always pushing beyond the digital noise." },
    { icon: Target, title: lang === "ar" ? "الدقة" : "Precision", desc: lang === "ar" ? "نهتم بأدق التفاصيل لضمان جودة استثنائية في كل سطر برمج." : "Meticulous craft in every line of code." },
    { icon: Heart, title: lang === "ar" ? "الشغف" : "Passion", desc: lang === "ar" ? "نعمل بشغف لنحول أفكار عملائنا إلى قصص نجاح ملهمة." : "Turning visions into living digital experiences." },
    { icon: Users, title: lang === "ar" ? "العميل أولاً" : "Human-Centric", desc: lang === "ar" ? "رضا عملائنا هو البوصلة التي توجه جميع قراراتنا." : "The human element is our primary compass." }
  ];

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-[#E5E5E5] ${lang === 'ar' ? 'font-arabic' : 'font-serif'} selection:bg-white selection:text-black`}>
      <SEO title={lang === "ar" ? "من نحن" : "About Us"} />
      
      <nav className="fixed top-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <img src={qiroxLogo} alt="QIROX" className="h-12 md:h-16 w-auto invert brightness-0 cursor-pointer" />
        </Link>
        <button 
          onClick={() => setLang(l => l === "ar" ? "en" : "ar")}
          className="text-[10px] tracking-[0.3em] uppercase border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2"
        >
          <span className="hidden sm:inline">{lang === "ar" ? "English" : "العربية"}</span>
          <span className="sm:hidden text-lg">🌐</span>
        </button>
      </nav>

      <section className="relative min-h-[60vh] flex flex-col justify-center px-8 md:px-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-[10px] tracking-[1em] uppercase opacity-30 mb-8 block">
            {lang === "ar" ? "الهوية" : "THE IDENTITY"}
          </span>
          <h1 className="text-5xl md:text-8xl font-light italic leading-none tracking-tighter mb-12">
            {lang === "ar" ? "نحن نصنع المستقبل الرقمي" : "Crafting the digital future"}
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed max-w-2xl">
            {lang === "ar" 
              ? "QIROX هي شركة تقنية رائدة، تأسست بهدف تمكين الشركات والأفراد من امتلاك أدوات تقنية متطورة تنافس عالمياً."
              : "A design-led technology studio focused on high-performance ecosystems and artistic human interfaces."
            }
          </p>
        </motion.div>
      </section>

      <section className="py-40 px-8 md:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-t border-b border-white/10">
          {values.map((value, i) => (
            <div key={i} className="bg-[#0A0A0A] py-20 px-10 group hover:bg-white hover:text-black transition-all duration-700 cursor-default">
              <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-10 block">{value.title}</span>
              <p className="text-sm opacity-60 group-hover:opacity-100">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-40 px-8 md:px-24 text-center">
        <Link href="/register">
          <div className="group cursor-pointer">
            <h2 className="text-4xl md:text-7xl font-light italic hover:opacity-40 transition-opacity">
              {lang === "ar" ? "ابدأ رحلتك معنا" : "Begin your journey"}
            </h2>
            <div className="mt-8 flex justify-center">
              <ArrowUpRight size={40} className="group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
            </div>
          </div>
        </Link>
      </section>

      <footer className="py-20 px-8 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
        <span className="text-xl font-light tracking-widest uppercase">QIROX</span>
        <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase">
          <Link href="/privacy">{lang === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
          <Link href="/terms">{lang === 'ar' ? 'الشروط' : 'Terms'}</Link>
        </div>
      </footer>
    </div>
  );
}
