import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, Mail, Lock, Sparkles, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO title="تسجيل الدخول | QIROX" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-[150px] animate-blob" />
        <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/10 to-primary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full animate-spin-slow" style={{ animationDuration: "30s" }} />
      </div>

      <div className="flex min-h-screen items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <Link href="/">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-bg shadow-glow mb-6 cursor-pointer hover:scale-105 transition-transform"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold mb-3 gradient-text">
                مرحباً بعودتك
              </h1>
              <p className="text-muted-foreground text-lg">
                سجل دخولك للوصول إلى لوحة التحكم
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-0 shadow-glow">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      البريد الإلكتروني
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pr-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30 text-base"
                        placeholder="example@email.com"
                        required
                        dir="ltr"
                        autoComplete="email"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      كلمة المرور
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 pr-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30 text-base"
                        placeholder="********"
                        required
                        dir="ltr"
                        autoComplete="current-password"
                        data-testid="input-password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-input text-primary focus:ring-primary" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">تذكرني</span>
                    </label>
                    <Link href="/forgot-password">
                      <span className="text-primary hover:underline transition-colors cursor-pointer font-medium">
                        نسيت كلمة المرور؟
                      </span>
                    </Link>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 gradient-bg text-white rounded-xl text-base font-semibold shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all duration-300"
                    data-testid="button-login"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 ml-2" />
                        تسجيل الدخول
                      </>
                    )}
                  </Button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">أو</span>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full h-14 rounded-xl text-base font-medium glass border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                    onClick={() => window.location.href = "/api/login"}
                    data-testid="button-login-qirox"
                  >
                    <Sparkles className="w-5 h-5 ml-2 text-primary" />
                    الدخول عبر QIROX
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <Link href="/register">
                      <span className="gradient-text font-semibold cursor-pointer hover:underline transition-all">
                        سجل الآن
                      </span>
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
