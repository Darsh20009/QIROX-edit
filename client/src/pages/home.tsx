import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, HeartHandshake, Rocket, Star, ShieldCheck, Zap } from "lucide-react";
import { PARTNERS, PRICING_PLANS } from "@/lib/constants";
import qiroxHero from "@assets/qirox_1767360025807.png";

export default function Home() {
  return (
    <Layout>
      <SEO title="الرئيسية" description="QIROX - الحلول الرقمية المتكاملة لمستقبل أعمالك" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-right space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20"
            >
              <Star className="w-4 h-4 fill-primary" />
              أهلاً بك في مستقبل الأعمال الرقمية
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight">
              نصمم <span className="text-primary text-glow">المستقبل</span> <br />
              بإبداع <span className="text-gradient">QIROX</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mr-0">
              حلول برمجية متكاملة تبدأ معك من الفكرة وتصل بك إلى العالمية. نحن نتكفل بكل شيء، لتركز أنت على نمو تجارتك.
            </p>

            <div className="flex flex-row-reverse gap-6 pt-8">
              <Link href="/register">
                <Button size="lg" className="h-16 px-10 rounded-2xl font-black text-xl shadow-2xl shadow-primary/40 hover-elevate">
                  ابدأ الآن
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl font-black text-xl glass-morphism hover-elevate">
                  عرض الخطط
                </Button>
              </Link>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
              <img src={qiroxHero} alt="QIROX Experience" className="w-full object-cover" />
            </div>
            <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-[4rem]" />
          </motion.div>
        </div>
      </section>

      {/* Partners Showcase */}
      <section className="py-20 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-2xl font-bold text-muted-foreground flex items-center justify-center gap-3">
            <HeartHandshake className="w-6 h-6 text-primary" />
            شركاء النجاح والأنظمة المتكاملة
          </h2>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap gap-16 items-center py-4">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-default">
                <partner.icon className={`w-10 h-10 ${partner.color} transition-transform group-hover:scale-125`} />
                <span className="text-2xl font-black text-foreground/70 group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black">خطط <span className="text-primary">إبداعية</span> بسيطة</h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">خطوات سهلة، وضوح تام، ودعم لا ينقطع. اختر باقتك وابدأ رحلة النجاح.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* E-commerce Card */}
            <Card className="relative overflow-hidden border-none shadow-2xl rounded-[3rem] bg-secondary/20 p-2">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <PRICING_PLANS.stores.icon className="w-40 h-40" />
              </div>
              <CardContent className="p-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <PRICING_PLANS.stores.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black">{PRICING_PLANS.stores.title}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {PRICING_PLANS.stores.plans.map((plan, i) => (
                    <div key={i} className={`p-8 rounded-[2rem] space-y-6 transition-all hover:scale-105 ${plan.highlight ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-background'}`}>
                      <div>
                        <p className={`font-bold ${plan.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>{plan.name}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-4xl font-black">{plan.price}</span>
                          <span className="text-sm font-bold">ريال / {plan.duration}</span>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className={`w-4 h-4 ${plan.highlight ? 'text-white' : 'text-primary'}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full rounded-xl font-bold h-12 ${plan.highlight ? 'bg-white text-primary hover:bg-white/90' : 'variant-default'}`}>
                        اطلب الآن
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Restaurants Card */}
            <Card className="relative overflow-hidden border-none shadow-2xl rounded-[3rem] bg-secondary/20 p-2">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <PRICING_PLANS.hospitality.icon className="w-40 h-40" />
              </div>
              <CardContent className="p-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <PRICING_PLANS.hospitality.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black">{PRICING_PLANS.hospitality.title}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {PRICING_PLANS.hospitality.plans.map((plan, i) => (
                    <div key={i} className={`p-8 rounded-[2rem] space-y-6 transition-all hover:scale-105 ${plan.highlight ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-background'}`}>
                      <div>
                        <p className={`font-bold ${plan.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>{plan.name}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-4xl font-black">{plan.price}</span>
                          <span className="text-sm font-bold">ريال / {plan.duration}</span>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className={`w-4 h-4 ${plan.highlight ? 'text-white' : 'text-primary'}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full rounded-xl font-bold h-12 ${plan.highlight ? 'bg-white text-primary hover:bg-white/90' : 'variant-default'}`}>
                        اطلب الآن
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education CTA */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="mt-12 max-w-6xl mx-auto rounded-[2.5rem] bg-gradient-to-r from-primary to-purple-600 p-12 text-center text-white shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-right flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <PRICING_PLANS.education.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-2">{PRICING_PLANS.education.title}</h3>
                  <p className="text-white/80 font-medium text-lg">{PRICING_PLANS.education.description}</p>
                </div>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black text-xl px-12 h-20 rounded-2xl shadow-2xl">
                {PRICING_PLANS.education.cta}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "الضمان الذهبي", desc: "استرجاع كامل المبلغ في حال لم ينل النظام رضاك." },
            { icon: Zap, title: "أداء خارق", desc: "أنظمة سريعة، مستقرة، وتتحمل آلاف الطلبات في آن واحد." },
            { icon: Rocket, title: "تطوير مستمر", desc: "التحديثات والتطويرات كاملة علينا، أنت تطلب ونحن ننفذ." }
          ].map((item, i) => (
            <div key={i} className="bg-background p-10 rounded-[2.5rem] space-y-6 hover-elevate transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <item.icon className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black">{item.title}</h4>
              <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
