import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, Mail, Lock, Zap, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";

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

  return (
    <div className="min-h-screen bg-background relative">
      <SEO title="تسجيل الدخول | QIROX" />
      
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="flex min-h-screen items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <Link href="/">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/25 mb-6 cursor-pointer hover:scale-105 transition-transform"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
            </Link>
            <h1 className="text-3xl font-bold mb-2">
              مرحباً بعودتك
            </h1>
            <p className="text-muted-foreground">
              سجل دخولك للوصول إلى لوحة التحكم
            </p>
          </div>

          <Card className="border border-border shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pr-12 rounded-xl border-border focus-visible:ring-primary"
                      placeholder="example@email.com"
                      required
                      dir="ltr"
                      autoComplete="email"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-12 rounded-xl border-border focus-visible:ring-primary"
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
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-medium shadow-lg shadow-primary/25"
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

                <div className="relative my-6">
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
                  className="w-full h-12 rounded-full text-base font-medium border-2 hover:bg-muted"
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="button-login-qirox"
                >
                  <Zap className="w-5 h-5 ml-2 text-primary" />
                  الدخول عبر QIROX
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground">
                  ليس لديك حساب؟{" "}
                  <Link href="/register">
                    <span className="text-primary font-medium cursor-pointer hover:underline">
                      سجل الآن
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
