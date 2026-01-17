import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-[#E5E5E5] ${lang === 'ar' ? 'font-arabic' : 'font-serif'} selection:bg-white selection:text-black`}>
      <SEO title={lang === "ar" ? "اتصل بنا" : "Contact"} />
      
      <nav className="fixed top-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <img src={qiroxLogo} alt="QIROX" className="h-12 md:h-16 w-auto invert brightness-0 cursor-pointer" />
        </Link>
        <button onClick={() => setLang(l => l === "ar" ? "en" : "ar")} className="text-[10px] tracking-[0.3em] uppercase border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2">
          <span className="hidden sm:inline">{lang === "ar" ? "English" : "العربية"}</span>
          <span className="sm:hidden text-lg">🌐</span>
        </button>
      </nav>

      <section className="relative min-h-[50vh] flex flex-col justify-center px-8 md:px-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <span className="text-[10px] tracking-[1em] uppercase opacity-30 mb-8 block">{lang === "ar" ? "حوار" : "DIALOGUE"}</span>
          <h1 className="text-5xl md:text-8xl font-light italic leading-none tracking-tighter mb-8">{lang === "ar" ? "دعنا نبدأ حواراً" : "Start a conversation"}</h1>
        </motion.div>
      </section>

      <section className="py-20 px-8 md:px-24">
        <Card className="border-none bg-white/5 backdrop-blur-xl rounded-sm border border-white/10 overflow-hidden max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <form className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">{lang === "ar" ? "الاسم" : "NAME"}</Label>
                  <Input className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 px-0" />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">{lang === "ar" ? "البريد" : "EMAIL"}</Label>
                  <Input className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 px-0" dir="ltr" />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-[10px] tracking-widest uppercase opacity-40">{lang === "ar" ? "الرسالة" : "MESSAGE"}</Label>
                <Textarea className="bg-transparent border-b border-white/10 rounded-none min-h-[150px] focus:border-white/40 px-0 resize-none" />
              </div>
              <Button className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-none text-xs tracking-[0.4em] uppercase font-light">
                {lang === "ar" ? "إرسال" : "SEND MESSAGE"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <footer className="py-20 px-8 md:px-24 border-t border-white/5 text-center opacity-40">
        <p className="text-[10px] tracking-[0.3em] uppercase">support@qirox.online | +201155201921</p>
      </footer>
    </div>
  );
}
