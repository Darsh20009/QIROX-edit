import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, Mail, Lock, Zap, ArrowLeft, Sparkles, Shield, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/ChatGPT_Image_Jan_2,_2026,_04_26_37_PM_1769593589852.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user } = await login(email, password);
      toast({
        title: "مرحباً بك!",
        description: "تم تسجيل الدخول بنجاح",
      });
      
      if (user.role === "admin") setLocation("/admin");
      else if (user.role === "employee") setLocation("/employee");
      else setLocation("/agency/dashboard");
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في المصادقة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "لوحة تحكم متكاملة",
    "دعم فني 24/7",
    "حماية بياناتك"
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <SEO title="تسجيل الدخول | QIROX" />
      
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-primary/30 z-10" />
        <img src={heroImage} alt="QIROX" className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">QIROX</span>
            </div>
          </Link>
          
          <div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              ابنِ أنظمتك.
              <br />
              <span className="text-primary">ابقَ إنساناً.</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              منصة متكاملة لإدارة الأعمال بتقنيات الذكاء الاصطناعي
            </p>
            <div className="flex items-center gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-white/50 text-sm">Build Systems. Stay Human.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-muted/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-10">
            <Link href="/">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/30 mb-6 cursor-pointer">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </Link>
          </div>

          <div className="text-center lg:text-right mb-10">
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
              <Shield className="w-4 h-4 ml-2" />
              تسجيل دخول آمن
            </Badge>
            <h1 className="text-3xl font-bold mb-2">
              مرحباً بعودتك
            </h1>
            <p className="text-muted-foreground">
              سجل دخولك للوصول إلى لوحة التحكم
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pr-12 rounded-xl border-border bg-muted/50 focus-visible:ring-primary"
                      placeholder="example@email.com"
                      required
                      dir="ltr"
                      autoComplete="email"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 pr-12 rounded-xl border-border bg-muted/50 focus-visible:ring-primary"
                      placeholder="********"
                      required
                      dir="ltr"
                      autoComplete="current-password"
                      data-testid="input-password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-muted-foreground">تذكرني</span>
                  </label>
                  <Link href="/forgot-password">
                    <span className="text-primary hover:underline cursor-pointer font-medium">
                      نسيت كلمة المرور؟
                    </span>
                  </Link>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      تسجيل الدخول
                      <LogIn className="w-5 h-5 mr-2" />
                    </>
                  )}
                </Button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">أو</span>
                  </div>
                </div>

                <Button 
                  type="button"
                  variant="outline"
                  className="w-full h-14 rounded-full text-base font-medium border-2 hover:bg-muted"
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="button-login-qirox"
                >
                  <Sparkles className="w-5 h-5 ml-2 text-primary" />
                  الدخول عبر QIROX
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground">
                  ليس لديك حساب؟{" "}
                  <Link href="/register">
                    <span className="text-primary font-semibold cursor-pointer hover:underline">
                      سجل الآن مجاناً
                    </span>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2">
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
