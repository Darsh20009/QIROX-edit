import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

export default function Register() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({ ...formData, role: "visitor", tenantId: "default" });
      toast({ title: lang === "ar" ? "نجاح" : "Success", description: lang === "ar" ? "تم إنشاء الحساب" : "Account created" });
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed", variant: "destructive" });
    } finally { setIsLoading(false); }
  };

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-[#E5E5E5] ${lang === 'ar' ? 'font-arabic' : 'font-serif'} selection:bg-white selection:text-black`}>
      <SEO title={lang === "ar" ? "تسجيل جديد" : "Register"} />
      
      <nav className="fixed top-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link href="/">
          <img src={qiroxLogo} alt="QIROX" className="h-12 md:h-16 w-auto invert brightness-0 cursor-pointer" />
        </Link>
        <button onClick={() => setLang(l => l === "ar" ? "en" : "ar")} className="text-[10px] tracking-[0.3em] uppercase border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2">
          <span className="hidden sm:inline">{lang === "ar" ? "English" : "العربية"}</span>
          <span className="sm:hidden text-lg">🌐</span>
        </button>
      </nav>

      <div className="flex min-h-screen items-center justify-center p-8 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[1em] uppercase opacity-30 mb-4 block">{lang === "ar" ? "انضمام" : "JOIN SYSTEM"}</span>
            <h1 className="text-4xl md:text-5xl font-light italic tracking-tighter">{lang === "ar" ? "إنشاء حساب" : "Create Access"}</h1>
          </div>

          <Card className="border-none bg-white/5 backdrop-blur-xl rounded-sm border border-white/10 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">{lang === "ar" ? "الاسم" : "FULL NAME"}</Label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 px-0" required />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">{lang === "ar" ? "البريد" : "EMAIL"}</Label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 px-0" required dir="ltr" />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">{lang === "ar" ? "كلمة المرور" : "PASSWORD"}</Label>
                  <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 px-0" required dir="ltr" />
                </div>
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-none text-xs tracking-[0.4em] uppercase font-light"
                >
                  {lang === "ar" ? "بدء الرحلة عبر QIROX" : "BEGIN JOURNEY WITH QIROX"}
                </Button>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = "/api/login?provider=google"}
                    className="h-12 border-white/10 rounded-none text-[10px] tracking-widest uppercase hover:bg-white/5"
                  >
                    Google
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = "/api/login?provider=github"}
                    className="h-12 border-white/10 rounded-none text-[10px] tracking-widest uppercase hover:bg-white/5"
                  >
                    GitHub
                  </Button>
                </div>
              </form>
              <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <Link href="/login"><span className="text-sm font-light italic hover:text-white/60 transition-colors cursor-pointer">{lang === "ar" ? "لديك حساب؟ سجل دخولك" : "Already have access? Enter here"}</span></Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
