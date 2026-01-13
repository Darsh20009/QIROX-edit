import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, RefreshCw, ShieldCheck, Code2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/seo";

export default function Developers() {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const generateKey = () => {
    const key = `QX-LIVE-${Math.random().toString(36).substring(2, 15).toUpperCase()}`;
    setApiKey(key);
    toast({
      title: "تم توليد المفتاح",
      description: "يمكنك الآن استخدامه لربط تطبيقاتك بمنظومة Qirox",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "تم النسخ",
      description: "المفتاح جاهز للاستخدام",
    });
  };

  return (
    <Layout>
      <SEO title="مركز المطورين | QIROX" description="بوابة الربط البرمجي الموحدة لمنظومة Qirox" />
      
      <div className="min-h-screen py-32 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20 space-y-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20 shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)]"
            >
              <Code2 className="w-12 h-12" />
            </motion.div>
            <h1 className="text-6xl font-black text-white tracking-tighter">
              مركز مطوري <span className="text-primary text-glow">QIROX</span>
            </h1>
            <p className="text-2xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              قم بتوليد مفاتيح الربط البرمجية الموحدة لدمج خدمات Qirox المتخصصة (Build, Systems, Stores) في تطبيقاتك الخاصة.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="bg-[#0a0a0a] border-white/10 rounded-[3rem] overflow-hidden shadow-2xl border-t-primary/20">
                <CardHeader className="p-12 border-b border-white/5 bg-white/2">
                  <CardTitle className="text-3xl font-black text-white flex items-center gap-4">
                    <Key className="text-primary w-8 h-8" />
                    مولد مفاتيح الـ API الموحد
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-12 space-y-10">
                  <div className="space-y-4">
                    <label className="text-sm font-black text-gray-400 block mr-1 uppercase tracking-widest">Global Access Token (Live)</label>
                    <div className="flex gap-4">
                      <Input 
                        value={apiKey} 
                        readOnly 
                        placeholder="اضغط على توليد للحصول على مفتاح..." 
                        className="h-20 rounded-2xl bg-black border-white/10 text-2xl font-mono text-primary pr-8 shadow-inner"
                      />
                      <Button 
                        onClick={copyToClipboard}
                        disabled={!apiKey}
                        size="icon"
                        className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                      >
                        <Copy className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={generateKey}
                    className="w-full h-24 rounded-[2.5rem] text-3xl font-black shadow-[0_20px_50px_-15px_rgba(var(--primary),0.4)] hover:scale-[1.02] transition-all"
                  >
                    <RefreshCw className="ml-4 h-8 w-8 animate-spin-slow" />
                    توليد مفتاح وصول جديد
                  </Button>

                  <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-lg mb-1">تعليمات الأمان</h4>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed">
                        لا تشارك هذا المفتاح أبداً في المتصفح أو مع أي جهة غير موثوقة. يجب استخدامه فقط في بيئة الخادم (Server-side) لضمان أمان بياناتك.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
                <h3 className="text-2xl font-black text-white">لماذا QIROX API؟</h3>
                <div className="space-y-6">
                  {[
                    { title: "وصول موحد", desc: "مفتاح واحد لجميع الشركات التابعة", icon: Key },
                    { title: "أداء فائق", desc: "استجابة سريعة جداً (Sub-100ms)", icon: RefreshCw },
                    { title: "أمان متقدم", desc: "تشفير AES-256 لكل طلب", icon: ShieldCheck }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-white">{item.title}</h4>
                        <p className="text-gray-500 text-xs font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent border border-white/10 space-y-6">
                <h3 className="text-2xl font-black text-white">تحتاج مساعدة؟</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">فريق المطورين لدينا مستعد لمساعدتك في عملية الربط التقني على مدار الساعة.</p>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-white font-black hover:bg-white/5">
                  تحدث مع خبير تقني
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
