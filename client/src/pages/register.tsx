import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Mail, Lock, User, Sparkles, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";
import { Badge } from "@/components/ui/badge";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({ ...formData, role: "visitor", tenantId: "default" });
      toast({ title: "نجاح", description: "تم إنشاء الحساب بنجاح" });
      setLocation("/agency/dashboard");
    } catch (err) {
      toast({ title: "خطأ", description: err instanceof Error ? err.message : "فشل إنشاء الحساب", variant: "destructive" });
    } finally { 
      setIsLoading(false); 
    }
  };

  const benefits = [
    "وصول غير محدود للمنصة",
    "دعم فني على مدار الساعة",
    "تحديثات مجانية مدى الحياة"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <SEO title="إنشاء حساب | QIROX" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-[150px] animate-blob" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/10 to-primary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "-4s" }} />
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
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0 mb-4">
                مجاني للأبد
              </Badge>
              <h1 className="text-4xl font-bold mb-3 gradient-text">
                انضم إلينا اليوم
              </h1>
              <p className="text-muted-foreground text-lg">
                أنشئ حسابك وابدأ رحلة النجاح
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">الاسم الكامل</Label>
                    <div className="relative group">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-14 pr-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30 text-base"
                        placeholder="أدخل اسمك الكامل"
                        required
                        data-testid="input-name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">البريد الإلكتروني</Label>
                    <div className="relative group">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-14 pr-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30 text-base"
                        placeholder="example@email.com"
                        required
                        dir="ltr"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">كلمة المرور</Label>
                    <div className="relative group">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="h-14 pr-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30 text-base"
                        placeholder="********"
                        required
                        dir="ltr"
                        data-testid="input-password"
                      />
                    </div>
                  </div>

                  <div className="py-4 space-y-2">
                    {benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-500" />
                        </div>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 gradient-bg text-white rounded-xl text-base font-semibold shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all duration-300"
                    data-testid="button-register"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 ml-2" />
                        إنشاء الحساب
                      </>
                    )}
                  </Button>

                  <div className="relative my-6">
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
                    data-testid="button-register-qirox"
                  >
                    <Sparkles className="w-5 h-5 ml-2 text-primary" />
                    التسجيل عبر QIROX
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="text-muted-foreground">
                    لديك حساب بالفعل؟{" "}
                    <Link href="/login">
                      <span className="gradient-text font-semibold cursor-pointer hover:underline transition-all">
                        سجل دخولك
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
