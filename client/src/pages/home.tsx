import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, HeartHandshake, Rocket, Star, ShieldCheck, Zap, Code2, Cpu, Globe2, LayoutDashboard, Key, ExternalLink } from "lucide-react";
import { PARTNERS, PRICING_PLANS } from "@/lib/constants";
import qiroxHero from "@assets/qirox_1767360025807.png";

export default function Home() {
  return (
    <Layout>
      <SEO title="الرئيسية | QIROX" description="QIROX - المنظومة التقنية المتكاملة لمستقبل أعمالك" />
      
      {/* Hero Section - Redesigned for Creativity */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-right space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md text-primary text-sm font-black border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              المنصة الأم لمجموعة QIROX التقنية
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white">
              بوابة <br />
              <span className="text-primary text-glow italic">QIROX</span> <br />
              <span className="text-gradient">الذكية</span>
            </h1>

            <p className="text-2xl text-gray-400 leading-relaxed max-w-2xl mr-0 font-medium">
              محرك الابتكار العربي. قمنا بتجزئة خدماتنا إلى تخصصات دقيقة لنمنحك القوة والتحكم الكامل في رحلتك الرقمية.
            </p>

            <div className="flex flex-row-reverse gap-8 pt-10">
              <Button size="lg" className="h-20 px-12 rounded-3xl font-black text-2xl shadow-[0_0_50px_-12px_rgba(var(--primary),0.5)] hover:scale-105 transition-all">
                استكشف الخدمات
              </Button>
              <Button size="lg" variant="outline" className="h-20 px-12 rounded-3xl font-black text-2xl border-white/10 hover:bg-white/5 text-white hover-elevate">
                تواصل مع الإدارة
              </Button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden border-8 border-white/5 bg-black/40 backdrop-blur-3xl p-4">
              <img src={qiroxHero} alt="QIROX Intelligence" className="w-full rounded-[3.5rem] object-cover shadow-2xl" />
              {/* Floating API Key Element */}
              <div className="absolute bottom-10 left-10 p-6 rounded-[2rem] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl animate-bounce">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Global API Access</p>
                    <p className="text-lg font-black text-white">QX-992-LIVE-KEY</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-10 bg-primary/30 blur-[100px] -z-10 rounded-[5rem] animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Services Segments - "التخصصات" */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-6xl font-black text-white tracking-tighter">تخصصات <span className="text-primary">QIROX</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">قمنا بفصل المنظومة إلى وحدات متخصصة لضمان أعلى مستويات الأداء والإبداع</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: Globe2, 
                title: "QIROX Build", 
                desc: "المصنع التقني للواجهات، تطبيقات الجوال، والمواقع التعريفية الإبداعية.",
                link: "/build",
                color: "from-blue-500 to-cyan-400"
              },
              { 
                icon: Cpu, 
                title: "QIROX Systems", 
                desc: "عقل العمليات. أنظمة ERP، CRM، وأتمتة المهام المعقدة للمؤسسات.",
                link: "/systems",
                color: "from-purple-500 to-pink-500"
              },
              { 
                icon: LayoutDashboard, 
                title: "QIROX Stores", 
                desc: "محرك التجارة الإلكترونية. حلول متكاملة لرفع المبيعات وإدارة المخزون.",
                link: "/stores",
                color: "from-orange-500 to-amber-400"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20 }}
                className="group relative p-1 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent"
              >
                <div className="h-full bg-[#0a0a0a] rounded-[2.9rem] p-12 space-y-8 border border-white/5">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}>
                    <service.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-white">{service.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{service.desc}</p>
                  <Link href={service.link}>
                    <Button variant="ghost" className="p-0 text-primary hover:text-white flex items-center gap-2 font-black text-lg group-hover:gap-4 transition-all">
                      استكشف المنصة <ArrowLeft className="w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Generator Preview - Redesigned */}
      <section className="py-40 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-primary/10 via-black to-black rounded-[4rem] p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 p-20 opacity-20 -z-10">
              <Code2 className="w-96 h-96 text-primary" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="text-right space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-[0.3em]">
                  Connectivity Hub
                </div>
                <h2 className="text-5xl font-black text-white">مركز مطوري <span className="text-primary">QIROX</span></h2>
                <p className="text-xl text-gray-400 leading-relaxed font-medium">
                  احصل على مفتاح الربط الموحد لربط خدمات Qirox بموقعك أو تطبيقك الخاص. منظومة واحدة، وصول لا نهائي.
                </p>
                <div className="space-y-4">
                  {[
                    "ربط تلقائي مع Qirox Systems",
                    "مزامنة فورية للمخزون مع Stores",
                    "لوحة تحكم للمطورين عالية الأمان"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center justify-end gap-3 text-white/80 font-bold">
                      {f} <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                  ))}
                </div>
              <Link href="/developers">
                <Button size="lg" className="h-20 px-12 rounded-2xl font-black text-xl bg-white text-black hover:bg-gray-200 shadow-2xl">
                  توليد مفتاح API الآن
                </Button>
              </Link>
              </div>

              <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/10 shadow-3xl font-mono text-left group">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-400">GET <span className="text-green-400">/v1/qirox/connect</span> HTTP/1.1</p>
                  <p className="text-gray-500">Host: api.qirox.online</p>
                  <p className="text-purple-400">Authorization: <span className="text-yellow-400">Bearer QX_LIVE_*******</span></p>
                  <div className="h-px bg-white/5 my-4" />
                  <p className="text-gray-400">{"{"}</p>
                  <p className="text-gray-400 ml-4">"status": <span className="text-green-400">"connected"</span>,</p>
                  <p className="text-gray-400 ml-4">"service": <span className="text-blue-400">"qirox-global-hub"</span>,</p>
                  <p className="text-gray-400 ml-4">"branches": [<span className="text-purple-400">"build", "systems", "stores"</span>]</p>
                  <p className="text-gray-400">{"}"}</p>
                </div>
                <div className="mt-8 flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                   <Button size="sm" variant="ghost" className="text-white font-black hover:bg-white/10">نسخ الرمز</Button>
                   <p className="text-xs text-primary font-black">ACTIVE ENDPOINT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Quick Reference */}
      <section className="py-40 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
            <h2 className="text-6xl font-black text-white tracking-tighter">استثمار <span className="text-primary">ذكي</span></h2>
            <p className="text-xl text-gray-500 font-medium">خطط واضحة ومباشرة لكل تخصص من تخصصاتنا</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Unified Auth Info */}
            <div className="lg:col-span-2 p-12 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-right space-y-4">
                <h3 className="text-3xl font-black text-white">هوية QIROX الموحدة</h3>
                <p className="text-lg text-gray-500 font-medium max-w-md">حساب واحد يمنحك الوصول لجميع منصاتنا وخدماتنا الفرعية بكل سهولة وأمان.</p>
              </div>
              <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-black border border-white/10 shadow-xl">
                   <ShieldCheck className="w-12 h-12 text-primary" />
                </div>
                <div className="p-4 rounded-2xl bg-black border border-white/10 shadow-xl">
                   <Star className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Quick Links / Partners */}
            <div className="lg:col-span-2 pt-20">
               <div className="flex flex-wrap justify-center gap-12 opacity-30">
                 {PARTNERS.map((p, i) => (
                   <p.icon key={i} className="w-12 h-12 text-white grayscale hover:grayscale-0 transition-all cursor-default" />
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
