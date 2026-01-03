import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
      
      // Redirect based on role
      if (user.role === "admin") {
        setLocation("/admin");
      } else if (user.role === "employee") {
        setLocation("/employee");
      } else {
        setLocation("/agency/dashboard");
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary via-emerald-500 to-teal-500 text-white shadow-2xl mb-6 shadow-primary/20"
            >
              <span className="text-4xl font-black italic">Q</span>
            </motion.div>
            <h1 className="text-4xl font-black text-foreground tracking-tighter mb-2" data-testid="text-login-title">
              QIROX
            </h1>
            <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs opacity-60">
              Build systems. Stay human.
            </p>
          </div>

          <Card className="border-0 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/10">
            <CardContent className="p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-11 h-12"
                      required
                      dir="ltr"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-11 h-12"
                      required
                      dir="ltr"
                      data-testid="input-password"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 active-elevate-2 transition-all" disabled={isLoading} data-testid="button-login">
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري الدخول...
                    </>
                  ) : (
                    <>
                      دخول المنظومة
                      <ArrowLeft className="h-5 w-5 mr-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 text-center">
                <p className="text-muted-foreground font-bold text-sm mb-4">ليس لديك حساب؟</p>
                <Link href="/register" className="inline-flex items-center justify-center w-full h-12 rounded-2xl border border-primary/20 text-primary font-black hover:bg-primary/5 transition-all" data-testid="link-register">
                  بدء تسجيل حساب جديد
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
