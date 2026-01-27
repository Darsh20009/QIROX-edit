import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user } = await login(email, password);
      toast({
        title: lang === "ar" ? "مرحباً بك!" : "Welcome back!",
        description: lang === "ar" ? "تم تسجيل الدخول بنجاح" : "Logged in successfully",
      });
      
      if (user.role === "admin") setLocation("/admin");
      else if (user.role === "employee") setLocation("/employee");
      else setLocation("/agency/dashboard");
    } catch (error) {
      toast({
        title: lang === "ar" ? "خطأ" : "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-[#E5E5E5] ${lang === 'ar' ? 'font-arabic' : 'font-serif'} selection:bg-white selection:text-black`}>
      <SEO title={lang === "ar" ? "تسجيل الدخول" : "Login"} />
      
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

      <div className="flex min-h-screen items-center justify-center p-8 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[1em] uppercase opacity-30 mb-4 block">
              {lang === "ar" ? "بوابة النظام" : "SYSTEM PORTAL"}
            </span>
            <h1 className="text-4xl md:text-5xl font-light italic tracking-tighter">
              {lang === "ar" ? "تسجيل الدخول" : "Portal Access"}
            </h1>
          </div>

          <Card className="border-none bg-white/5 backdrop-blur-xl rounded-sm border border-white/10 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">
                    {lang === "ar" ? "البريد الإلكتروني" : "EMAIL ADDRESS"}
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 transition-colors px-0"
                    required
                    dir="ltr"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label className="text-[10px] tracking-widest uppercase opacity-40">
                    {lang === "ar" ? "كلمة المرور" : "PASSWORD"}
                  </Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-b border-white/10 rounded-none h-12 focus:border-white/40 transition-colors px-0"
                    required
                    dir="ltr"
                  />
                </div>

                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-none text-xs tracking-[0.4em] uppercase font-light transition-all"
                >
                  {lang === "ar" ? "دخول عبر QIROX" : "LOGIN WITH QIROX"}
                </Button>

              </form>

              <div className="mt-12 pt-8 border-t border-white/5 text-center space-y-4">
                <p className="text-[10px] tracking-widest uppercase opacity-40">
                  {lang === "ar" ? "ليس لديك حساب؟" : "NO ACCOUNT?"}
                </p>
                <Link href="/register">
                  <span className="text-sm font-light italic hover:text-white/60 transition-colors cursor-pointer block">
                    {lang === "ar" ? "ابدأ تسجيل حساب جديد" : "Request new access"}
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
