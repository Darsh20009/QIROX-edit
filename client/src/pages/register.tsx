import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Mail, Lock, User, Zap, ArrowLeft, Check } from "lucide-react";
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
    "تجربة مجانية لمدة 14 يوم",
    "دعم فني على مدار الساعة",
    "إلغاء في أي وقت"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SEO title="إنشاء حساب | QIROX" />
      
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
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
              مجاني للتجربة
            </Badge>
            <h1 className="text-3xl font-bold mb-2">
              أنشئ حسابك الآن
            </h1>
            <p className="text-muted-foreground">
              ابدأ تجربتك المجانية في دقائق
            </p>
          </div>

          <Card className="border border-border shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 pr-12 rounded-xl border-border focus-visible:ring-primary"
                      placeholder="أدخل اسمك الكامل"
                      required
                      data-testid="input-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 pr-12 rounded-xl border-border focus-visible:ring-primary"
                      placeholder="example@email.com"
                      required
                      dir="ltr"
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
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 pr-12 rounded-xl border-border focus-visible:ring-primary"
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
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-medium shadow-lg shadow-primary/25"
                  data-testid="button-register"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      إنشاء الحساب
                      <UserPlus className="w-5 h-5 mr-2" />
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
                  data-testid="button-register-qirox"
                >
                  <Zap className="w-5 h-5 ml-2 text-primary" />
                  التسجيل عبر QIROX
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground">
                  لديك حساب بالفعل؟{" "}
                  <Link href="/login">
                    <span className="text-primary font-medium cursor-pointer hover:underline">
                      سجل دخولك
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
