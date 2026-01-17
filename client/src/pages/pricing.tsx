import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SEO } from "@/components/layout/seo";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

const planCategories = [
  {
    id: "stores",
    name: "المتاجر الإلكترونية",
    nameEn: "E-commerce",
    plans: [
      {
        duration: "خطة مدى الحياة",
        durationEn: "Lifetime Plan",
        price: "4999",
        features: ["تحديثات مستمرة", "ملكية كاملة للكود", "دعم فني VIP"]
      },
      {
        duration: "الخطة السنوية",
        durationEn: "Annual Plan",
        price: "699",
        features: ["الضمان الذهبي", "دومين خاص", "دعم متكامل"]
      }
    ]
  }
];

export default function Pricing() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-[#E5E5E5] ${lang === 'ar' ? 'font-arabic' : 'font-serif'} selection:bg-white selection:text-black`}>
      <SEO title={lang === "ar" ? "الأسعار" : "Pricing"} />
      
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

      <section className="relative min-h-[50vh] flex flex-col justify-center px-8 md:px-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <span className="text-[10px] tracking-[1em] uppercase opacity-30 mb-8 block">
            {lang === "ar" ? "الاستثمار" : "INVESTMENT"}
          </span>
          <h1 className="text-5xl md:text-8xl font-light italic leading-none tracking-tighter mb-8">
            {lang === "ar" ? "خطط إبداعية بسيطة" : "Simple creative plans"}
          </h1>
        </motion.div>
      </section>

      <section className="py-20 px-8 md:px-24">
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border-t border-b border-white/10">
          {planCategories[0].plans.map((plan, i) => (
            <div key={i} className="bg-[#0A0A0A] py-20 px-10 group hover:bg-white hover:text-black transition-all duration-700">
              <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-10 block">{plan.durationEn}</span>
              <h3 className="text-6xl font-light italic mb-8">{plan.price}<span className="text-sm uppercase tracking-widest ml-4">SAR</span></h3>
              <ul className="space-y-4 mb-20">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-sm opacity-60 flex items-center gap-3">
                    <div className="w-1 h-1 bg-current rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <div className="flex items-center gap-4 cursor-pointer">
                   <span className="text-[10px] tracking-[0.3em] uppercase">{lang === 'ar' ? 'ابدأ الآن' : 'START NOW'}</span>
                   <ArrowUpRight size={16} />
                </div>
              </Link>
            </div>
          ))}
        </div>
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
