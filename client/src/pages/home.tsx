import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Menu, X, Plus, Minus } from "lucide-react";
import organicArt from "@assets/generated_images/organic_fluid_dark_abstract_art.png";

import qiroxMobile from "@assets/Screenshot_2026-01-02_013112_1768411480128.png";

import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

import { translations, Language } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const t = translations[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === "ar" ? "en" : "ar");

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-[#E5E5E5] ${lang === 'ar' ? 'font-arabic' : 'font-serif'} selection:bg-white selection:text-black`}>
      <SEO title={lang === "ar" ? "QIROX | ذكاء عضوي" : "QIROX | Organic Intelligence"} description="A human approach to complex systems." />
      
      {/* Abstract Background Art */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img 
          style={{ y }}
          src={organicArt} 
          alt="Organic Texture" 
          className="w-full h-full object-cover opacity-20 scale-110 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A] to-[#0A0A0A]" />
      </div>

      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img src={qiroxLogo} alt="QIROX" className="h-16 md:h-28 w-auto invert brightness-0" />
          </div>
        </Link>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex gap-10 text-xs tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity">
            <button onClick={() => setLang('ar')} className={lang === 'ar' ? 'text-white' : ''}>{translations.ar.philosophy}</button>
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-white' : ''}>{translations.en.philosophy}</button>
          </div>
          <button 
            onClick={toggleLang}
            className="text-[10px] tracking-[0.3em] uppercase border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} className="group-hover:scale-x-125 transition-transform" />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-8 p-2 text-white hover:scale-110 transition-transform"
            >
              <X size={32} />
            </button>
            
            <div className="grid md:grid-cols-2 gap-20 max-w-6xl w-full items-center">
              <nav className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {[
                  { title: t.work, url: '/work' },
                  { title: t.philosophy, url: '/philosophy' },
                  { title: t.dialogue, url: '/contact' },
                  { title: lang === 'ar' ? 'البوابة' : 'Portal', url: '/login' }
                ].map((item, i) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link href={item.url}>
                      <span 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-5xl md:text-8xl font-light italic hover:text-white/40 transition-colors cursor-pointer block"
                      >
                        {item.title}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <div className={`hidden md:block border-l border-white/10 pl-20 space-y-12 opacity-60 ${lang === 'ar' ? 'border-r border-l-0 pr-20 text-right' : ''}`}>
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.5em] uppercase block">Contact</span>
                  <p className="text-xl font-light">studio@qirox.online</p>
                  <p className="text-xl font-light">+20 112 019 21</p>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.5em] uppercase block">Follow</span>
                  <div className="flex gap-8 text-sm tracking-widest">
                    <span>IG</span>
                    <span>TW</span>
                    <span>LI</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artistic Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 z-10 pt-32">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`text-7xl md:text-[11vw] font-light leading-[0.85] tracking-tighter italic mb-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t.heroTitle.split(' ')[0]} <br />
              <span className={lang === 'ar' ? 'mr-[10vw]' : 'ml-[10vw]'}>{t.heroTitle.split(' ')[1]}</span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-20 items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className={`space-y-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
            >
              <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 max-w-md">
                {t.heroSubtitle}
              </p>
              <div className={`flex gap-10 items-center ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Link href="/contact">
                  <span className="group flex items-center gap-3 text-sm tracking-[0.4em] uppercase cursor-pointer">
                    {t.startDialogue}
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Link>
                <div className="h-px w-20 bg-white/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-sm group shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={qiroxMobile} 
                alt="QIROX Mobile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 text-white">Interface / Human Centric</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* The Pillars - Minimalist Grid */}
      <section className="py-60 px-8 md:px-24 z-10 relative">
            <div className="grid md:grid-cols-3 gap-1px bg-white/10 border-t border-b border-white/10">
          {[
            { title: t.work, type: 'Architecture', desc: 'Spaces that breathe and adapt.' },
            { title: t.philosophy, type: 'Order', desc: 'Silence in the middle of chaos.' },
            { title: t.dialogue, type: 'Connection', desc: 'Boundaries rewritten by intent.' }
          ].map((pillar, i) => (
            <div key={i} className={`bg-[#0A0A0A] py-20 px-10 group hover:bg-white hover:text-black transition-colors duration-700 cursor-default ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-10 block">{pillar.type}</span>
              <h3 className="text-4xl font-light italic mb-6 leading-none">{pillar.title}</h3>
              <p className="text-sm opacity-60 group-hover:opacity-100 max-w-xs">{pillar.desc}</p>
              <div className={`mt-20 flex ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Statement Section */}
      <section className="py-40 px-8 md:px-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[10px] tracking-[1em] uppercase opacity-30 mb-12 block">{lang === 'ar' ? 'الفلسفة' : 'The Philosophy'}</span>
            <h2 className="text-4xl md:text-6xl font-light italic leading-tight mb-16">
              {lang === 'ar' 
                ? '"الجمال هو الشكل النهائي للوظيفة. نحن نرفض المألوف، والمؤتمت، والفاقد للحياة."'
                : '"Beauty is the ultimate form of functionality. We refuse the generic, the automated, and the lifeless."'
              }
            </h2>
            <div className="h-20 w-px bg-white/20 mx-auto" />
          </motion.div>
      </section>
      <footer className="py-20 px-8 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12 opacity-40 hover:opacity-100 transition-opacity">
        <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className="text-2xl font-light tracking-widest uppercase">QIROX</span>
          <p className="text-xs tracking-widest uppercase">{lang === 'ar' ? 'الولايات المتحدة / مصر / الخليج العربي' : 'USA/ EGYPT / GULF AREA'}</p>
        </div>
        
        <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase">
          <Link href="/privacy">{lang === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
          <Link href="/terms">{lang === 'ar' ? 'الشروط' : 'Terms'}</Link>
          <Link href="/archive">{lang === 'ar' ? 'الأرشيف' : 'Archive'}</Link>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase">{lang === 'ar' ? '© 2026 صنع بكل حب' : '© 2026 Crafted by Hand'}</p>
      </footer>
    </div>
  );
}
